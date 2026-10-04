<#
  Contaser - build do site
  ------------------------
  Monta a pasta dist/ (pronta para publicar) a partir de src/.

  Uso (na raiz do projeto):
    powershell -ExecutionPolicy Bypass -File scripts\build.ps1
    powershell -ExecutionPolicy Bypass -File scripts\build.ps1 -Zip   # tambem gera releases\contaser-site-AAAA-MM-DD.zip

  O que faz:
    1. limpa dist/
    2. copia src/assets e src/public
    3. monta cada pagina de src/pages com src/templates/header.html e footer.html
    4. aplica versao (?v=) em CSS/JS para o navegador nao usar arquivo antigo
    5. se src/site.json tiver "url": gera canonical, og:url, sitemap.xml e linha Sitemap no robots.txt
    6. confere todos os links e arquivos referenciados (falha se algo estiver quebrado)
#>
param([switch]$Zip)

$ErrorActionPreference = "Stop"
$root   = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$src    = Join-Path $root "src"
$dist   = Join-Path $root "dist"
$utf8   = New-Object System.Text.UTF8Encoding $false
function Read-Text($p){ [IO.File]::ReadAllText($p, $utf8) }
function Write-Text($p, $t){ [IO.File]::WriteAllText($p, $t, $utf8) }

# ---------- configuracao ----------
$cfg = (Read-Text (Join-Path $src "site.json")) | ConvertFrom-Json
$siteUrl = ""
if ($cfg.url) { $siteUrl = $cfg.url.TrimEnd("/") }
$versao = Get-Date -Format "yyyyMMddHHmm"

# ---------- 1. limpa dist ----------
if (Test-Path $dist) { Get-ChildItem $dist -Force | Remove-Item -Recurse -Force -Confirm:$false }
else { New-Item -ItemType Directory $dist | Out-Null }

# ---------- 2. copia arquivos estaticos ----------
Copy-Item (Join-Path $src "assets") $dist -Recurse
Get-ChildItem (Join-Path $src "public") -Force | Copy-Item -Destination $dist -Recurse

# ---------- 3. monta paginas ----------
$header = Read-Text (Join-Path $src "templates\header.html")
$footer = Read-Text (Join-Path $src "templates\footer.html")
$ogImage = "assets/img/monograma-3d.jpg"
if ($siteUrl) { $ogImage = "$siteUrl/assets/img/monograma-3d.jpg" }
$paginas = @()

Get-ChildItem (Join-Path $src "pages") -Filter *.html | Sort-Object Name | ForEach-Object {
  $page = Read-Text $_.FullName
  $meta = [regex]::Match($page, '(?s)^\s*<!--(.*?)-->').Groups[1].Value
  function Get-Meta($k){ [regex]::Match($meta, "(?m)^\s*$k\s*:\s*(.+?)\s*$").Groups[1].Value }
  $titulo = Get-Meta "titulo"; $descricao = Get-Meta "descricao"; $pagina = Get-Meta "pagina"
  if (-not $titulo -or -not $descricao) { throw "Pagina $($_.Name) sem titulo/descricao no cabecalho de comentario." }

  $extra = [regex]::Match($page, '(?s)<!--EXTRA-->(.*?)<!--/EXTRA-->').Groups[1].Value.Trim()
  $corpo = [regex]::Replace($page, '(?s)^\s*<!--.*?-->', '', 1)
  $corpo = [regex]::Replace($corpo, '(?s)<!--EXTRA-->.*?<!--/EXTRA-->', '').Trim()

  $canonical = ""
  if ($siteUrl -and $_.Name -ne "404.html") {
    $caminho = if ($_.Name -eq "index.html") { "/" } else { "/" + $_.Name }
    $canonical = "`n<link rel=""canonical"" href=""$siteUrl$caminho"">`n<meta property=""og:url"" content=""$siteUrl$caminho"">"
    $paginas += $caminho
  }

  $html = $header.Replace("{{TITULO}}", $titulo).Replace("{{DESCRICAO}}", $descricao).Replace("{{PAGINA}}", $pagina)
  $html = $html.Replace("{{EXTRA}}", $extra).Replace("{{CANONICAL}}", $canonical).Replace("{{OG_IMAGE}}", $ogImage).Replace("{{VERSAO}}", $versao)
  # <base> precisa vir antes de qualquer endereco relativo (CSS, icones)
  $base = [regex]::Match($html, '<base [^>]*>\s*')
  if ($base.Success) { $html = $html.Remove($base.Index, $base.Length).Replace('<meta charset="utf-8">', '<meta charset="utf-8">' + "`n" + $base.Value.Trim()) }
  $html = $html + "`n" + $corpo + "`n" + $footer
  $html = $html.Replace("{{OG_IMAGE}}", $ogImage)
  if ($html -match '\{\{[A-Z_]+\}\}') { throw "Marcador nao substituido em $($_.Name): $($Matches[0])" }
  Write-Text (Join-Path $dist $_.Name) $html
  Write-Host ("  pagina   " + $_.Name)
}

# ---------- 5. sitemap e robots ----------
$robots = Join-Path $dist "robots.txt"
if ($siteUrl) {
  $hoje = Get-Date -Format "yyyy-MM-dd"
  $urls = $paginas | ForEach-Object {
    $prio = if ($_ -eq "/") { "1.0" } elseif ($_ -match "privacidade|termos") { "0.3" } else { "0.8" }
    "  <url><loc>$siteUrl$_</loc><lastmod>$hoje</lastmod><priority>$prio</priority></url>"
  }
  Write-Text (Join-Path $dist "sitemap.xml") ("<?xml version=""1.0"" encoding=""UTF-8""?>`n<urlset xmlns=""http://www.sitemaps.org/schemas/sitemap/0.9"">`n" + ($urls -join "`n") + "`n</urlset>`n")
  Write-Text $robots ((Read-Text $robots).TrimEnd() + "`n`nSitemap: $siteUrl/sitemap.xml`n")
  Write-Host "  sitemap  sitemap.xml ($($paginas.Count) paginas)"
} else {
  Write-Host "  aviso    src/site.json sem ""url"": sitemap e canonical nao gerados." -ForegroundColor Yellow
}

# ---------- 6. confere links ----------
$erros = @()
Get-ChildItem $dist -Filter *.html | ForEach-Object {
  $html = Read-Text $_.FullName
  $refs = [regex]::Matches($html, '\s(?:href|src|poster)="([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
  foreach ($r in $refs) {
    if ($r -match '^(https?:|mailto:|tel:|data:|#|//)') { continue }
    $arquivo = ($r -split '[?#]')[0]
    if (-not $arquivo) { continue }
    if ($arquivo.EndsWith("/")) { $arquivo += "index.html" }
    $alvo = Join-Path $dist ($arquivo.TrimStart("/").Replace("/", "\"))
    if (-not (Test-Path $alvo -PathType Leaf)) { $erros += "$($_.Name) -> $r" }
  }
}
if ($erros.Count) { $erros | ForEach-Object { Write-Host "  QUEBRADO $_" -ForegroundColor Red }; throw "$($erros.Count) link(s) quebrado(s)." }
Write-Host "  links    todos os arquivos referenciados existem"

# ---------- zip opcional ----------
$total = (Get-ChildItem $dist -Recurse -File | Measure-Object -Sum Length)
Write-Host ("`nOK  dist/ pronto: {0} arquivos, {1:N1} MB  (versao {2})" -f $total.Count, ($total.Sum / 1MB), $versao) -ForegroundColor Green
if ($Zip) {
  $rel = Join-Path $root "releases"; if (-not (Test-Path $rel)) { New-Item -ItemType Directory $rel | Out-Null }
  $zipPath = Join-Path $rel ("contaser-site-" + (Get-Date -Format "yyyy-MM-dd") + ".zip")
  Compress-Archive -Path (Join-Path $dist "*") -DestinationPath $zipPath -Force
  Write-Host ("OK  pacote: releases\" + (Split-Path $zipPath -Leaf)) -ForegroundColor Green
}

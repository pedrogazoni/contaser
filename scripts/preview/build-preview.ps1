<#
  Contaser - previa em arquivo unico
  ----------------------------------
  Gera .preview/contaser-preview.html a partir de dist/: CSS e JS embutidos e
  todas as paginas como secoes navegaveis pelo menu (router.js).
  Serve para publicar uma previa onde arquivos .css/.js separados sao bloqueados
  (ex.: link de Artifact do Claude). NAO e usado no deploy real.

  Uso: powershell -ExecutionPolicy Bypass -File scripts\preview\build-preview.ps1
       (rode scripts\build.ps1 antes)
#>
$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent (Split-Path -Parent $here)
$dist = Join-Path $root "dist"
$outDir = Join-Path $root ".preview"
$utf8 = New-Object System.Text.UTF8Encoding $false
function Read-Text($p){ [IO.File]::ReadAllText($p, $utf8) }
function Main-Of($html){ $a=$html.IndexOf('<main id="conteudo">'); $b=$html.LastIndexOf('</main>'); return $html.Substring($a+20, $b-$a-20) }

$idx    = Read-Text "$dist\index.html"
$css    = Read-Text "$dist\assets\css\style.css"
$config = Read-Text "$dist\assets\js\config.js"
$js     = Read-Text "$dist\assets\js\main.js"
$router = Read-Text "$here\router.js"

$pages = [ordered]@{ "inicio"="index.html"; "sobre"="sobre.html"; "servicos"="servicos.html"; "para-quem-atendemos"="para-quem-atendemos.html"; "conteudos"="conteudos.html"; "contato"="contato.html"; "privacidade"="privacidade.html"; "termos"="termos.html" }
$sections = ""
foreach ($k in $pages.Keys) {
  $hid = if ($k -eq "inicio") { "" } else { " hidden" }
  $sections += "<div data-route=""$k""$hid>`n" + (Main-Of (Read-Text "$dist\$($pages[$k])")) + "`n</div>`n"
}

$top = $idx.Substring(0, $idx.IndexOf('<main id="conteudo">'))
$bottom = $idx.Substring($idx.LastIndexOf('</main>') + 7)
$top = $top -replace '(?i)<!DOCTYPE html>\s*','' -replace '(?i)<html[^>]*>\s*','' -replace '(?i)<head>\s*','' -replace '(?i)</head>\s*','' -replace '(?i)<body[^>]*>\s*',''
$top = $top -replace '<meta charset="utf-8">\s*','' -replace '<meta name="viewport"[^>]*>\s*','' -replace '<link rel="manifest"[^>]*>\s*',''
$top = [regex]::Replace($top, '<link rel="stylesheet" href="assets/css/style\.css[^"]*">', { param($m) "<style>`n$css`n</style>" })
$top = [regex]::Replace($top, '<script src="assets/js/(config|main)\.js[^"]*" defer></script>\s*', '')
$bottom = $bottom -replace '(?i)</body>\s*','' -replace '(?i)</html>\s*',''

$out = $top + '<main id="conteudo">' + "`n" + $sections + '</main>' + $bottom +
  "<script>`n$config`n</script>`n<script>`n$router`n</script>`n<script>`n$js`n</script>`n"
$out = $out.Replace('src="assets/video/vinheta.mp4"','data-src="assets/video/vinheta.mp4"')

if (-not (Test-Path $outDir)) { New-Item -ItemType Directory $outDir | Out-Null }
[IO.File]::WriteAllText("$outDir\contaser-preview.html", $out, $utf8)
"OK  .preview\contaser-preview.html ({0:N0} KB)" -f ((Get-Item "$outDir\contaser-preview.html").Length/1KB)

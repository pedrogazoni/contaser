<#
  Contaser - servidor local para testar o site (pasta dist/)
  Uso:  powershell -ExecutionPolicy Bypass -File scripts\serve.ps1
        depois abra http://localhost:8080   (Ctrl+C para parar)
#>
param([int]$Port = 8080)
$root = Join-Path (Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)) "dist"
if (-not (Test-Path $root)) { throw "Pasta dist/ nao existe. Rode scripts\build.ps1 primeiro." }
$types = @{ ".html"="text/html; charset=utf-8"; ".css"="text/css; charset=utf-8"; ".js"="text/javascript; charset=utf-8";
  ".json"="application/json"; ".webmanifest"="application/manifest+json"; ".xml"="application/xml"; ".txt"="text/plain; charset=utf-8";
  ".svg"="image/svg+xml"; ".png"="image/png"; ".jpg"="image/jpeg"; ".jpeg"="image/jpeg"; ".mp4"="video/mp4"; ".ico"="image/x-icon" }
$l = New-Object System.Net.HttpListener
$l.Prefixes.Add("http://localhost:$Port/")
$l.Start()
Write-Host "Servindo dist/ em http://localhost:$Port  (Ctrl+C para parar)"
while ($l.IsListening) {
  $c = $l.GetContext()
  try {
    $p = [Uri]::UnescapeDataString($c.Request.Url.AbsolutePath.TrimStart('/'))
    if ($p -eq "" -or $p.EndsWith("/")) { $p += "index.html" }
    $f = Join-Path $root $p
    $status = 200
    if (-not (Test-Path $f -PathType Leaf)) { $f = Join-Path $root "404.html"; $status = 404 }
    $bytes = [IO.File]::ReadAllBytes($f)
    $ext = [IO.Path]::GetExtension($f).ToLower()
    if ($types.ContainsKey($ext)) { $c.Response.ContentType = $types[$ext] }
    $c.Response.StatusCode = $status
    $c.Response.ContentLength64 = $bytes.Length
    $c.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } catch {} finally { try { $c.Response.Close() } catch {} }
}

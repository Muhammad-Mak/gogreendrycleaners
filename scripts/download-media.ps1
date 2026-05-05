# Downloads all source media from gogreendrycleaners.net into /public/.
# Idempotent: skips files already present. Run once after cloning.
#
# Usage:
#   .\scripts\download-media.ps1
#   .\scripts\download-media.ps1 -Force        # re-download everything
#   .\scripts\download-media.ps1 -Verbose      # verbose output

[CmdletBinding()]
param(
    [switch]$Force
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$Root = Split-Path $PSScriptRoot -Parent
$Public = Join-Path $Root "public"
$Source = "https://gogreendrycleaners.net"

$Headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
    "Accept" = "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
    "Accept-Language" = "en-US,en;q=0.9"
    "Referer" = "https://gogreendrycleaners.net/"
}

# Source path -> local path under /public/
$Files = [ordered]@{
    # Brand
    "/wp-content/uploads/2025/03/Logo-with-TM-2.svg"                                  = "images/brand/logo.svg"
    "/wp-content/uploads/2025/03/Mask-group.svg"                                      = "images/brand/logomark.svg"

    # Hero video
    "/wp-content/uploads/2025/04/gogreen-video-placeholder-1.mp4"                     = "videos/hero.mp4"

    # Storefront / process photos (geotagged-1..7)
    "/wp-content/uploads/2025/12/geotagged-1.jpg"                                     = "images/services/geotagged-1.jpg"
    "/wp-content/uploads/2025/12/geotagged-2.jpg"                                     = "images/services/geotagged-2.jpg"
    "/wp-content/uploads/2025/12/geotagged-3.jpg"                                     = "images/services/geotagged-3.jpg"
    "/wp-content/uploads/2025/12/geotagged-4.jpg"                                     = "images/services/geotagged-4.jpg"
    "/wp-content/uploads/2025/12/geotagged-5.jpg"                                     = "images/services/geotagged-5.jpg"
    "/wp-content/uploads/2025/12/geotagged-6.jpg"                                     = "images/services/geotagged-6.jpg"
    "/wp-content/uploads/2025/12/geotagged-7.jpg"                                     = "images/services/geotagged-7.jpg"

    # About: storefront/team photos
    "/wp-content/uploads/2025/05/IMG_9071-scaled.jpg"                                 = "images/about/storefront-1.jpg"
    "/wp-content/uploads/2025/04/75.jpeg"                                             = "images/about/team-1.jpeg"
    "/wp-content/uploads/2025/04/710663BE-F4B1-47C5-9D28-104D0BC6E5F8.jpeg"           = "images/about/team-2.jpeg"
    "/wp-content/uploads/2025/04/39.jpeg"                                             = "images/about/team-3.jpeg"
    "/wp-content/uploads/2025/04/GG-PICS.png"                                         = "images/about/collage.png"
    "/wp-content/uploads/2025/04/Rectangle-182.png"                                   = "images/about/rectangle-182.png"

    # Partner / client logos
    "/wp-content/uploads/2025/05/Brightline_Logo.svg.png"                             = "images/partners/brightline.png"
    "/wp-content/uploads/2025/05/blt.png"                                             = "images/partners/blt.png"
    "/wp-content/uploads/2025/05/loginLogo.png"                                       = "images/partners/login.png"
    "/wp-content/uploads/2025/05/greystar.png"                                        = "images/partners/greystar.png"
    "/wp-content/uploads/2025/05/GreaterPalmBeachCounty.png"                          = "images/partners/greater-pbc.png"
    "/wp-content/uploads/2025/05/hilton-stamford.png"                                 = "images/partners/hilton-stamford.png"
    "/wp-content/uploads/2025/05/hyatt.png"                                           = "images/partners/hyatt.png"
    "/wp-content/uploads/2025/05/lincoln.png"                                         = "images/partners/lincoln.png"
    "/wp-content/uploads/2025/05/marriott.jpg"                                        = "images/partners/marriott.jpg"
    "/wp-content/uploads/2025/05/pbchamber-logo.png"                                  = "images/partners/pb-chamber.png"
    "/wp-content/uploads/2025/05/spinnaker.jpg"                                       = "images/partners/spinnaker.jpg"
    "/wp-content/uploads/2025/12/palm_beach_dramaworks_logo.jpg"                      = "images/partners/dramaworks.jpg"
}

$ok = 0; $skipped = 0; $failed = @()

foreach ($entry in $Files.GetEnumerator()) {
    $url = "$Source$($entry.Key)"
    $dest = Join-Path $Public $entry.Value
    $dir = Split-Path $dest -Parent

    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

    if ((Test-Path $dest) -and -not $Force) {
        Write-Verbose "SKIP $($entry.Value) (already present)"
        $skipped++
        continue
    }

    try {
        Invoke-WebRequest -Uri $url -Headers $Headers -OutFile $dest -UseBasicParsing -TimeoutSec 60
        $size = (Get-Item $dest).Length
        Write-Host ("  [+] {0,-50}  {1,8} bytes" -f $entry.Value, $size)
        $ok++
    } catch {
        $msg = $_.Exception.Message
        if ($msg.Length -gt 100) { $msg = $msg.Substring(0, 100) + "..." }
        Write-Host ("  [!] {0,-50}  FAILED: {1}" -f $entry.Value, $msg) -ForegroundColor Yellow
        $failed += $entry.Value
        if (Test-Path $dest) { Remove-Item $dest -Force }
    }
}

Write-Host ""
Write-Host "--- Summary ---"
Write-Host "  Downloaded: $ok"
Write-Host "  Skipped (already present): $skipped"
Write-Host "  Failed: $($failed.Count)"

if ($failed.Count -gt 0) {
    Write-Host ""
    Write-Host "Failed files:" -ForegroundColor Yellow
    $failed | ForEach-Object { Write-Host "  - $_" }
    exit 1
}

exit 0

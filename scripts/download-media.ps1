# Downloads all source media from gogreendrycleaners.net into /public/.
# Idempotent: skips files already present. Run once after cloning.
#
# How it works:
#   The source site (gogreendrycleaners.net) is behind Sucuri, which blocks
#   non-browser HTTP clients (curl, Invoke-WebRequest, Node fetch) by TLS
#   fingerprint -- even from a residential IP. So we proxy image requests
#   through https://images.weserv.nl/ which fetches with a real browser
#   fingerprint and re-serves the bytes.
#
#   weserv only handles images. The hero MP4 must be downloaded manually
#   (the script prints instructions at the end).
#
# Usage:
#   .\scripts\download-media.ps1
#   .\scripts\download-media.ps1 -Force        # re-download everything

[CmdletBinding()]
param(
    [switch]$Force
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$Root = Split-Path $PSScriptRoot -Parent
$Public = Join-Path $Root "public"
$SourceHost = "gogreendrycleaners.net"
$Proxy = "https://images.weserv.nl/"

$Headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
    "Accept" = "image/avif,image/webp,image/apng,image/*,*/*;q=0.8"
}

# weserv quality (1-100). 95 keeps photos crisp without huge file sizes.
$Quality = 95

# Source path -> @{ local = path; transform = $null|@{ w=...; h=... } }
# Files originally SVG are routed through weserv with a width param to
# get a crisp raster (weserv always rasters SVG input -- unavoidable).
# Photos pass through at native resolution; weserv re-encodes at $Quality.
$Files = @(
    # Brand -- SVGs rendered at 2x display size to stay crisp on retina
    @{ src = "/wp-content/uploads/2025/03/Logo-with-TM-2.svg";                 local = "images/brand/logo.png";          w = 600 }
    @{ src = "/wp-content/uploads/2025/03/Mask-group.svg";                     local = "images/brand/logomark.png";      w = 256 }

    # Storefront / process photos
    @{ src = "/wp-content/uploads/2025/12/geotagged-1.jpg";                    local = "images/services/geotagged-1.jpg" }
    @{ src = "/wp-content/uploads/2025/12/geotagged-2.jpg";                    local = "images/services/geotagged-2.jpg" }
    @{ src = "/wp-content/uploads/2025/12/geotagged-3.jpg";                    local = "images/services/geotagged-3.jpg" }
    @{ src = "/wp-content/uploads/2025/12/geotagged-4.jpg";                    local = "images/services/geotagged-4.jpg" }
    @{ src = "/wp-content/uploads/2025/12/geotagged-5.jpg";                    local = "images/services/geotagged-5.jpg" }
    @{ src = "/wp-content/uploads/2025/12/geotagged-6.jpg";                    local = "images/services/geotagged-6.jpg" }
    @{ src = "/wp-content/uploads/2025/12/geotagged-7.jpg";                    local = "images/services/geotagged-7.jpg" }

    # About: founder + leadership team photos (canonical names)
    @{ src = "/wp-content/uploads/2025/04/Rectangle-182.png";                          local = "images/about/michael-koppy.png" }
    @{ src = "/wp-content/uploads/2025/04/ce511387a3a3c341b168e45464f42bfa-1.png";     local = "images/about/michael-koppy-signature.png" }
    @{ src = "/wp-content/uploads/2025/05/IMG_9071-scaled.jpg";                        local = "images/about/igor-madrit.jpg" }
    @{ src = "/wp-content/uploads/2025/04/image-25.png";                               local = "images/about/igor-madrit-signature.png" }
    @{ src = "/wp-content/uploads/2025/04/75.jpeg";                                    local = "images/about/paige-koppy.jpeg" }
    @{ src = "/wp-content/uploads/2025/04/710663BE-F4B1-47C5-9D28-104D0BC6E5F8.jpeg";  local = "images/about/kevin-van-rensburg.jpeg" }
    @{ src = "/wp-content/uploads/2025/04/39.jpeg";                                    local = "images/about/jeff-connors.jpeg" }
    @{ src = "/wp-content/uploads/2025/04/GG-PICS.png";                                local = "images/about/petra-koppy.png" }

    # Partner / client logos
    @{ src = "/wp-content/uploads/2025/05/Brightline_Logo.svg.png";            local = "images/partners/brightline.png" }
    @{ src = "/wp-content/uploads/2025/05/blt.png";                            local = "images/partners/blt.png" }
    @{ src = "/wp-content/uploads/2025/05/loginLogo.png";                      local = "images/partners/login.png" }
    @{ src = "/wp-content/uploads/2025/05/greystar.png";                       local = "images/partners/greystar.png" }
    @{ src = "/wp-content/uploads/2025/05/GreaterPalmBeachCounty.png";         local = "images/partners/greater-pbc.png" }
    @{ src = "/wp-content/uploads/2025/05/hilton-stamford.png";                local = "images/partners/hilton-stamford.png" }
    @{ src = "/wp-content/uploads/2025/05/hyatt.png";                          local = "images/partners/hyatt.png" }
    @{ src = "/wp-content/uploads/2025/05/lincoln.png";                        local = "images/partners/lincoln.png" }
    @{ src = "/wp-content/uploads/2025/05/marriott.jpg";                       local = "images/partners/marriott.jpg" }
    @{ src = "/wp-content/uploads/2025/05/pbchamber-logo.png";                 local = "images/partners/pb-chamber.png" }
    @{ src = "/wp-content/uploads/2025/05/spinnaker.jpg";                      local = "images/partners/spinnaker.jpg" }
    @{ src = "/wp-content/uploads/2025/12/palm_beach_dramaworks_logo.jpg";     local = "images/partners/dramaworks.jpg" }

    # Topic-matched imagery (used as service / blog / hero photography)
    # Source site uses these as blog featured images. Filenames are
    # descriptive (Freepik-style) and content is on-topic.
    @{ src = "/wp-content/uploads/2025/12/morning-bride-preparting-ceremony-scaled.jpg";                                              local = "images/topics/bridal.jpg" }
    @{ src = "/wp-content/uploads/2025/12/medium-shot-woman-repairing-clothes-1.jpg";                                                  local = "images/topics/alterations.jpg" }
    @{ src = "/wp-content/uploads/2025/12/ca4bb-dry_cleaners_for_suits.jpg";                                                           local = "images/topics/suits.jpg" }
    @{ src = "/wp-content/uploads/2025/12/personal-shopper-helping-cutomer-1.jpg";                                                     local = "images/topics/personal-shopper.jpg" }
    @{ src = "/wp-content/uploads/2025/12/beautiful-girl-trying-dress-room-1.jpg";                                                     local = "images/topics/dress-fitting.jpg" }
    @{ src = "/wp-content/uploads/2025/12/front-view-disappointed-young-couple-talking-each-other-while-washing-clothes-white-wall-1.jpg"; local = "images/topics/laundry-couple.jpg" }
    @{ src = "/wp-content/uploads/2025/12/medium-shot-questioning-woman-with-clothes-1.jpg";                                           local = "images/topics/eco-questioning.jpg" }
    @{ src = "/wp-content/uploads/2025/08/dry-cleaners-5.webp";                                                                        local = "images/topics/dry-cleaning-rack.jpg" }
    @{ src = "/wp-content/uploads/2025/12/undefined-2.jpg";                                                                            local = "images/topics/eco-florida.jpg" }
    @{ src = "/wp-content/uploads/2025/12/undefined-5.png";                                                                            local = "images/topics/petrochemical-free.png" }
)

# Hero MP4 -- weserv can't proxy video. User downloads via browser.
$ManualVideo = @{
    sourceUrl = "https://gogreendrycleaners.net/wp-content/uploads/2025/04/gogreen-video-placeholder-1.mp4"
    local     = "videos/hero.mp4"
}

$ok = 0; $skipped = 0; $failed = @()

foreach ($entry in $Files) {
    $dest = Join-Path $Public $entry.local
    $dir = Split-Path $dest -Parent
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

    if ((Test-Path $dest) -and -not $Force) {
        Write-Verbose "SKIP $($entry.local) (already present)"
        $skipped++
        continue
    }

    $proxied = "$Proxy`?url=$SourceHost$($entry.src)&q=$Quality"
    if ($entry.ContainsKey("w")) { $proxied += "&w=$($entry.w)" }

    try {
        Invoke-WebRequest -Uri $proxied -Headers $Headers -OutFile $dest -UseBasicParsing -TimeoutSec 60
        $size = (Get-Item $dest).Length
        if ($size -lt 200) { throw "Suspiciously small ($size bytes) -- likely an error response" }
        Write-Host ("  [+] {0,-50}  {1,8} bytes" -f $entry.local, $size)
        $ok++
    } catch {
        $msg = $_.Exception.Message
        if ($msg.Length -gt 100) { $msg = $msg.Substring(0, 100) + "..." }
        Write-Host ("  [!] {0,-50}  FAILED: {1}" -f $entry.local, $msg) -ForegroundColor Yellow
        $failed += $entry.local
        if (Test-Path $dest) { Remove-Item $dest -Force }
    }
}

Write-Host ""
Write-Host "--- Summary ---"
Write-Host "  Downloaded: $ok"
Write-Host "  Skipped (already present): $skipped"
Write-Host "  Failed: $($failed.Count)"

# Manual video step
$videoDest = Join-Path $Public $ManualVideo.local
$videoDir = Split-Path $videoDest -Parent
if (-not (Test-Path $videoDir)) { New-Item -ItemType Directory -Path $videoDir -Force | Out-Null }

if (Test-Path $videoDest) {
    Write-Host ""
    Write-Host "  [=] $($ManualVideo.local)  (already present)"
} else {
    Write-Host ""
    Write-Host "--- Manual step needed for the hero video ---" -ForegroundColor Cyan
    Write-Host "  Sucuri blocks video downloads via any non-browser tool."
    Write-Host "  In your browser, open this URL and 'Save Link As':"
    Write-Host "    $($ManualVideo.sourceUrl)"
    Write-Host "  Save it to:"
    Write-Host "    $videoDest"
    Write-Host "  (Or skip -- the Hero component falls back to the image carousel if hero.mp4 is missing.)"
}

if ($failed.Count -gt 0) {
    Write-Host ""
    Write-Host "Failed files:" -ForegroundColor Yellow
    $failed | ForEach-Object { Write-Host "  - $_" }
    exit 1
}

exit 0

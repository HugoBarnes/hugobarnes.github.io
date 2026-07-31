#!/usr/bin/env bash
# Regenerate first-page thumbnails for every PDF in public/pdfs (needs poppler).
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/pdfs/thumbs
for pdf in public/pdfs/*.pdf; do
  name=$(basename "$pdf" .pdf)
  pdftoppm -png -f 1 -l 1 -scale-to 480 -singlefile "$pdf" "public/pdfs/thumbs/$name"
  echo "thumb: $name.png"
done

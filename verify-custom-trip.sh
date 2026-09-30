#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-.}"
PAGE="$ROOT/custom-trip/index.html"
JS="$ROOT/assets/js/custom-trip.js"
CSS="$ROOT/assets/css/custom-trip.css"

fail() { echo "FAIL: $1" >&2; exit 1; }
pass() { echo "PASS: $1"; }

[[ -f "$PAGE" ]] || fail "custom-trip/index.html missing"
[[ -f "$JS" ]] || fail "assets/js/custom-trip.js missing"
[[ -f "$CSS" ]] || fail "assets/css/custom-trip.css missing"

head -n 1 "$PAGE" | grep -qx -- '---' || fail "Jekyll front matter missing"
pass "Jekyll front matter present"

grep -Fq '{% include site-header.html %}' "$PAGE" || fail "site-header include missing"
grep -Fq '{% include site-footer.html %}' "$PAGE" || fail "site-footer include missing"
! grep -Eq '<header[ >]|<footer[ >]' "$PAGE" || fail "handwritten header/footer still present"
pass "shared header/footer includes used"

! grep -Fq '../' "$PAGE" || fail "parent-relative ../ path remains"
pass "page internal asset/link paths are root-relative"

grep -Fq '"@type": "BreadcrumbList"' "$PAGE" || fail "BreadcrumbList schema missing"
pass "BreadcrumbList schema present"

! grep -Fq 'post-office-group.webp' "$PAGE" || fail "missing Saigon asset is still referenced"
grep -Fq '/assets/images/hidden-alley.webp' "$PAGE" || fail "Saigon card hidden-alley asset not referenced"
[[ "$(grep -Fc '/assets/images/duy-og-saigon-guests-central-post-office.webp' "$PAGE")" -eq 1 ]] || fail "Central Post Office image should appear only once"
pass "Saigon card uses distinct verified asset and founder image is not duplicated"

! grep -Fq 'id="customTripForm"' "$PAGE" || fail "legacy form ID still present on page"
! grep -Fq "querySelector('#customTripForm')" "$JS" || fail "page JS still binds legacy form ID"
grep -Fq 'id="customExperienceForm"' "$PAGE" || fail "new form ID missing"
grep -Fq "querySelector('#customExperienceForm')" "$JS" || fail "page JS does not bind new form ID"
grep -Fq 'event.stopImmediatePropagation();' "$JS" || fail "submit isolation guard missing"
pass "custom form is isolated from legacy main.js #customTripForm handler"

! grep -Fq 'wa-float' "$PAGE" || fail "page still hardcodes floating WhatsApp button"
pass "floating WhatsApp UI delegated to shared include"

node --check "$JS" >/dev/null || fail "custom-trip.js syntax failed"
pass "custom-trip.js syntax"

python - "$CSS" <<'PY'
from pathlib import Path
import sys
s = Path(sys.argv[1]).read_text()
if s.count('{') != s.count('}'):
    raise SystemExit(1)
PY
pass "custom-trip.css brace balance"

# Verify the corrected intrinsic dimensions declared in HTML.
grep -Fq 'src="/assets/images/mekong-meal.webp"' "$PAGE" || fail "hero image missing"
grep -A4 -F 'src="/assets/images/mekong-meal.webp"' "$PAGE" | grep -Fq 'width="1600"' || fail "mekong-meal width incorrect"
grep -A4 -F 'src="/assets/images/mekong-meal.webp"' "$PAGE" | grep -Fq 'height="1484"' || fail "mekong-meal height incorrect"
grep -A4 -F 'src="/assets/images/duy-og-saigon-guests-central-post-office.webp"' "$PAGE" | grep -Fq 'width="1200"' || fail "founder image width incorrect"
grep -A4 -F 'src="/assets/images/duy-og-saigon-guests-central-post-office.webp"' "$PAGE" | grep -Fq 'height="1181"' || fail "founder image height incorrect"
grep -A4 -F 'src="/assets/images/hidden-alley.webp"' "$PAGE" | grep -Fq 'width="1600"' || fail "Saigon card width incorrect"
grep -A4 -F 'src="/assets/images/hidden-alley.webp"' "$PAGE" | grep -Fq 'height="1577"' || fail "Saigon card height incorrect"
grep -A4 -F 'src="/assets/images/cu-chi-trapdoor.webp"' "$PAGE" | grep -Fq 'width="1448"' || fail "Cu Chi width incorrect"
grep -A4 -F 'src="/assets/images/cu-chi-trapdoor.webp"' "$PAGE" | grep -Fq 'height="1086"' || fail "Cu Chi height incorrect"
grep -A4 -F 'src="/assets/images/mekong-boat.webp"' "$PAGE" | grep -Fq 'width="1200"' || fail "Mekong width incorrect"
grep -A4 -F 'src="/assets/images/mekong-boat.webp"' "$PAGE" | grep -Fq 'height="1600"' || fail "Mekong height incorrect"
pass "intrinsic image dimensions corrected"

for asset in \
  assets/images/custom-trip/tay-ninh-cao-dai-holy-see.webp \
  assets/images/custom-trip/tay-ninh-ba-den-mountain.webp \
  assets/images/custom-trip/vung-tau-coast.webp \
  assets/images/custom-trip/vung-tau-christ-statue-guests.webp \
  assets/images/custom-trip/vung-tau-sea-stairs.webp \
  assets/images/custom-trip/vung-tau-white-columns-guests.webp; do
  [[ -s "$ROOT/$asset" ]] || fail "$asset missing or empty"
done
pass "all patch image assets exist"

# These are shared repo dependencies. The check only runs when the files are present in the merged tree.
for shared in \
  assets/images/mekong-meal.webp \
  assets/images/duy-og-saigon-guests-central-post-office.webp \
  assets/images/hidden-alley.webp \
  assets/images/cu-chi-trapdoor.webp \
  assets/images/mekong-boat.webp \
  _includes/site-header.html \
  _includes/site-footer.html \
  assets/js/main.js; do
  [[ -e "$ROOT/$shared" ]] || fail "shared dependency missing after merge: $shared"
done
pass "shared R7/R8/R9 dependencies exist"

# Confirm the known legacy handler may exist but cannot match this page's renamed form.
if grep -Fq 'customTripForm' "$ROOT/assets/js/main.js"; then
  pass "legacy main.js customTripForm handler detected and safely isolated by renamed page form"
else
  pass "no legacy main.js customTripForm handler detected"
fi

python - "$PAGE" "$JS" "$CSS" <<'PY2'
from pathlib import Path
import sys
needle = chr(0x2014)
for name in sys.argv[1:]:
    if needle in Path(name).read_text():
        raise SystemExit(1)
PY2
pass "no em dash in page code"

echo "ALL CUSTOM TRIP REGRESSION CHECKS PASSED"

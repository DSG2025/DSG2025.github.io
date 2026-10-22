# OG SAIGON V2 | ENGINEERING HANDOFF & AUDIT BRIEF
**Cập nhật:** 22/10/2026 | **Loại:** tài liệu nội bộ trong branch thử nghiệm, không phải release approval  
**Dành cho:** Software Engineer / Tech Lead thực hiện audit  
**Nguồn xác minh:** GitHub branch bên dưới, so sánh trực tiếp với main tại thời điểm viết. Các quyết định thiết kế dựa trên các vòng duyệt của Duy.  
**Mức tin cậy:** dữ kiện về Git/source đã kiểm qua GitHub; visual QA gần nhất do Duy duyệt trên local. Không coi static inspection là kết quả chạy browser/CI.

## 1. Source of truth, trạng thái branch
- Repo: https://github.com/DSG2025/DSG2025.github.io
- Branch làm việc: `design/og-saigon-v2-homepage-a-20261021`
- **Code baseline đã được Duy chốt:** `2575c803bcdbbc800792325347d991538e8be6e0` (Hero V2.5.1).
- Main khi lập handoff: `1d6555f33902d9314165af7b4f9fce6d92e7582a`.
- Nhánh V2 đi trước main **14 commits, behind 0** tại mốc code; 28 file có thay đổi so với main, gồm CSS, HTML, kiểm thử và tài sản ảnh/font. Handoff này là commit tài liệu bổ sung, không đổi mã thực thi đã chốt.
- **Không merge, không publish, không sửa DNS/CNAME, không thay đổi ogsaigon.com.** Người quyết định phát hành cuối cùng là Duy.
- Git diff để audit: `git diff main...HEAD`; nên so sánh theo mốc code `2575c803` để tách riêng commit tài liệu.

## 2. Cách lấy code và chạy local
```bash
git clone --branch design/og-saigon-v2-homepage-a-20261021 --single-branch https://github.com/DSG2025/DSG2025.github.io.git
cd DSG2025.github.io
git rev-parse --short HEAD
git status --short
npm ci
npm run build
npm run dev
```
- Mở URL do Vite in ra, thường `http://localhost:5173/`. Dừng server: Ctrl+C.
- Với checkout đã tồn tại: `git pull --ff-only` rồi `npm run build`; refresh trình duyệt hoặc chạy lại `npm run dev` nếu server tắt.
- `npm run build` chạy `node build-preview.mjs`, sinh lại `dist/`, render Liquid/includes và Markdown stories, copy assets. **Không được publish nguyên `dist/`**.
- Vite phục vụ `dist/` theo `vite.config.mjs`. Đây là preview Node/Vite, **khác build production Jekyll/GitHub Pages**.
- Build preview cố tình thêm `noindex,nofollow` và `robots.txt Disallow: /`. Đó là hành vi preview, **không phải cấu hình SEO production**. Source `robots.txt` hiện cho phép crawl.
- Stack: static Jekyll/GitHub Pages + HTML, CSS, JS; Liquid, Markdown; Node/Vite chỉ phục vụ preview. Không có migration/backend mới.

## 3. Inventory 17 URL kiểm toán
**Các trang source HTML gốc (11 URL):**
1. `/` -> `index.html`
2. `/about/` -> `about/index.html`
3. `/meet-duy/` -> `meet-duy/index.html` (title hiển thị: Meet the OG; chưa đổi URL)
4. `/custom-trip/` -> `custom-trip/index.html`
5. `/transport/` -> `transport/index.html`
6. `/experiences/` -> `experiences/index.html`
7. `/experiences/cu-chi-tunnels/` -> `experiences/cu-chi-tunnels/index.html`
8. `/experiences/cu-chi-war-museum/` -> `experiences/cu-chi-war-museum/index.html`
9. `/experiences/hidden-saigon/` -> `experiences/hidden-saigon/index.html`
10. `/stories/` -> `stories/index.html`
11. `/404.html` -> `404.html`

**6 Stories xuất bản từ `_stories/*.md`, qua `_layouts/story.html`:**
12. `/stories/cholon-saigon-chinatown/`
13. `/stories/cu-chi-or-war-remnants-museum/`
14. `/stories/cu-chi-without-crawling/`
15. `/stories/district-4-saigon-alleys/`
16. `/stories/first-day-in-saigon/`
17. `/stories/saigon-doesnt-stop-when-it-rains/`

Cấu trúc dùng chung hiện có: `_includes/site-header.html`, `_includes/site-footer.html`, `assets/css/style.css`, `assets/js/main.js`, `assets/js/site-data.js`. CSS theo trang: `home-v2.css`, `stories.css`, `meet-og.css`, `custom-trip.css`, `cu-chi-v2.css`, `transport-v2.css`. Logic form ở `assets/js/custom-trip.js`, homepage script ở `assets/js/home.js`.

## 4. Đã thực hiện trên branch V2 (14 commits sau main)
**Thiết kế & foundations:**
- Tạo Stage 1 Hero A trên homepage, giữ cấu trúc site hiện hữu.
- Thống nhất CTA lập tour trên shared header, homepage và Custom Trip thành **Build My Own Day**, giữ đích `/custom-trip/#trip-builder`; chỉnh token nút dùng màu cam mái ngói `#B4532C`, hover `#943F21`. CTA có chức năng khác như báo giá transport hoặc gửi WhatsApp không đổi chức năng.
- Đưa Typography Foundation lên `style.css`: Be Vietnam Pro, Oswald, các role type, font Barber (5 file woff2) và font fallback. Bổ sung xử lý typography/cards cho homepage, Stories, Meet, Custom Trip, Cu Chi, Transport; đây là trạng thái **preview cần audit**, không xem là áp dụng chuẩn hoàn tất cho 17 URL.
- Các commit trung gian V2.1/V2.2/V2.3 có điều chỉnh màu, typography, spacing và card layouts. Phải review computed CSS do có CSS global và scoped overrides.

**Homepage Hero A, bản duyệt cuối V2.5.1:**
- **Cột ảnh desktop trái:** ảnh gốc Duy cung cấp về cột điện/dây điện/chung cư Quận Tư: `assets/images/og-saigon-district-4-utility-pole-wires.webp`.
- **Cột ảnh desktop phải:** ảnh hẻm sinh hoạt với phụ nữ đạp xe: `assets/images/og-saigon-district-4-hem-sinh-hoat-hero.webp`.
- **Mobile:** 2 ảnh dạng landscape toàn chiều rộng, **xếp trên dưới**, không chia hai dải dọc.
- **Graphic sticker riêng:** `assets/images/og-quan-tu-district-4-sticker.svg`, nội dung `QUẬN TƯ / DISTRICT 4`; bỏ `5 ĐỜI`.
- Bảng hiệu kiểu Saigon/Barber chỉ chứa eyebrow `Born in Quận Tư. Raised by Saigon.` và H1 **See Saigon through fifth-generation Saigonese eyes**. Đây là wording trong code đã được Duy duyệt ở vòng hero cuối; không tự thay sang bản dài hơn từ brainstorm trước đó.
- H1 dùng poster-style typography, xanh đậm + điểm nhấn cam, mobile chữ giảm kích thước phù hợp.
- Body copy đặt **ngoài bảng hiệu**, overlay trên ảnh: `A little street wisdom, a lot of local stories, and a genuine love for this city.`
- CTA chính overlay ảnh: `Build My Own Day`; CTA phụ `Explore Experiences`.
- Trust đổi `Licensed local guiding` thành **Born-and-raised local knowledge**.
- Header/footer/layout các phần còn lại không được thiết kế lại trong commit Hero V2.5.1.
- **Duy đã chốt bản Hero V2.5.1 với commit 2575c803**. Các phương án thiết kế cũ A/B/C hoặc mockup không thay thế mã đã duyệt.

**Nhóm file khác trong diff main...V2:**
`404.html`, `about/index.html`, `assets/css/cu-chi-v2.css`, `assets/css/custom-trip.css`, `assets/css/meet-og.css`, `assets/css/stories.css`, `assets/css/transport-v2.css`, `custom-trip/index.html`, `experiences/cu-chi-tunnels/index.html`, `experiences/cu-chi-war-museum/index.html`, `experiences/hidden-saigon/index.html`, `experiences/index.html`, `meet-duy/index.html`, `stories/index.html`, `scripts/check-homepage.py`. Đa số thay đổi từ các vòng font/design Foundation; cần đối chiếu từng file bằng diff, không coi toàn bộ đã đạt visual QA.

## 5. Những gì đã được duyệt vs. mới là định hướng
**ĐÃ CHỐT:** Hero A V2.5.1 như mô tả trên; ảnh thật không stock/AI; cam mái ngói CTA; tên CTA lập tour `Build My Own Day` trên header/home/custom; sticker Quận Tư/District 4; copy Born-and-raised local knowledge; giữ các route, form và booking flow hiện hữu; triển khai local trước, chỉ publish khi Duy duyệt.

**CHƯA CHỐT HOÀN THÀNH:**
- **Stories hướng B**: cinematic/dark/editorial. Đã có chỉnh CSS trong branch, nhưng chưa nghiệm thu trực quan hết 6 bài + index.
- **Meet the OG hướng C**: bảng hiệu, old-school, đời sống Quận Tư; có một số CSS/copy nhưng chưa nghiệm thu final.
- Full Design Foundation cho 17 URL: color tokens, headings, spacing, cards, forms, mobile, consistent buttons vẫn cần audit và điều chỉnh theo đợt.
- Logo monogram/cube và trạng thái logo cuối; không thay logo/favicons hàng loạt nếu chưa duyệt.
- Bổ sung bộ ảnh, thiết kế chính sách bản quyền riêng, giải pháp chống tải ảnh, SEO theo đợt là scope riêng, không ngầm triển khai.
- 6 bài Stories vẫn còn nhãn CTA `Build My Private Day` / `Build My Experience`. **Không đồng bộ toàn bộ CTA chưa có nghĩa là flow hỏng**; cần đề xuất map CTA theo chức năng để Duy chốt trước khi đổi.

## 6. Finding và rủi ro cần Software Engineer xử lý
**P0 - Bài test cũ đang lệch source:**
- `scripts/check-homepage.py` hiện giả định scene chỉ có một ảnh hero + tem (2 img), `hero-grid` chỉ chứa bảng hiệu, body nằm **trong** bảng. Hero V2.5.1 có **hai ảnh + tem** (3 img) và body là sibling của bảng. Các assertions này không khớp thiết kế đã duyệt. **Không đánh dấu bài test này PASS trước khi cập nhật contract và chạy lại.**
- Script còn giả định head homepage giống commit baseline cũ, trong khi `og:description` đã đổi; và kiểm tra `index,follow` trên `dist/`, trong khi local builder cố ý tạo `noindex,nofollow`. Cần tách kiểm thử **source production** với **preview output**, không thay SEO production để chiều theo test.
- Cuối script còn kiểm tra import `Roboto` nhưng CSS V2 hiện dùng Be Vietnam Pro/Oswald; cần kiểm lại typography contract.
- Baseline protected-files test vẫn dựa vào commit `9cca0cd...` và danh sách thay đổi ngoại lệ cũ, có thể báo sai với V2. Cần viết lại phạm vi regression so với main + quyết định đã duyệt, **không bypass kiểm tra nghiệp vụ**.
- Kết luận: script homepage **cần bảo trì trước khi dùng làm release gate**; chưa chạy toàn bộ suite trong môi trường hiện tại.

**P0 - Build và critical flow trước merge:**
- Test Jekyll production build độc lập với Vite, bao gồm front matter, includes, story routing và schema.
- Kiểm `custom-trip`: prefills, optional travelers, WhatsApp open/fallback, một lần bấm không gửi hai lần; nút primary/secondary vẫn đi đúng đích. AI không tự gửi customer message.
- Kiểm `header/mobile dropdown`, keyboard, Escape/ARIA, footer/WA float, anchor `#trip-builder`; so sánh đủ 17 trang.
- Kiểm `404`, case duplicate IDs, broken internal/external links, no JS fallback, console/network lỗi.

**P1 - Visual, performance, a11y, SEO:**
- Hero 1440/1280/920 và mobile 430/390/360 px: hai ảnh ngang trên mobile, thứ tự ảnh, crop, LCP, stamp và bảng hiệu không che mặt/chủ thể, CTA contrast/tap target; CLS/CWV.
- Dấu tiếng Việt trên Quận Tư và trường hợp font Barber/Google Fonts chưa load; đối chiếu desktop/mobile và mạng chậm.
- 5 font Barber trong repo: **kiểm tra quyền sử dụng/font license trước production**, không tự phát tán file font qua tài liệu bàn giao.
- Meta title/description/canonical, hreflang nếu có, OpenGraph, social images, JSON-LD, sitemap lastmod, indexability của Jekyll build. Source `sitemap.xml` có nhiều lastmod cũ, phải audit trước merge.
- Form fields labels/errors, focus/contrast, alt text, responsive images/sizes, test 3G/mobile safari, no horizontal overflow.
- Review links/count phải khớp nguồn và không biến evidence chưa xác minh thành claim. Audit bản quyền ảnh gốc/sticker.
- Cảnh báo: `README.md` hiện là tài liệu patch Custom Trip từ giai đoạn cũ, **không phải engineering README đầy đủ cho V2**.

**P2 - Consistency/cleanup khi đã qua audit P0:**
- Giảm override CSS trùng (global + page-specific) theo nguyên tắc sửa nhỏ nhất. Không xây lại CSS architecture nếu chưa có case rõ ràng.
- Rà tên CTA/tour links giữa 6 stories, About, Meet, Experiences và page-specific WhatsApp.
- Chốt B/C bằng screenshot QA rồi mới mở rộng style sang các trang còn lại.
- Quy trình performance, image sizing/quality, font loading; tránh thêm dependency/bundle mới nếu không cần.

## 7. Checklist kiểm chứng tại máy kỹ sư
```bash
git status --short
git log --oneline main..HEAD
git diff --check main...HEAD
git diff --stat main...HEAD
npm ci
npm run build
node scripts/check-homepage-behavior.cjs
node scripts/check-cta-form.cjs
python scripts/check-homepage.py
npm run dev
```
- **Không giả định Python homepage script PASS**: các check cũ cần cập nhật đúng design contract, rồi mới chạy.
- **Không giả định hai Node scripts PASS**: chỉ có source inspection, kỹ sư phải thực thi và log.
- Browser QA: screenshot desktop 1440×900, tablet 768, mobile 430/390/360; kiểm 17 URL, cả top/mid/footer và forms; cross-browser Chrome/Safari/Firefox khi có thiết bị.
- Test riêng Jekyll/GitHub Pages production build, robots/canonical/OpenGraph/sitemap. Preview Vite không thay thế release gate.
- Chỉ đưa trạng thái PASS khi có log/screenshot/evidence. Findings ghi severity, affected URLs, reproduction, recommended patch, owner, regression test, approval.

## 8. Kế hoạch tiếp theo (chưa tự triển khai)
1. **Audit baseline và test gate**: kỹ sư nhận branch, kiểm tra P0, cập nhật test lệch source, chụp baseline tất cả URL. Ưu tiên lỗi booking/SEO/production.
2. **Design Foundation cross-site**: audit token typography/color/button/spacing/card/form. Giữ Hero V2.5.1 đã duyệt, sửa theo phạm vi nhỏ.
3. **Stories B**: dark cinematic, 6 stories + stories index, SEO/a11y/contrast/tốc độ tải, Duy duyệt desktop-mobile.
4. **Meet the OG C**: signage/neighborhood old-school, hình thật và voice, không thay đường dẫn tùy tiện, Duy duyệt.
5. **Experience/Custom/Transport + Footer/Header QA**: reuse design tokens, không đổi terms/payment/inclusions/booking flow; không trộn CTA chức năng khác.
6. **Regression và release proposal**: review diff với main, CI/static, Jekyll, SEO/links/forms, accessibility, screenshot full 17 URL, rollback plan. **Duy duyệt rõ ràng trước khi merge hoặc publish**.

## 9. Bàn giao và nguyên tắc làm việc
- Engineer hãy review code **tại pinned baseline `2575c803`**, sau đó review doc-only commit; để bảo toàn nguồn đối chiếu.
- Source production nằm trên `main`, không được chép file preview `dist/` lên hosting.
- Không thay đổi giá tour, lời hứa booking, OTA, WhatsApp form behavior, privacy hoặc tracking nếu không có yêu cầu.
- Nếu phát hiện vấn đề nguy hiểm hoặc cần thay đổi schema/kiến trúc/hệ thống, dừng và đề xuất phương án ít rủi ro với trade-off để Duy duyệt.
- Handoff này nằm ở `scripts/` vì thư mục đó đã được exclude khỏi Jekyll trong `_config.yml`. Nó không phải nội dung khách hàng trên website.
- Lịch sử: 14 commit sau main ghi nhận trên GitHub 21-22/10/2026; bản được Duy chốt Hero A cuối cùng 22/10/2026, commit `2575c803`.

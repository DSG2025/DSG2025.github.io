# OG Saigon | Voice V1.2, copy audit and SEO approval queue

Date: 2026-10-22
Scope: 17 URL site (11 HTML routes, including 404, plus 6 published Stories), shared includes, Custom Trip form and story sidebars. Preview branch only. Production unchanged.

## Chốt giọng văn
- Nam, thẳng, ấm, như founder đang nói. Một câu, một ý. Tiếng Anh dùng US spelling.
- Dùng cụ thể: hẻm (alley), canal, food stall, coffee, plastic stool, quay về trải nghiệm thật thay cho tính từ quảng cáo.
- Tiếng Việt đúng dấu, chỉ khi tự nhiên, 1-2 cụm mỗi khu vực, luôn giải nghĩa ngay gần đó.
- Không dùng "hidden gem", "authentic", "immersive", "unforgettable"; không chào Xin chào/Cảm ơn kiểu tour công nghiệp.
- "Hidden Saigon" vẫn là tên sản phẩm, không nằm trong lệnh cấm cụm "hidden gem".
- Giữ nguyên reviews nguyên văn, lời hứa dịch vụ, giá/điều kiện booking, form value/ID, WhatsApp logic, URL, SEO metadata, headings.

## Đã sửa, low-risk body copy (2 commits sau About/Meet V2)
- Homepage: hero kicker "Born in Quận Tư. Five generations deep."; microcopy trust/review, card về hẻm (alleys) và food stalls; District 4 (Quận Tư, to us) tại phần giới thiệu founder; phần đề nghị gửi ý tưởng tour.
- About: thêm câu chào "Ăn chưa? Have you eaten yet? That’s how we say hello here."; mô tả cách lên lịch trình ngắn và trực tiếp hơn; CSS callout riêng About.
- Meet the OG: lời giới thiệu ngắn và cá nhân hơn; giải thích District 4 (Quận Tư, to us) tại lần đầu trong body; giữ lịch sử founder và cách host.
- Custom Trip: thêm cách gọi Quận Tư cạnh District 4; nhãn gợi ý cho trường tripIdea: "Tell us what you’re hungry for." **Không đổi id/name/checkbox/option/data/JS**.
- Experiences listing: thay giới thiệu quảng cáo chung bằng Cu Chi, đồ ăn, hẻm, lịch trình riêng.
- Transport: rút ngắn một câu hướng dẫn, giữ nguyên chính sách pickup, waiting và báo giá.
- Stories index: đổi một chữ travellers -> travelers trong body. Sáu Stories gốc không thay đổi.
- 404: câu ngắn về alley, không thay đường dẫn.
- Không chỉnh header/footer global, template story, dịch vụ có điều kiện, hoặc source SEO head.

## Chưa sửa, có ảnh hưởng SEO/search appearance cần Duy duyệt
1. **H1 & title** của các service page: "Cu Chi Tunnels Tour from Ho Chi Minh City", "Private Airport Transfer in Ho Chi Minh City (SGN)", "Hidden Saigon..." đang truyền đạt rõ intent của người tìm. Không đổi H1/title thành ngôn ngữ quá hình tượng.
2. **Product naming:** "Hidden Saigon" là tên sản phẩm đã được dùng ở internal links và listings; không đổi tên/slug theo luật tránh "hidden gem". Cần đề xuất SEO riêng nếu muốn đổi.
3. **Stories title, front matter, lead/index excerpts:** bài Cu Chi crawl, War Remnants Museum, District 4, Chợ Lớn, first day và rain có nội dung informational. Tái viết headline và lead có thể thay search intent/snippet. Cần bản old/new + lý do SEO, rồi Duy duyệt.
4. **CTA bài Stories:** đang có "Build My Private Day", "Build My Experience" khác nhãn header "Build My Own Day". Cần map chức năng/destination trước khi thay đồng loạt; text liên kết có thể góp thông tin cho crawler.
5. **Visible introductory copy:** các đoạn đầu trang vừa sửa có thể được Google dùng để tạo snippet kể cả khi meta description giữ nguyên, nên không bảo đảm SEO hoàn toàn không đổi. Kiểm Search Console sau publish, xem CTR/impressions theo landing page, không dự đoán ranking.
6. **Schema/brand identity:** logo, Person founder/legal name, Organization, breadcrumbs, canonical, slug /meet-duy/ là mảng yêu cầu kế hoạch SEO & brand privacy riêng. Không âm thầm thay đổi.
7. **Alt text ảnh:** nên mô tả đúng sự thật của ảnh và tính tiếp cận; không nhồi keywords.
8. **Sitewide Vietnamese taste:** không thay khu vực nào cũng có tiếng Việt. "District 4 (Quận Tư, to us)" đặt ở lần đầu nhắc trong intro riêng từng trang sau khi Duy duyệt cách dùng chung; trang Stories District 4 đã có giải thích "hẻm".

## QA gates trước merge
- Verify diff: không đổi <head>, title, og/twitter/canonical/JSON-LD, H1, href, shared nav/footer, JS, six Story sources.
- npm ci, npm run build, browser 1440/390/360. Custom Trip label-to-input matching & WhatsApp fallback test.
- Review exact visible wording at Homepage, About, Meet, Custom Trip, Experiences, Transport, Stories and 404.
- scripts/check-homepage.py vẫn có contract cũ của Hero, cần engineering audit/fix, không được nhận PASS cho đến khi chạy.
- Chưa tự chạy browser/build CI, chưa deploy và chưa merge. Duy final decision maker.

## Các câu chốt
- "Born in Quận Tư. Five generations deep." [Homepage kicker]
- "Ăn chưa? Have you eaten yet? That’s how we say hello here." [About greeting]
- "District 4 (Quận Tư, to us)" [First context of district in selected founder/introduction text]
- "Tell us what you’re hungry for." [Custom Trip tripIdea label]

## Tham khảo Google Search Central
- Title links: https://developers.google.com/search/docs/appearance/title-link
- Snippets: https://developers.google.com/search/docs/appearance/snippet
- Site moves/URLs: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes

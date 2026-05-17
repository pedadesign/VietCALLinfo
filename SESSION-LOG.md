# SESSION-LOG.md — Change History

> Chronological log of significant changes made to the VietCALL site.  
> Format: `YYYY-MM-DD | commit | what changed`

---

## 2026-04-27

| Commit | Change |
|---|---|
| `f997076` | Fix CfP card "Nộp tóm tắt" button href from `contact.html` → `https://vietcall.org.vn/vietcall-2026.html#cfp` on `conferences.html` |
| `e2f6696` | Rename upcoming event submit button label to "Gọi bài VietCALL 2026" / "VietCALL 2026 Call for Papers" |
| `ab73367` | Replace Formspree membership form with Cognito Forms embed (`data-key="nKgmBUhPrkWKTW5wSzEJVw" data-form="5"`); add `.cognito-form-wrap` card styling and `.cog-*` CSS overrides |
| `07cf748` | Update Conference Fees: standard 1,500,000 VND; member 1,300,000 VND (200K discount); update section subtitle accordingly |
| `af69dca` | Remove "🎓 Miễn phí cho thành viên VietCALL" chip; hide Detailed Schedule section on `vietcall-2026.html` |
| `6a8b46b` | Update VietCALL 2026 dates to 27–28 November; venue to "Trường Đại học Ngoại ngữ, Đại học Huế (HUFLIS)" across meta, hero, intro, timeline, schedule header, address block, `i18n.js`, `conferences.html` |
| `c4b2d22` | Replace all `vietcall.edu.vn/submission` links with LCMS portal URL across `vietcall-2026.html` and event markdown file |
| `04bc2a0` | Fix VI nav label casing in `i18n.js` and `vietcall-2026.html`: "Tài Nguyên"→"Tài nguyên", "Bài Viết"→"Bài viết", "Liên Lạc"→"Liên lạc" |
| `bb5375a` | Update "Đăng ký thành viên" button on `contact.html` from `vietcall.edu.vn/register/` to `https://vietcall.org.vn/membership.html#register` |
| `71e958d` | Fix leftover "Tất cả quyền lợi Sinh viên" in Professional tier card → "Thành viên chính thức" |

---

## 2026-04 (earlier)

| Commit | Change |
|---|---|
| `40e4ebd` | Rename "Student Member" → "Regular Member" (EN) / "Thành viên chính thức" (VI); price 50K→100K VND in `i18n.js` and `membership.html` |
| `29eee46` | Update member names/titles: Trần Tín Nghĩa→Nghị, add PGS. TS. to Phạm Vũ Phi Hổ, Lan Hường role to VP/General Secretary, Vũ Thị Thanh Loan→Vũ Thanh Loan; update `about.intro` VI text; contact page: rename "Liên hệ"→"Liên lạc", update phone/WhatsApp notes, address to "Hà Nội, Việt Nam", replace website link with Zalo Group |
| `f98b22b` | Add photos for secretariat: `LanHuong.jpg`, `LoanNguyen.jpg`, `HanhLe.jpg` as circular avatars |
| `d9da23f` | Add "Secretariat & Team" section to `about.html` above Advisory Board with 3 member pills, 3 team cards (Content, Communication, Technical) |
| `05f95d3` | Fix mobile menu: CTA button text color (`:not(.btn)` selector fix); mobile language switcher not working (add `.mobile-lang` handler in `i18n.js`) |
| `8009877` | Fix mobile menu hiding "Giới thiệu" behind fixed navbar — convert `.navbar__mobile` to `position:fixed; top:0; padding-top:80px` |
| `9b13628` | Fix CTA contrast on `contact.html` — convert section to `.cta-section-wrap` dark gradient; update text/link/button colors for dark background |
| `16671be` | Update badge text to official VI org name; update all 8 page `<title>` tags with "Vietnamese Association of Computer-Assisted Language Learning" |
| `42a6c39` | Add `CNAME` file for custom domain `vietcall.org.vn` |
| `99bbb9b` | Add two-day tabbed schedule section to `vietcall-2026.html` with `switchTab()` JS function |
| `78ad74e` | Fix footer overlap on `vietcall-2026.html` — add `conf-page-footer` class + `margin-left:15rem` at desktop |

---

## Earlier (site build phase)

| Commit | Change |
|---|---|
| `345e11b` | Add sidebar nav, photo gallery, registration tiers & FAB to `vietcall-2026.html` |
| `51c6103` | Major visual upgrade: animations, hero, CTA sections |
| `77ec797` | Membership page CTA: gradient, testimonial & animations |
| `5789c39` | Redesign CTA section with dark gradient, avatars, chips |
| `d3038a9` | Add warm parchment base background (`--bg-base: #f7f6f3`) |
| `0bbb56e` | Replace "Liên hệ" → "Liên lạc" sitewide (83 occurrences, 17 files) |
| `3d0f427` | Update about CTA: 400+ member count, avatars |
| `4118241` | Add real social media links to footer across all pages |
| `1bda369` | Connect footer newsletter forms to Formspree (`mkopodrj`) |
| `e1d8bfa` | Connect contact form to Formspree (`mlgogqjk`) |
| `4a2549b` | Connect membership form to Formspree (`xreoenpl`) — later replaced by Cognito |
| `d5a5735` | Update member count from 100+ to 400+ sitewide |
| `3c010a8` | Redesign about intro section |
| `3d38e32` | Add executive committee members including TS. Phùng Văn Huy |

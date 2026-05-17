# CLAUDE.md — VietCALL Website Agent Guide

> Primary reference for any AI agent working on this project. Read this first.

---

## Project Identity

**VietCALL** — Vietnamese Association of Computer-Assisted Language Learning  
**Vietnamese full name:** Phân hội nghiên cứu ứng dụng CNTT trong dạy-học ngôn ngữ  
**Live site:** https://vietcall.org.vn  
**GitHub repo:** https://github.com/pedadesign/VietCALLinfo (branch: `main`)  
**Local path:** `/Users/huyphung/VietCALLinfo/`  
**Deploy:** GitHub Pages from `main` root — push to deploy, no build step.

---

## Stack & Architecture

- **Pure static HTML/CSS/JS** — no framework, no bundler, no build step.
- **Bilingual (VI default / EN toggle)** via `js/i18n.js` + `localStorage` key `vc_lang`.
- **Shared CSS** in `css/style.css` with custom property design tokens.
- **Shared JS** in `js/main.js` (navbar, hamburger, scroll animations).
- **i18n JS** in `js/i18n.js` (all translated strings + language switcher logic).

---

## File Map

```
/Users/huyphung/VietCALLinfo/
├── index.html          Homepage
├── about.html          About VietCALL + Executive Committee + Secretariat
├── committee.html      Full committee listing
├── conferences.html    Events listing (upcoming + past)
├── vietcall-2026.html  VietCALL 2026 conference detail page (large, complex)
├── membership.html     Membership tiers + Cognito registration form
├── blog.html           Blog / article listing
├── resources.html      Resources & publications
├── contact.html        Contact info + Zalo + registration CTA
├── CNAME               vietcall.org.vn (GitHub Pages custom domain)
├── css/
│   └── style.css       Single shared stylesheet
├── js/
│   ├── i18n.js         All VI/EN translations + setLang() function
│   └── main.js         Navbar scroll, hamburger toggle, animate-in observer
├── assets/
│   ├── avatars/        Member/committee headshots (jpg/png)
│   ├── brand/          Logo files, brand images
│   ├── events/         Per-event subfolders (vietcall-2026/, etc.)
│   └── posts/          Blog post images
└── posts/              Blog post HTML files
```

---

## Design System

Tokens defined in `:root` in `css/style.css`:

| Token | Value | Use |
|---|---|---|
| `--primary` | `#323e69` | Navy — headings, buttons, links |
| `--secondary` | `#bb0400` | Red — accents, badges, hover |
| `--tertiary` | `#38433a` | Forest green — subtle text |
| `--bg-base` | `#f7f6f3` | Warm parchment page background |
| `--white` | `#ffffff` | Cards, navbar |
| `--stone-*` | range | Gray scale for text/borders |
| `--radius-*` | range | Border radii (`--radius-full: 9999px`) |

**Fonts:** Inter (body) + Playfair Display (headings/serif accents) via Google Fonts.

**Heading tags** (`h1`, `h2`, `h3`) automatically get `font-family: 'Playfair Display'`.

---

## Bilingual Pattern

### In HTML files
Every piece of user-facing text uses one of two patterns:

**Pattern A — `data-i18n` key** (for short labels driven by `i18n.js`):
```html
<span data-i18n="nav.about">Giới thiệu</span>
```
The fallback text (VI) is always inside the tag. `i18n.js` replaces it at runtime.

**Pattern B — `lang-block` spans** (for longer or inline-bilingual text):
```html
<span class="lang-block" data-lang="vi">Tiếng Việt nội dung</span>
<span class="lang-block" data-lang="en" style="display:none;">English content</span>
```
`i18n.js` toggles `display:none` on these based on active language.

### In `js/i18n.js`
Translations live in a single `TRANSLATIONS` constant with `vi` and `en` objects.  
Key structure mirrors the page: `nav.*`, `footer.*`, `home.*`, `about.*`, `events.*`, `resources.*`, `blog.*`, `membership.*`, `contact.*`.

To add or update a string:
1. Find/add the key in both `vi` and `en` sections of `TRANSLATIONS`.
2. Set `data-i18n="section.key"` on the HTML element.
3. Put the VI fallback text inside the tag itself.

**`setLang(lang)`** is the global function to switch language. Mobile and desktop lang buttons both call it — mobile buttons live in `.mobile-lang .lang-switcher__option` and have their own event handler block in `i18n.js`'s `DOMContentLoaded`.

---

## Navbar & Mobile Menu

- **Navbar** is `position: fixed; top: 0; z-index: 100; height: 80px`.
- **`.navbar__mobile`** is `position: fixed; top: 0; padding-top: 80px` — critical to clear the navbar. Do NOT set it to `static` or content will hide behind the fixed bar.
- **CTA button inside mobile menu** uses `.btn--primary`. Use `.navbar__mobile a:not(.btn)` for generic link color rules to avoid overriding button text color.

---

## Key Third-Party Integrations

| Service | Purpose | Key |
|---|---|---|
| **Cognito Forms** | Membership registration form on `membership.html` | `data-key="nKgmBUhPrkWKTW5wSzEJVw" data-form="5"` |
| **Formspree** | Newsletter forms (footer on each page) | `mkopodrj` |
| **Formspree** | Contact form on `contact.html` | `mlgogqjk` |
| **LCMS VietCALL** | Abstract submission portal | `https://vietcall.lcms.vn/login/?next=/event/1/abstracts/%23submit-abstract` |

---

## Dev Server

Launch config is in `/Users/huyphung/Downloads/VietCALL/.claude/launch.json`, name `"vietcallinfo"`, port `4000`.

```bash
cd /Users/huyphung/VietCALLinfo && python3 -m http.server 4000
```

When verifying CSS/JS changes in preview, cache-bust with:
```js
document.querySelector('link[href*="style.css"]').href = 'css/style.css?v=' + Date.now();
```

---

## Git Workflow

```bash
# All git commands run from:
cd /Users/huyphung/VietCALLinfo

git add <file(s)>
git commit -m "Short description"
git push   # deploys to GitHub Pages automatically
```

Push = deploy. No staging environment.

---

## Common Pitfalls

1. **Always read a file before editing** — the `Edit` tool will fail with "file not read" otherwise.
2. **`i18n.js` drives nav labels** — changing text in HTML alone won't fix it if the element has `data-i18n`.
3. **Both `vi` and `en` sections** must be updated in `i18n.js`, not just one.
4. **`lang-block` EN spans** need `style="display:none;"` in the HTML source (CSS shows/hides them at runtime).
5. **`vietcall-2026.html`** is very large (~2500 lines) — use `offset` + `limit` when reading.
6. **CTA sections** use `.cta-section-wrap` class (dark gradient background). Text inside must be white — use `color:rgba(255,255,255,0.85)` not `color:var(--stone-600)`.
7. **Cognito form CSS** targets `.cog-*` classes (e.g. `.cog-header img` to hide logo, `.cog-button--submit` for the submit button).

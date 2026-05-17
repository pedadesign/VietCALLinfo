# SKILLS.md — Reusable Patterns for VietCALL

> Proven techniques discovered while building this site. Copy-paste as needed.

---

## 1. Adding a Bilingual Text Block

Use `lang-block` spans. Always include `style="display:none;"` on the EN span in source.

```html
<span class="lang-block" data-lang="vi">Tiếng Việt</span>
<span class="lang-block" data-lang="en" style="display:none;">English</span>
```

For short labels driven by `i18n.js`, use `data-i18n`:
```html
<span data-i18n="section.key">VI fallback text</span>
```
Then add the key to both `vi` and `en` objects in `js/i18n.js`.

---

## 2. Adding a New i18n String

In `js/i18n.js`, find the relevant section (e.g. `nav`, `contact`, `membership`) and add to **both** language blocks:

```js
// vi block:
contact: {
  new_key: "Tiếng Việt nội dung",
  ...
}

// en block (search for "/* EN */" or same section name ~200 lines down):
contact: {
  new_key: "English content",
  ...
}
```

---

## 3. Dark CTA Section (`.cta-section-wrap`)

Use this class for dark-background CTA sections. Text colours must be overridden to white.

```html
<section class="cta-section-wrap">
  <!-- Text: color: rgba(255,255,255,0.85) -->
  <!-- Links: color: #f9c74f (gold) -->
  <!-- Buttons: use btn--secondary (white outline) not btn--primary -->
</section>
```

Do **not** use `.section.bg-stone` for dark CTA — it's light gray and text will be invisible.

---

## 4. Mobile Menu Rules

`.navbar__mobile` **must** be `position: fixed; top: 0; padding-top: 80px` to clear the fixed navbar. Never set it to `static`.

```css
.navbar__mobile {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 99;
  background: var(--white);
  padding: 80px 1.5rem 1.5rem;
  max-height: 100vh;
  overflow-y: auto;
}
```

When setting link colours inside the mobile menu, use `:not(.btn)` to avoid overriding CTA buttons:
```css
.navbar__mobile a:not(.btn) { color: var(--tertiary); }
```

---

## 5. Embedding a Third-Party Form (Cognito)

Wrap the embed script in a styled card div. Target `.cog-*` classes to style the form to match the site.

```html
<div class="cognito-form-wrap">
  <script src="https://www.cognitoforms.com/f/seamless.js"
    data-key="YOUR_KEY" data-form="5"></script>
</div>
```

```css
.cognito-form-wrap {
  background: var(--white);
  border-radius: var(--radius-xl);
  box-shadow: 0 4px 32px rgba(0,0,0,0.08);
  overflow: hidden;
}
/* Hide their logo */
.cog-header img { display: none !important; }
/* Style the title */
.cog-heading { font-family: 'Playfair Display', serif !important; color: var(--primary) !important; }
/* Style the submit button */
.cog-button--submit { background: var(--primary) !important; border-radius: var(--radius-full) !important; }
```

---

## 6. Preview & Cache-Busting

Start the dev server via the `vietcallinfo` launch config (port 4000).  
After editing CSS, force a cache refresh in the preview browser:

```js
// Run via preview_eval:
document.querySelector('link[href*="style.css"]').href = 'css/style.css?v=' + Date.now();
```

JS changes to `i18n.js` can be verified by calling the global directly:
```js
// preview_eval — test language switch without reload:
setLang('en');
```

---

## 7. Reading Large Files Efficiently

`vietcall-2026.html` is ~2500 lines. Use grep to locate a section, then read only that range:

```bash
grep -n "keyword" /Users/huyphung/VietCALLinfo/vietcall-2026.html
# Then: Read file with offset=<line> limit=40
```

---

## 8. Verifying DOM Selectors Before Writing CSS

When a third-party script injects HTML (e.g. Cognito), inspect the real DOM before writing CSS:

```js
// preview_eval:
document.querySelector('.injected-wrapper').outerHTML.substring(0, 500)
```

This prevents guessing class names that don't match.

---

## 9. Conference Page Footer Offset (Sidebar Layout)

`vietcall-2026.html` uses a sticky sidebar (`.conf-sidebar`, 15rem wide) at desktop.  
Any `<footer>` on that page needs a left offset to match the main content area:

```css
@media (min-width: 1024px) {
  .conf-page-footer { margin-left: 15rem; }
}
```

---

## 10. Replacing a URL Sitewide

```bash
grep -rn "old-url.com/path" /Users/huyphung/VietCALLinfo/
# Then Edit each file using replace_all: true for the href value
```

Always check both `href="..."` attributes **and** visible link text separately — they often need different replacements.

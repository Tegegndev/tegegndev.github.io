# Action Plan: SEO Optimization for Tegegn Wukianos Portfolio

- **Domain**: `https://tegegn.com.et/`
- **Target Project**: `projects/portfolio`
- **Audit Date**: 2026-09-08
- **Priority Matrix**: Critical (P0) ➔ High Impact (P1) ➔ Strategic (P2)

---

## Tier 1: Critical P0 Blockers (Immediate Fixes)

### 1. Fix Broken Project Repository & Demo Links
- **File**: [`projects/portfolio/index.html`](file:///root/projects/portfolio/index.html)
- **Lines**: 520, 524, 569, 596
- **Changes**:
  1. **Line 524**: Change `https://github.com/Tegegndev/ethiofx-insights` to `https://github.com/tegegndev/ethiofx_api` (verified active public repository).
  2. **Line 520**: Change `href="https://tegegn.com.et/"` on the Ethiopia Forex Currency Exchange Monitor "Live View" button to the real demo link or demo video instead of the self-referencing homepage loop.
  3. **Line 569 & 596**: Update `meal_app` and `kokeba` repository links to their actual public GitHub URLs or remove the "View Source Code" link if private.

### 2. Fix H1 Markup for Search Engine Crawlers
- **File**: [`projects/portfolio/index.html`](file:///root/projects/portfolio/index.html)
- **Line**: 159
- **Change**:
  ```html
  <!-- Current: -->
  <h1>Tegegn<br><span>Wukianos</span></h1>

  <!-- Recommended (prevents parser concatenation into 'TegegnWukianos'): -->
  <h1>Tegegn <br><span>Wukianos</span></h1>
  ```

---

## Tier 2: High Impact P1 Performance & Media (1–2 hours)

### 3. Compress Above-the-Fold Hero Image (`pp.png`)
- **File**: `projects/portfolio/assets/images/pp.png` (Current size: **1.8 MB**)
- **Actions**:
  - Downscale image from 1536×1024 to responsive desktop/mobile sizes (e.g. 768×512).
  - Convert to `.webp` format at 80% quality (target size: **~55–70 KB**).
  - Use `<picture>` tag in `index.html`:
  ```html
  <picture>
    <source srcset="assets/images/pp.webp" type="image/webp">
    <img src="assets/images/pp.png" width="768" height="512" alt="Portrait of Tegegn Wukianos, Ethiopian developer" fetchpriority="high">
  </picture>
  ```

### 4. Compress Portfolio Project Thumbnails
- **Directory**: `projects/portfolio/assets/images/projects/`
- **Actions**:
  - Convert `wsu_dining.png` (990 KB) ➔ `wsu_dining.webp` (~55 KB)
  - Convert `kokeba.png` (631 KB) ➔ `kokeba.webp` (~48 KB)
  - Convert `forex-monitor.jpg` (512 KB) ➔ `forex-monitor.webp` (~50 KB)
  - Total bandwidth savings: **> 3.8 MB per page visit**!

---

## Tier 3: Medium P2 Structured Data & Social Metadata (30 mins)

### 5. Expand Schema.org JSON-LD to `ProfilePage`
- **File**: [`projects/portfolio/index.html`](file:///root/projects/portfolio/index.html)
- **Lines**: 52–111
- **Addition**: Wrap person in a `ProfilePage` entity and declare `SoftwareApplication` / `WebApplication` for the key projects.

### 6. Complete Social Meta Tags
- **File**: [`projects/portfolio/index.html`](file:///root/projects/portfolio/index.html)
- **Add**:
  ```html
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Tegegn Wukianos - Ethiopian Developer Portfolio">
  <meta name="twitter:creator" content="@winner_jlingz">
  <meta name="twitter:site" content="@winner_jlingz">
  ```

---

## Tier 4: Strategic P3 GEO & Security Headers

### 7. Explicit AI Crawler Rules in `robots.txt`
- **File**: [`projects/portfolio/robots.txt`](file:///root/projects/portfolio/robots.txt)
- **Update**:
  ```robots.txt
  User-agent: *
  Allow: /
  Disallow: /privacy
  Disallow: /terms

  # Explicit AI Crawler Permissions for Generative Engine Optimization (GEO)
  User-agent: GPTBot
  Allow: /

  User-agent: ClaudeBot
  Allow: /

  User-agent: PerplexityBot
  Allow: /

  User-agent: Google-Extended
  Allow: /

  Sitemap: https://tegegn.com.et/sitemap.xml
  ```

### 8. Add Security Headers via Hosting Layer (GitHub Pages / Cloudflare)
If DNS is routed through Cloudflare, create a Response Header Rule to inject:
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

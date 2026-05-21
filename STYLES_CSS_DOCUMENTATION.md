# `styles.css` Documentation for Beginners

This document explains the CSS in this project in simple language.

Important note: your project file is named `styles.css`, not `style.css`.

## What CSS Does

CSS controls how HTML looks on the page.

It can change:

- colors
- spacing
- size
- layout
- hover effects
- animations
- mobile responsiveness

## Basic CSS Pattern

A CSS rule usually looks like this:

```css
.hero {
  max-width: 1120px;
  margin: 24px auto;
}
```

### What this means

- `.hero` is the **selector**. It targets an HTML element with class `hero`.
- `max-width` and `margin` are **properties**.
- `1120px` and `24px auto` are **values**.

## 1. CSS Variables

At the top of your file, you have:

```css
:root {
  --primary-color: #8d634d;
  --primary-soft: #c99877;
  --secondary-color: #6d7d63;
  --secondary-soft: #d9e2d2;
  --page-bg: #ebe8e1;
  --panel-bg: #f7f3ec;
  --card-bg: #fcf8f2;
  --tag-bg: #efe6dc;
  --border-color: #d7c8b8;
  --text-dark: #2f2119;
  --text-body: #5c4638;
}
```

### What `:root` does

`:root` means the top-level element of the page. It is often used to store reusable CSS variables.

### What `--primary-color` style variables do

These are custom CSS variables. They let you reuse values many times.

### Example in your code

```css
body {
  background-color: var(--page-bg);
  color: var(--text-dark);
}
```

### Meaning

- `var(--page-bg)` gets the value from `--page-bg`
- `var(--text-dark)` gets the value from `--text-dark`

### Why this is useful

If you change `--primary-color` once, every place using it updates automatically.

## 2. Universal Selector

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### `*`

Targets every element on the page.

### `margin: 0`

Removes outside spacing from all elements.

Example in your code:

```css
* {
  margin: 0;
}
```

### `padding: 0`

Removes inside spacing from all elements.

Example:

```css
* {
  padding: 0;
}
```

### `box-sizing: border-box`

Makes width and height calculations easier. Padding and border stay inside the set width.

Example:

```css
* {
  box-sizing: border-box;
}
```

## 3. Text and Page Styling

### `font-family`

Controls the font used for text.

Example in your code:

```css
body {
  font-family: "Inter", Arial, sans-serif;
}
```

Meaning:

- use `Inter` first
- if unavailable, use `Arial`
- if that fails, use any sans-serif font

### `background-color`

Sets the background color.

Example:

```css
body {
  background-color: var(--page-bg);
}
```

### `color`

Sets text color.

Example:

```css
body {
  color: var(--text-dark);
}
```

### `line-height`

Controls space between lines of text.

Example:

```css
body {
  line-height: 1.6;
}
```

This makes text easier to read.

### `font-size`

Controls text size.

Examples:

```css
.hero h1 {
  font-size: 86px;
}

.location {
  font-size: 15px;
}
```

### `font-weight`

Controls how bold text is.

Examples:

```css
.preloader-mark {
  font-weight: 700;
}

.role {
  font-weight: 600;
}
```

### `letter-spacing`

Adds or reduces space between letters.

Examples:

```css
.preloader-mark {
  letter-spacing: 2px;
}

.hero-kicker {
  letter-spacing: 0.16em;
}
```

### `line-height`

Another example:

```css
.hero h1 {
  line-height: 0.95;
}
```

This makes the heading lines sit closer together.

## 4. Width and Height

### `width`

Sets the width of an element.

Examples:

```css
.hero-panel {
  width: 50%;
}

.hero-links a {
  width: 42px;
}
```

### `height`

Sets the height of an element.

Examples:

```css
.hero-links a {
  height: 42px;
}

.project-thumb img {
  height: 160px;
}
```

### `max-width`

Prevents an element from becoming wider than a certain size.

Examples:

```css
.nav-inner {
  max-width: 1120px;
}

.section {
  max-width: 1120px;
}
```

### `min-height`

Gives an element a minimum height.

Examples:

```css
.hero {
  min-height: 620px;
}

.hero-photo-frame {
  min-height: 620px;
}
```

## 5. Spacing Properties

### `margin`

Adds space outside an element.

Examples:

```css
.hero {
  margin: 24px auto;
}

footer {
  margin: 16px auto 20px;
}
```

Meaning of `24px auto`:

- top and bottom = `24px`
- left and right = `auto`

`auto` is often used to center block elements.

### `margin-bottom`

Adds space below an element.

Examples:

```css
.hero h1 {
  margin-bottom: 18px;
}

.project-card p {
  margin-bottom: 10px;
}
```

### `margin-top`

Adds space above an element.

Examples:

```css
.tech-stack {
  margin-top: 8px;
}

.project-actions {
  margin-top: 8px;
}
```

### `margin-right`

Adds space to the right.

Example:

```css
.project-actions a {
  margin-right: 8px;
}
```

### `padding`

Adds space inside an element.

Examples:

```css
.navbar {
  padding: 12px 16px;
}

.section {
  padding: 22px;
}
```

### `padding-top`

Adds inside space at the top.

Example:

```css
.project-actions {
  padding-top: 8px;
}
```

## 6. Borders and Corners

### `border`

Adds a border around an element.

Examples:

```css
.navbar {
  border-bottom: 1px solid var(--border-color);
}

.project-card {
  border: 1px solid var(--border-color);
}
```

### `border-bottom`

Adds a border only at the bottom.

Example:

```css
.navbar {
  border-bottom: 1px solid var(--border-color);
}
```

### `border-left`

Adds a border only on the left side.

Example:

```css
.edu-card {
  border-left: 4px solid var(--primary-color);
}
```

### `border-radius`

Rounds corners.

Examples:

```css
.hero {
  border-radius: 18px;
}

.nav-cv-btn {
  border-radius: 999px;
}
```

`999px` is often used to create a pill-shaped button.

## 7. Display and Layout

### `display: flex`

Turns an element into a flex container. Flexbox helps align items in rows or columns.

Examples:

```css
.nav-inner {
  display: flex;
}

.hero {
  display: flex;
}
```

### `display: grid`

Turns an element into a grid container.

Examples:

```css
.language-grid {
  display: grid;
}

.projects-grid {
  display: grid;
}
```

### `display: block`

Makes an element behave like a block element.

Examples:

```css
.hero-photo-frame {
  display: block;
}

.project-thumb img {
  display: block;
}
```

### `display: inline-block`

Lets an element stay inline but still accept width, height, margin, and padding more like a block.

Examples:

```css
.tech-stack span {
  display: inline-block;
}

.project-actions a {
  display: inline-block;
}
```

### `display: inline-flex`

Like flexbox, but the element itself stays inline.

Examples:

```css
.nav-cv-btn {
  display: inline-flex;
}

.ability span {
  display: inline-flex;
}
```

## 8. Flexbox Properties

### `align-items`

Controls alignment across the cross axis.

Examples:

```css
.nav-inner {
  align-items: center;
}

.contact-card {
  align-items: center;
}
```

### `justify-content`

Controls alignment along the main axis.

Examples:

```css
.nav-inner {
  justify-content: space-between;
}

.preloader {
  justify-content: center;
}
```

### `flex-direction`

Controls the direction of flex items.

Examples:

```css
.hero-panel {
  flex-direction: column;
}

@media (max-width: 700px) {
  .hero {
    flex-direction: column;
  }
}
```

### `flex-wrap`

Allows items to move to a new line if needed.

Examples:

```css
.nav-links ul {
  flex-wrap: wrap;
}

.cta-buttons {
  flex-wrap: wrap;
}
```

### `gap`

Adds space between flex or grid items.

Examples:

```css
.nav-inner {
  gap: 24px;
}

.projects-grid {
  gap: 16px;
}
```

### `flex: 1`

Allows an item to grow and fill available space.

Examples:

```css
.nav-row {
  flex: 1;
}

.project-copy {
  flex: 1;
}
```

## 9. Grid Properties

### `grid-template-columns`

Defines the grid columns.

Examples:

```css
.language-grid {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
```

Meaning:

- `repeat(...)` repeats columns
- `auto-fit` fits as many columns as possible
- `minmax(240px, 1fr)` means each column is at least `240px` wide, but can grow

Another example:

```css
.cert-gallery {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
```

This creates 2 equal columns.

## 10. Positioning

### `position: fixed`

Locks an element to the viewport.

Example:

```css
.preloader {
  position: fixed;
}
```

This keeps the preloader covering the screen.

### `inset: 0`

Short way of setting top, right, bottom, and left to `0`.

Example:

```css
.preloader {
  inset: 0;
}
```

This makes the preloader stretch to all edges of the screen.

### `z-index`

Controls stacking order.

Example:

```css
.preloader {
  z-index: 9999;
}
```

This keeps the preloader above other content.

## 11. Backgrounds

### `background`

Sets background color, gradient, or image in one property.

Examples:

```css
.hero {
  background: linear-gradient(90deg, #161311 0%, #161311 48%, #6f4d39 48%, #8d6852 100%);
}
```

This creates a split gradient background.

Another example:

```css
.udacity-art {
  background:
    linear-gradient(180deg, rgba(16, 15, 28, 0.25), rgba(16, 15, 28, 0.7)),
    linear-gradient(135deg, #211d4d, #151515);
}
```

This uses layered gradients.

### `background-color`

Used when only a plain color is needed.

Examples:

```css
.nav-cv-btn {
  background-color: var(--primary-color);
}

.card {
  background-color: var(--tag-bg);
}
```

## 12. Text and Links

### `text-decoration`

Controls underlines and other text decorations.

Examples:

```css
.nav-cv-btn {
  text-decoration: none;
}

.contact-card {
  text-decoration: none;
}
```

This removes the default underline from links.

### `text-align`

Controls horizontal alignment of text.

Examples:

```css
.skill-logo-card {
  text-align: center;
}

footer {
  text-align: center;
}
```

### `white-space`

Controls how text wraps.

Examples:

```css
.logo {
  white-space: nowrap;
}

.nav-cv-btn {
  white-space: nowrap;
}
```

`nowrap` prevents text from breaking into multiple lines.

## 13. Images

### `object-fit`

Controls how an image fits inside its box.

Examples:

```css
.hero-photo-frame img {
  object-fit: cover;
}

.tool-card img {
  object-fit: contain;
}
```

Meaning:

- `cover` fills the box, possibly cropping the image
- `contain` shows the full image inside the box

### `object-position`

Controls which part of the image stays visible.

Examples:

```css
.hero-photo-frame img {
  object-position: 60% center;
}

@media (max-width: 700px) {
  .hero-photo-frame img {
    object-position: center top;
  }
}
```

## 14. Effects

### `box-shadow`

Adds shadow around an element.

Examples:

```css
.nav-cv-btn {
  box-shadow: 0 8px 18px rgba(141, 99, 77, 0.18);
}

.section {
  box-shadow: 0 10px 24px rgba(50, 34, 24, 0.06);
}
```

### `filter`

Applies visual effects to an element.

Example:

```css
.hero-photo-frame img {
  filter: contrast(1.02) saturate(0.95);
}
```

Meaning:

- `contrast(1.02)` slightly increases contrast
- `saturate(0.95)` slightly reduces color intensity

### `opacity`

Controls transparency.

Example:

```css
@keyframes twBlink {
  from {
    opacity: 0.45;
  }
  to {
    opacity: 1;
  }
}
```

## 15. Animation and Transition

### `transition`

Makes changes happen smoothly instead of instantly.

Examples:

```css
.preloader {
  transition: opacity 0.4s ease, visibility 0.4s ease;
}

.project-card {
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}
```

### `transform`

Visually moves, rotates, scales, or changes an element.

Examples:

```css
.language-card:hover {
  transform: translateY(-2px);
}

.cert-card:hover {
  transform: translateY(-4px);
}
```

This moves the card slightly upward on hover.

### `animation`

Runs an animation automatically.

Example:

```css
.preloader-mark .tw {
  animation: twBlink 1s ease-in-out infinite;
}
```

Meaning:

- use animation named `twBlink`
- duration = `1s`
- timing = `ease-in-out`
- repeat forever with `infinite`

### `@keyframes`

Defines the animation steps.

Example:

```css
@keyframes twBlink {
  from {
    opacity: 0.45;
  }
  to {
    opacity: 1;
  }
}
```

This creates a blinking fade effect.

## 16. Visibility and Overflow

### `overflow`

Controls what happens if content goes outside the box.

Examples:

```css
.hero {
  overflow: hidden;
}

.hero-photo-frame {
  overflow: hidden;
}
```

`hidden` cuts off anything outside the element.

### `visibility`

Controls whether an element is visible without fully removing its layout behavior.

Example:

```css
.preloader.hide {
  visibility: hidden;
}
```

### Combined with `opacity`

```css
.preloader.hide {
  opacity: 0;
  visibility: hidden;
}
```

This fades the preloader out and hides it.

## 17. Lists

### `list-style`

Controls bullets or numbers on lists.

Examples:

```css
.nav-links ul {
  list-style: none;
}

.card-list {
  list-style: none;
}
```

This removes bullet points.

## 18. Cursor-Like Layout Helpers in Your File

These are not cursor properties, but very common layout helpers:

### `justify-content: space-between`

Example:

```css
.nav-inner {
  justify-content: space-between;
}
```

This pushes one item to the left and another to the right.

### `align-items: stretch`

Example:

```css
.hero-visual {
  align-items: stretch;
}
```

This makes items stretch to match the container height.

## 19. Hover States

A hover state means the style changes when the mouse is over an element.

Example:

```css
.nav-cv-btn:hover {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  color: #f3ece5;
}
```

### What changes here

- button background changes
- border changes
- text color changes

Another example:

```css
.skill-logo-card:hover {
  transform: translateY(-2px);
  border-color: var(--secondary-color);
  background-color: var(--primary-color);
}
```

## 20. Responsive Design

Your file includes:

```css
@media (max-width: 700px) {
  ...
}
```

### What `@media` does

It applies styles only when the screen matches a condition.

### Meaning of `max-width: 700px`

These styles are used on small screens like phones.

### Examples from your code

```css
@media (max-width: 700px) {
  .hero {
    flex-direction: column;
    min-height: auto;
    background: #161311;
  }
}
```

Meaning:

- hero section changes from side-by-side to top-and-bottom
- minimum height is removed
- background becomes simpler on mobile

Another example:

```css
@media (max-width: 700px) {
  .hero h1 {
    font-size: 52px;
  }
}
```

This makes the heading smaller on small screens.

## 21. Common Selectors Used in Your File

### Class selector

Example:

```css
.hero {
  display: flex;
}
```

Targets elements with class `hero`.

### Element selector

Example:

```css
body {
  line-height: 1.6;
}
```

Targets the HTML element directly.

### Descendant selector

Example:

```css
.hero h1 {
  font-size: 86px;
}
```

Targets `h1` inside `.hero`.

### Combined class selector

Example:

```css
body.is-loading {
  overflow: hidden;
}
```

Targets the `body` element when it also has class `is-loading`.

### Hover pseudo-class

Example:

```css
.project-card:hover {
  transform: translateY(-2px);
}
```

Targets the element only when the mouse is hovering.

## 22. Simple Section-by-Section Meaning of Your File

### Preloader

Classes:

- `.preloader`
- `.preloader.hide`
- `.preloader-mark`
- `.preloader-mark .tw`

Purpose:

- shows a loading screen
- centers the loading mark
- fades it out when hidden
- animates the `tw` part

### Navigation

Classes:

- `.navbar`
- `.nav-inner`
- `.nav-row`
- `.logo`
- `.nav-links`
- `.nav-cv-btn`

Purpose:

- creates the top navigation bar
- aligns logo, links, and button
- styles hover effects

### Hero section

Classes:

- `.hero`
- `.hero-panel`
- `.hero-visual`
- `.hero-photo-frame`
- `.cta-buttons`
- `.hero-links`

Purpose:

- builds the main introduction section
- splits text and image into two halves
- styles buttons and social links

### Reusable section cards

Class:

- `.section`

Purpose:

- gives each content section a white panel look with border, radius, and shadow

### Skills, tools, and languages

Classes:

- `.language-grid`
- `.language-card`
- `.skill-logo-grid`
- `.skill-logo-card`
- `.tools-grid`
- `.tool-card`

Purpose:

- creates responsive card layouts
- adds hover feedback
- keeps logos and labels aligned

### Projects

Classes:

- `.projects-grid`
- `.project-card`
- `.project-thumb`
- `.project-actions`

Purpose:

- displays projects in cards
- styles image, text, tech stack, and action buttons

### Certificates

Classes:

- `.cert-gallery`
- `.cert-card`
- `.cert-art`
- `.cert-caption`

Purpose:

- creates a 2-column certificate gallery
- styles each certificate like a clickable card

### Contact

Classes:

- `.contact-grid`
- `.contact-card`

Purpose:

- shows contact methods in a grid
- adds hover styles and icon styling

### Footer

Selector:

- `footer`

Purpose:

- styles the bottom section of the page

## 23. Beginner Tips for Editing This File

### If you want to change colors

Edit the variables in `:root` first.

Example:

```css
--primary-color: #8d634d;
```

### If you want to change spacing

Look for:

- `margin`
- `padding`
- `gap`

### If you want to change layout

Look for:

- `display`
- `flex-direction`
- `justify-content`
- `align-items`
- `grid-template-columns`

### If you want to change text

Look for:

- `font-size`
- `font-weight`
- `color`
- `line-height`
- `letter-spacing`

### If you want to change hover effects

Look for rules ending in `:hover`

Example:

```css
.tool-card:hover {
  border-color: var(--secondary-color);
  background-color: var(--secondary-soft);
  transform: translateY(-2px);
}
```

## 24. Quick Summary of the Most Important Properties in Your File

- `color`: changes text color
- `background-color`: changes background color
- `background`: creates gradients or layered backgrounds
- `margin`: adds outside spacing
- `padding`: adds inside spacing
- `border`: adds outlines
- `border-radius`: rounds corners
- `display`: changes layout mode
- `flex-direction`: changes flex item direction
- `justify-content`: horizontal distribution in flex
- `align-items`: vertical or cross-axis alignment
- `gap`: spacing between flex/grid items
- `width` and `height`: control size
- `max-width` and `min-height`: limit size behavior
- `box-shadow`: adds shadow
- `transition`: smooth animation between states
- `transform`: moves or changes elements visually
- `object-fit`: controls image fitting
- `@media`: makes layout responsive

## 25. Final Beginner Advice

When you edit CSS, change one thing at a time and refresh the page often.

Best order for safe editing:

1. colors in `:root`
2. spacing with `margin`, `padding`, and `gap`
3. text size with `font-size`
4. layout with flexbox or grid
5. hover and animation effects last

If you want, I can also make a second Markdown file that explains your `styles.css` line by line in the exact order it appears.

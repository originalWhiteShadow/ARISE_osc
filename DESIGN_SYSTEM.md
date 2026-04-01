## ARISE Polished UI Design System

### 🎨 Design Philosophy
Premium, spacious, cosmic-inspired interface with best-in-class polish. Every component reflects consciousness and intentionality.

---

## Typography Scale

### Heading 1 (`.heading-1`)
- Font: Poppins Bold
- Size: 3rem
- Line-height: 1.1
- Letter-spacing: -0.02em
- Use: Page titles, hero sections

### Heading 2 (`.heading-2`)
- Font: Poppins Bold  
- Size: 2.25rem
- Line-height: 1.2
- Letter-spacing: -0.01em
- Use: Section titles, major landmarks

### Heading 3 (`.heading-3`)
- Font: Poppins Bold
- Size: 1.875rem
- Line-height: 1.3
- Use: Subsections, feature titles

### Heading 4 (`.heading-4`)
- Font: Poppins Bold
- Size: 1.5rem
- Line-height: 1.4
- Use: Card titles, component headers

### Body Large (`.body-lg`)
- Font: Inter Regular
- Size: 1.125rem
- Line-height: 1.7
- Color: --text-secondary
- Use: Descriptions, prominent text

### Body Small (`.body-sm`)
- Font: Inter Regular
- Size: 0.95rem
- Line-height: 1.5
- Color: --text-secondary
- Use: Regular body text, labels

### Caption (`.caption`)
- Font: Inter Regular
- Size: 0.875rem
- Line-height: 1.4
- Color: --text-tertiary
- Use: Small text, metadata, hints

### Code (`.code`)
- Font: JetBrains Mono
- Size: 0.9rem
- BG: --surface-secondary
- Color: --color-brand-cyan
- Use: Inline code snippets

---

## Color Palette

### Primary Colors
- **Background**: #000000 (Pure Black)
- **Foreground**: #e0e0e0 (Light Gray)

### Accent Colors (Vibrant & Luminous)
- **Cyan**: #1ae5e5 (Fresh & Modern)
- **Pink**: #d94fd6 (Energetic & Bold)
- **Gold**: #ebb134 (Warm & Rich)
- **Violet**: #a855f7 (Creative & Mystical)
- **Emerald**: #10b981 (Natural & Growth)

### Semantic Colors
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Amber)
- **Error**: #ef4444 (Red)
- **Info**: #1ae5e5 (Cyan)

### Surface Colors
- **Primary**: #0f0f0f (Darkest)
- **Secondary**: #1a1a1a (Dark)
- **Tertiary**: #2a2a2a (Lighter Dark)
- **Hover**: #333333 (Interactive)

### Text Colors
- **Primary**: #ffffff (White)
- **Secondary**: #a0a0a0 (Medium Gray)
- **Tertiary**: #656565 (Dim Gray)

---

## Component Classes

### Glass (Frosted Glass Morphism)
```html
<div class="glass">Content</div>
```
- Blur backdrop effect
- Semi-transparent white background
- Subtle border
- Premium feel

### Glass Accent
```html
<div class="glass-accent">Content</div>
```
- Cyan-accented glass variant
- Stronger brand presence

### Cards
```html
<div class="card">Content</div>
```
- Padding: 1rem
- Subtle border
- Hover lift effect (-2px transform)
- Smooth transitions

### Surfaces
```html
<div class="surface">Content</div>
```
- Smaller padding (0.75rem)
- Minimal styling
- Muted appearance

### Buttons

#### Primary (`.btn-primary`)
- Cyan background with glow
- Black text
- Hover lifts & glows brighter
- Use: Call-to-action, important actions

#### Secondary (`.btn-secondary`)
- Muted background
- Light border
- Hover: brighter border & background
- Use: Alternative actions, less prominent

#### Ghost (`.btn-ghost`)
- Transparent
- Hover: subtle background
- Use: Inline actions, tertiary options

### Badges
- Uppercase, small
- Colored background & border
- Variants: default, success, warning

---

## Shadows & Glows

### Shadow Depth
- **xs**: 0 1px 2px rgba(0, 0, 0, 0.5)
- **sm**: 0 1px 3px rgba(0, 0, 0, 0.6)
- **md**: 0 4px 6px rgba(0, 0, 0, 0.7)
- **lg**: 0 10px 15px rgba(0, 0, 0, 0.8)
- **xl**: 0 20px 25px rgba(0, 0, 0, 0.9)

### Glowing Effects
- **Cyan Glow**: 0 0 20px rgba(26, 229, 229, 0.25)
- **Pink Glow**: 0 0 20px rgba(217, 79, 214, 0.25)
- **Gold Glow**: 0 0 20px rgba(235, 177, 52, 0.25)

---

## Gradients

### Brand Gradient (`.gradient-brand`)
```css
linear-gradient(135deg, #1ae5e5 0%, #d94fd6 50%, #ebb134 100%)
```
- Use: Hero sections, premium elements

### Dark Gradient (`.gradient-dark`)
```css
linear-gradient(135deg, #2a0f4a 0%, #020204 100%)
```
- Use: Backgrounds, overlays

### Accent Gradient (`.gradient-accent`)
```css
linear-gradient(135deg, #a855f7 0%, #1ae5e5 100%)
```
- Use: Feature highlights, transitions

---

## Animations

### .animate-fade-in
Smooth opacity fade in (400ms)

### .animate-slide-up
Slide up with fade (400ms, easing)

### .animate-glow
Pulsing glow effect (2s loop)
- Use: Active indicators, attention

### .animate-pulse-subtle
Gentle opacity pulse (2s loop)
- Use: Breathing effects, subtle motion

### .animate-blob
Morphing blob animation (7s loop)
- Use: Background elements, hero sections

---

## Icons (react-icons/io5)

Comprehensive icon set from Ionicons v5:
- IoSparkles: Awakening, magic
- IoRocketOutline: Projects, launch
- IoPeople: Community, collaboration
- IoLightbulb: Ideas, innovation
- IoGlobeOutline: Ecosystem, global
- IoLibrary: Knowledge, blog
- IoLogIn: Auth, access
- IoMenu: Navigation
- IoCloseOutline: Dismiss, close
- IoFunnel: Filters, options

---

## Layout Principles

### Spacing Scale
- xs: 0.25rem
- sm: 0.5rem
- md: 1rem
- lg: 1.5rem
- xl: 2rem
- 2xl: 3rem
- 4xl: 4rem

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Z-Index Stack
- world-layer: z-0
- ui-layer: z-10
- sidebar: z-40
- mobile-menu: z-50

---

## Best Practices

### DO's
✅ Use heading classes for consistent typography  
✅ Apply glass morphism for premium cards  
✅ Use semantic colors for status & intent  
✅ Animate on hover for interactivity  
✅ Provide visual feedback on all interactions  
✅ Maintain spacing & alignment rigorously  

### DON'Ts  
❌ Don't use arbitrary colors outside palette  
❌ Don't create shadows without reason  
❌ Don't animate without purpose  
❌ Don't mix fonts - stick to Inter/Poppins/JetBrains Mono  
❌ Don't break spacing scale  

---

## Implementation Examples

### Premium Card
```html
<div class="card">
  <h3 class="heading-3">Title</h3>
  <p class="body-sm text-[--text-secondary]">Description</p>
  <button class="btn btn-primary">Action</button>
</div>
```

### Hero Section
```html
<section class="space-y-8">
  <h1 class="heading-1">Heading</h1>
  <p class="body-lg">Description</p>
  <button class="btn btn-primary">Get Started</button>
</section>
```

### Featured Element
```html
<div class="glass rounded-lg p-6">
  <div class="flex items-center gap-3">
    <IconComponent class="text-2xl text-[--color-brand-cyan]" />
    <h4 class="heading-4">Feature Name</h4>
  </div>
</div>
```

---

## Performance Notes

- All fonts are locally optimized via Google Fonts
- Icons use tree-shakeable react-icons (only used imports bundled)
- CSS is pure utilities, no duplication
- Animations use GPU-accelerated transforms
- Glows use box-shadow (performant on modern browsers)

---

Last Updated: Phase 8 - Polished UI & Design System

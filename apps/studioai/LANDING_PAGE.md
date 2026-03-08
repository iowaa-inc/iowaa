# StudioAI Landing Page Documentation

## Overview

The StudioAI landing page is a modern, minimalistic, and professional single-page website designed to showcase the platform's sophisticated voice synthesis capabilities. The design follows contemporary SaaS landing page patterns with a focus on clarity, visual hierarchy, and conversion optimization.

## Architecture

### File Structure

```
apps/studioai/src/
├── config/
│   └── landing-content.ts         # All content data centralized
├── app/
│   └── (marketing)/
│       ├── layout.tsx              # Marketing layout with header
│       ├── page.tsx                # Main landing page
│       └── sections/
│           ├── index.ts                        # Section exports
│           ├── hero-section.tsx                # Hero with CTAs
│           ├── features-section.tsx            # 6 key features
│           ├── voice-customization-section.tsx # 3-layer system
│           ├── how-it-works-section.tsx        # 5-step workflow
│           ├── use-cases-section.tsx           # 6 use cases
│           ├── testimonials-section.tsx        # Social proof
│           ├── pricing-section.tsx             # 3 pricing tiers
│           ├── faq-section.tsx                 # 8 FAQs
│           ├── final-cta-section.tsx           # Final conversion
│           └── footer-section.tsx              # Footer with links
└── components/
    └── layout/
        └── site-header.tsx         # Navigation header
```

### Design Principles

1. **Content-Driven**: All text, copy, and data stored in `landing-content.ts` for easy CMS migration
2. **Modular Sections**: Each section is a self-contained component
3. **Type-Safe**: Full TypeScript coverage with exported types
4. **Accessible**: Semantic HTML, ARIA labels, keyboard navigation
5. **Responsive**: Mobile-first design with Tailwind breakpoints
6. **Performance**: Server-side rendering, minimal client-side JS

## Content Configuration

All landing page content is centralized in:

```
apps/studioai/src/config/landing-content.ts
```

### Available Content Objects

- `hero` - Hero section with headline, CTAs, stats
- `features` - 6 feature cards with icons and descriptions
- `voiceCustomization` - 3-layer customization showcase
- `howItWorks` - 5-step workflow guide
- `useCases` - 6 use case examples with benefits
- `testimonials` - 6 customer testimonials
- `pricing` - 3 pricing plans with features
- `faq` - 8 frequently asked questions
- `finalCta` - Final call-to-action section
- `footer` - Footer links, social, copyright

### Example: Updating Content

```typescript
// To update the hero headline:
export const hero = {
  badge: "Professional Voice Synthesis",
  headline: "Your new headline here",  // ← Update this
  subheadline: "...",
  // ...
}
```

## Sections Breakdown

### 1. Hero Section

**Location**: [hero-section.tsx](src/app/(marketing)/sections/hero-section.tsx)

**Features**:
- Gradient background with blur effects
- Badge, headline, subheadline
- Primary and secondary CTAs
- Stats display (50+ parameters, 30+ languages, ∞ possibilities)
- Hero image/video placeholder

**Image Slots**: `[Hero Demo Video/Screenshot]`

---

### 2. Features Section

**Location**: [features-section.tsx](src/app/(marketing)/sections/features-section.tsx)

**Features**:
- 3-column grid (responsive)
- Icon-based feature cards
- Hover effects with border transitions
- 6 key features:
  1. 50+ Voice Parameters
  2. Expressive Emotions
  3. Inline Enrichments
  4. Collaborative Workflow
  5. Script Management
  6. Advanced Customization

**Design**: Cards with frosted glass effect (`bg-background/50 backdrop-blur-sm`)

---

### 3. Voice Customization Section

**Location**: [voice-customization-section.tsx](src/app/(marketing)/sections/voice-customization-section.tsx)

**Features**:
- Alternating left/right layout
- 3 customization layers explained:
  1. Voice Profile (30+ parameters)
  2. Segment Expressions (6 modules)
  3. Text Enrichments (inline modifications)
- Feature lists with checkmarks
- Image placeholders for UI screenshots

**Image Slots**:
- `[voice-profile-ui]`
- `[expression-selector-ui]`
- `[enrichments-ui]`

---

### 4. How It Works Section

**Location**: [how-it-works-section.tsx](src/app/(marketing)/sections/how-it-works-section.tsx)

**Features**:
- Vertical timeline with step numbers
- 5-step workflow visualization
- Alternating layout (numbered badges in center)
- Image placeholders for each step

**Steps**:
1. Create a Project
2. Write Your Script
3. Customize Expression
4. Fine-Tune Voice Profile
5. Generate & Export

**Image Slots**:
- `[create-project]`
- `[write-script]`
- `[customize-expression]`
- `[fine-tune-voice]`
- `[export-audio]`

---

### 5. Use Cases Section

**Location**: [use-cases-section.tsx](src/app/(marketing)/sections/use-cases-section.tsx)

**Features**:
- 3-column grid (responsive)
- 6 use case cards with:
  - Category badge
  - Title and description
  - 3 key benefits with checkmarks
  - Image placeholder

**Use Cases**:
1. Podcasters & YouTubers
2. Audiobook Producers
3. E-Learning & Training
4. Marketing Teams
5. Game Developers
6. Accessibility Solutions

**Image Slots**:
- `[podcaster]`
- `[audiobook]`
- `[elearning]`
- `[marketing]`
- `[gaming]`
- `[accessibility]`

---

### 6. Testimonials Section

**Location**: [testimonials-section.tsx](src/app/(marketing)/sections/testimonials-section.tsx)

**Features**:
- 3-column grid (responsive)
- 6 testimonial cards with:
  - Quote in italics
  - Avatar with initials
  - Author name and role
- Frosted glass card effect

**Testimonials**: 6 customer quotes from various roles

---

### 7. Pricing Section

**Location**: [pricing-section.tsx](src/app/(marketing)/sections/pricing-section.tsx)

**Features**:
- 3 pricing tiers
- Middle tier highlighted ("Most Popular" badge)
- Scale effect on highlighted plan
- Feature lists with checkmarks
- CTA buttons for each plan

**Plans**:
1. **Starter** - Free ($0/month)
2. **Professional** - $29/month (highlighted)
3. **Enterprise** - Custom pricing

---

### 8. FAQ Section

**Location**: [faq-section.tsx](src/app/(marketing)/sections/faq-section.tsx)

**Features**:
- Collapsible accordion interface
- Smooth animations on expand/collapse
- 8 common questions answered
- Hover effects on cards

---

### 9. Final CTA Section

**Location**: [final-cta-section.tsx](src/app/(marketing)/sections/final-cta-section.tsx)

**Features**:
- Gradient background with blur effects
- Centered layout
- Primary and secondary CTAs
- Final conversion opportunity

---

### 10. Footer Section

**Location**: [footer-section.tsx](src/app/(marketing)/sections/footer-section.tsx)

**Features**:
- 4 link columns:
  1. Product (Features, Pricing, Use Cases, Changelog)
  2. Resources (Docs, API, Tutorials, Blog)
  3. Company (About, Contact, Careers, Press)
  4. Legal (Privacy, Terms, Cookies, Licenses)
- Social media icons (Twitter, GitHub, LinkedIn, YouTube)
- Copyright notice
- Responsive grid layout

---

## Site Header

**Location**: [site-header.tsx](src/components/layout/site-header.tsx)

**Features**:
- Sticky header with backdrop blur
- Logo/brand name
- Navigation links (Features, How It Works, Use Cases, Pricing)
- Login and "Get Started" buttons
- Responsive (nav links hidden on mobile)

---

## Design System

### Colors

The landing page uses the Tailwind theme from `@repo/ui-core`:

- **Primary**: Brand color for CTAs, highlights
- **Muted**: Background for sections (`bg-muted/30`)
- **Border**: Subtle borders (`border-border/50`)
- **Foreground/Background**: Main text and background colors

### Typography

- **Font**: Geist Sans (variable font)
- **Headings**: Bold, tight tracking (`tracking-tight`)
- **Body**: Relaxed leading (`leading-relaxed`)
- **Sizes**:
  - Hero: `text-4xl md:text-6xl lg:text-7xl`
  - Section titles: `text-3xl md:text-4xl lg:text-5xl`
  - Card titles: `text-xl` or `text-2xl`

### Spacing

- **Section padding**: `py-24 md:py-32`
- **Container**: `container mx-auto px-4 md:px-8`
- **Gap between cards**: `gap-6 md:gap-8`

### Effects

- **Gradients**: `bg-gradient-to-br from-primary/5 via-background to-background`
- **Blur**: `blur-3xl` for background elements
- **Backdrop blur**: `backdrop-blur-sm` for frosted glass
- **Transitions**: `transition-all duration-300` for hover effects

### Responsive Breakpoints

- **Mobile**: Default (< 768px)
- **Tablet**: `md:` (768px+)
- **Desktop**: `lg:` (1024px+)

---

## Image Placeholders

The landing page includes placeholders for images/screenshots. These should be replaced with actual assets:

### Required Images

1. **Hero Demo** - Product screenshot or demo video
2. **Voice Profile UI** - Screenshot of voice profile editor
3. **Expression Selector UI** - Screenshot of expression selector
4. **Enrichments UI** - Screenshot of text enrichment system
5. **Workflow Screenshots** (5 images):
   - Create project interface
   - Script editor
   - Expression customization
   - Voice profile designer
   - Export interface
6. **Use Case Images** (6 images):
   - Podcaster/YouTuber
   - Audiobook production
   - E-learning
   - Marketing
   - Gaming
   - Accessibility

### Image Guidelines

- **Format**: WebP for best compression
- **Aspect Ratios**:
  - Hero: `16:9`
  - Features: `4:3`
  - Use cases: `16:9`
- **Optimization**: Use Next.js `<Image>` component with `loading="lazy"`
- **Alt text**: Provide descriptive alt text for accessibility

---

## Migration to CMS

The landing page is designed for easy CMS migration:

### Step 1: Export Content Schema

The TypeScript types in `landing-content.ts` can be used as CMS schema:

```typescript
export type Hero = typeof hero;
export type Features = typeof features;
// ... etc.
```

### Step 2: Create CMS Collections

Recommended CMS structure (Payload CMS, Sanity, Contentful, etc.):

- **Landing Page** (singleton)
  - Hero Section
  - Features Section
  - Voice Customization Section
  - How It Works Section
  - Use Cases Section
  - Testimonials Section
  - Pricing Section
  - FAQ Section
  - Final CTA Section
  - Footer Section

### Step 3: Update Components

Replace static imports with CMS data fetching:

```typescript
// Before
import { hero } from "@/config/landing-content";

// After (example with Payload CMS)
const landingPage = await payload.findGlobal({
  slug: 'landing-page',
});
const hero = landingPage.hero;
```

### Step 4: Image Management

Upload placeholder images to CMS and reference them:

```typescript
// CMS image field
<Image
  src={hero.imageUrl}
  alt={hero.imageAlt}
  width={1200}
  height={675}
/>
```

---

## SEO Optimization

### Meta Tags

Update in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'StudioAI - Professional AI Voice Synthesis',
  description: 'Create professional AI voices with 50+ parameters...',
  // Add more:
  openGraph: {
    title: '...',
    description: '...',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '...',
    description: '...',
    images: ['/twitter-image.jpg'],
  },
};
```

### Structured Data

Add JSON-LD for rich snippets:

```typescript
// In page.tsx
export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "StudioAI",
    "description": "...",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "0",
      "priceCurrency": "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* ... sections */}
    </>
  );
}
```

---

## Performance Optimization

### Current Optimizations

1. **Server-side rendering** - All sections render on server
2. **No client-side JS** - Except for collapsible FAQ
3. **Backdrop blur** - Hardware-accelerated CSS
4. **Lazy loading** - Images use `loading="lazy"` (when added)

### Future Optimizations

1. **Image optimization**:
   ```typescript
   import Image from 'next/image';
   <Image src="..." width={1200} height={675} loading="lazy" />
   ```

2. **Font optimization** (already using Geist variable font)

3. **Code splitting** - Sections already split by file

4. **Analytics** - Add Vercel Analytics or Google Analytics

---

## Customization Guide

### Changing Colors

Update Tailwind theme in `packages/foundation` or use CSS variables:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  /* Update color values */
}
```

### Adding/Removing Sections

1. Create new section component in `sections/`
2. Add to `sections/index.ts`
3. Import and add to `page.tsx`
4. Add content to `landing-content.ts`

### Updating Copy

All text is in `config/landing-content.ts`. Update any field:

```typescript
export const hero = {
  headline: "New headline",  // ← Update here
  // ...
}
```

### Changing Layout

Sections use Tailwind utility classes. Example:

```typescript
// Change grid from 3 to 4 columns:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

---

## Testing Checklist

- [ ] All sections render without errors
- [ ] Navigation links scroll smoothly to sections
- [ ] CTAs link to correct pages
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Dark mode theme works correctly
- [ ] Collapsible FAQ expands/collapses
- [ ] Hover effects work on cards and buttons
- [ ] TypeScript compiles without errors
- [ ] No console errors in browser
- [ ] Accessibility: keyboard navigation works
- [ ] Meta tags are correct
- [ ] Images have alt text (when added)

---

## Next Steps

1. **Replace image placeholders** with actual screenshots/photos
2. **Add animations** (optional):
   - Scroll-triggered fade-ins
   - Parallax effects
   - Animated counters for stats
3. **Integrate analytics**:
   - Vercel Analytics
   - Google Analytics
   - Hotjar/FullStory for user behavior
4. **A/B testing**:
   - Test different headlines
   - Test CTA button colors/text
   - Test pricing presentation
5. **Migrate to CMS**:
   - Set up Payload CMS or similar
   - Import content schema
   - Connect CMS to components
6. **SEO optimization**:
   - Add structured data
   - Create sitemap
   - Submit to Google Search Console
7. **Performance monitoring**:
   - Lighthouse audits
   - Core Web Vitals tracking
   - Image optimization

---

## Support

For questions or issues with the landing page:

1. Check this documentation
2. Review `landing-content.ts` for content structure
3. Inspect component files in `sections/`
4. Check Tailwind CSS classes in components

---

**Last Updated**: 2026-03-07
**Version**: 1.0.0
**Author**: Claude Code Agent

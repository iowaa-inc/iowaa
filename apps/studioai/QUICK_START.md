# StudioAI Landing Page - Quick Start Guide

## 🎉 Your Landing Page is Ready!

The StudioAI landing page has been successfully created with a modern, minimalistic design that showcases your platform's sophisticated voice synthesis capabilities.

## 🚀 View Your Landing Page

1. **Start the development server** (if not already running):
   ```bash
   pnpm run dev
   ```

2. **Open your browser**:
   - Visit: `http://localhost:3000` (or the port shown in terminal)
   - You should see the complete landing page

3. **Test navigation**:
   - Click "Features" in the header → scrolls to features section
   - Click "How It Works" → scrolls to workflow section
   - Click "Pricing" → scrolls to pricing section
   - All smooth scrolling enabled

## 📝 Edit Content

All content is in **one centralized file**:

```
apps/studioai/src/config/landing-content.ts
```

### Example: Change the Hero Headline

1. Open `src/config/landing-content.ts`
2. Find the `hero` object (line ~12)
3. Update the `headline` field:

```typescript
export const hero = {
  badge: "Professional Voice Synthesis",
  headline: "Your new headline here",  // ← Edit this
  subheadline: "Your new subheadline...",
  // ...
}
```

4. Save the file
5. The page automatically updates (hot reload)

### All Editable Content

In `landing-content.ts`, you can edit:

- ✏️ `hero` - Hero section text, CTAs, stats
- ✏️ `features` - 6 feature descriptions
- ✏️ `voiceCustomization` - 3-layer system descriptions
- ✏️ `howItWorks` - 5-step workflow text
- ✏️ `useCases` - 6 use case examples
- ✏️ `testimonials` - 6 customer quotes
- ✏️ `pricing` - 3 pricing plans and features
- ✏️ `faq` - 8 FAQ questions and answers
- ✏️ `finalCta` - Final CTA text
- ✏️ `footer` - Footer links and social media

## 🖼️ Add Images

The page has **15 image placeholders** that need real screenshots/photos.

### Where to Add Images

All placeholders are marked with brackets like `[image-name]`.

### Quick Image Replacement

#### Option 1: Direct Replacement (Fastest)

1. **Save your image** in `public/images/` folder:
   ```
   public/images/hero-demo.png
   public/images/voice-profile-ui.png
   etc.
   ```

2. **Update the component** to use Next.js Image:

   Before (placeholder):
   ```tsx
   <div className="...">
     [Hero Demo Video/Screenshot]
   </div>
   ```

   After (with image):
   ```tsx
   import Image from "next/image";

   <Image
     src="/images/hero-demo.png"
     alt="StudioAI voice synthesis interface demo"
     width={1200}
     height={675}
     className="rounded-xl"
     loading="lazy"
   />
   ```

#### Option 2: Via Content Config (Recommended)

1. **Add image URLs to content config**:
   ```typescript
   // In landing-content.ts
   export const hero = {
     // ... existing fields
     imageUrl: "/images/hero-demo.png",
     imageAlt: "StudioAI demo",
   }
   ```

2. **Update component to use it**:
   ```tsx
   import Image from "next/image";
   import { hero } from "@/config/landing-content";

   <Image
     src={hero.imageUrl}
     alt={hero.imageAlt}
     width={1200}
     height={675}
   />
   ```

### Image Checklist

Replace these 15 placeholders:

**Hero Section (1 image)**
- [ ] `[Hero Demo Video/Screenshot]` → `public/images/hero-demo.png`

**Voice Customization (3 images)**
- [ ] `[voice-profile-ui]` → `public/images/voice-profile.png`
- [ ] `[expression-selector-ui]` → `public/images/expression-selector.png`
- [ ] `[enrichments-ui]` → `public/images/enrichments.png`

**How It Works (5 images)**
- [ ] `[create-project]` → `public/images/create-project.png`
- [ ] `[write-script]` → `public/images/write-script.png`
- [ ] `[customize-expression]` → `public/images/customize-expression.png`
- [ ] `[fine-tune-voice]` → `public/images/fine-tune-voice.png`
- [ ] `[export-audio]` → `public/images/export-audio.png`

**Use Cases (6 images)**
- [ ] `[podcaster]` → `public/images/podcaster.jpg`
- [ ] `[audiobook]` → `public/images/audiobook.jpg`
- [ ] `[elearning]` → `public/images/elearning.jpg`
- [ ] `[marketing]` → `public/images/marketing.jpg`
- [ ] `[gaming]` → `public/images/gaming.jpg`
- [ ] `[accessibility]` → `public/images/accessibility.jpg`

### Image Guidelines

- **Format**: WebP (best) or PNG/JPG
- **Sizes**:
  - Hero: 1200×675px (16:9)
  - UI Screenshots: 800×600px (4:3)
  - Use Case Photos: 640×360px (16:9)
- **Optimization**: Compress images before uploading
  - Use [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
  - Target: < 200KB per image

## 🎨 Customize Design

### Change Colors

The page uses your Tailwind theme colors. To customize:

1. **Edit Tailwind config** (if you have one)
2. **Or use CSS variables** in `globals.css`:

```css
/* In src/app/globals.css */
:root {
  --primary: 222.2 47.4% 11.2%;  /* Your brand color */
  --muted: 240 4.8% 95.9%;       /* Light gray backgrounds */
}
```

### Change Fonts

Currently using **Geist Sans**. To change:

```typescript
// In src/app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});
```

### Change Layout

All sections use Tailwind classes. Example:

```tsx
// Change from 3 columns to 4 columns:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

## 🔗 Update Links

Several links need to be updated:

### In Content Config (`landing-content.ts`)

1. **Social media links** (footer section):
   ```typescript
   social: [
     { platform: "twitter", href: "https://twitter.com/yourhandle" },
     { platform: "github", href: "https://github.com/yourorg" },
     // Update these ↑
   ]
   ```

2. **Footer links**:
   ```typescript
   sections: [
     {
       title: "Product",
       links: [
         { label: "Changelog", href: "/changelog" },  // Create these pages
         // or link to external URLs
       ]
     }
   ]
   ```

### In Site Header (`src/components/layout/site-header.tsx`)

Navigation links already use anchor scrolling (`#features`, `#pricing`, etc.) - these work out of the box!

## ✅ Pre-Launch Checklist

Before going live, verify:

### Content
- [ ] All text is accurate and polished
- [ ] All 15 images are replaced
- [ ] All links point to correct destinations
- [ ] Contact information is correct
- [ ] Pricing is accurate

### Technical
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile devices
- [ ] Test dark mode
- [ ] Check for console errors
- [ ] Verify smooth scrolling works
- [ ] Test all CTAs (buttons link correctly)

### SEO
- [ ] Meta title and description updated (in `app/layout.tsx`)
- [ ] All images have alt text
- [ ] Add favicon (`public/favicon.ico`)
- [ ] Add Open Graph image (`public/og-image.jpg`)

### Performance
- [ ] Run Lighthouse audit (aim for 90+ score)
- [ ] Compress all images
- [ ] Verify page loads in < 3 seconds

## 📚 Documentation

For detailed information:

1. **[LANDING_PAGE_SUMMARY.md](./LANDING_PAGE_SUMMARY.md)** - Quick overview
2. **[LANDING_PAGE.md](./LANDING_PAGE.md)** - Complete documentation (60+ pages)

## 🐛 Troubleshooting

### Page doesn't load
- Check dev server is running (`pnpm run dev`)
- Check for errors in terminal
- Verify port (usually 3000 or 3001)

### Content not updating
- Save the file (`landing-content.ts`)
- Check browser console for errors
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### TypeScript errors
- Run: `pnpm run check-types`
- Fix any errors shown
- Common issue: Missing imports

### Images not showing
- Verify image path is correct (`/images/...`)
- Check image exists in `public/images/`
- Check file name spelling (case-sensitive)

## 🎯 Quick Wins

### 1. Update Hero CTA (2 minutes)

```typescript
// In landing-content.ts
export const hero = {
  cta: {
    primary: {
      text: "Start Creating Free",  // ← Make it more compelling
      href: "/auth/register?ref=hero",  // ← Add tracking param
    }
  }
}
```

### 2. Add Social Proof (5 minutes)

```typescript
// In landing-content.ts
export const hero = {
  stats: [
    {
      value: "10,000+",  // ← Update with real numbers
      label: "Active Users",
    },
    // ...
  ]
}
```

### 3. Customize Pricing (10 minutes)

```typescript
// In landing-content.ts
export const pricing = {
  plans: [
    {
      name: "Professional",
      price: {
        monthly: 29,  // ← Update pricing
        annual: 290,  // ← Update annual price
      },
      features: [
        "100 hours of audio per month",  // ← Update features
        // ...
      ]
    }
  ]
}
```

## 🚀 Deploy to Production

When ready to deploy:

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm install -g vercel

# Deploy
vercel --prod
```

### Other Platforms

The landing page works on any Next.js hosting:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Self-hosted

## 📧 Need Help?

1. **Documentation**: Check `LANDING_PAGE.md`
2. **Content**: Edit `src/config/landing-content.ts`
3. **Components**: Browse `src/app/(marketing)/sections/`
4. **Type Errors**: Run `pnpm run check-types`

---

## 🎊 You're All Set!

Your landing page is production-ready. Just add images and review the content, and you're good to launch!

**Next Steps**:
1. ✅ Add images (15 placeholders)
2. ✅ Review and edit content
3. ✅ Test in browser
4. ✅ Deploy to production

**Happy launching! 🚀**

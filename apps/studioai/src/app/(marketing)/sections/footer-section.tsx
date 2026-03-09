import Link from "next/link";
import {
  RiTwitterXLine,
  RiGithubLine,
  RiLinkedinBoxLine,
  RiYoutubeLine,
} from "@remixicon/react";
import { Button } from "@repo/ui-core/components/button";
import { Input } from "@repo/ui-core/components/input";
import { footer } from "@/config/landing-content";

const SOCIAL_ICONS = {
  twitter:  RiTwitterXLine,
  github:   RiGithubLine,
  linkedin: RiLinkedinBoxLine,
  youtube:  RiYoutubeLine,
} as const;

// ─── Footer ───────────────────────────────────────────────────────────────────

export function FooterSection() {
  return (
    <footer className="border-t border-border">

      {/* ── Main content ───────────────────────────────────────────── */}
      <div className="container mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-12 lg:gap-10">

          {/* Left: brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              StudioAI
            </Link>
            <p className="text-base text-muted-foreground leading-relaxed max-w-xs">
              {footer.tagline}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-auto">
              {footer.social.map((s) => {
                const Icon = SOCIAL_ICONS[s.platform as keyof typeof SOCIAL_ICONS];
                return Icon ? (
                  <Link
                    key={s.platform}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none"
                    aria-label={s.platform}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </Link>
                ) : null;
              })}
            </div>
          </div>

          {/* Middle: link columns — 2×2 grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footer.sections.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <p className="text-sm font-semibold text-foreground">
                  {section.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right: newsletter */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Newsletter
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Get the latest updates on new features, tutorials, and creator stories.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <Input
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
                className="bg-background"
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>

        </div>

        {/* ── Large wordmark ──────────────────────────────────────────── */}
        <div className="mt-16 overflow-hidden select-none">
          <p
            className="text-[clamp(56px,12vw,140px)] font-bold tracking-tighter leading-none text-border [-webkit-text-stroke:1px_currentColor] [-webkit-text-fill-color:transparent]"
            aria-hidden
          >
            StudioAI
          </p>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border mt-8">
          <p className="text-sm text-muted-foreground">{footer.copyright}</p>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <span className="opacity-40">•</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <span className="opacity-40">•</span>
            <Link href="/cookies" className="hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}

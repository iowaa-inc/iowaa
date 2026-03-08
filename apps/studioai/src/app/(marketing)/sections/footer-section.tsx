"use client";

import Link from "next/link";
import {
  RiTwitterXLine,
  RiGithubLine,
  RiLinkedinBoxLine,
  RiYoutubeLine,
} from "@remixicon/react";
import { Separator } from "@repo/ui-core/components/separator";
import { footer } from "@/config/landing-content";

const socialIconMap = {
  twitter: RiTwitterXLine,
  github: RiGithubLine,
  linkedin: RiLinkedinBoxLine,
  youtube: RiYoutubeLine,
};

export function FooterSection() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold">StudioAI</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {footer.tagline}
            </p>
            <div className="flex items-center gap-3">
              {footer.social.map((social, index) => {
                const Icon =
                  socialIconMap[social.platform as keyof typeof socialIconMap];
                return (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Link sections */}
          {footer.sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-sm font-semibold">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
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

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">{footer.copyright}</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Button } from "@repo/ui-core/components/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        <div className="mr-8 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">StudioAI</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 flex-1">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Production Tools
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Workflow
          </Link>
          <Link
            href="#use-cases"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            What You Can Make
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-2 ml-auto">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">Start Producing</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

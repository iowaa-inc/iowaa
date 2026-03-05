import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold mb-2">IOWAA</h3>
            <p className="text-sm text-muted-foreground">
              Strategic design and engineering for a localized world.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">The Firm</h4>
            <Link
              href="/the-firm"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              About Us
            </Link>
            <Link
              href="/methodology"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Methodology
            </Link>
            <Link
              href="/insights"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Insights
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">Solutions</h4>
            <Link
              href="/r"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Market Hubs
            </Link>
            <Link
              href="/strategy-session"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Strategy Session
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">Legal</h4>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-between border-t border-muted pt-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} IOWAA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

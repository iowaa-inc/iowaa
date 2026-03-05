import Link from 'next/link';

import { RiStore3Fill } from '@remixicon/react';
import { ArrowRight, BookOpen, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function BusinessOnboardingStart() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8">
      <div className="flex w-full max-w-md flex-col items-center gap-10 text-center">
        {/* Visual / Badge Section */}
        <div className="bg-foreground text-background mx-auto flex w-fit items-center justify-center rounded-2xl p-3">
          <RiStore3Fill size={48} />
        </div>

        {/* Header / Description */}
        <div className="mb-6 space-y-6">
          <div className="bg-muted mx-auto flex w-fit flex-row items-center justify-center gap-2 rounded-full px-3 py-2">
            <Info className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground text-sm">
              Your progress is automatically saved
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-foreground text-center text-4xl font-bold tracking-tight md:text-3xl">
              Start your business on Iowaa
            </h1>
            <p className="text-muted-foreground text-center text-base leading-relaxed md:text-base">
              Take the first step toward your new venture. We make it simple and straightforward.
            </p>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="flex w-full flex-col gap-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/business/create" className="gap-2">
              Start Onboarding
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/onboarding/guide" className="gap-2">
              <BookOpen className="h-5 w-5" />
              View Comprehensive Guide
            </Link>
          </Button>
          <p className="text-muted-foreground text-center text-xs">Expected time: 5-10 minutes</p>
        </div>
      </div>
    </div>
  );
}

// Possible enhancements to this page:
// - Add a brief description highlighting the benefits/features of starting a business on Iowaa.
// - Offer secondary actions such as "Learn More" or "Contact Support".
// - Incorporate an illustration or hero image to enhance visual appeal.
//
// These improvements can better inform, support, and motivate users.

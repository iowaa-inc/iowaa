'use client';

import Link from 'next/link';

import GoogleIcon from '@/assets/icons/google-icon.svg';
import { Provider } from '@supabase/supabase-js';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { createClient } from '@/lib/supabase/client';

export default function RegisterPage() {
  const handleSSOLogin = async (provider: Provider) => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `http://localhost:3000/auth/callback?next=/dashboard/inventory`, // use localhost for development
      },
    });
  };

  return (
    <div className="bg-background text-foreground flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-md flex-col items-center justify-center">
        <div className="mb-8 space-y-1">
          <h1 className="text-center text-2xl font-medium">Welcome to Iowaa</h1>
          <p className="text-muted-foreground text-center">Create your free account now</p>
        </div>

        {/* Auth Buttons */}
        <div className="mx-auto mb-6 w-full max-w-xs space-y-6">
          {/* Google Button */}
          <Button
            variant="secondary"
            className="h-10 w-full"
            type="button"
            onClick={() => handleSSOLogin('google')}
          >
            <GoogleIcon />
            Continue with Google
          </Button>

          <Separator />
        </div>

        {/* Legal Text */}
        <p className="text-muted-foreground/70 mx-auto mb-8 max-w-xs text-center text-sm leading-relaxed">
          By joining you agree to the{' '}
          <Link
            href="#"
            className="text-foreground hover:text-primary underline transition-colors duration-200"
          >
            Terms and Conditions
          </Link>{' '}
          and{' '}
          <Link
            href="#"
            className="text-foreground hover:text-primary underline transition-colors duration-200"
          >
            Privacy Policy
          </Link>
        </p>

        {/* Sign In Link */}
        <p className="text-muted-foreground text-center text-sm">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="text-foreground hover:text-primary font-semibold transition-colors duration-200"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

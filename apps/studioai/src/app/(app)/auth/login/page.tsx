'use client';

import Link from 'next/link';

import GoogleIcon from '@/assets/icons/google-icon.svg';
import { Provider } from '@supabase/supabase-js';

import { Button } from '@repo/ui-core/components/button';
import { Separator } from '@repo/ui-core/components/separator';

import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const handleSSOLogin = async (provider: Provider) => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `http://localhost:3000/auth/callback?next=/workspace`, // use localhost for development
      },
    });
  };

  return (
    <div className="bg-background text-foreground flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-md flex-col items-center justify-center">
        <div className="mb-8 space-y-1">
          <h1 className="text-center text-2xl font-medium">Welcome back</h1>
          <p className="text-muted-foreground text-center">Sign in to your account to continue</p>
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

        {/* Register Link */}
        <p className="text-muted-foreground text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/register"
            className="text-foreground hover:text-primary font-semibold transition-colors duration-200"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

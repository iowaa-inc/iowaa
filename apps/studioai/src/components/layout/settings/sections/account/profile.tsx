'use client';

import { useUserProfile } from '@/features/auth/hooks/use-user-profile';
import { getInitials } from '@/lib/utils';

import { Field, FieldGroup, FieldLabel, FieldSet } from '@repo/ui-core/components/field';
import { Input } from '@repo/ui-core/components/input';

export function ProfileSection() {
  const { data: profile, isLoading } = useUserProfile();

  const avatarFallback = getInitials(profile?.display_name);
  const isLoaded = !isLoading && !!profile;

  return (
    <div className="flex max-w-3xl flex-col gap-3">
      <h2 className="text-lg font-semibold">Profile Settings</h2>
      <p className="text-muted-foreground text-sm">
        Manage your account details, avatar, and email here.
      </p>

      <div className="flex items-center gap-4">
        <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold">
          {isLoading ? (
            <span className="opacity-40">...</span>
          ) : profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.display_name ?? ''}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <span>{avatarFallback || 'U'}</span>
          )}
        </div>
      </div>

      <FieldSet>
        <FieldGroup className="gap-4">
          <Field orientation="horizontal" className="items-center justify-between gap-4">
            <FieldLabel className="max-w-[130px] min-w-[130px] text-right text-sm whitespace-nowrap">
              Display Name
            </FieldLabel>
            <Input
              value={isLoading ? '' : (profile?.display_name ?? '')}
              disabled={!isLoaded}
              placeholder={isLoading ? 'Loading...' : 'No name found'}
              className="w-[260px]"
              readOnly
            />
          </Field>

          <Field orientation="horizontal" className="items-center justify-between gap-4">
            <FieldLabel className="max-w-[130px] min-w-[130px] text-right text-sm whitespace-nowrap">
              Email
            </FieldLabel>
            <Input
              type="email"
              value={isLoading ? '' : (profile?.email ?? '')}
              disabled={!isLoaded}
              placeholder={isLoading ? 'Loading...' : 'No email found'}
              className="w-[260px]"
              readOnly
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}

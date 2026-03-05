import { BrandVoiceCard } from '@/features/business-profile/components/brand-voice-card';
import { BusinessRegistrationCard } from '@/features/business-profile/components/business-registration-card';
import { LocationCard } from '@/features/business-profile/components/location-card';
import { OperatingHoursCard } from '@/features/business-profile/components/operating-hours-card';
import { PlatformReputationCard } from '@/features/business-profile/components/platform-reputation-card';
import { ProfileCard } from '@/features/business-profile/components/profile-card';
import { BusinessProfileProvider } from '@/features/business-profile/provider';

import { PageHeader } from '../_components/layout/page-header';

export default function SettingsPage() {
  return (
    <BusinessProfileProvider>
      <div className="mx-auto w-full max-w-4xl min-w-0">
        <PageHeader
          title="Business Settings"
          subtitle="Configure your business profile and verification"
        />

        <div className="space-y-4">
          {/* <ProfileCard /> */}

          <LocationCard />

          <BrandVoiceCard />

          <OperatingHoursCard />

          <PlatformReputationCard />

          <BusinessRegistrationCard />
        </div>
      </div>
    </BusinessProfileProvider>
  );
}

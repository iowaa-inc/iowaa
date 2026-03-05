'use client';

import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { useBusinessProfile } from '../hooks';
import { ProfileEditModal } from './profile-edit-modal';

export function ProfileCard() {
  const { get, update } = useBusinessProfile();
  const businessProfile = get();

  const handleSave = (profileData: {
    logo: string | null;
    name: string;
    email: string;
    category: string;
    description: string;
  }) => {
    try {
      update({
        logo: profileData.logo,
        name: profileData.name,
        email: profileData.email,
        category: profileData.category,
        description: profileData.description,
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    }
  };

  const handleError = (error: string) => {
    toast.error(error);
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Business Profile</CardTitle>
            <CardDescription>Your business identity and information</CardDescription>
          </div>
          <ProfileEditModal
            profile={{
              ...businessProfile,
              email: businessProfile.emailAddress,
            }}
            onSave={handleSave}
            onError={handleError}
          >
            <Button variant="outline" size="default">
              Edit
            </Button>
          </ProfileEditModal>
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-start gap-6">
            <div className="border-border h-24 w-24 shrink-0 overflow-hidden rounded-full border-2">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={businessProfile.logo || '/placeholder.svg?height=96&width=96'}
                  alt="Business Logo"
                  className="h-full w-full object-cover"
                />
                <AvatarFallback>{businessProfile.name?.[0] || 'B'}</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 space-y-2">
              <div>
                <h4 className="text-foreground text-xl font-semibold">{businessProfile.name}</h4>
                <p className="text-muted-foreground mt-1 text-sm">{businessProfile.email}</p>
              </div>

              <div>
                <Badge variant="secondary" className="p-3 text-sm">
                  {businessProfile.category}
                </Badge>
              </div>
            </div>
          </div>
          <p className="text-foreground text-sm leading-relaxed">{businessProfile.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

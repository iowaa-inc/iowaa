'use client';

import { MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { useBusinessProfile } from '../hooks';
import { LocationEditModal } from './location-edit-modal';

export function LocationCard() {
  const { get, update } = useBusinessProfile();
  const business = get();

  const handleSave = (data: { businessPhone: string; location: string }) => {
    try {
      update({
        phone: data.businessPhone,
        location: data.location,
      });
      toast.success('Location updated successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update location');
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
            <CardTitle>Location Information</CardTitle>
            <CardDescription>Your contact details and business location</CardDescription>
          </div>
          <LocationEditModal
            businessPhone={business.phone}
            location={business.location}
            onSave={handleSave}
            onError={handleError}
          >
            <Button variant="outline" size="default" className="shrink-0 bg-transparent">
              Edit
            </Button>
          </LocationEditModal>
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-foreground text-sm font-medium">
              <Phone className="mr-2 inline h-4 w-4" />
              Business Phone
            </p>
            <p className="text-foreground text-sm">{business.phone}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-foreground text-sm font-medium">
              <MapPin className="mr-2 inline h-4 w-4" />
              Location
            </p>
            <p className="text-foreground text-sm">{business.location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

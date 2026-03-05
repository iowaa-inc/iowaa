'use client';

import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { useBusinessProfile } from '../hooks';
import { BrandVoiceEditModal } from './brand-voice-edit-modal';

export function BrandVoiceCard() {
  const { get, update } = useBusinessProfile();

  const business = get();
  const brandVoices = business.brandVoices ?? [];

  const handleSave = (voices: string[]) => {
    try {
      update({ brandVoices: voices });
      toast.success('Brand voice updated successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update brand voice');
    }
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Brand Voice</CardTitle>
            <CardDescription>Tones that represent your brand communication style</CardDescription>
          </div>
          <BrandVoiceEditModal selectedVoices={brandVoices} onSave={handleSave}>
            <Button variant="outline" size="default" className="shrink-0 bg-transparent">
              Edit
            </Button>
          </BrandVoiceEditModal>
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {brandVoices.map((voice: string) => (
            <Badge key={voice} variant="secondary" className="rounded-full p-4 text-sm">
              {voice}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

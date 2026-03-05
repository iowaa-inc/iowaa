'use client';

import { CheckCircle2, Clock, Info, Upload, XCircle } from 'lucide-react';
import { toast } from 'sonner';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

import { REGISTRATION_TYPES } from '../constants';
import { useBusinessProfile } from '../hooks';
import type { DocumentStatus } from '../types';

const STATUS_CONFIG = {
  pending: {
    variant: 'default' as const,
    className: 'mb-6 border-yellow-200 bg-yellow-50 text-yellow-900',
    icon: <Clock className="h-4 w-4 text-yellow-600" />,
    title: 'Document Processing',
    desc: "Your documents are being reviewed. This usually takes 2-3 business days. We'll notify you once the review is complete.",
  },
  approved: {
    variant: 'default' as const,
    className: 'mb-6 border-green-200 bg-green-50 text-green-900',
    icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
    title: 'Documents Accepted',
    desc: 'Your business registration documents have been verified and accepted. Your account is now fully verified.',
  },
  rejected: {
    variant: 'destructive' as const,
    className: 'mb-6',
    icon: <XCircle className="h-4 w-4" />,
    title: 'Documents Rejected',
    desc: 'Unfortunately, your submitted documents did not meet our verification requirements. Please review the feedback and resubmit with the correct documents.',
  },
};

export function BusinessRegistrationCard() {
  const { get, update } = useBusinessProfile();
  const business = get();

  const selectedRegistration = REGISTRATION_TYPES.find(
    (type) => type.key === business.registrationType,
  );
  const isDocumentSubmitted = business.documentStatus !== 'none';

  const handleRegistrationTypeChange = (val: string) => {
    update({ registrationType: val });
  };

  const handleDocumentStatusChange = (val: string) => {
    update({ documentStatus: val as DocumentStatus | 'none' });
  };

  const handleAgreedToTermsChange = (checked: boolean) => {
    update({ agreedToTerms: checked });
  };

  const handleAgreedToUpdatesChange = (checked: boolean) => {
    update({ agreedToUpdates: checked });
  };

  const handleDocumentUpload = async () => {
    try {
      handleDocumentStatusChange('pending');
      toast.success('Documents uploaded successfully. Review in progress.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload documents');
    }
  };

  const effectiveStatus =
    business.documentStatus === 'pending' ||
    business.documentStatus === 'approved' ||
    business.documentStatus === 'rejected'
      ? business.documentStatus
      : null;

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Business Registration</CardTitle>
        <CardDescription>Verify your business type and upload documents</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        {effectiveStatus && (
          <Alert
            className={STATUS_CONFIG[effectiveStatus].className}
            variant={STATUS_CONFIG[effectiveStatus].variant}
          >
            {STATUS_CONFIG[effectiveStatus].icon}
            <AlertTitle>{STATUS_CONFIG[effectiveStatus].title}</AlertTitle>
            <AlertDescription>{STATUS_CONFIG[effectiveStatus].desc}</AlertDescription>
          </Alert>
        )}

        <div className="mb-6">
          <label htmlFor="registrationType" className="mb-2 block text-sm font-medium">
            Select business registration type
          </label>
          <Select
            value={business.registrationType}
            onValueChange={handleRegistrationTypeChange}
            disabled={isDocumentSubmitted}
          >
            <SelectTrigger id="registrationType" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {REGISTRATION_TYPES.map((type) => (
                <SelectItem key={type.key} value={type.key}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="border-border bg-muted/30 space-y-4 rounded-lg border p-6">
          <div className="flex items-start gap-3">
            <Info className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-foreground text-sm font-medium">
              Documents required to verify this business type
              {selectedRegistration ? ` (${selectedRegistration.label})` : ''}
            </p>
          </div>
          <ol className="text-muted-foreground space-y-2 pl-6 text-sm">
            {selectedRegistration ? (
              selectedRegistration.documents.map((doc: string, idx: number) => (
                <li key={idx} className="list-decimal leading-relaxed">
                  {doc}
                </li>
              ))
            ) : (
              <li className="text-muted-foreground leading-relaxed italic">
                Please select a business registration type.
              </li>
            )}
          </ol>
          <Button
            variant="outline"
            className="mt-4 w-full bg-transparent"
            size="default"
            onClick={handleDocumentUpload}
            disabled={isDocumentSubmitted || !selectedRegistration}
          >
            <Upload className="mr-2 h-4 w-4" />
            {business.documentStatus === 'none' ? 'Upload Documents' : 'Documents Submitted'}
          </Button>
        </div>

        <div className="space-y-4 pt-6">
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={business.agreedToTerms}
              onCheckedChange={(checked) => handleAgreedToTermsChange(!!checked)}
            />
            <label
              htmlFor="terms"
              className="text-muted-foreground cursor-pointer text-sm leading-relaxed"
            >
              I acknowledge that I have read, understood, and agree to be bound by ioowa&apos;s{' '}
              <a href="#" className="text-primary hover:underline">
                Merchant Services Agreement (MSA)
              </a>
              ,{' '}
              <a href="#" className="text-primary hover:underline">
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:underline">
                Privacy Notice
              </a>
              .
            </label>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="updates"
              checked={business.agreedToUpdates}
              onCheckedChange={(checked) => handleAgreedToUpdatesChange(!!checked)}
            />
            <label
              htmlFor="updates"
              className="text-muted-foreground cursor-pointer text-sm leading-relaxed"
            >
              I agree to receive updates and promotional offers from ioowa.
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

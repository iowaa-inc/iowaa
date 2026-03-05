import { defineStepper } from '@/components/ui/stepper';

export const stepperContext = defineStepper(
  {
    id: 'name',
    title: "Let's start with a name",
    subtitle: "Choose a unique name for your business. We'll check availability in real-time.",
  },
  {
    id: 'category',
    title: 'Tell us about your business',
    subtitle: 'Select your business category and write a brief description.',
  },
  {
    id: 'logo',
    title: 'Upload your logo',
    subtitle: 'Choose a logo that represents your brand. PNG, JPG, or WebP. Max 5MB.',
  },
  {
    id: 'phone',
    title: 'Contact information',
    subtitle: "We'll use this to reach you about your account and important updates.",
  },
  {
    id: 'hours',
    title: 'Operating hours',
    subtitle: 'Set your business hours for each day of the week in your timezone',
  },
  // {
  //   id: 'document',
  //   title: 'Business identity document',
  //   subtitle: 'Upload your business registration or identity document for verification.',
  // },
  {
    id: 'review',
    title: 'Review your information',
    subtitle:
      'Please review all the information below. You can edit any section by clicking the edit button.',
  },
);

export const ONBOARDING_STEP_DATA_KEY = 'business_onboarding_data';

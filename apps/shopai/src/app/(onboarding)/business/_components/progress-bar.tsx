'use client';

import { Progress } from '@/components/ui/progress';

import { stepperContext } from '../_components/stepper-context';

export function ProgressBar() {
  const { utils, useStepper } = stepperContext;
  const stepper = useStepper();

  const currentStepIndex = utils.getIndex(stepper.current.id);
  const totalSteps = stepper.all.length;
  const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;

  return (
    <div className="bg-background border-border w-full border-b">
      <Progress value={progressPercentage} className="h-1 rounded-none" />
      <div className="text-muted-foreground flex items-center justify-end px-4 py-3 text-sm">
        <span>{Math.round(progressPercentage)}% Complete</span>
      </div>
    </div>
  );
}

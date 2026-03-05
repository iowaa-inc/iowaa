'use client';

import { Badge } from '@/components/ui/badge';

import { stepperContext } from '../_components/stepper-context';

export function Header() {
  const { utils, useStepper } = stepperContext;
  const stepper = useStepper();

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8 px-4 py-8">
      <Badge variant={'secondary'} className="px-4 py-5 text-sm">
        Step {utils.getIndex(stepper.current.id) + 1} of {stepper.all.length}
      </Badge>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">{stepper.current.title}</h1>
        <p className="text-muted-foreground text-base">{stepper.current.subtitle}</p>
      </div>
    </div>
  );
}

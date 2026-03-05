'use client';

import { Bio } from '../_components/forms/bio';
// import { Document } from '../_components/forms/document';
import { Hours } from '../_components/forms/hours';
import { Logo } from '../_components/forms/logo';
import { Name } from '../_components/forms/name';
import { Phone } from '../_components/forms/phone';
import { Review } from '../_components/forms/review';
import { Header } from '../_components/header';
import { ProgressBar } from '../_components/progress-bar';
import { stepperContext } from '../_components/stepper-context';

export default function BusinessCreatePage() {
  const { Stepper } = stepperContext;
  return (
    <Stepper.Provider>
      {({ methods }) => (
        <>
          <div className="bg-background flex min-h-screen w-full flex-col">
            <ProgressBar />

            {/* <Stepper.Navigation>
              {methods.all.map((step) => (
                <Stepper.Step key={step.id} of={step.id}>
                  <Stepper.Title>{step.title}</Stepper.Title>
                </Stepper.Step>
              ))}
            </Stepper.Navigation> */}

            <div className="flex-1">
              <Header />

              <div className="mx-auto w-full max-w-2xl px-4 py-8">
                {methods.switch({
                  name: () => <Name />,
                  category: () => <Bio />,
                  logo: () => <Logo />,
                  phone: () => <Phone />,
                  hours: () => <Hours />,
                  // document: () => <Document />,
                  review: () => <Review />,
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </Stepper.Provider>
  );
}

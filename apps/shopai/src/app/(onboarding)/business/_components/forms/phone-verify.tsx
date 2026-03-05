import { useEffect, useState } from 'react';

import { RiCheckboxCircleFill, RiLoader4Fill } from '@remixicon/react';

import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

import { cn } from '@/lib/utils';

type PhoneVerifyProps = {
  phone: string;
  onBack?: () => void;
  onEditPhone?: () => void;
  onVerify?: (phone: string) => void; // new callback
};

export function PhoneVerify({ phone, onBack, onEditPhone, onVerify }: PhoneVerifyProps) {
  const [otpValue, setOtpValue] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canEditPhone, setCanEditPhone] = useState(false);

  // Effect for countdown allowing editing of phone after expire
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
      if (countdown - 1 <= 0) setCanEditPhone(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // OTP Verification: mock logic, replace with your API
  async function handleVerifyOtp() {
    setIsVerifying(true);
    setOtpError(null);

    // Simulate async verification - succeed if '123456' or '111111'
    setTimeout(() => {
      if (otpValue === '123456' || otpValue === '111111') {
        setOtpSuccess(true);
      } else {
        setOtpError('Incorrect OTP code. Please try again.');
        setOtpSuccess(false);
      }
      setIsVerifying(false);
    }, 1200);
  }

  // Handle "Continue" after successful verification
  function handleContinue() {
    if (onVerify) {
      onVerify(phone);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-2 text-xl font-semibold">Enter the 6-digit code sent via WhatsApp</h2>
        <p className="text-muted-foreground mb-2">
          We&apos;ve sent an OTP to <span className="font-mono">{phone}</span>
          <br />
          Please check your WhatsApp and enter the code.
        </p>
      </div>
      <div className="mb-2 flex min-h-[64px] w-full items-center justify-center">
        <InputOTP
          maxLength={6}
          value={otpValue}
          onChange={(value) => {
            setOtpValue(value);
            setOtpError(null);
          }}
          className="w-full scale-125"
          containerClassName="justify-center w-full"
          disabled={isVerifying || otpSuccess}
          data-testid="otp-input"
        >
          <InputOTPGroup className="w-full">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <InputOTPSlot key={idx} index={idx} className="size-14" />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      {otpError && <div className="text-error text-sm">{otpError}</div>}
      {otpSuccess && (
        <div className="text-success flex items-center gap-2 text-base">
          <RiCheckboxCircleFill className="text-success h-6 w-6" /> Phone verified!
        </div>
      )}
      <div className="my-4 flex items-center justify-between">
        <span className="text-muted-foreground text-sm">
          {countdown > 0 ? `You can edit your phone in ${countdown}s` : "Didn't receive the code?"}
        </span>
        <Button
          variant="link"
          size="sm"
          type="button"
          className={cn(
            'h-8 px-2 py-0',
            canEditPhone ? 'text-primary underline' : 'text-muted-foreground pointer-events-none',
          )}
          onClick={() => {
            setOtpValue('');
            setOtpError(null);
            setCanEditPhone(false);
            setCountdown(30);
            if (onEditPhone) onEditPhone();
            else if (onBack) onBack();
          }}
          disabled={!canEditPhone}
        >
          Change phone number
        </Button>
      </div>
      <Button
        type="button"
        size="lg"
        className="w-full"
        onClick={otpSuccess ? handleContinue : handleVerifyOtp}
        disabled={otpSuccess ? false : otpValue.length !== 6 || isVerifying || otpSuccess}
      >
        {isVerifying ? (
          <>
            <RiLoader4Fill className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : otpSuccess ? (
          <>Continue</>
        ) : (
          <>Continue</>
        )}
      </Button>
    </div>
  );
}

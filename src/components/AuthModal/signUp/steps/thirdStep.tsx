import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '@dedo_ai/gui-com-lib';
import { useQuery } from '@tanstack/react-query';

var interval: NodeJS.Timeout;
interface IThirdStepProps {
  formData: any;
  handleChange: (_key: string, _value: string) => void;
  errors: any;
  hasSmsBeenSent: boolean;
  toggleSmsSent: () => void;
}
export const ThirdStep = ({
  formData,
  handleChange,
  errors,
  hasSmsBeenSent,
  toggleSmsSent,
}: IThirdStepProps) => {
  const baseT = 'authModal.signup';
  const { t } = useTranslation();

  const { phoneNumber, phoneNumberPrefix } = formData;
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(false);
  const toggleTimer = () => {
    setTime(30);
    setTimer(!timer);
  };

  const isTimerRolling = time > 0;

  const {
    refetch: sendSms,
  } = useQuery({
    queryKey: ['phoneNumberSendSms'],
    queryFn: async () => {
      const res = await Promise.resolve(true);
      toggleSmsSent();
      toggleTimer();
      return res;
    },
    enabled: false,
  });

  useEffect(() => {
    clearInterval(interval);

    if (isTimerRolling) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else clearInterval(interval);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">{t(`${baseT}.insertPhoneNumber`)}</h1>
      <div className="flex gap-2">
        <div className="w-[30%]">
          <Input
            ariaLabel="phoneNumber-prefix"
            onChange={(e) => {
              const { value } = e.target;
              const { length } = value;
              if (length <= 2) handleChange('phoneNumberPrefix', value);
              if (length > 1) (document.querySelector('#phoneNumber') as HTMLInputElement).focus();
            }}
            type="text"
            value={phoneNumberPrefix}
            disabled={isTimerRolling}
            error={errors?.phoneNumberPrefix?.message}
            applyPatternCheck
            prefix="+"
          />
        </div>
        <Input
          ariaLabel="phoneNumber"
          onChange={(e) => {
            if (e.target.value.length <= 10) handleChange('phoneNumber', e.target.value);
          }}
          id="phoneNumber"
          type="text"
          value={phoneNumber}
          applyPatternCheck
          error={errors?.phoneNumber?.message}
          disabled={isTimerRolling}
        />
      </div>
      <Button
        ariaLabel="resend-sms"
        variant={isTimerRolling && hasSmsBeenSent ? 'secondary' : 'primary'}
        disabled={(isTimerRolling && hasSmsBeenSent) || !phoneNumber || !phoneNumberPrefix}
        text={t(`${baseT}.${hasSmsBeenSent ? 're' : ''}sendSms`, {
          article: isTimerRolling ? t(`${baseT}.resendIn`) : '',
          time: isTimerRolling ? ` ${time} s` : '',
        })}
        className="mt-4"
        onClick={sendSms}
      />
      <p className="mt-4 text-error-base">{errors?.smsNotSent?.message}</p>
    </>
  );
};

export default ThirdStep;

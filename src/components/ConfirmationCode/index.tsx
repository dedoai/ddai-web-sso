import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Body2, Button, H2, Input,
} from '@dedo_ai/gui-com-lib';
import { useQuery } from '@tanstack/react-query';

var interval: NodeJS.Timeout;

const CODE_LENGHT = 6;

interface IConfirmationCodeProps {
  title: string;
  descriptionTKey: string;
  tValues?: {
    [key: string]: string;
  };
  handleChange: (_key: string, _value: string) => void;
  value: string;
  toggleCodeSent: () => void;
  nextStepCb: () => void;
}
const ConfirmationCode = ({
  title,
  descriptionTKey,
  tValues,
  handleChange,
  value,
  toggleCodeSent,
  nextStepCb,
}: IConfirmationCodeProps) => {
  const { t } = useTranslation();

  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(false);
  const toggleTimer = () => {
    setTime(10);
    setTimer(!timer);
  };

  const isCodeLenghtValid = value?.length === CODE_LENGHT;

  const isTimerRolling = time > 0;

  const values = Object.entries(tValues || {}).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  const {
    data: isCodeValid,
    refetch: checkCode,
  } = useQuery({
    queryKey: ['checkCode'],
    queryFn: () => {
      const res = false;

      if (res) nextStepCb();
      // else handleChange('confirmationCode', '');

      return res;
    },
    enabled: false,
    initialData: true,
  });

  const {
    refetch: sendCode,
    isFetching: isCodeChecking,
  } = useQuery({
    queryKey: ['sendCode'],
    queryFn: async () => {
      const wait = (t: number) => new Promise((res) => { setTimeout(res, t); });

      wait(5000);

      toggleCodeSent();
      toggleTimer();

      return null;
    },
  });

  useEffect(() => {
    if (isCodeLenghtValid) checkCode();
  }, [value]);

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
      <H2 content={t(title)} />
      <Body2 className="text-text-bright dark:text-text-gloomy">
        <Trans
          i18nKey={descriptionTKey}
          values={values}
          components={{ span: <Body2 weight="medium" className="text-primary" /> }}
        />
      </Body2>
      <Input
        ariaLabel="confirmation-code"
        className="max-w-[60%]"
        disabled={isCodeChecking}
        error={isCodeValid ? '' : t('authModal.signup.invalidCode')}
        onChange={(value) => {
          console.log('>>', value);
          handleChange('confirmationCode', value);
        }}
        codeLenght={CODE_LENGHT}
        type="confirmation-code"
        value={value || ''}
      />
      <Button
        text={t('authModal.signup.resend', {
          article: isTimerRolling ? t('authModal.signup.resendIn') : '',
          time: time > 0
            ? ` 00:${time.toString().padStart(2, '0')}`
            : '',
        })}
        ariaLabel="resend-code"
        disabled={isTimerRolling || !isCodeLenghtValid}
        onClick={sendCode}
        isLoading={isCodeChecking}
      />
    </>
  );
};

export default ConfirmationCode;

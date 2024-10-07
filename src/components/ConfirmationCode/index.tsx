import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Body2, Button, H2, Input,
} from '@dedo_ai/gui-com-lib';
import { useQuery } from '@tanstack/react-query';

import { apiPost, EP_OTP } from '@/api';

var interval: NodeJS.Timeout;

const CODE_LENGHT = 6;

interface IConfirmationCodeProps {
  codeType: 'email' | 'sms';
  descriptionTKey: string;
  handleChange: (_key: string, _value: string) => void;
  hasCodeBeenChecked: boolean;
  nextStepCb: () => void;
  sendCodeCb?: () => void;
  setCodeChecked: () => void;
  title: string;
  tValues?: {
    [key: string]: string;
  };
  value: string;
  valuePath: string;
}
const ConfirmationCode = ({
  codeType,
  descriptionTKey,
  handleChange,
  hasCodeBeenChecked,
  nextStepCb,
  sendCodeCb,
  setCodeChecked,
  title,
  tValues,
  value,
  valuePath,
}: IConfirmationCodeProps) => {
  const { t } = useTranslation();

  const [isCodeValid, setIsCodeValid] = useState(true);
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
    refetch: checkCode,
    isFetching: isCodeChecking,
  } = useQuery({
    queryKey: ['checkCode'],
    queryFn: async () => {
      await apiPost({
        url: `${EP_OTP}/${codeType}`,
        data: {
          otpToken: value,
          ...values,
        },
      });

      setCodeChecked();
      nextStepCb();

      setIsCodeValid(true);
      return {};
    },
    enabled: false,
  });

  const {
    refetch: sendCode,
  } = useQuery({
    queryKey: ['resendCode'],
    queryFn: () => {
      sendCodeCb?.();

      toggleTimer();

      return null;
    },
    enabled: false,
  });

  useEffect(() => {
    if (isCodeLenghtValid) {
      if (hasCodeBeenChecked) nextStepCb();
      else checkCode();
    }
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

  useEffect(toggleTimer, []);

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
        className="max-w-[75%]"
        codeLenght={CODE_LENGHT}
        disabled={isCodeChecking}
        error={isCodeValid ? '' : t('authModal.signup.invalidCode')}
        onChange={(value) => handleChange(valuePath, value)}
        type="confirmation-code"
        value={value || ''}
      />
      <Button
        label={t('authModal.signup.resend', {
          article: isTimerRolling ? t('authModal.signup.resendIn') : '',
          time: time > 0
            ? ` 00:${time.toString().padStart(2, '0')}`
            : '',
        })}
        ariaLabel="resend-code"
        disabled={isTimerRolling}
        status={isCodeValid ? 'default' : 'error'}
        onClick={() => {
          setIsCodeValid(true);
          handleChange(valuePath, '');
          if (!hasCodeBeenChecked) sendCode();
        }}
        isLoading={isCodeChecking}
      />
    </>
  );
};

export default ConfirmationCode;

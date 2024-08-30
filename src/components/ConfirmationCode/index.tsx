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
  hasCodeBeenChecked: boolean;
  setCodeChecked: () => void;
  nextStepCb: () => void;
  valuePath: string;
}
const ConfirmationCode = ({
  descriptionTKey,
  handleChange,
  hasCodeBeenChecked,
  nextStepCb,
  setCodeChecked,
  title,
  tValues,
  value,
  valuePath,
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
      const res = true;

      if (res) {
        setCodeChecked();
        nextStepCb();
      }

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
      // TODO insert here the logic to send the code (api call towards lambda-twilio)

      toggleTimer();

      return null;
    },
    enabled: !hasCodeBeenChecked,
  });

  useEffect(() => {
    if (isCodeLenghtValid && !hasCodeBeenChecked) checkCode();
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
        onChange={(value) => handleChange(valuePath, value)}
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
        onClick={() => {
          handleChange('signup.confirmationEmailCode', '');
          sendCode();
        }}
        isLoading={isCodeChecking}
      />
    </>
  );
};

export default ConfirmationCode;

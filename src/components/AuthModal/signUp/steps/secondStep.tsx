import { Trans, useTranslation } from 'react-i18next';
import {
  Body2, Button, H2, Input,
} from '@dedo_ai/gui-com-lib';

interface ISecondStepProps {
  formData: any;
  handleChange: (_key: string, _value: string) => void;
  errors: any;
}
export const SecondStep = ({
  formData,
  handleChange,
  errors,
}: ISecondStepProps) => {
  const baseT = 'authModal.signup';
  const { t } = useTranslation();

  const { email, emailCode } = formData;

  return (
    <>
      <H2 content={t(`${baseT}.confirmEmailLabel`)} />
      <Body2 className="text-text-bright dark:text-text-gloomy">
        <Trans
          i18nKey={`${baseT}.confirmEmailDescription`}
          values={{ email }}
          components={{ span: <Body2 weight="medium" className="text-primary" /> }}
        />
      </Body2>
      <Input
        ariaLabel="email-code"
        onChange={(value) => handleChange('emailCode', value)}
        type="confirmation-code"
        value={emailCode}
        error={errors?.emailCode?.message}
        className="max-w-[60%]"
      />
      <Button
        text={t(`${baseT}.resendEmailCode`)}
        ariaLabel="resend-email"
        variant="secondary"
      />
    </>
  );
};

export default SecondStep;

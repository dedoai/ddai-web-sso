import { Trans, useTranslation } from 'react-i18next';
import { Button, Input } from '@dedo_ai/gui-com-lib';

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
      <h1 className="text-2xl font-bold mb-6">{t(`${baseT}.confirmEmailLabel`)}</h1>
      <p className="mb-6 text-contrast/70">
        <Trans
          i18nKey={`${baseT}.confirmEmailDescription`}
          values={{ email }}
          components={{ span: <span className="font-bold" /> }}
        />
      </p>
      <Input
        ariaLabel="email"
        onChange={(e) => handleChange('emailCode', e.target.value)}
        type="number"
        value={emailCode}
        error={errors?.emailCode?.message}
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

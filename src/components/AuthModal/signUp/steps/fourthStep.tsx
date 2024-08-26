import { Trans, useTranslation } from 'react-i18next';
import { Input } from '@dedo_ai/gui-com-lib';

interface IThirdStepProps {
  formData: any;
  handleChange: (_key: string, _value: string) => void;
  errors: any
}
export const FourthStep = ({
  formData,
  handleChange,
  errors,
}: IThirdStepProps) => {
  const baseT = 'authModal.signup';
  const { t } = useTranslation();

  const { phoneNumber, phoneNumberCode, phoneNumberPrefix } = formData;

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">{t(`${baseT}.confirmPhoneNumberLabel`)}</h1>
      <p className="mb-6 text-contrast/70">
        <Trans
          i18nKey={`${baseT}.confirmPhoneNumberDescription`}
          values={{ phoneNumber, phoneNumberPrefix }}
          components={{ span: <span className="font-bold" /> }}
        />
      </p>
      <Input
        applyPatternCheck
        ariaLabel="phoneNumber-confirm"
        error={errors?.phoneNumberCode?.message}
        onChange={(e) => handleChange('phoneNumberCode', e.target.value)}
        type="text"
        value={phoneNumberCode}
      />
    </>
  );
};

export default FourthStep;

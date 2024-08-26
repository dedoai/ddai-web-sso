import { useTranslation } from 'react-i18next';
import { Input } from '@dedo_ai/gui-com-lib';

interface IFifthStepProps {
  formData: any;
  handleChange: (_key: string, _value: string) => void;
  errors: any;
}
export const FifthStep = ({
  formData,
  handleChange,
  errors,
}: IFifthStepProps) => {
  const baseT = 'authModal.signup';
  const { t } = useTranslation();

  const { password, confirmPassword } = formData;

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">{t(`${baseT}.createPassword`)}</h1>
      <Input
        ariaLabel="password"
        onChange={(e) => handleChange('password', e.target.value)}
        placeholder={t(`${baseT}.passwordPlaceholder`)}
        type="password"
        value={password}
        error={errors?.password?.message}
      />
      <Input
        ariaLabel="password-confirm"
        onChange={(e) => handleChange('confirmPassword', e.target.value)}
        placeholder={t(`${baseT}.confirmPasswordPlaceholder`)}
        type="password"
        value={confirmPassword}
        className="mt-4"
        error={errors?.confirmPassword?.message}
      />
    </>
  );
};

export default FifthStep;

import { useTranslation } from 'react-i18next';
import { Body2, H2, Input } from '@dedo_ai/gui-com-lib';

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
      <H2 content={t(`${baseT}.createPassword`)} />
      <Body2
        className="text-text-bright dark:text-text-gloomy"
        content={t(`${baseT}.createPasswordDescription`)}
      />
      <div>

        <Input
          ariaLabel="password"
          label={t(`${baseT}.password`)}
          mandatory
          onChange={(e) => handleChange('signup.password', e.target.value)}
          placeholder={t(`${baseT}.enterYourPassword`)}
          type="password"
          value={password}
          error={errors?.password?.message}
          auxiliary={t(`${baseT}.passwordPlaceholder`)}
        />
        <Input
          ariaLabel="password-confirm"
          label={t(`${baseT}.confirmPasswordPlaceholder`)}
          mandatory
          onChange={(e) => handleChange('signup.confirmPassword', e.target.value)}
          placeholder={t(`${baseT}.enterYourPassword`)}
          type="password"
          value={confirmPassword}
          className="mt-4"
          error={errors?.confirmPassword?.message}
        />
      </div>
    </>
  );
};

export default FifthStep;

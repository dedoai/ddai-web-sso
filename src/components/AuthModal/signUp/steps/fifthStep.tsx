import { useTranslation } from 'react-i18next';
import { Body2, H2, Input } from '@dedo_ai/gui-com-lib';

interface IFifthStepProps {
  formData: any;
  handleChange: (_key: string, _value: string) => void;
  errors: any;
  isResetPassword?: boolean;
  disabled?: boolean;
}
export const FifthStep = ({
  formData,
  handleChange,
  errors,
  isResetPassword,
  disabled,
}: IFifthStepProps) => {
  const baseT = 'authModal.signup';
  const { t } = useTranslation();

  const { password, confirmPassword } = formData;

  const formDataBasePath = isResetPassword ? 'resetPassword' : 'signup';

  return (
    <>
      {
        isResetPassword
          ? null
          : (
            <>
              <H2 content={t(`${baseT}.createPassword`)} />
              <Body2
                className="text-text-bright dark:text-text-gloomy"
                content={t(`${baseT}.createPasswordDescription`)}
              />
            </>
          )
      }

      <div>
        <Input
          ariaLabel="password"
          label={t(`${baseT}.password`)}
          mandatory
          onChange={(e) => handleChange(`${formDataBasePath}.password`, e.target.value)}
          placeholder={t(`${baseT}.enterYourPassword`)}
          type="password"
          value={password}
          error={errors?.[`${formDataBasePath}.password`]?.message}
          auxiliary={t(`${baseT}.passwordPlaceholder`)}
          disabled={disabled}
        />
        <Input
          ariaLabel="password-confirm"
          label={t(`${baseT}.confirmPasswordPlaceholder`)}
          mandatory
          onChange={(e) => handleChange(`${formDataBasePath}.confirmPassword`, e.target.value)}
          placeholder={t(`${baseT}.enterYourPassword`)}
          type="password"
          value={confirmPassword}
          className="mt-4"
          error={errors?.[`${formDataBasePath}.confirmPassword`]?.message}
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default FifthStep;

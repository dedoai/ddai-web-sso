import { useTranslation } from 'react-i18next';
import { Checkbox, H2, Input } from '@dedo_ai/gui-com-lib';

interface IFirstStepProps {
  formData: any;
  handleChange: (_key: string, _value: string) => void;
  errors: any;
}
export const FirstStep = ({
  formData,
  handleChange,
  errors,
}: IFirstStepProps) => {
  const baseT = 'authModal.signup';
  const { t } = useTranslation();
  console.log('>>', errors);
  return (
    <>
      <H2 content={t(`${baseT}.emailLabel`)} />
      <Input
        ariaLabel="email"
        error={errors?.['signup.email']?.message}
        label={t(`${baseT}.emailPlaceholder`)}
        mandatory
        onChange={(e) => handleChange('signup.email', e.target.value)}
        placeholder={t(`${baseT}.emailPlaceholder`)}
        type="email"
        value={formData.email}
      />
      <Checkbox
        label={t(`${baseT}.acceptNewsletter`)}
        labelClassName="text-text-bright dark:text-text-gloomy max-w-[330px]"
      />
    </>
  );
};

export default FirstStep;

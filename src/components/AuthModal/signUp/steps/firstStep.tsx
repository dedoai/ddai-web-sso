import { useTranslation } from 'react-i18next';
import { Input } from '@dedo_ai/gui-com-lib';

import SocialSignIn from '@/components/AuthModal/signIn/social';

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

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">{t(`${baseT}.emailLabel`)}</h1>
      <Input
        ariaLabel="email"
        onChange={(e) => handleChange('email', e.target.value)}
        placeholder={t(`${baseT}.emailPlaceholder`)}
        type="email"
        value={formData.email}
        error={errors?.email?.message}
      />
      <p className="text-center font-light mb-4">
        {t(`${baseT}.orSignWith`)}
      </p>
      <SocialSignIn mode="minimal" />
    </>
  );
};

export default FirstStep;

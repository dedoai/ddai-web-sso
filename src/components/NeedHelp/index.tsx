import { useTranslation } from 'react-i18next';
import { Body2 } from '@dedo_ai/gui-com-lib';

import { PHASE_CONTACT_US } from '@/components/AuthModal';

interface INeedHelpProps {
  disabled?: boolean;
  handlePhase: (_phase: string) => void;
}
const NeedHelp = ({
  disabled,
  handlePhase,
}: INeedHelpProps) => {
  const { t } = useTranslation();
  return (
    <Body2
      className="inline-flex gap-1 justify-center text-text-bright dark:text-text-gloomy"
    >
      {t('authModal.signup.needHelp')}
      <Body2
        as="span"
        className={`text-primary ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        content={t('authModal.signup.contactUs')}
        weight="medium"
        onClick={() => (disabled ? null : handlePhase(PHASE_CONTACT_US))}
      />
    </Body2>
  );
};

export default NeedHelp;

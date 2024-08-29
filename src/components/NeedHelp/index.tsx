import { useTranslation } from 'react-i18next';
import { Body2 } from '@dedo_ai/gui-com-lib';

const NeedHelp = () => {
  const { t } = useTranslation();
  return (
    <Body2
      className="inline-flex gap-1 justify-center text-neutral-base"
    >
      {t('authModal.signup.needHelp')}
      <Body2 as="span" className="text-primary cursor-pointer" content={t('authModal.signup.contactUs')} weight="medium" />
    </Body2>
  );
};

export default NeedHelp;

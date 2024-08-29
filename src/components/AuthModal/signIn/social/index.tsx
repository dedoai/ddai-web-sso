import { useTranslation } from 'react-i18next';
import { Body2, Button } from '@dedo_ai/gui-com-lib';

import { PHASE_SIGNIN_EMAIL, PHASE_SIGNUP } from '@/components/AuthModal';

const SOCIAL_BUTTONS: string[] = ['facebook', 'google', 'apple'];

interface ISocialSignInProps {
  handlePhase?: (_phase: string) => void;
  mode?: 'minimal' | 'default';
}
export const SocialSignIn = ({
  handlePhase,
  mode = 'default',
}: ISocialSignInProps) => {
  const baseT = 'authModal.social';
  const { t } = useTranslation();

  const isMinimalMode = mode === 'minimal';

  return (
    <>
      <div className={`flex gap-4 ${isMinimalMode ? 'justify-center flex-wrap' : 'flex-col'}`}>
        {
          SOCIAL_BUTTONS.map((buttonId) => (
            <Button
              variant="secondary"
              key={buttonId}
              customIcon={<img src={`/assets/${buttonId}.svg`} alt="" />}
              ariaLabel={buttonId}
              size="lg"
              text={isMinimalMode ? '' : t(`${baseT}.${buttonId}`)}
            />
          ))
        }
      </div>

      {
        isMinimalMode
          ? null
          : (
            <>

              <Body2
                className="inline-flex gap-1 justify-center text-text-bright dark:text-text-gloomy"
              >
                {t(`${baseT}.signup`)}
                <Body2
                  className="text-primary cursor-pointer"
                  content={t('authModal.signin.email')}
                  onClick={() => handlePhase(PHASE_SIGNUP)}
                  weight="medium"
                />
              </Body2>
              <Body2
                className="inline-flex gap-1 justify-center text-text-bright dark:text-text-gloomy"
              >
                {t(`${baseT}.signin`)}
                <Body2
                  className="text-primary cursor-pointer"
                  content={t('authModal.signin.login')}
                  onClick={() => handlePhase(PHASE_SIGNIN_EMAIL)}
                  weight="medium"
                />
              </Body2>
            </>
          )
      }

    </>
  );
};

export default SocialSignIn;

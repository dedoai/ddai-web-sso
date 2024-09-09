import { useTranslation } from 'react-i18next';
import { Body2 } from '@dedo_ai/gui-com-lib';

import { SOCIAL_BUTTONS } from '@/App';
import { PHASE_SIGNIN_EMAIL, PHASE_SIGNUP } from '@/components/AuthModal';

import AppleButton from './apple';
import FacebookButton from './fb';
import GoogleButton from './google';

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
      <>
        {
          SOCIAL_BUTTONS.map((buttonId) => (
            <div key={buttonId} className={`flex gap-[10px] ${isMinimalMode ? 'justify-center flex-wrap' : 'flex-col'}`}>
              {buttonId === 'facebook' ? <FacebookButton isMinimalMode={isMinimalMode} /> : null}
              {buttonId === 'google' ? <GoogleButton isMinimalMode={isMinimalMode} /> : null}
              {buttonId?.split('-')[0] === 'apple' ? <AppleButton buttonId={buttonId} isMinimalMode={isMinimalMode} /> : null}
            </div>
          ))
        }
      </>
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
                  as="span"
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
                  as="span"
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

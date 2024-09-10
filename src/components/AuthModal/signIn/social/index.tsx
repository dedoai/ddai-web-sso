import { useTranslation } from 'react-i18next';
import { Body2 } from '@dedo_ai/gui-com-lib';
import { GoogleOAuthProvider } from '@react-oauth/google';

import SocialButton from '@/components/SocialButton';
import { PHASE_SIGNIN_EMAIL, PHASE_SIGNUP } from '@/consts';
import { SOCIAL_BUTTONS } from '@/utils';

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
      <div className={`flex gap-[10px] ${isMinimalMode ? 'justify-center flex-wrap' : 'flex-col'}`}>
        {SOCIAL_BUTTONS.map((socialButton, i) => {
          const toRender = (
            <SocialButton
              key={`social-login-${i}`}
              {...socialButton}
              isMinimalMode={isMinimalMode}
            />
          );
          return socialButton.id === 'google' ? (
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} key={`social-login-${i}`}>
              {toRender}
            </GoogleOAuthProvider>
          ) : toRender;
        })}
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

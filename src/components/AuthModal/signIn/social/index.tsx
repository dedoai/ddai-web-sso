import { useTranslation } from 'react-i18next';

import { PHASE_SIGNIN_EMAIL, PHASE_SIGNUP } from '@/components/AuthModal';
import SocialButton from '@/components/SocialButton';

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
            <SocialButton
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
              <p className="text-center">
                {t(`${baseT}.signup`)}
                &nbsp;
                <span
                  className="cursor-pointer"
                  style={{
                    color: 'rgba(var(--color-primary-bright), 1)',
                  }}
                  onClick={() => handlePhase(PHASE_SIGNUP)}
                >
                  {t('authModal.signin.email')}
                </span>
              </p>
              <p className="text-center">
                {t(`${baseT}.signin`)}
                &nbsp;
                <span
                  className="cursor-pointer"
                  style={{
                    color: 'rgba(var(--color-primary-bright), 1)',
                  }}
                  onClick={() => handlePhase(PHASE_SIGNIN_EMAIL)}
                >
                  {t('authModal.signin.login')}
                </span>
              </p>
            </>
          )
      }

    </>
  );
};

export default SocialSignIn;

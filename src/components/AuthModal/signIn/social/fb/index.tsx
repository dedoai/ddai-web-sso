import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@dedo_ai/gui-com-lib';

interface IFacebookButton {
  isMinimalMode: boolean
}

const FacebookButton = ({
  isMinimalMode,
}:IFacebookButton) => {
  const baseT = 'authModal.social';
  const { t } = useTranslation();
  const buttonId = 'facebook';

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: import.meta.env.VITE_FB_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v17.0',
      });

      window.FB.AppEvents.logPageView();
    };

    (function loadFBSDK(d, s, id) {
      const js: any = d.createElement(s);
      const fjs: any = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const handleLogin = () => {
    window.FB.login((response: any) => {
      if (response.authResponse) {
        console.log('facebook successfully logged in', response);
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'public_profile,email' });
  };

  return (
    <Button
      variant="secondary"
      key={buttonId}
      customIcon={<img src={`/assets/${buttonId}.svg`} alt={buttonId} />}
      ariaLabel={buttonId}
      size="lg"
      text={isMinimalMode ? '' : t(`${baseT}.${buttonId}`)}
      onClick={handleLogin}
    />
  );
};

export default FacebookButton;

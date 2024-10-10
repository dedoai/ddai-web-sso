import { type ISocialButtonProps } from '@/components/SocialButton';

import { emit, EMIT_TYPE_SIGNIN } from './emitterHandler';
import { theme } from './urlParams';

export const SOCIAL_BUTTONS: Omit<ISocialButtonProps, 'isMinimalMode'>[] = [
  {
    id: 'facebook',
    initCb: () => {
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
    },
    loginCb: () => {
      window.FB.login((response: any) => {
        if (response.authResponse) {
          console.log('facebook successfully logged in', response);
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      }, { scope: 'public_profile,email' });
    },
  },
  {
    id: 'google',
    initHookCb: () => ({
      name: 'google-hook',
      overloadLoginCb: true,
      args: {
        onSuccess: (res) => {
          const { access_token: accessToken, expires_in: expiresIn } = res ?? {};
          if (accessToken && expiresIn) emit(EMIT_TYPE_SIGNIN, { access_token: accessToken, expires_in: expiresIn });
        },
      },
    }),
  },
  {
    id: `apple-${theme}`,
    initCb: () => {},
  },
];

export default SOCIAL_BUTTONS;

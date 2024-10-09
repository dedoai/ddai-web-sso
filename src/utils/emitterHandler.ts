const trustedDomains: string = import.meta.env.VITE_TRUSTED_DOMAINS;

export const EMIT_TYPE_MODAL_CLOSE = 'sso-modal-close';
export const EMIT_TYPE_SIGNIN = 'sso-signin';

export const emit = (eventName: string, data?: any) => {
  trustedDomains
    ?.split(',')
    ?.forEach((domain) => {
      window.parent.postMessage({
        type: eventName,
        data,
      }, domain);
    });
};

export default { emit };

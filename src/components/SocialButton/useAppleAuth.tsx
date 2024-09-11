import { appleAuthHelpers, useScript } from 'react-apple-signin-auth';

const useAppleAuth = (): void => {
  useScript(appleAuthHelpers.APPLE_SCRIPT_SRC);
};

export default useAppleAuth;

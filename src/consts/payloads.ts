// Payloads paths
export const PAYLOAD_CONTACT_US = 'contactUs';
export const PAYLOAD_FORGOT_PASSWORD = 'forgotPassword';
export const PAYLOAD_RESET_PASSWORD = 'resetPassword';
export const PAYLOAD_SIGNIN = 'signin';
export const PAYLOAD_SIGNUP = 'signup';

// Properties
export const PR_CONFIRM_PASSWORD = 'confirmPassword';
export const PR_CONFIRMATION_EMAIL_CODE = 'confirmationEmailCode';
export const PR_CONFIRMATION_PHONE_NUMBER_CODE = 'confirmationPhoneNumberCode';
export const PR_EMAIL = 'email';
export const PR_HAS_EMAIL_CODE_BEEN_CHECKED = 'hasEmailCodeBeenChecked';
export const PR_HAS_PHONE_NUMBER_CODE_BEEN_CHECKED = 'hasPhoneNumberCodeBeenChecked';
export const PR_MESSAGE = 'message';
export const PR_NAME = 'name';
export const PR_PASSWORD = 'password';
export const PR_PHONE_NUMBER = 'phoneNumber';
export const PR_PHONE_NUMBER_PREFIX = 'phoneNumberPrefix';
export const PR_SMS = 'sms';
export const PR_SURNAME = 'surname';

// Interfaces
export interface IFormData {
  signin: {
    email: string;
    password: string;
  },
  signup: {
    confirmationEmailCode: string;
    confirmationPhoneNumberCode: string;
    confirmPassword: string;
    email: string;
    hasEmailCodeBeenChecked: boolean;
    hasPhoneNumberCodeBeenChecked: boolean;
    password: string;
    phoneNumber: string;
    phoneNumberPrefix: string;
  },
  forgotPassword: {
    email: string;
  },
  contactUs: {
    email: string;
    message: string;
    name: string;
    surname: string;
  },
  resetPassword: {
    password: string;
    confirmPassword: string;
  }
}

// Initial datas
export const INITIAL_DATA = {
  [PAYLOAD_SIGNIN]: {
    [PR_EMAIL]: '',
    [PR_PASSWORD]: '',
  },
  [PAYLOAD_SIGNUP]: {
    [PR_CONFIRM_PASSWORD]: '',
    [PR_CONFIRMATION_EMAIL_CODE]: '',
    [PR_CONFIRMATION_PHONE_NUMBER_CODE]: '',
    [PR_EMAIL]: '',
    [PR_HAS_EMAIL_CODE_BEEN_CHECKED]: false,
    [PR_HAS_PHONE_NUMBER_CODE_BEEN_CHECKED]: false,
    [PR_PASSWORD]: '',
    [PR_PHONE_NUMBER_PREFIX]: '',
    [PR_PHONE_NUMBER]: '',
  },
  [PAYLOAD_FORGOT_PASSWORD]: {
    [PR_EMAIL]: '',
  },
  [PAYLOAD_CONTACT_US]: {
    [PR_EMAIL]: '',
    [PR_MESSAGE]: '',
    [PR_NAME]: '',
    [PR_SURNAME]: '',
  },
  [PAYLOAD_RESET_PASSWORD]: {
    [PR_PASSWORD]: '',
    [PR_CONFIRM_PASSWORD]: '',
  },
};

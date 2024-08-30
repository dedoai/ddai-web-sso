import { t } from 'i18next';
import { boolean, object, string } from 'yup';

const schema = () => {
  const baseT = 'authModal.signup';

  const isRequired = (field: string) => t('main.forms.isRequired', { field });

  const enterValidCode = t(`${baseT}.enterValidCode`);

  return {
    firstStep: object().shape({
      signup: object().shape({
        email: string()
          .email(t(`${baseT}.enterValidEmail`))
          .required(isRequired(t(`${baseT}.emailPlaceholder`))),
      }),
    }),
    secondStep: object()
      .shape({
        emailCode: string(),
      }),
    thirdStep: object()
      .shape({
        phoneNumberPrefix: string().required(isRequired(t(`${baseT}.phoneNumberPrefix`))),
        phoneNumber: string().required(isRequired(t(`${baseT}.phoneNumber`))),
        smsNotSent: boolean()
          .when('$hasSmsBeenSent', ([hasSmsBeenSent], schema) => {
            if (!hasSmsBeenSent) return schema.required(t(`${baseT}.sendSmsFirst`));
            return schema;
          }),
      }),
    fourthStep: object()
      .shape({
        phoneNumberCode: string()
          .min(6, enterValidCode)
          .max(6, enterValidCode)
          .required(enterValidCode),
      }),
    fifthStep: object()
      .shape({
        password: string()
          .min(8, t(`${baseT}.passwordPlaceholder`))
          .required(isRequired(t(`${baseT}.password`))),
        confirmPassword: string()
          .test('passwords-match', t(`${baseT}.passwordsDontMatch`), (value, context) => value === context.parent.password)
          .required(t(`${baseT}.pleaseRepeatPassword`)),
      }),
  };
};

export default schema;

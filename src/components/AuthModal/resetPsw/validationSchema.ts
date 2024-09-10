import { t } from 'i18next';
import { object, string } from 'yup';

const schema = () => {
  const baseT = 'authModal.signup';

  const isRequired = (field: string) => t('main.forms.isRequired', { field });

  return object()
    .shape({
      resetPassword: object()
        .shape({
          password: string()
            .min(8, t(`${baseT}.passwordPlaceholder`))
            .required(isRequired(t(`${baseT}.password`))),
          confirmPassword: string()
            .test('passwords-match', t(`${baseT}.passwordsDontMatch`), (value, context) => value === context.parent.password)
            .required(t(`${baseT}.pleaseRepeatPassword`)),
        }),
    });
};

export default schema;

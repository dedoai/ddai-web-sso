import { t } from 'i18next';
import { object, string } from 'yup';

const schema = () => {
  const baseT = 'authModal.signup';

  const isRequired = (field: string) => t('main.forms.isRequired', { field });

  return object()
    .shape({
      signin: object()
        .shape({
          email: string()
            .email(t(`${baseT}.enterValidEmail`))
            .required(isRequired(t(`${baseT}.emailPlaceholder`))),
          password: string().required(isRequired(t(`${baseT}.password`))),
        }),
    });
};

export default schema;

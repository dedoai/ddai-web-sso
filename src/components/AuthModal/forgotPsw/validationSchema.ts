import { t } from 'i18next';
import { object, string } from 'yup';

const schema = () => {
  const baseT = 'authModal.forgotPassword';

  const isRequired = (field: string) => t('main.forms.isRequired', { field });

  return object()
    .shape({
      forgotPassword: object()
        .shape({
          email: string()
            .email(t('main.forms.valid', { field: t(`${baseT}.email`).toLowerCase() }))
            .required(isRequired(t(`${baseT}.email`))),
        }),
    });
};

export default schema;

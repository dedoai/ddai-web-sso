import { t } from 'i18next';
import { object, string } from 'yup';

const schema = () => {
  const baseT = 'authModal.contactUs';

  const isRequired = (field: string) => t('main.forms.isRequired', { field });

  return object()
    .shape({
      contactUs: object()
        .shape({
          name: string().required(isRequired(t(`${baseT}.name`))),
          surname: string().required(isRequired(t(`${baseT}.surname`))),
          email: string()
            .email(t('main.forms.valid', { field: t(`${baseT}.email`).toLowerCase() }))
            .required(isRequired(t(`${baseT}.email`))),
          message: string().required(isRequired(t(`${baseT}.message`))),
        }),
    });
};

export default schema;

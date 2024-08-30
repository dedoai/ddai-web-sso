import { useTranslation } from 'react-i18next';
import {
  Flag, Input,
} from '@dedo_ai/gui-com-lib';

import useCountry from '@/hook/useCountry';

interface IThirdStepProps {
  formData: any;
  handleChange: (_key: string, _value: string) => void;
  errors: any;
}
export const ThirdStep = ({
  formData,
  handleChange,
  errors,
}: IThirdStepProps) => {
  const baseT = 'authModal.signup';
  const { t } = useTranslation();

  const { phoneNumber } = formData;

  const {
    countries,
  } = useCountry();

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">{t(`${baseT}.insertPhoneNumber`)}</h1>
      <Input
        ariaLabel="phoneNumber"
        onChange={(e) => {
          const { value } = e.target;
          const valueLen = value.length;
          if (valueLen <= 10) handleChange('signup.phoneNumber', value);
          if (valueLen === 2) handleChange('signup.phoneNumber', `${value} | `);
        }}
        type="text"
        value={phoneNumber}
        applyPatternCheck
        error={errors?.['signup.phoneNumber']?.message}
        prefix={(
          <div className="flex gap-2 items-center -mr-2">
            <Flag
              code={
                countries
                  .find(({ dial_code: dialCode }) => dialCode === phoneNumber)
                  ?.code
              }
              size="md"
            />
            +
          </div>
        )}
      />
    </>
  );
};

export default ThirdStep;

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Body2,
  Flag, H2, Input,
} from '@dedo_ai/gui-com-lib';

import { IFormData } from '@/components/AuthModal';
import useCountry, { Country } from '@/hook/useCountry';

const Prefix = ({ countries, prefixToCheck, resetCb }: {countries: Country[], prefixToCheck: string, resetCb: () => void}) => (
  <div className="flex items-center gap-1 cursor-pointer" onClick={resetCb}>
    <Flag
      code={
        countries
          .find(({ dial_code: dialCode }) => dialCode === prefixToCheck)
          ?.code
      }
      size="md"
    />
    <Body2 content={prefixToCheck} />
  </div>
);

interface IThirdStepProps {
  formData: IFormData['signup'];
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

  const {
    phoneNumber,
    phoneNumberPrefix,
  } = formData;

  const [prefix, setPrefix] = useState(phoneNumberPrefix);

  const {
    countries,
    prefixes,
  } = useCountry();

  prefixes?.unshift('+0prefix');

  const error = errors?.['signup.phoneNumberPrefix'] || errors?.['signup.phoneNumber'];

  return (
    <>
      <H2 content={t(`${baseT}.enterPhoneNumber`)} />
      <Body2
        content={t(`${baseT}.enterPhoneNumberDescription`)}
        className="text-text-bright dark:text-text-gloomy"
      />
      <Input
        ariaLabel="phoneNumber"
        label={t(`${baseT}.phoneNumber`)}
        onChange={(e) => {
          const { value } = e.target;
          const valueLen = value.length;
          if (valueLen <= 21) handleChange('signup.phoneNumber', value);
        }}
        type="text"
        value={phoneNumber}
        error={error?.message}
        prefixClassName={prefix ? '' : 'ml-0 w-[30%]'}
        mandatory
        prefix={prefix
          ? (
            <Prefix
              countries={countries}
              prefixToCheck={prefix}
              resetCb={() => setPrefix('')}
            />
          )
          : (
            <Input
              type="select"
              ariaLabel="prefix-dropdown"
              wrapped={false}
              onSelect={(selectedPrefix) => {
                setPrefix(selectedPrefix);
                handleChange('signup.phoneNumberPrefix', selectedPrefix);
              }}
              style={{
                outline: 'none',
              }}
              options={prefixes
                ?.map((_prefix: string) => ({
                  label: _prefix === '+0prefix'
                    ? t(`${baseT}.phoneNumberPrefix`)
                    : (
                      <div className="inline-flex items-center gap-1">
                        <Flag
                          code={
                            countries
                              .find(({ dial_code: dialCode }) => dialCode === _prefix)
                              ?.code
                          }
                          size="md"
                        />
                        <Body2 content={_prefix} />
                      </div>
                    ),
                  value: _prefix,
                }))}
            />
          )}
      />
    </>
  );
};

export default ThirdStep;

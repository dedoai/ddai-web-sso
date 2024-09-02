import { useQuery } from '@tanstack/react-query';

export type Country = {
  name: string;
  dial_code: string;
  code: string;
}
const useCountry = () => {
  const {
    data: countries,
  } = useQuery({
    queryKey: ['getCountries'],
    queryFn: async () => {
      const res = await fetch('/country/countries.json', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return res.json();
    },
    initialData: [],
  });

  const getPrefixes = () => countries.map(({ dial_code: dialCode }: Country) => (dialCode));
  const getCountryCodes = () => countries.map(({ code }: Country) => (code));

  return {
    countries,
    countryCodes: getCountryCodes()?.sort((a: string, b: string) => a.localeCompare(b)),
    prefixes: getPrefixes()?.sort((a: string, b: string) => a.localeCompare(b)),
  };
};

export default useCountry;

import { CountriesMap, CountryConfig } from '../types';

export const COUNTRIES: CountriesMap = {
  INDIA: {
    name: 'India',
    tdsRate: 0.10,
  },
  UNITED_STATES: {
    name: 'United States',
    tdsRate: 0.12,
  },
};

/**
 * Returns the TDS rate for a given country name.
 * Returns 0 for countries not listed (no deductions).
 */
export function getTdsRate(countryName: string): number {
  const country: CountryConfig | undefined = Object.values(COUNTRIES).find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase()
  );
  return country ? country.tdsRate : 0;
}

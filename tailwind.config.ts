import { tailwindConfig as guiTailwindConfig } from '@dedo_ai/gui-com-lib';

import { type Config } from 'tailwindcss';

export const tailwindConfig: Config = {
  presets: [
    guiTailwindConfig,
  ],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};

export default tailwindConfig;

import nextVitals from 'eslint-config-next/core-web-vitals';
import tailwind from 'eslint-plugin-tailwindcss';

const config = [
  ...nextVitals,
  ...tailwind.configs['flat/recommended'],
  {
    ignores: ['sanity.types.ts'],
    rules: {
      'react-hooks/static-components': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',
    },
  },
];

export default config;

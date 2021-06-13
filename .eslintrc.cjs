const OFF = 0;
const WARN = 1;

// eslint-disable-next-line max-len
/** @type {import('eslint').Linter.Config & { parserOptions: import('@typescript-eslint/types').ParserOptions }} */
module.exports = {
  root: true,
  reportUnusedDisableDirectives: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    extraFileExtensions: ['.mjs', '.cjs'],
    project: ['./test/tsconfig.json'],
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  // add .tsx to airbnb-typescript/base
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
  rules: {
    // used safely in this project
    '@typescript-eslint/no-non-null-assertion': OFF,
    'no-plusplus': OFF,
    'no-restricted-globals': WARN,
  },
  overrides: [
    {
      files: ['test/**'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      rules: {
        '@typescript-eslint/unbound-method': 'off', // replaced by jest/unbound-method
        'jest/unbound-method': 'error',
      },
    },
  ],
};

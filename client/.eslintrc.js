module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'next',
    'next/core-web-vitals',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'import',
    'simple-import-sort',
    '@typescript-eslint',
    'testing-library',
  ],
  rules: {
    // React
    'react/jsx-filename-extension': ['warn', { extensions: ['.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/display-name': 'off',

    // TypeScript
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Imports
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never', tsx: 'never' },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    // Others
    'jsx-a11y/anchor-is-valid': 'off',
    'no-underscore-dangle': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
        moduleDirectory: ['node_modules', '../node_modules', '.'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // TypeScript Recommended
        'no-undef': 'off',
      },
    },
    {
      files: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)',
        'test-utils.tsx',
      ],
      extends: ['plugin:jest-dom/recommended', 'plugin:testing-library/react'],
      plugins: ['jest-dom', 'testing-library'],
      rules: {
        // Testing
        'testing-library/await-async-query': 'error',
        'testing-library/no-await-sync-query': 'error',
        'testing-library/no-debug': 'warn',
        'testing-library/no-dom-import': 'off',
        'testing-library/prefer-screen-queries': 'off',
        'testing-library/no-node-access': 'off',

        'jest-dom/prefer-checked': 'error',
        'jest-dom/prefer-enabled-disabled': 'error',
        'jest-dom/prefer-required': 'error',
        'jest-dom/prefer-to-have-attribute': 'error',

        // Import
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-hooks', 'jsx-a11y', 'import', '@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'comma-dangle': 'off',
    'multiline-ternary': 'off',
    'no-use-before-define': 'off',
    'space-before-function-paren': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': 1,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'import/no-cycle': 1,
    'import/order': 0,
    'import/imports-first': 0,
    'import/newline-after-import': ['error', { count: 1 }],
    'jsx-a11y/label-has-for': 0,
    'jsx-alignment': 0,
    'jsx-wrap-multiline': 0,
    'import/no-extraneous-dependencies': 0,
    'no-use-before-define': 0,
    'react/jsx-uses-vars': 2,
    'arrow-parens': 0,
    'no-implicit-dependencies': 0,
    'no-shadowed-variable': 0,
    'arrow-body-style': [2, 'as-needed'],
    'class-methods-use-this': 0,
  },
};

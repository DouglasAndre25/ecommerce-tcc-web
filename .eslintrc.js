module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: './',
      },
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'prettier', 'plugin:import/typescript'],
  overrides: [],
  parserOptions: {
    project: './tsconfig.eslint.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'import'],
  rules: {
    curly: ['error', 'all'],
    'no-use-before-define': 'off',
    'react/prop-types': 'off',
    'node/handle-callback-err': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'no-void': ['error', { allowAsStatement: true }],
    'no-throw-literal': 'off',
    'no-restricted-imports': [
      'error',
      {
        name: 'classnames',
        message: 'Please use clsx instead.',
      },
      {
        name: 'jquery',
        message:
          'jQuery is not allowed on this project, use React for virtual DOM manipulation. Manipulating DOM outside React would cause unpredictable behaviour.',
      },
    ],
  },
}

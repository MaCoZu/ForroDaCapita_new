// .eslintrc.cjs
/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier', // MUST be last to disable ESLint rules that conflict with Prettier
    'prettier/@typescript-eslint' // For TypeScript-specific rules
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // If you have a tsconfig.json, uncomment and update path:
    // project: './tsconfig.json',
    extraFileExtensions: ['.astro'],
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      extends: [
        // Add any React/Vue/Svelte specific ESLint configs here if applicable
      ],
    },
  ],
  rules: {
    // Add your custom ESLint rules here
  },
};
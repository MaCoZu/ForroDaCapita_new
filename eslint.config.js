// eslint.config.js
import pluginJs from '@eslint/js';
import parserTypeScript from '@typescript-eslint/parser';
import parserAstro from 'astro-eslint-parser';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import eslintPluginReact from 'eslint-plugin-react'; // Imported as object
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'; // Imported as object
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  // 1. Basic JavaScript rules (from ESLint itself)
  pluginJs.configs.recommended,

  // 2. TypeScript rules
  ...tseslint.configs.recommended, // Uses rules from @typescript-eslint/eslint-plugin
  {
    // Apply TypeScript rules to .js and .ts files
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Add or override TypeScript-specific rules here
      // Example: "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },

  // 3. Astro-specific rules
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: parserAstro,
      parserOptions: {
        parser: parserTypeScript,
        extraFileExtensions: ['.astro'],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Add or override Astro-specific rules here
    },
  },

  // 4. React-specific rules (since you're using React with Astro)
  {
    files: ['**/*.{jsx,tsx}'], // Apply to JSX/TSX files
    languageOptions: {
      parser: parserTypeScript, // React files (JSX/TSX) also use the TypeScript parser
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    // The plugins object is defined here, mapping prefixes to imported plugin objects
    plugins: {
      react: eslintPluginReact, // Correct way to add a plugin object
      'react-hooks': eslintPluginReactHooks, // Correct way to add a plugin object
    },
    rules: {
      // Apply rules using the plugin prefix defined above
      ...eslintPluginReact.configs.recommended.rules, // Apply recommended React rules
      ...eslintPluginReactHooks.configs.recommended.rules, // Apply recommended React Hooks rules

      'react/react-in-jsx-scope': 'off', // Not needed with React 17+ JSX transform
      'react/prop-types': 'off', // Often turned off when using TypeScript
    },
  },

  // 5. Prettier Integration (Ensure this comes last)
  eslintPluginPrettier,
];

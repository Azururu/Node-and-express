import js from '@eslint/js';
import globals from 'globals';
import {defineConfig} from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    env: {
      node: true,
      es2021: true
    },
    plugins: {js},
    extends: ['js/recommended'],
    languageOptions: {globals: globals.browser},
  },
]);

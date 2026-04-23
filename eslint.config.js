import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    js.configs.recommended,
    prettierConfig, // Ensures Prettier rules override ESLint
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': 'error', // Turn Prettier formatting issues into ESLint errors
            'no-unused-vars': 'warn',
        },
    },
];

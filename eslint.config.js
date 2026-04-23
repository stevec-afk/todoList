import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default [
    js.configs.recommended,
    prettierConfig, // Ensures Prettier rules override ESLint
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            "prettier/prettier": "error", // Turn Prettier formatting issues into ESLint errors
            "no-unused-vars": "warn",
        },
        languageOptions: {
            globals: {
                ...globals.browser, // Enables 'document', 'window', etc.
            },
        },
    },
];

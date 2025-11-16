// ESLint v9+ flat config for HTML files with inline JavaScript (CommonJS)
const html = require('eslint-plugin-html');
const htmlPlugin = require('@html-eslint/eslint-plugin');
const htmlParser = require('@html-eslint/parser');

module.exports = [
    // Lint HTML markup
    {
        files: ["**/*.html"],
        plugins: {
            "@html-eslint": htmlPlugin,
        },
        languageOptions: {
            parser: htmlParser,
        },
        rules: {
            // Basic HTML rules
            "@html-eslint/no-duplicate-id": "error",
            "@html-eslint/no-duplicate-attrs": "error",
            "@html-eslint/require-closing-tags": "error",
            "@html-eslint/require-doctype": "off",  // Single HTML apps often don't need DOCTYPE
            "@html-eslint/no-obsolete-tags": "error",
            "@html-eslint/no-script-style-type": "error",
        }
    },
    // Lint JavaScript inside <script> tags
    {
        files: ["**/*.html"],
        plugins: {
            html,
        },
        rules: {
            // Essential syntax error detection
            'no-undef': 'off', // Too many false positives
            'no-unused-vars': 'off', // Disabled for HTML files since inline event handlers create false positives
            'no-unreachable': 'error',
            'no-dupe-keys': 'error',
            'no-dupe-args': 'error',
            'no-duplicate-case': 'error',
            'use-isnan': 'error',
            'valid-typeof': 'error',
            'no-obj-calls': 'error',
            'no-regex-spaces': 'error',
            'no-sparse-arrays': 'error',
            'no-unexpected-multiline': 'error',
            'no-constant-condition': 'error',
            'no-extra-boolean-cast': 'error',
            'no-extra-semi': 'error',
            'no-redeclare': 'error',
            'no-self-assign': 'error',
            'no-self-compare': 'error',
            'no-unmodified-loop-condition': 'error',
            // Disallow alert, confirm, and prompt
            'no-alert': 'error',
            // Block restricted globals and APIs
            "no-restricted-globals": [
                "error",
                {
                    "name": "localStorage",
                    "message": "localStorage is not supported in iframe environment"
                },
                {
                    "name": "sessionStorage",
                    "message": "sessionStorage is not supported in iframe environment"
                },
                {
                    "name": "print",
                    "message": "print() is not supported in Canvas Apps iframe"
                }
            ],
            // Turn off style rules
            'indent': 'off',
            'quotes': 'off',
            'semi': 'off',
            'comma-dangle': 'off',
            'space-before-function-paren': 'off'
        }
    },
];

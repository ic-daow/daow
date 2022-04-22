module.exports = {
    plugins: ['@typescript-eslint'],
    extends: ['standard', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    rules: {
        'no-unused-vars': ['warn', { vars: 'local' }],
    },
}

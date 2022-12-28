module.exports = {
  plugins: ['prettier', 'unused-imports'],
  extends: ['next', 'turbo', 'prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'always',
        printWidth: 120,
        singleQuote: true,
        semi: false,
      },
    ],
    'unused-imports/no-unused-imports': 'error',
  },
}

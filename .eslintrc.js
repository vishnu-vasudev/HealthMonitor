module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'off',
      {},
      {
        endOfLine: 'auto',
      },
    ],
  },
};

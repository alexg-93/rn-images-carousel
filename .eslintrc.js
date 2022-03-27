module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    "prettier/prettier": ["error", {}, {
      "usePrettierrc": true
    }],
    "no-trailing-spaces": ["error", { "skipBlankLines": true }]
  }
};

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  globals: {
    use: true,
  },
  rules: {
    'global-require': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
  },
};

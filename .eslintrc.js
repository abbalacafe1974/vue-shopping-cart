module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vuejs-accessibility/label-has-for': 'off',  // 禁用 label-has-for 規則
    'indent': 'off',  // 禁用縮排檢查,
    'comma-dangle': 'off', // 禁用尾逗號檢查
    "function-paren-newline": "off", // disable function-paren-newline
    "vue/multi-word-component-names": "off", // eslint-disable vue/multi-word-component-names
    'no-trailing-spaces': 'off', // 禁用 no-trailing-spaces
    'object-curly-newline': 'off', // 允許單行書寫
  },
};

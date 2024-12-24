module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:react/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "@typescript-eslint/ban-ts-comment": 1,
    camelcase: ["error", { properties: "always" }],
    "default-case": "error",
    semi: "error",
    "arrow-body-style": ["error", "as-needed"],
    quotes: "off",
    "max-len": ["error", 100],
    "jsx-quotes": ["error", "prefer-double"],
    "react/react-in-jsx-scope": "off",
    "no-console": "error",
    "react/prop-types": "off",
  },
};

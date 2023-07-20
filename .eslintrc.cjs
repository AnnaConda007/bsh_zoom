module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: "plugin:react/recommended",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "capitalized-comments": [
      "error",
      "always",
      {
        ignorePattern: "pragma|ignored",
        ignoreInlineComments: true,
      },
    ],
    eqeqeq: ["error", "always", { null: "ignore" }],
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
    indent: ["error", 2],
    "brace-style": ["error", "1tbs"],
    "block-spacing": ["error", "always"],
    "no-console": ["error", { allow: ["warn", "error"] }],
  },
};

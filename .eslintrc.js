module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    semi: "off",
    "no-console": "off",
    "react/prop-types": "off",
    "camelcase": 0,
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        jsxBracketSameLine: true,
        trailingComma: "es5",
        printWidth: 80,
        semi: false
      }
    ]
  },
  env: {
    jest: true,
    browser: true,
    node: true
  },
  globals: {"Promise": true},
  plugins: ["react", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier/react",
    "prettier"
  ]
};
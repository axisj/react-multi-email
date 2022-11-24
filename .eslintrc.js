module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["unused-imports", "import"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": 1,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/consistent-type-assertions": 2,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-member-accessibility": 2,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/no-empty-function": 1,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-inferrable-types": 0,
    "@typescript-eslint/no-namespace": 0,
    "@typescript-eslint/no-non-null-assertion": 2,
    "@typescript-eslint/no-unnecessary-type-constraint": 0,
    "@typescript-eslint/no-unused-vars": [
      2,
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/no-var-requires": 0,
    "no-else-return": 2,
    "react/prop-types": 0,
    "react/jsx-no-target-blank": 0,
    "unused-imports/no-unused-imports-ts": 2,
    "unused-imports/no-unused-vars-ts": 0,
    "react-hooks/exhaustive-deps": 2,
    "react/display-name": 0,
    "no-restricted-syntax": [
      2,
      {
        selector: "LogicalExpression[right.type='AssignmentExpression']",
        message: "right-hand assign is not allowed",
      },
    ],
  },
  settings: {
    react: {
      pragma: "React",
      version: "18.0",
    },
  },
};

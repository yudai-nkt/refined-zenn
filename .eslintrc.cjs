module.exports = {
  ignorePatterns: ["dist/**/*.js"],
  extends: ["@yudai-nkt"],
  overrides: [
    {
      files: ["src/**/components/**/*.tsx", "src/options-ui/App.tsx"],
      rules: { "unicorn/filename-case": ["error", { case: "pascalCase" }] },
    },
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/prefer-readonly-parameter-types": [
          "error",
          { ignoreInferredTypes: true },
        ],
      },
    },
  ],
};

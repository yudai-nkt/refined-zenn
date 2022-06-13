module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  overrides: [
    {
      files: ["src/**/*.{ts,tsx}"],
      customSyntax: "@stylelint/postcss-css-in-js",
    },
  ],
};

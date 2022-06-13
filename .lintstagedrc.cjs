module.exports = {
  "*.{js,cjs,mjs,ts,tsx}": ["prettier --write", "eslint --fix"],
  "src/**/*.{ts,tsx}": ["stylelint --fix"],
  "*.md": ["prettier --write"],
  "*.yml": ["prettier --write"],
};

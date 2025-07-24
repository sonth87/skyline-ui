
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    env: {
      browser: true,
      es2021: true,
    },
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      // Allow unused variables but show as warnings
      "@typescript-eslint/no-unused-vars": "warn",
      "no-unused-vars": "warn",

      // Additional rules you might want
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-const": "warn",
    },
  },
]);

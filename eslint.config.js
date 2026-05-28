import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      react.configs.flat.recommended, // ✅ 加入 React 規則
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: {
        version: "detect", // ✅ 自動檢測 React 版本
      },
    },
    rules: {
      "react/jsx-uses-react": "off", // ✅ React 19+ 不需要
      "react/react-in-jsx-scope": "off", // ✅ React 19+ 不需要
      "react/jsx-no-undef": "error", // ✅ 檢測未定義元件
      "react/prop-types": "off",
      "no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^_" }, // ✅ 只忽略 _xxx（不使用意圖）
      ],
    },
  },
]);

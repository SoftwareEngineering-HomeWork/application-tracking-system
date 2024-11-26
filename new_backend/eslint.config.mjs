// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {
//     files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//         require: "readonly", // Allow 'require' without flagging as undefined
//       },
//     },
//     rules: {
//       "no-undef": "off", // Disable undefined variable errors like 'require'
//       "@typescript-eslint/no-require-imports": "off", // Allow `require()` style imports
//       "@typescript-eslint/no-unused-vars": [
//         "warn",
//         { vars: "all", args: "after-used", ignoreRestSiblings: true },
//       ], // Warn on unused variables but avoid strict enforcement
//     },
//   },
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ];

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest", // Ensure compatibility with modern JavaScript features
      sourceType: "module", // Enable ES Modules
      globals: {
        ...globals.browser,
        require: "readonly", // Allow 'require' globally
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off", // Disable the rule enforcing `import` over `require`
      "@typescript-eslint/no-unused-vars": "off", // Disable unused variable checks
      "no-undef": "off", // Disable undefined variable errors
    },
    settings: {
      "react": {
        "version": "17.0.2"
      }
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];

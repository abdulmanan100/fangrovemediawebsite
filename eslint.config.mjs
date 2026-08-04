import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * eslint-config-next 16 ships native flat configs, so this imports them
 * directly. Going through @eslint/eslintrc's FlatCompat instead throws a
 * circular-structure error on ESLint 10.
 */
const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts", "public/**"],
  },
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;

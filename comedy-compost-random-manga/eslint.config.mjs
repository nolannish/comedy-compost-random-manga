import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
// import next from "eslint-config-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignore build folders
  {
    ignores: ["node_modules", ".next", "dist", "out"],
  },

  // Next.js + TypeScript rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  {
    // Override for next-env.d.ts
    files: ["next-env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  
];

export default eslintConfig;

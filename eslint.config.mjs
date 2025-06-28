import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extiende configuración base de Next.js
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Aquí agregamos nuestras reglas personalizadas
  {
    rules: {
      // 🚨 TEMPORAL: Desactiva el error por usar "any"
      "@typescript-eslint/no-explicit-any": "off",

      // ✅ Puedes ponerlo en "warn" si quieres verlos, pero que no fallen el build
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],

      // ⚠️ Warning en lugar de error si usas comillas sin escapar
      "react/no-unescaped-entities": "warn",

      // ⚠️ Warning por useEffect sin dependencias completas
      "react-hooks/exhaustive-deps": "warn",

      // Opcional: evitar que ESLint se queje por variables usadas solo como tipos
      "@typescript-eslint/no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": true }],
    },
  },
];

export default eslintConfig;

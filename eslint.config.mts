import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Configuração base para JavaScript
  js.configs.recommended,
  
  // Configuração recomendada do TypeScript com checagem de tipos
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  
  // Configuração específica para arquivos TypeScript
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2024,
      },
      parserOptions: {
        // Usa o Project Service do TS para resolver projeto automaticamente
        projectService: true,
      },
    },
    rules: {
      // Regras TypeScript específicas
      "@typescript-eslint/no-unused-vars": ["error", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_"
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/prefer-const": "error",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/prefer-includes": "error",
      "@typescript-eslint/prefer-readonly": "warn",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/return-await": "error",
      "@typescript-eslint/consistent-type-imports": ["error", { 
        prefer: "type-imports",
        disallowTypeAnnotations: false
      }],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/sort-type-union-intersection-members": "error",
      "@typescript-eslint/method-signature-style": ["error", "property"],
      "@typescript-eslint/prefer-function-type": "error",
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/consistent-generic-constructors": ["error", "constructor"],
      "@typescript-eslint/no-confusing-void-expression": "error",
      "@typescript-eslint/no-meaningless-void-operator": "error",
      "@typescript-eslint/no-mixed-enums": "error",
      "@typescript-eslint/no-redundant-type-constituents": "error",
      "@typescript-eslint/no-useless-empty-export": "error",
      "@typescript-eslint/prefer-enum-initializers": "error",
      "@typescript-eslint/prefer-literal-enum-member": "error",
      "@typescript-eslint/prefer-ts-expect-error": "error",
      "@typescript-eslint/unified-signatures": "error",
    },
  },
  
  // Configuração para arquivos JavaScript
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2024,
      },
    },
    rules: {
      "no-unused-vars": ["error", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_"
      }],
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      "object-shorthand": "error",
      "prefer-destructuring": ["error", {
        array: true,
        object: true
      }, {
        enforceForRenamedProperties: false
      }],
    },
  },
  
  // Configuração geral para todos os arquivos
  {
    rules: {
      // Regras de qualidade de código
      "no-console": "warn",
      "no-debugger": "error",
      "no-alert": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-script-url": "error",
      "no-sequences": "error",
      "no-throw-literal": "error",
      "no-unmodified-loop-condition": "error",
      "no-unused-expressions": "error",
      "no-useless-call": "error",
      "no-useless-concat": "error",
      "no-useless-return": "error",
      "prefer-promise-reject-errors": "error",
      "radix": "error",
      "wrap-iife": ["error", "inside"],
      "yoda": "error",
      
      // Regras de estilo
      "array-bracket-spacing": ["error", "never"],
      "block-spacing": ["error", "always"],
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "camelcase": ["error", { 
        properties: "never",
        ignoreDestructuring: true,
        ignoreImports: true,
        ignoreGlobals: true
      }],
      "comma-dangle": ["error", "always-multiline"],
      "comma-spacing": ["error", { before: false, after: true }],
      "comma-style": ["error", "last"],
      "computed-property-spacing": ["error", "never"],
      "func-call-spacing": ["error", "never"],
      "indent": ["error", 2, { 
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        FunctionDeclaration: { parameters: 1, body: 1 },
        FunctionExpression: { parameters: 1, body: 1 },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoredNodes: ["TemplateLiteral *"]
      }],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "keyword-spacing": ["error", { before: true, after: true }],
      "linebreak-style": ["error", "unix"],
      "max-len": ["error", { 
        code: 100,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }],
      "no-mixed-spaces-and-tabs": "error",
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "padded-blocks": ["error", "never"],
      "quotes": ["error", "single", { avoidEscape: true }],
      "semi": ["error", "always"],
      "semi-spacing": ["error", { before: false, after: true }],
      "space-before-blocks": ["error", "always"],
      "space-before-function-paren": ["error", {
        anonymous: "always",
        named: "never",
        asyncArrow: "always"
      }],
      "space-in-parens": ["error", "never"],
      "space-infix-ops": "error",
      "space-unary-ops": ["error", {
        words: true,
        nonwords: false
      }],
      "spaced-comment": ["error", "always"],
      
      // Regras de complexidade
      "complexity": ["warn", 10],
      "max-depth": ["warn", 4],
      "max-lines": ["warn", 500],
      "max-lines-per-function": ["warn", 50],
      "max-params": ["warn", 4],
      "max-statements": ["warn", 20],
      
      // Regras de segurança
      "no-new-wrappers": "error",
      "no-array-constructor": "error",
      "no-new-object": "error",
      "no-new-require": "error",
      "no-path-concat": "error",
      "no-process-env": "warn",
      "no-process-exit": "error",
      "no-sync": "warn",
    },
  },
  
  // Configuração para arquivos de teste (se existirem)
  {
    files: ["**/*.test.{js,ts}", "**/*.spec.{js,ts}", "**/test/**/*.{js,ts}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
      "max-lines-per-function": "off",
      "max-statements": "off",
    },
  },
  
  // Configuração para arquivos de configuração
  {
    files: ["**/*.config.{js,ts,mjs}", "**/eslint.config.*"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "no-console": "off",
    },
  },
);

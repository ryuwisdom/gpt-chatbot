import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended,        'plugin:react/recommended',
       'plugin:@typescript-eslint/recommended'], // TypeScript ESLint 설정 추가],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
    },
  },
)

// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import { ESLint } from 'eslint'
//
// export default {
//     ignores: ['dist'],
//     extends: [
//         js.configs.recommended,
//         'plugin:react/recommended', // react plugin 추가
//         'plugin:@typescript-eslint/recommended', // TypeScript ESLint 설정 추가
//     ],
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//         ecmaVersion: 2020,
//         globals: globals.browser,
//     },
//     plugins: {
//         'react-hooks': reactHooks,
//         'react-refresh': reactRefresh,
//     },
//     rules: {
//         ...reactHooks.configs.recommended.rules,
//         'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
//         'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
//         // 기타 필요한 규칙 추가
//     },
//     parserOptions: {
//         ecmaVersion: 2020,
//         sourceType: 'module',
//     },
//     parser: '@typescript-eslint/parser', // TypeScript 파서를 명시적으로 지정
// }

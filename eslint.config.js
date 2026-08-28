import pluginQuery from '@tanstack/eslint-plugin-query'
import oxlint from 'eslint-plugin-oxlint'

export default [
    // 1. Jalankan aturan TanStack Query di ESLint
    ...pluginQuery.configs['flat/recommended'],

    // 2. Taruh oxlint paling terakhir untuk mematikan aturan ESLint yang duplikat
    ...oxlint.configs['flat/recommended'],
]

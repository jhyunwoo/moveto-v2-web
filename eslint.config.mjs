import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  {
    ignores: ['.next/**', 'coverage/**', 'playwright-report/**', 'test-results/**'],
  },
  ...nextCoreWebVitals,
]

export default config

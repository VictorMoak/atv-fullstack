import { writeFileSync } from 'node:fs'

const apiBaseUrl = process.env.API_URL ?? 'http://localhost:3000'

const content = `export const API_BASE_URL = '${apiBaseUrl}'
export const API_URL = \`\${API_BASE_URL}/produtos\`
`

writeFileSync(new URL('../config.js', import.meta.url), content)
console.log(`config.js gerado com API_BASE_URL=${apiBaseUrl}`)

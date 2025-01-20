// @ts-check
import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://alisanoelia.github.io/password-generator',
  base: 'https://github.com/alisanoelia/password-generator.git',
  integrations: [tailwind(), react()]
})

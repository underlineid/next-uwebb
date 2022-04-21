import rawSiteConfig from '../site.config'
import rawUwebbSiteConfig from '../uwebb.config'
import { SiteConfig } from './site-config'
import { UwebbSiteConfig } from './site-uwebb-config'

if (!rawSiteConfig) {
  throw new Error(`Config error: invalid site.config.ts`)
}

// allow environment variables to override site.config.ts
let siteConfigOverrides: SiteConfig

let uwebbSite: UwebbSiteConfig

try {
  if (process.env.NEXT_PUBLIC_SITE_CONFIG) {
    siteConfigOverrides = JSON.parse(process.env.NEXT_PUBLIC_SITE_CONFIG)
  }
} catch (err) {
  console.error('Invalid config "NEXT_PUBLIC_SITE_CONFIG" failed to parse')
  throw err
}

const siteConfig: SiteConfig = {
  ...rawSiteConfig,
  ...siteConfigOverrides
}

const uwebbConfig: UwebbSiteConfig = {
  ...rawUwebbSiteConfig,
  ...uwebbSite
}

export function getSiteConfig<T>(key: string, defaultValue?: T): T {
  const value = siteConfig[key]

  if (value !== undefined) {
    return value
  }

  if (defaultValue !== undefined) {
    return defaultValue
  }

  throw new Error(`Config error: missing required site config value "${key}"`)
}

export function getEnv(
  key: string,
  defaultValue?: string,
  env = process.env
): string {
  const value = env[key]

  if (value !== undefined) {
    return value
  }

  if (defaultValue !== undefined) {
    return defaultValue
  }

  throw new Error(`Config error: missing required env variable "${key}"`)
}

export function getUwebbConfig<T>(key: string, defaultValue?: T): T {
  const value = uwebbConfig[key]

  if (value !== undefined) {
    return value
  }

  if (defaultValue !== undefined) {
    return defaultValue
  }

  throw new Error(
    `Config error: missing required uwebb site config value "${key}"`
  )
}

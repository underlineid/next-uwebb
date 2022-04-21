import { getUwebbConfig } from './get-config-value'

export const description: string = getUwebbConfig('description', null)

export const name: string = getUwebbConfig('name')

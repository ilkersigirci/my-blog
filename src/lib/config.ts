import { dev } from '$app/environment'
import { base } from '$app/paths'

export const title = 'Ilkerflix'
export const description = 'Ilkerflix'
export const url = (dev ? 'http://localhost:5173' : process.env.PUBLIC_URL) + base
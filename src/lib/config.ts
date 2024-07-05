import { dev } from '$app/environment'
import { base } from '$app/paths'
import { PUBLIC_URL } from '$env/static/public'

export const title = 'Ilkerflix'
export const description = 'Ilkerflix'
export const url = (dev ? 'http://localhost:5173' : PUBLIC_URL) + base
// process.env.PUBLIC_URL
import { redirect } from '@sveltejs/kit'
import { base } from '$app/paths'

export function load() {
	throw redirect(302, base + '/post')
}

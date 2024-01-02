import type { Post } from '$lib/types'

export const prerender = false

// NOTE: Pagination - Path Style
export async function load({ params, fetch }) {
	// TODO: If dynamic_page is not a number, redirect to 404
	// TODO: If dynamic_page is more than the number of pages, reedirect to last page
	const dynamic_page = Number(params.dynamic_page) || 1

	async function getPostsPaginated(page: number) {
		const limit = 3
		const response = await fetch(`api/posts_pagination?limit=${limit}&skip=${(page - 1) * limit}`)
		const posts: Post[] = await response.json()
		return posts
	}

	return {
		posts: await getPostsPaginated(dynamic_page)
	}
}

// NOTE: Pagination - Query Parameters Style
// export async function load({ url, fetch }) {
// 	const limit = Number(url.searchParams.get('limit')) || 10
// 	const skip = Number(url.searchParams.get('skip')) || 0

// 	async function getPostsPaginated(limit: number, skip: number) {
// 		const response = await fetch(`api/posts?limit=${limit}&skip=${skip}`)
// 		const posts: Post[] = await response.json()
// 		return posts
// 	}

// 	return {
// 		posts: await getPostsPaginated(limit, skip)
// 	}
// }

import { json } from '@sveltejs/kit'
import type { Post } from '$lib/types'

async function getPosts(limit: number, skip: number) {
	let posts: Post[] = []

	const paths = import.meta.glob('/src/posts/*.md', { eager: true })

	// TODO: Get total number of posts to show it in the pagination
	// console.log('paths', Object.keys(paths).length)

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>
			const post = { ...metadata, slug } satisfies Post
			post.published && posts.push(post)
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	)

	// Apply pagination
	const startIndex = skip
	const endIndex = skip + limit
	posts = posts.slice(startIndex, endIndex)

	return posts
}

export async function GET({ url }) {
	const limit = Number(url.searchParams.get('limit')) || 10
	const skip = Number(url.searchParams.get('skip')) || 0

	const posts = await getPosts(limit, skip)
	return json(posts)
}

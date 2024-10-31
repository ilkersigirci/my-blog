// import { RAINDROP_CLIENT_SECRET } from '$env/static/private';
import type { Bookmark } from '$lib/types';

export const load = async ({ params, parent, fetch, setHeaders }) => {
	const { collections } = await parent();
	const awaitedCollections = await collections;

	const collection_id = awaitedCollections.find(
		(collection) => collection.slug === params.collection_slug
	)?._id;

	// const url = `https://api.raindrop.io/rest/v1/raindrops/${collection_id}`;

	// const response = await fetch(url, {
	// 	method: 'GET',
	// 	headers: {
	// 		Authorization: `Bearer ${RAINDROP_CLIENT_SECRET}`,
	// 		'Content-Type': 'application/json'
	// 	}
	// });

	// setHeaders({ 'cache-control': 'public, max-age=300' }); // 5 minutes
	// const { items } = await response.json();

	// Mock items
	const items = [
		{
			_id: '1',
			title: 'Mock Bookmark 1',
			link: 'https://example.com/1',
			excerpt: 'This is a mock bookmark 1',
			created: '2023-01-01T00:00:00Z'
		},
		{
			_id: '2',
			title: 'Mock Bookmark 2',
			link: 'https://example.com/2',
			excerpt: 'This is a mock bookmark 2',
			created: '2023-01-02T00:00:00Z'
		}
	];

	return {
		bookmarks: items as Bookmark[],
		title: awaitedCollections.find((collection) => collection.slug === params.collection_slug)
			?.title
	};
};

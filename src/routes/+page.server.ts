import { getPosts, getSeriesPosts } from '$lib/posts';

export async function load() {
	const posts = await getPosts();
	const seriesPosts = await getSeriesPosts();

	const top5LatestPosts = posts.slice(0, 5);
	const seriesLatest = seriesPosts[0];

	if (!seriesLatest) {
		return {
			posts: top5LatestPosts
		};
	}

	const top5LatestSeriesPosts = seriesPosts.slice(0, 5);
	const allSeriesSubPosts = top5LatestSeriesPosts.map((series) => series.subPosts).flat();
	const allLatestPosts = [...top5LatestPosts, ...allSeriesSubPosts];
	const latestPosts = allLatestPosts
		.toSorted((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime())
		.slice(0, 5);

	return {
		posts: latestPosts
	};
}

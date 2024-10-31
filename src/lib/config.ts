import {
	Sparkles,
	PencilLine,
	MousePointer2,
	FolderKanban,
	Bookmark,
	Github,
	Linkedin
} from 'lucide-svelte';
// import { X } from './icons';

export const owner = {
	name: 'Prabhu Kiran Konda',
	title: 'Software Engineer'
};

export const routes = [
	{
		name: 'Home',
		path: '/',
		icon: Sparkles
	},
	{
		name: 'Writing',
		path: '/writing',
		icon: PencilLine
	},
	{
		name: 'Journey',
		path: '/journey',
		icon: MousePointer2,
		customClass: 'rotate-90'
	},
	{
		name: 'Work',
		path: '/work',
		icon: FolderKanban
	},
	{
		name: 'Bookmarks',
		path: '/bookmarks',
		icon: Bookmark
	}
];

export const socials = [
	{
		name: 'Github',
		url: 'https://github.com/ilkersigirci',
		icon: Github
	},
	{
		name: 'LinkedIn',
		url: 'https://linkedin.com/in/ilkersigirci',
		icon: Linkedin
	}
	// {
	// 	name: 'X (Twitter)',
	// 	url: 'https://x.com/ilkersigirci',
	// 	icon: X
	// },
];

export const work = {
	company: 'Databoss',
	role: 'Machine Learning Engineer'
};

export const githubConfig = {
	username: 'ilkersigirci',
	repo: 'my-blog',
	branch: 'main'
};

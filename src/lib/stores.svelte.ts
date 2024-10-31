// class HeaderTitle {
// 	value = $state('');

// 	constructor(value: string) {
// 		this.value = value;
// 	}
// }

// class DrawerOpen {
// 	value = $state(false);

// 	constructor(value: boolean) {
// 		this.value = value;
// 	}
// }

// class SeriesPostCoverFolder {
// 	value = $state('');

// 	constructor(value: string) {
// 		this.value = value;
// 	}
// }

// export const headerTitle = new HeaderTitle('');
// export const drawerOpen = new DrawerOpen(false);
// export const seriesPostCoverFolder = new SeriesPostCoverFolder('');

// FIXME: How to use $state in SvelteKit 5?
import { writable } from 'svelte/store';

export const headerTitle = writable('');
export const drawerOpen = writable(false);
export const seriesPostCoverFolder = writable('');

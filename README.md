# my-blog

## Install && Run the App

```bash
# Install bun - NOTE: bun is installed globally to the system
curl -fsSL https://bun.sh/install | bash

# Using bun package manager
bun i

#start the dev server
bun run dev

```

### Build

```bash
#build your app
bun run build

#preview your app
bun run preview

## With pagefind in package.json
vite build && pagefind

## Without pagefind in package.json
vite build
```

## TODO

- Using [official mdsvex](https://github.com/pngwn/MDsveX) package instead of [@huntabyte/mdsvex](https://github.com/huntabyte/MDsveX) breaks the code highlighting. Need to fix it.
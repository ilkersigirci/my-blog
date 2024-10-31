# Blog-Markdown

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

## Vercel Project Settings

- Open vercel dashboard of your project
- For project command overrides
    - Settings -> General -> Build & Development Settings
    - Build command: bun run build
    - Output directory: build
    - Install command: bun i
    - Development command: bun run dev
- For environment variables
    - Go to Settings -> Environment Variables
    - PUBLIC_URL = https://blog.ilkerflix.com
- For custom Ignored Build Step
    - Go to Settings -> Git -> Ignored Build Step -> Project Settings
    - Custom -> if [ "$VERCEL_GIT_COMMIT_REF" == "gh-pages" ]; then exit 0; else exit 1; fi
    - (Alternative) Run my bash script -> bash scripts/vercel_ignored_build_step.s


## TODO

- Using [official mdsvex](https://github.com/pngwn/MDsveX) package instead of [@huntabyte/mdsvex](https://github.com/huntabyte/MDsveX) breaks the code highlighting. Need to fix it.
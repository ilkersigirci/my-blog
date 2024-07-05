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
```

## Vercel Project Settings

- Open vercel dashboard of your project
- For project command overrides
    - General -> Build & Development Settings
    - Build command: bun run build
    - Output directory: build
    - Install command: bun i
    - Development command: bun run dev
- For custom Ignored Build Step
    - Go to Settings -> Git -> Ignored Build Step -> Project Settings
    - Run my bash script -> bash scripts/vercel_ignored_build_step.sh
# my-blog

My blog using [hugo narrow](https://github.com/tom2almighty/hugo-narrow) theme

## Development

Install `Hugo Extended` to your machine. [Go](https://go.dev/doc/install) is required to install `Hugo Extended`.

```bash
# Install gcc and related build packages
sudo apt install -y build-essential

# Install hugo
CGO_ENABLED=1 go install -tags extended github.com/gohugoio/hugo@latest
```

Clone the repo with submodules
```bash
git clone --recurse-submodules git@github.com:ilkersigirci/my-blog.git
```

Run the server locally
```bash
hugo server -D --bind 0.0.0.0
```

Update the theme
```bash
# Update the submodule to the latest commit
git submodule update --remote themes/hugo-narrow

# Push it to the github
git add themes/hugo-narrow
git commit -m "Update hugo-narrow submodule to latest"
```

## Copilot

To run the hugo prompt file, in the copilot window

```bash
/hugo refactor the project
```

## Cloudflare.Pages

Build Configuration

- Framework Preset: Hugo
- Build Command: `hugo --gc --minify`
- Publish Directory: `public`

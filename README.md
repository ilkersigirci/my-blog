# my-blog

My blog using [hugo narrow](https://github.com/tom2almighty/hugo-narrow) theme

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
git commit -m "Update hugo-narrow submodule to latest
```
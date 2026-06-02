---
name: update-hugo-narrow-theme
description: Update or pin this blog's hugo-narrow Hugo theme submodule to a requested tag. Use when the user asks to update, pin, bump, or commit the hugo-narrow theme version in this repository.
---

# Update Hugo Narrow Theme

Use this workflow from the repository root unless the user gives a different working directory.

1. Confirm the requested tag. If no tag is provided, ask for it.
2. Fetch tags in the theme submodule:

```bash
git -C themes/hugo-narrow fetch --tags
```

3. Check out the tag:

```bash
git -C themes/hugo-narrow checkout "$TAG"
```

4. Stage and commit the submodule pointer:

```bash
git add themes/hugo-narrow
git commit -m "Update hugo-narrow submodule to $TAG"
```

5. Verify with `git status --short` and mention the checked-out tag/commit.

Do not modify theme files directly for a version bump; only update the submodule pointer.

---
title: Second
description: Second post.
date: '2023-4-16'
categories:
  - sveltekit
  - svelte
published: true
---

<script>
  import Counter from './counter.svelte'
</script>

# Table of Contents

## Svelte

- Media inside the **static** folder is served from `/` normally.
  - But if you arrange routes in `src/routes/post/[slug]` form, the static media will be served from `../`.
  - [ ] Research this
  - ![Svelte](../favicon.png)

## Counter

<Counter />

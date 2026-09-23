![Astro Academia](art/banner.png)

# Astro Academia

[![CI](https://github.com/maiobarbero/astro_academia/actions/workflows/ci.yml/badge.svg)](https://github.com/maiobarbero/astro_academia/actions/workflows/ci.yml)
![Forks](https://img.shields.io/github/forks/maiobarbero/astro_academia)
[![Astro](https://img.shields.io/badge/built_with-Astro-BC52EE?logo=astro&logoColor=white)](https://astro.build/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

<a href="https://buymeacoffee.com/maiobarbero"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me a Coffee" height="41" width="174"></a>

Astro Academia is an Astro template for a personal academic website. It brings your research, publications, CV, and writing into one place, with content stored in Markdown and TypeScript files alongside the site.

The template includes a blog with tags and pagination, search across posts and publications, light and dark themes, an RSS feed, and a sitemap. The build produces a static website you can host on GitHub Pages or another static hosting service.

[View the demo](https://maiobarbero.github.io/astro_academia/)

## Getting started

Fork this repository, then clone your fork. From the project directory, install dependencies and start the development server:

```sh
nvm install
nvm use
npm ci
npm run dev
```

The `.nvmrc` file specifies the project's Node.js version. If you use another version manager, select that version before installing dependencies.

Open the local address printed in your terminal, usually `http://localhost:4321`. Changes to your content and settings appear as you edit.

## Make it yours

### Profile and settings

Start with [src/settings.ts](src/settings.ts). It exports four objects:

| Export | What to change |
| --- | --- |
| `profile` | Your name, title, institute, research areas, and the author name highlighted in publications. |
| `social` | Your email and links to social or academic profiles. Set unused values to `''` to hide their icons. |
| `template` | Your deployed URL, base path, navigation position, themes, transitions, excerpt length, and posts per page. |
| `seo` | The default page title, description, and social preview image. |

For example, replace the `profile` export with your details:

```ts
export const profile: Profile = {
  fullName: 'Alex Smith',
  title: 'Research Fellow',
  institute: 'University of Example',
  author_name: 'Alex Smith',
  research_areas: [
    {
      title: 'Scientific Computing',
      description: 'Numerical methods for modelling physical systems.',
      field: 'computer-science',
    },
  ],
}
```

Research area icons are defined in [src/data/researchIcons.ts](src/data/researchIcons.ts). Choose a matching field or add your own.

Some content lives directly in Astro components. Replace the introduction in [src/components/Welcome.astro](src/components/Welcome.astro), the short research description in [src/components/ui/Hero.astro](src/components/ui/Hero.astro), and the sample text and page title in [src/pages/research.astro](src/pages/research.astro).

Replace `src/assets/profile_pictures.jpg` with your photo and `public/favicon.svg` with your favicon. Add a social preview image under `public/` and set `seo.default_image` to its public path, for example `/images/social-preview.png` for `public/images/social-preview.png`.

### CV and publications

Edit [src/data/cv.ts](src/data/cv.ts). It exports separate `experiences`, `education`, `skills`, and `publications` arrays. The CV page reads all four; the papers page uses the same publications array.

Keep those export names and replace the placeholder entries. For example:

```ts
export const education = [
  {
    school: 'University of Example',
    time: '2018 - 2022',
    degree: 'Ph.D. in Computer Science',
    location: 'Amsterdam, Netherlands',
    description: 'Research on numerical methods for physical simulations.',
  },
]

export const experiences = [
  {
    company: 'Example Research Lab',
    time: '2022 - Present',
    title: 'Research Fellow',
    location: 'Amsterdam, Netherlands',
    description: 'Developing tools for scientific computing.',
  },
]
```

Use `time` for dates and `school` for education institutions. The CV sorts entries using the end of the `time` range; use a format such as `2018 - 2022` or `2022 - Present`. Set unused arrays to `[]` to hide those CV sections.

The fields for skills and publications are defined in [src/types/cv.ts](src/types/cv.ts). Publications include a title, authors, journal, and time, with optional link and abstract fields.

### Blog posts

Add Markdown files to `src/content/BlogPosts/`. Each post needs a title, a quoted date, and an excerpt. Tags are optional.

For example, create `src/content/BlogPosts/field-notes.md`:

```markdown
---
title: "Notes from the field"
date: "2026-09-23"
excerpt: "Observations from our latest round of measurements."
tags: ["research", "fieldwork"]
---

Our latest measurements raised a few questions about the model.

Write the rest of your post here using Markdown.
```

Posts are included in the blog automatically. Replace or remove the sample post before publishing.

### Themes

Set `template.lightTheme` and `template.darkTheme` in `src/settings.ts` to theme names enabled in [src/styles/global.css](src/styles/global.css). That stylesheet contains the DaisyUI theme configuration and is also the place to add your own styles.

## Build and deploy

Before building, set `template.website_url` and `template.base` in `src/settings.ts` for your hosting location:

| Hosting location | `website_url` | `base` |
| --- | --- | --- |
| GitHub Pages project site | `https://your-username.github.io` | `/your-repository` |
| GitHub Pages user site | `https://your-username.github.io` | `''` |
| Custom domain | `https://example.com` | `''` |

These values are used by the Astro configuration and site links. Replace the default localhost URL before publishing.

```sh
npm run build
npm run preview
```

The build writes the site to `dist/`. Preview it locally, then configure your static hosting service to run `npm ci` and `npm run build` with the Node.js version from `.nvmrc`, and publish `dist/`.

For GitHub Pages, configure a Pages deployment workflow to build and upload `dist/`. The workflows currently included in this repository run development checks and update the changelog; deployment needs its own setup.

## Development checks

```sh
npm test       # Core search tests
npm run lint   # ESLint
npm run check  # Astro diagnostics and TypeScript checks
```

GitHub Actions runs these checks on pushes and pull requests. The tests cover search indexing, filtering, content and URL preparation, snippets, and loading recovery.

## Releases and changelog

[CHANGELOG.md](CHANGELOG.md) is generated from published GitHub releases. Create a release with a tag and release notes; the **Update changelog** workflow refreshes the file and commits it to the default branch. Editing or deleting a release also refreshes it. Prereleases are included; drafts are excluded.

You can run the workflow manually from the Actions tab to import existing releases. Edit release notes on GitHub rather than the generated file. Repository rules must allow the workflow's `GITHUB_TOKEN` to commit to the default branch.

## License

[MIT](LICENSE).

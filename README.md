# Astro Academia Documentation

## What is Astro Academia?

Astro Academia is a personal academic website built using Astro, a modern static site generator. The website is designed to showcase academic achievements, research papers, blog posts, and a CV. It is fast, responsive, and easy to maintain, making it an ideal platform for academics and researchers to present their work.

If you find Astro Academia useful or appreciate my work, consider supporting me! Your support helps keep this project maintained and encourages further development. 🚀✨

<a href="https://buymeacoffee.com/maiobarbero" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="41" width="174"></a>

## How to use it

Fork this repository to create your new website starting from this template.

## How to Create a CV Using the `cv.ts` File

The `cv.ts` file located in the `src/data/` directory is used to define the structure and content of your CV. This file exports an object containing various sections of your CV, such as education, experience, publications, and more.

### Example Structure of `cv.ts`

```typescript
export const cv = {
  education: [
    {
      degree: "Ph.D. in Computer Science",
      institution: "University of Example",
      year: "2020",
    },
    {
      degree: "M.Sc. in Computer Science",
      institution: "University of Example",
      year: "2016",
    },
  ],
  experience: [
    {
      title: "Research Scientist",
      company: "Example Research Lab",
      year: "2021-Present",
    },
    {
      title: "Software Engineer",
      company: "Tech Company",
      year: "2016-2021",
    },
  ],
  // Add more sections as needed
};
```

To create or update your CV, modify the `cv.ts` file with your personal information and achievements. The CV will be automatically rendered on the CV page of your website.

## How to Use the `settings.ts` File

The `settings.ts` file located in the `src/` directory is used to configure various settings for your Astro Academia website. This file exports an object containing settings such as site title, description, social media links, and more.

### Example Structure of `settings.ts`

```typescript
export const settings = {
  siteTitle: "Astro Academia",
  siteDescription: "A personal academic website built with Astro.",
  socialLinks: {
    twitter: "https://twitter.com/yourusername",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
  },
  // Add more settings as needed
};
```

To customize your website settings, modify the `settings.ts` file with your desired values. These settings will be used throughout your website to display the appropriate information.

## Where to Find the Blog Collection and Where to Add New Blog Posts

The blog collection is located in the `src/content/BlogPosts/` directory. Each blog post is a Markdown file with a `.md` extension. The blog posts are named sequentially (e.g., `post1.md`, `post2.md`, etc.).

### Adding a New Blog Post

1. Navigate to the `src/content/BlogPosts/` directory.
2. Create a new Markdown file for your blog post (e.g., `post1.md`).
3. Add the content of your blog post using Markdown syntax. Include frontmatter at the top of the file to define metadata such as title, date, and tags.

### Example Blog Post (`post11.md`)

```markdown
---
title: "New Blog Post"
date: "2023-10-01"
tags: ["research", "astro"]
excerpt: "Some short paragraphs"
---

# New Blog Post

This is the content of the new blog post. Write your article here using Markdown syntax.
```

Once you have added the new blog post, it will be automatically included in the blog collection and displayed on the blog page of your website.

## Deploy
The template provides a workflow to deploy the website on Github pages as a static website.

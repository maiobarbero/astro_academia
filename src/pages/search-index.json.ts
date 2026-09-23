import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { insertMultiple, save } from 'zbsearch';
import { publications } from '@/data/cv';
import { createSearchDatabase } from '@/lib/search';
import { blogSearchContent, paperSearchUrl, sitePath } from '@/lib/search-records';

export const prerender = true;

export const GET: APIRoute = async () => {
  const base = import.meta.env.BASE_URL;
  const posts = await getCollection('blog');
  const records = [
    ...posts.map(post => ({
      id: `blog:${post.id}`,
      title: post.data.title,
      content: blogSearchContent(post.body ?? post.data.excerpt),
      category: 'blog',
      url: sitePath(base, `blog/${post.id}`),
    })),
    ...publications.flatMap((paper, index) => paper.title.trim() ? [{
      id: `paper:${index}`,
      title: paper.title,
      content: paper.abstract,
      category: 'paper',
      url: paperSearchUrl(paper.link, base, index),
    }] : []),
  ];
  const db = createSearchDatabase();
  await insertMultiple(db, records);
  return new Response(JSON.stringify(save(db)), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};

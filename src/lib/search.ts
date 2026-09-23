import { create, load, search } from 'zbsearch';

export const searchSchema = {
  title: 'string',
  content: 'string',
  category: 'enum',
  url: 'string',
} as const;

export type SearchCategory = 'all' | 'blog' | 'paper';

export function createSearchDatabase() {
  return create({ schema: searchSchema, language: 'english' });
}

export function queryIndex(db: ReturnType<typeof createSearchDatabase>, term: string, category: SearchCategory) {
  return search(db, {
    term: term.trim(),
    properties: ['title', 'content'],
    boost: { title: 4, content: 1 },
    tolerance: term.trim().length >= 4 ? 1 : 0,
    threshold: 0,
    limit: 20,
    where: category === 'all' ? undefined : { category: { eq: category } },
  });
}

// Shared across dialog instances, including Astro client-side navigation.
let indexPromise: Promise<ReturnType<typeof createSearchDatabase>> | undefined;

export function loadSearchIndex(url: string) {
  indexPromise ??= (async () => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Search index could not be loaded');
    const db = createSearchDatabase();
    load(db, await response.json());
    return db;
  })().catch((error: unknown) => {
    indexPromise = undefined;
    throw error;
  });
  return indexPromise;
}

export function searchSnippet(content: string, term: string) {
  const text = content.replace(/\s+/g, ' ').trim();
  const words = term.toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const match = words.map(word => text.toLocaleLowerCase().indexOf(word)).filter(index => index >= 0);
  const start = match.length ? Math.max(0, Math.min(...match) - 50) : 0;
  const end = start + 180;
  return `${start > 0 ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`;
}

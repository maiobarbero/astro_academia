import assert from 'node:assert/strict';
import { test } from 'node:test';
import { insertMultiple, load, save } from 'zbsearch';
import { createSearchDatabase, loadSearchIndex, queryIndex, searchSnippet } from '../src/lib/search.ts';
import { blogSearchContent, paperSearchUrl, sitePath } from '../src/lib/search-records.ts';

test('a serialized index searches blog bodies and paper abstracts with typo tolerance', async () => {
  const source = createSearchDatabase();
  await insertMultiple(source, [
    { id: 'blog:1', title: 'Lab notes', content: 'Separating radium from uraninite.', category: 'blog', url: '/blog/lab' },
    { id: 'paper:1', title: 'Radiation measurements', content: 'Luminescence observed during experiments.', category: 'paper', url: 'https://example.com/paper' },
  ]);
  const db = createSearchDatabase();
  load(db, JSON.parse(JSON.stringify(save(source))));
  assert.equal((await queryIndex(db, 'radum', 'blog')).hits[0].id, 'blog:1');
  assert.equal((await queryIndex(db, 'luminescence', 'paper')).hits[0].id, 'paper:1');
  assert.equal((await queryIndex(db, 'radiaton', 'paper')).hits[0].id, 'paper:1');
  assert.equal((await queryIndex(db, 'uraninite', 'paper')).count, 0);
});

test('title matches rank first and category filtering happens before the result limit', async () => {
  const db = createSearchDatabase();
  await insertMultiple(db, [
    ...Array.from({ length: 25 }, (_, index) => ({ id: `blog:${index}`, title: 'Radium discovery', content: 'Radium discovery.', category: 'blog', url: `/blog/${index}` })),
    { id: 'paper:1', title: 'Research notes', content: 'Radium discovery.', category: 'paper', url: '/papers#paper-1' },
  ]);
  const all = await queryIndex(db, 'radium', 'all');
  assert.equal(all.count, 26);
  assert.equal(all.hits.length, 20);
  assert.equal(all.hits[0].document.category, 'blog');
  assert.equal((await queryIndex(db, 'radium', 'paper')).hits[0].id, 'paper:1');
  assert.equal((await queryIndex(db, 'nonexistentword', 'all')).count, 0);
  assert.equal((await queryIndex(createSearchDatabase(), 'radium', 'all')).count, 0);
});

test('Markdown yields readable searchable text without markup or link destinations', () => {
  const text = blogSearchContent('# Discovery\n\n**Radium** and [uraninite](https://example.com).\n\n- First finding\n- Second finding');
  assert.equal(text, 'Discovery Radium and uraninite. First finding Second finding');
});

test('search URLs respect deployment bases and preserve external paper links', () => {
  assert.equal(sitePath('/', 'blog/post1'), '/blog/post1');
  assert.equal(sitePath('/academia/', 'blog/post1'), '/academia/blog/post1');
  assert.equal(paperSearchUrl('https://doi.org/10.123/example', '/academia/', 0), 'https://doi.org/10.123/example');
  assert.equal(paperSearchUrl('/files/paper.pdf', '/academia/', 0), '/academia/files/paper.pdf');
  assert.equal(paperSearchUrl('', '/academia/', 2), '/academia/papers#paper-3');
  assert.equal(paperSearchUrl('#', '/', 0), '/papers#paper-1');
  assert.equal(paperSearchUrl('javascript:alert(1)', '/', 0), '/papers#paper-1');
});

test('snippets show body matches beyond the beginning of a document', () => {
  const snippet = searchSnippet(`${'Introduction. '.repeat(30)}Uraninite was processed in the laboratory.`, 'uraninite');
  assert.ok(snippet.startsWith('…'));
  assert.ok(snippet.includes('Uraninite'));
  assert.ok(snippet.length <= 182);
});

test('a failed index request can be retried and concurrent callers share the successful load', async (t) => {
  const source = createSearchDatabase();
  await insertMultiple(source, [
    { id: 'blog:1', title: 'Radium', content: 'Lab notes.', category: 'blog', url: '/blog/lab' },
  ]);
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => Response.json(save(source)));
  fetchMock.mock.mockImplementationOnce(async () => new Response(null, { status: 503 }));

  await assert.rejects(loadSearchIndex('/search-index.json'), /could not be loaded/);
  const pending = loadSearchIndex('/search-index.json');
  assert.equal(loadSearchIndex('/search-index.json'), pending);
  const db = await pending;
  assert.equal((await queryIndex(db, 'radium', 'all')).hits[0].id, 'blog:1');
  assert.equal(await loadSearchIndex('/search-index.json'), db);
  assert.equal(fetchMock.mock.callCount(), 2);
});

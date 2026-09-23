import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { toString } from 'mdast-util-to-string';
import type { RootContent } from 'mdast';

const parser = unified().use(remarkParse);

function plainText(node: RootContent): string {
  if (node.type === 'html') return '';
  if ('children' in node && node.type !== 'paragraph' && node.type !== 'heading') {
    return node.children.map(plainText).join(' ');
  }
  return toString(node, { includeHtml: false });
}

export function blogSearchContent(body: string) {
  return parser.parse(body).children.map(plainText).join(' ').replace(/\s+/g, ' ').trim();
}

export function sitePath(base: string, path: string) {
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function paperSearchUrl(link: string, base: string, index: number) {
  const fallback = sitePath(base, `papers#paper-${index + 1}`);
  const value = link.trim();
  if (!value || value === '#') return fallback;
  // Only publish web links; placeholder or unsafe schemes point to the local paper.
  try {
    const resolved = new URL(value, 'https://search.invalid');
    if (!['http:', 'https:'].includes(resolved.protocol)) return fallback;
    if (/^(https?:)?\/\//i.test(value)) return value;
    if (value.startsWith('#')) return sitePath(base, `papers${value}`);
    return sitePath(base, value);
  } catch {
    return fallback;
  }
}

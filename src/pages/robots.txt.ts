import type { APIRoute } from 'astro';
import {template} from '@/settings';

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
const base = template.base ? template.base + '/' : '';
  const sitemapURL = new URL(`${base}sitemap-index.xml`, site);
  return new Response(getRobotsTxt(sitemapURL));
};

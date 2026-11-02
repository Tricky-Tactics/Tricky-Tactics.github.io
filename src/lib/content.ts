import { marked } from 'marked';
import { parse } from 'smol-toml';

// Keep the existing editorial files and URLs while Astro replaces Hugo.
const sources = import.meta.glob<string>(['/content/**/*.md', '!/content/posts/**'], { eager: true, query: '?raw', import: 'default' });
const images = import.meta.glob<string>(['/content/**/*.{png,jpg,jpeg,webp}', '!/content/posts/**'], { eager: true, query: '?url', import: 'default' });

export interface Page {
  slug: string;
  title: string;
  html: string;
  listing: boolean;
  date: number;
  releaseDate?: string;
  image?: string;
}

function escapeAttribute(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export const pages: Page[] = Object.entries(sources).flatMap(([file, rawSource]) => {
  // Original files may have a UTF-8 BOM or Windows line endings.
  const source = rawSource.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const frontmatter = source.match(/^\+\+\+\s*\n([\s\S]*?)\n\+\+\+\s*\n?/);
  const metadata = frontmatter ? parse(frontmatter[1]) : {};
  if (metadata.draft === true) return [];
  let body = frontmatter ? source.slice(frontmatter[0].length) : source;
  const listing = file.endsWith('/_index.md');
  const slug = file.replace(/^\/content\//, '').replace(/\/(?:_?index)\.md$/, '').replace(/\.md$/, '').toLowerCase();
  const heading = body.match(/^# (.+)$/m);
  const title = typeof metadata.title === 'string' ? metadata.title : heading?.[1] ?? (slug === 'posts' ? 'News & updates' : slug);
  // A page's main heading is rendered by the shared page template.
  if (!metadata.title && heading) body = body.replace(heading[0], '');
  const directory = file.slice(0, file.lastIndexOf('/') + 1);
  body = body.replace(/\{\{<\s*image\s+([\s\S]*?)>\}\}/g, (_, attributes: string) => {
    const values = Object.fromEntries([...attributes.matchAll(/(\w+)="([^"]*)"/g)].map((match) => [match[1], match[2]]));
    const image = images[directory + values.src];
    if (!image) throw new Error(`Missing content image: ${directory}${values.src}`);
    const dimensions = ['width', 'height'].filter((key) => /^\d+$/.test(values[key] ?? '')).map((key) => ` ${key}="${values[key]}"`).join('');
    return `<img src="${escapeAttribute(image)}" alt="${escapeAttribute(values.alt ?? '')}"${dimensions} loading="lazy" />`;
  });
  // Resolve Markdown's relative image paths through Vite as well.
  body = body.replace(/!\[([^\]]*)\]\(([^\s)]+)\)/g, (match, alt: string, src: string) => {
    const image = images[directory + src];
    return image ? `![${alt}](${image})` : match;
  });
  const imagePath = metadata.release_image;
  return [{
    slug, title, html: marked.parse(body, { async: false }), listing,
    date: metadata.date instanceof Date ? metadata.date.getTime() : 0,
    releaseDate: metadata.release_date instanceof Date ? metadata.release_date.toISOString().slice(0, 10) : undefined,
    image: typeof imagePath === 'string' ? images[directory + imagePath] : undefined,
  }];
}).sort((a, b) => b.date - a.date);

export function childrenOf(slug: string) {
  return pages.filter((page) => page.slug.startsWith(`${slug}/`) && !page.listing);
}

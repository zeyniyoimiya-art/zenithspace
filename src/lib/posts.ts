export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
}

export interface Post extends PostMeta {
  body: string;
}

const modules = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

function parseFrontmatter(raw: string): { meta: Record<string, string | string[]>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string | string[]> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      meta[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      meta[key] = value.replace(/^["']|["']$/g, '');
    }
  }
  return { meta, body: match[2] };
}

function pick(meta: Record<string, string | string[]>, key: string, fallback: string): string {
  const v = meta[key];
  if (Array.isArray(v)) return v.join(', ');
  return typeof v === 'string' && v.length ? v : fallback;
}

function pickTags(meta: Record<string, string | string[]>): string[] {
  const v = meta['tags'];
  if (Array.isArray(v)) return v;
  if (typeof v === 'string' && v.length) return v.split(',').map((s) => s.trim());
  return [];
}

export const posts: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    const { meta, body } = parseFrontmatter(raw);
    return {
      slug,
      title: pick(meta, 'title', slug),
      date: pick(meta, 'date', ''),
      tags: pickTags(meta),
      description: pick(meta, 'description', ''),
      body
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export const feed: Post[] = posts.filter((p) => p.slug !== 'sobre-mi');

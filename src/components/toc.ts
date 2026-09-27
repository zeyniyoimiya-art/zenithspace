import { esc, slugify } from '@/core/dom';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function collectToc(container: HTMLElement): TocItem[] {
  const used = new Map<string, number>();
  const items: TocItem[] = [];

  container.querySelectorAll<HTMLElement>('h2, h3').forEach((heading) => {
    const raw = heading.textContent?.trim() ?? '';
    if (!raw) return;

    const label = raw
      .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
    if (!label) return;

    const base = slugify(label) || 'seccion';
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);

    const id = count === 0 ? base : `${base}-${count + 1}`;
    heading.id = id;
    items.push({ id, text: label, level: Number(heading.tagName.slice(1)) });
  });

  return items;
}

export function tocMarkup(items: TocItem[]): string {
  if (items.length < 3) return '';

  const links = items
    .map(
      (item) =>
        `<button class="toc-link toc-level-${item.level}" type="button" data-target="${item.id}">${esc(
          item.text
        )}</button>`
    )
    .join('');

  return `
  <nav class="toc" aria-label="Índice del artículo">
    <p class="toc-title">Índice</p>
    <div class="toc-links">${links}</div>
  </nav>`;
}

export function bindToc(root: HTMLElement): void {
  root.querySelectorAll<HTMLButtonElement>('.toc-link').forEach((link) => {
    link.addEventListener('click', () => {
      const id = link.dataset.target;
      if (!id) return;
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

import { byId, esc } from '@/core/dom';
import { initReadingProgress } from '@/core/reading-progress';
import { setupReveal } from '@/core/reveal';
import { bindToc, collectToc, tocMarkup } from '@/components/toc';
import { formatDate, readingTime, renderMarkdown } from '@/lib/markdown';
import { getPost } from '@/lib/posts';
import { renderNotFound } from '@/pages/not-found';

export function renderPost(slug: string): void {
  const app = byId<HTMLElement>('app');
  if (!app) return;

  const post = getPost(slug);
  if (!post) {
    renderNotFound();
    return;
  }

  app.innerHTML = `
    <article class="post">
      <header class="post-header">
        <a class="back" href="#/">← Todas las entradas</a>
        <div class="post-meta">
          <time datetime="${post.date}">${formatDate(post.date)}</time>
          <span class="sep">·</span>
          <span>${readingTime(post.body)} min de lectura</span>
        </div>
        <h1>${esc(post.title)}</h1>
        <p class="post-desc">${esc(post.description)}</p>
        <div class="tags">${post.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      </header>
      <div class="post-body" id="postBody">${renderMarkdown(post.body)}</div>
      <footer class="post-footer">
        <button id="copyBtn" class="action-btn" type="button">Copiar enlace</button>
        <a class="action-btn" href="#/">Volver al inicio</a>
      </footer>
    </article>`;

  const body = byId<HTMLElement>('postBody');
  if (body) {
    wrapTables(body);
    mountToc(app, body);
  }

  bindCopyButton();
  initReadingProgress();
  setupReveal();
  window.scrollTo({ top: 0 });
}

function wrapTables(root: HTMLElement): void {
  root.querySelectorAll('table').forEach((table) => {
    if (table.parentElement?.classList.contains('table-wrap')) return;
    const wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    table.parentNode?.insertBefore(wrap, table);
    wrap.appendChild(table);
  });
}

function mountToc(app: HTMLElement, body: HTMLElement): void {
  const items = collectToc(body);
  const markup = tocMarkup(items);
  if (!markup) return;

  const header = app.querySelector('.post-header');
  header?.insertAdjacentHTML('afterend', markup);
  bindToc(app);
}

function bindCopyButton(): void {
  const button = byId<HTMLButtonElement>('copyBtn');
  if (!button) return;

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      button.textContent = '¡Copiado!';
    } catch {
      button.textContent = 'No se pudo copiar';
    }
    setTimeout(() => {
      button.textContent = 'Copiar enlace';
    }, 1800);
  });
}

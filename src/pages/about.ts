import { byId } from '@/core/dom';
import { stopReadingProgress } from '@/core/reading-progress';
import { setupReveal } from '@/core/reveal';
import { renderMarkdown } from '@/lib/markdown';
import { getPost } from '@/lib/posts';

export function renderAbout(): void {
  const app = byId<HTMLElement>('app');
  if (!app) return;

  stopReadingProgress();

  const about = getPost('sobre-mi');
  const content = about ? renderMarkdown(about.body) : '<p>Página en construcción.</p>';

  app.innerHTML = `
    <article class="post">
      <header class="post-header">
        <a class="back" href="#/">← Todas las entradas</a>
        <h1>Sobre mí</h1>
      </header>
      <div class="post-body">${content}</div>
    </article>`;

  setupReveal();
  window.scrollTo({ top: 0 });
}

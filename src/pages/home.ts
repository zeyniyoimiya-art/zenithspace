import { byId } from '@/core/dom';
import { stopReadingProgress } from '@/core/reading-progress';
import { setupReveal } from '@/core/reveal';
import { postCard } from '@/components/post-card';
import { feed } from '@/lib/posts';

export function renderHome(): void {
  const app = byId<HTMLElement>('app');
  if (!app) return;

  stopReadingProgress();

  app.innerHTML = `
    <section class="hero reveal">
      <p class="hero-kicker">Bitácora de Sistemas Informáticos</p>
      <h1>Zenith<span class="grad">Space</span></h1>
      <p class="hero-sub">Investigación, apuntes y proyectos — por <strong>Calle Cucho Josué Salomón</strong>.</p>
    </section>
    <section class="section">
      <h2 class="section-title">Entradas</h2>
      <div class="post-list">
        ${feed.map(postCard).join('')}
      </div>
    </section>`;

  setupReveal();
  window.scrollTo({ top: 0 });
}

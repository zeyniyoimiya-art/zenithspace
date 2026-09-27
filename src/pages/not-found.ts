import { byId } from '@/core/dom';
import { stopReadingProgress } from '@/core/reading-progress';
import { setupReveal } from '@/core/reveal';

export function renderNotFound(): void {
  const app = byId<HTMLElement>('app');
  if (!app) return;

  stopReadingProgress();

  app.innerHTML = `
    <section class="hero reveal">
      <p class="hero-kicker">Error 404</p>
      <h1>Aquí no hay nada</h1>
      <p class="hero-sub">La dirección que buscas no existe… <a href="#/">volvé al inicio</a>.</p>
    </section>`;

  setupReveal();
  window.scrollTo({ top: 0 });
}

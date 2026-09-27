import './styles.css';
import type { Post } from './lib/posts';
import { posts, getPost } from './lib/posts';
import { renderMarkdown, readingTime, formatDate } from './lib/markdown';

const app = document.getElementById('app') as HTMLElement;
const themeBtn = document.getElementById('themeBtn') as HTMLButtonElement;

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function visiblePosts(): Post[] {
  return posts.filter((p) => p.slug !== 'sobre-mi');
}

function postCard(p: Post): string {
  return `
  <article class="post-card reveal">
    <a class="post-card-link" href="#/post/${p.slug}">
      <div class="post-meta">
        <time datetime="${p.date}">${formatDate(p.date)}</time>
        <span class="sep">·</span>
        <span>${readingTime(p.body)} min de lectura</span>
      </div>
      <h2>${esc(p.title)}</h2>
      <p class="post-excerpt">${esc(p.description)}</p>
      <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
    </a>
  </article>`;
}

function renderHome(): void {
  const list = visiblePosts();
  app.innerHTML = `
    <section class="hero reveal">
      <p class="hero-kicker">Bitácora de Sistemas Informáticos</p>
      <h1>Zenith<span class="grad">Space</span></h1>
      <p class="hero-sub">Investigación, apuntes y proyectos — por <strong>Calle Cucho Josué Salomón</strong>.</p>
    </section>
    <section class="section">
      <h2 class="section-title">Entradas</h2>
      <div class="post-list">
        ${list.map(postCard).join('')}
      </div>
    </section>`;
  setupReveal();
}

function renderPost(slug: string): void {
  const post = getPost(slug);
  if (!post) {
    renderNotFound();
    return;
  }
  const html = renderMarkdown(post.body);
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
      <div class="post-body" id="postBody">${html}</div>
      <footer class="post-footer">
        <button id="copyBtn" class="action-btn" type="button">Copiar enlace</button>
        <a class="action-btn" href="#/">Volver al inicio</a>
      </footer>
    </article>`;
  decorateHeadings();
  decorateTables();
  const copyBtn = document.getElementById('copyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(location.href);
        copyBtn.textContent = '¡Copiado!';
        setTimeout(() => (copyBtn.textContent = 'Copiar enlace'), 1800);
      } catch {
        copyBtn.textContent = 'No se pudo copiar';
      }
    });
  }
  setupReveal();
  window.scrollTo({ top: 0 });
}

function decorateHeadings(): void {
  const body = document.getElementById('postBody');
  if (!body) return;
  const heads = Array.from(body.querySelectorAll('h2'));
  heads.forEach((h) => {
    h.id = slugify(h.textContent || '');
  });
}

function decorateTables(): void {
  const body = document.getElementById('postBody');
  if (!body) return;
  body.querySelectorAll('table').forEach((table) => {
    const wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    table.parentNode?.insertBefore(wrap, table);
    wrap.appendChild(table);
  });
}

function renderAbout(): void {
  const about = getPost('sobre-mi');
  const html = about
    ? renderMarkdown(about.body)
    : '<p>Página en construcción.</p>';
  app.innerHTML = `
    <article class="post">
      <header class="post-header">
        <a class="back" href="#/">← Todas las entradas</a>
        <h1>Sobre mí</h1>
      </header>
      <div class="post-body">${html}</div>
    </article>`;
  setupReveal();
  window.scrollTo({ top: 0 });
}

function renderNotFound(): void {
  app.innerHTML = `
    <section class="hero reveal">
      <h1>404</h1>
      <p class="hero-sub">Aquí no hay nada… <a href="#/">volvé al inicio</a>.</p>
    </section>`;
  setupReveal();
}

function setupReveal(): void {
  const els = Array.from(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.05 }
  );
  els.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      el.classList.add('visible');
    } else {
      io.observe(el);
    }
  });
}

function router(): void {
  const hash = location.hash.replace(/^#\/?/, '');
  const [section, param] = hash.split('/');
  if (!section) renderHome();
  else if (section === 'post' && param) renderPost(param);
  else if (section === 'sobre-mi') renderAbout();
  else renderNotFound();
}

themeBtn.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme === 'dark';
  if (dark) {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = 'dark';
  }
  try {
    localStorage.setItem('zs-theme', dark ? 'light' : 'dark');
  } catch {
    /* sin almacenamiento disponible */
  }
});

window.addEventListener('hashchange', router);
router();

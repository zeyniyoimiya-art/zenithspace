import type { Post } from '@/lib/posts';
import { esc } from '@/core/dom';
import { formatDate, readingTime } from '@/lib/markdown';

export function postCard(post: Post): string {
  return `
  <article class="post-card reveal">
    <a class="post-card-link" href="#/post/${post.slug}">
      <div class="post-meta">
        <time datetime="${post.date}">${formatDate(post.date)}</time>
        <span class="sep">·</span>
        <span>${readingTime(post.body)} min de lectura</span>
      </div>
      <h2>${esc(post.title)}</h2>
      <p class="post-excerpt">${esc(post.description)}</p>
      <div class="tags">${post.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
    </a>
  </article>`;
}

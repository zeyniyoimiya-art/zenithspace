let cleanup: (() => void) | null = null;

export function initReadingProgress(): void {
  stopReadingProgress();

  const bar = document.getElementById('readingProgress');
  if (!bar) return;

  const update = (): void => {
    const doc = document.documentElement;
    const total = doc.scrollHeight - window.innerHeight;
    const ratio = total > 0 ? Math.min(1, window.scrollY / total) : 0;
    bar.style.transform = `scaleX(${ratio})`;
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();

  cleanup = () => {
    window.removeEventListener('scroll', update);
    window.removeEventListener('resize', update);
    bar.style.transform = 'scaleX(0)';
  };
}

export function stopReadingProgress(): void {
  cleanup?.();
  cleanup = null;
}

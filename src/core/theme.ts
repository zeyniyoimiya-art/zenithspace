const STORAGE_KEY = 'zs-theme';

function isDark(): boolean {
  return document.documentElement.dataset.theme === 'dark';
}

function syncButton(): void {
  const button = document.getElementById('themeBtn');
  if (!button) return;
  const label = isDark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
  button.setAttribute('aria-label', label);
  button.setAttribute('title', label);
}

export function initTheme(): void {
  const button = document.getElementById('themeBtn');
  if (!button) return;
  syncButton();
  button.addEventListener('click', () => {
    const root = document.documentElement;
    const dark = isDark();
    if (dark) {
      delete root.dataset.theme;
    } else {
      root.dataset.theme = 'dark';
    }
    try {
      localStorage.setItem(STORAGE_KEY, dark ? 'light' : 'dark');
    } catch {
      // sin almacenamiento: el tema elegido solo dura la sesión
    }
    syncButton();
  });
}

type Handler = (params: string[]) => void;

interface Route {
  pattern: RegExp;
  handler: Handler;
}

const routes: Route[] = [];
let fallback: Handler = () => {};

export function defineRoute(pattern: RegExp, handler: Handler): void {
  routes.push({ pattern, handler });
}

export function setFallback(handler: Handler): void {
  fallback = handler;
}

export function startRouter(): void {
  const dispatch = (): void => {
    const hash = location.hash.replace(/^#\/?/, '');
    for (const route of routes) {
      const match = hash.match(route.pattern);
      if (match) {
        route.handler(match.slice(1));
        return;
      }
    }
    fallback([]);
  };

  window.addEventListener('hashchange', dispatch);
  dispatch();
}

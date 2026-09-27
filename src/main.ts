import '@/styles/index.css';
import { defineRoute, setFallback, startRouter } from '@/core/router';
import { initTheme } from '@/core/theme';
import { renderHome } from '@/pages/home';
import { renderPost } from '@/pages/post';
import { renderAbout } from '@/pages/about';
import { renderNotFound } from '@/pages/not-found';

defineRoute(/^$/, renderHome);
defineRoute(/^post\/([a-z0-9-]+)$/, (params) => renderPost(params[0]));
defineRoute(/^sobre-mi$/, renderAbout);
setFallback(renderNotFound);

initTheme();
startRouter();

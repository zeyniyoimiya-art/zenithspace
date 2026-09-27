# ZenithSpace 🛰️

Blog personal de **Calle Cucho Josué Salomón** — investigación, apuntes y proyectos de Sistemas Informáticos.

🌐 En vivo: **https://zenithspace.is-a.dev** (y `zeyniyoimiya-art.github.io/zenithspace`)

## 🧰 Tecnologías

- **TypeScript** + **Vite** (build ultrarrápido, cero frameworks pesados)
- Posts escritos en **Markdown** con frontmatter
- CSS artesanal (design system propio, modo claro/oscuro)
- **GitHub Actions** → compila y publica automáticamente en **GitHub Pages**

## 🚀 Correr en local

```bash
bun install     # o: npm install
bun run dev     # o: npm run dev
```

## ✍️ Cómo agregar una entrada nueva

1. Crea un archivo en `src/posts/mi-nueva-entrada.md`
2. Empieza con el frontmatter:

```md
---
title: "Título de la entrada"
date: 2026-10-01
tags: [Materia, Tema]
description: Una línea de resumen.
---

Contenido en Markdown…
```

3. Guarda, haz commit y push → GitHub Actions publica solo ✨

## 📁 Estructura

```
zenithspace/
├── index.html
├── src/
│   ├── main.ts            (router + vistas)
│   ├── styles.css         (design system)
│   ├── lib/               (motor de posts y markdown)
│   └── posts/             (las entradas en Markdown)
├── public/                (favicon)
├── docs/                  (documentación de investigación)
└── .github/workflows/     (deploy automático)
```

## 📄 Licencia

MIT — ver [LICENSE](LICENSE).

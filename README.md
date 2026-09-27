# ZenithSpace 🛰️

Blog personal de **Calle Cucho Josué Salomón** — investigación, apuntes y proyectos de Sistemas Informáticos.

🌐 En vivo: **https://zenithspace.is-a.dev** · espejo en `zeyniyoimiya-art.github.io/zenithspace`

## 🧰 Tecnologías

- **TypeScript** + **Vite**, sin frameworks pesados
- Entradas en **Markdown** con frontmatter
- **CSS artesanal por capas** (tokens → base → layout → componentes), modo claro/oscuro
- **GitHub Actions** → compila y publica automáticamente en GitHub Pages

## 🚀 Desarrollo local

```bash
bun install     # o: npm install
bun run dev     # o: npm run dev  (http://localhost:5173)
```

Compilar y previsualizar la versión final:

```bash
bun run build     # genera dist/
bun run preview   # sirve dist/ en local
```

## ✍️ Publicar una entrada nueva

1. Crea el archivo `src/content/posts/mi-entrada.md`
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

3. Guarda, haz commit y push → GitHub Actions publica solo.

El blog genera automáticamente el tiempo de lectura, el índice de secciones y las tarjetas del inicio a partir de cada archivo.

## 📁 Estructura del proyecto

```
zenithspace/
├── docs/                     dossier de investigación (material de respaldo)
├── public/                   favicon, robots.txt
├── src/
│   ├── components/           piezas reutilizables (tarjeta de entrada, índice)
│   ├── content/posts/        las entradas en Markdown
│   ├── core/                 router, tema, revelado por scroll, progreso de lectura
│   ├── lib/                  motor de posts y Markdown
│   ├── pages/                vistas: inicio, entrada, sobre mí, 404
│   ├── styles/               design system por capas
│   └── main.ts               punto de entrada
├── index.html                plantilla única
├── vite.config.ts            configuración del build (alias @/ → src/)
└── .github/workflows/        despliegue automático
```

## 🧭 Cómo está armado

- **Router propio por hash** (`#/post/slug`): liviano, sin dependencias y compatible con cualquier hosting estático.
- Las entradas se leen en tiempo de compilación con `import.meta.glob` — agregar un `.md` es todo lo necesario.
- Alias `@/` para imports limpios entre módulos.
- Índice de secciones, barra de progreso de lectura y botón «copiar enlace» en cada entrada.

## 🚢 Despliegue

Cada push a `main` dispara el flujo de GitHub Actions que compila el proyecto y publica la carpeta `dist/` en GitHub Pages.

## 📄 Licencia

MIT — ver [LICENSE](LICENSE).

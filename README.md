# Sitio web — Adriana Molina Zúñiga

Sitio estático (HTML/CSS/JS puro, sin frameworks ni build step) para la marca personal
de Adriana Molina Zúñiga: liderazgo, transformación organizacional, gestión del talento,
educación ejecutiva e IA aplicada a las organizaciones.

## Cómo verlo

Abre `index.html` directamente en el navegador, o sirve la carpeta con cualquier
servidor estático (recomendado para que las rutas relativas y fuentes carguen igual
que en producción):

```
npx serve .
```

## Estructura

```
index.html              Inicio
sobre-mi.html           Sobre mí
servicios.html          Servicios (overview de los 9 servicios)
conferencias.html       Conferencias y keynotes
consultoria.html        Consultoría organizacional
publicaciones.html      Publicaciones y columnas
recursos.html           Guías, plantillas, e-books, checklists
blog.html                Blog con filtro por categoría
blog-articulo.html       Plantilla de artículo individual
casos-de-exito.html     Casos de éxito
medios.html             Kit de prensa
contacto.html           Formulario y datos de contacto
css/styles.css          Sistema de diseño completo (paleta, tipografía, componentes)
js/main.js              Menú móvil, scroll reveal, filtro de blog, envío demo de formularios
```

## Antes de publicar

1. **Fotografías reales.** Todos los `.hero-photo` son marcadores de posición (gradiente
   navy/dorado con las iniciales "AMZ"). Reemplázalos por fotografía profesional real:
   busca `hero-photo` en cada archivo HTML.
2. **Formularios.** Los formularios (`data-demo-form`) solo simulan el envío en el
   navegador. Conéctalos a un backend real, Formspree, HubSpot o el CRM que uses, y
   ajusta el `action`/`method` o la lógica en `js/main.js`.
3. **Cifras y testimonios.** Los indicadores de impacto, testimonios y casos de éxito
   son plantillas de ejemplo marcadas con notas `[reemplazar]`. Sustitúyelos por datos
   reales y con autorización expresa de cada organización antes de publicar.
4. **Logos de organizaciones.** La franja de logos en Inicio usa texto de marcador;
   reemplázala por logos reales autorizados.
5. **Dominio y hosting.** El sitio es 100% estático: se puede publicar en Netlify,
   Vercel, GitHub Pages o cualquier hosting estático sin configuración adicional.

## SEO

- Cada página tiene `<title>` y `meta description` únicos, orientados a las búsquedas
  del brief (liderazgo, transformación organizacional, consultoría en talento,
  educación ejecutiva, IA aplicada a RRHH, liderazgo femenino, etc.).
- Pendiente antes de publicar: agregar `sitemap.xml`, `robots.txt`, datos estructurados
  (schema.org `Person` / `Article`), y verificar Open Graph con imágenes reales.

## Mantener el sitio vigente

- El blog y la sección de recursos están diseñados para crecer: agrega nuevos archivos
  `blog-*.html` siguiendo la plantilla de `blog-articulo.html` y súmalos a `blog.html`.
- La paleta y tipografía (Fraunces + Inter) están centralizadas en `css/styles.css`
  mediante variables CSS (`:root`), por lo que cualquier ajuste de marca se hace en un
  solo lugar.

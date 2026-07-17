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
contacto.html           Formulario de contacto (conectado a /api/contact)
admin.html              Panel privado para ver/exportar los leads (noindex)
css/styles.css          Sistema de diseño completo (paleta, tipografía, componentes)
js/main.js              Menú móvil, scroll reveal, filtro de blog, envío de formularios
api/contact.js          Función serverless: valida el formulario y guarda el lead en Supabase
api/leads.js            Función serverless: devuelve los leads (requiere sesión de admin)
api/admin-login.js      Valida la contraseña de administración y crea la cookie de sesión
api/admin-logout.js     Cierra la sesión de administración
api/_lib/supabase.js    Cliente mínimo para la REST API de Supabase (sin dependencias)
api/_lib/auth.js        Firma y verifica la cookie de sesión del panel admin
supabase-schema.sql     SQL para crear la tabla `leads` en Supabase (ejecutar una sola vez)
```

## Despliegue actual

El sitio está desplegado en Vercel (`https://pagina-personal-rho.vercel.app`), conectado
al repositorio de GitHub `amolinaz/Pagina-Personal` — cada `git push` a `main` despliega
automáticamente una nueva versión de producción.

### Variables de entorno (Vercel → Project Settings → Environment Variables)

| Variable                     | Para qué sirve                                              |
|-------------------------------|-------------------------------------------------------------|
| `SUPABASE_URL`                | URL del proyecto de Supabase (Project Settings → API)       |
| `SUPABASE_SERVICE_ROLE_KEY`   | Clave `service_role` de Supabase (server-side, nunca pública)|
| `ADMIN_PASSWORD`              | Contraseña para entrar a `/admin.html`                       |
| `SESSION_SECRET`               | Cadena aleatoria para firmar la cookie de sesión del panel   |

### Configurar la base de datos de leads (una sola vez)

1. Crear un proyecto en [supabase.com](https://supabase.com).
2. Abrir **SQL Editor** y ejecutar el contenido de [supabase-schema.sql](supabase-schema.sql).
3. En **Project Settings → API**, copiar la **Project URL** y la clave **service_role**
   (no la `anon`) y agregarlas como variables de entorno en Vercel.
4. Elegir una contraseña para `ADMIN_PASSWORD` y una cadena aleatoria para `SESSION_SECRET`.
5. Volver a desplegar (`git push` o `vercel --prod`) para que la función recoja las
   variables nuevas.

### Ver los leads

Entrar a `/admin.html` con la contraseña de `ADMIN_PASSWORD`. Se puede ver la tabla de
leads (nombre, correo, organización, teléfono, motivo, mensaje, fecha) y descargarlos
como CSV. La página está marcada `noindex` y bloqueada en `robots.txt`, pero no está de
más no compartir el link públicamente.

## Antes de seguir puliendo

1. **Fotografías reales.** Todos los `.hero-photo` son marcadores de posición (gradiente
   navy/dorado con las iniciales "AMZ"). Reemplázalos por fotografía profesional real:
   busca `hero-photo` en cada archivo HTML.
2. **Otros formularios del sitio.** Solo el formulario de `contacto.html` está conectado
   de verdad. Los de Inicio, Conferencias y Recursos (`data-demo-form`) todavía simulan
   el envío — decide si también deben guardar leads en Supabase.
3. **Cifras y testimonios.** Los indicadores de impacto, testimonios y casos de éxito
   son plantillas de ejemplo marcadas con notas `[reemplazar]`. Sustitúyelos por datos
   reales y con autorización expresa de cada organización antes de publicar.
4. **Logos de organizaciones.** La franja de logos en Inicio usa texto de marcador;
   reemplázala por logos reales autorizados.
5. **Dominio propio.** El sitio vive en un subdominio `.vercel.app`; se puede agregar un
   dominio propio desde el dashboard de Vercel sin tocar el código.

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

# Semrush Setup - abogadossanfelipe.cl

Fecha de referencia: 2026-04-20

## Limite de esta sesion

Esta sesion puede leer datos reales de Semrush, pero no puede modificar la cuenta por API.
Por eso este documento deja el setup exacto para replicarlo en la cuenta sin ambiguedad.

## Estado actual medido en Semrush

- Proyecto: `23577141`
- Nombre del proyecto: `abogadossanfelipe.cl`
- Herramientas activas: `siteaudit`, `tracking`, `seoideas`
- Site Audit mas reciente: `2026-04-04 13:26:06 +00:00`
- Proximo audit programado: `2026-04-25 01:23:39 +00:00`
- Salud del sitio: `94/100`
- Paginas rastreadas: `32/100`
- Errores: `23`
- Warnings: `4`
- Notices: `3`
- GA en Semrush: `NOT_CONNECTED`
- Tracking campaign actual: `23577141_2769910`
- Tracking actual: `Chile`, `mobile`, `Spanish`, `8 keywords`
- Ultima fecha de tracking disponible: `2026-04-22`
- Organic keywords CL: `65`
- Organic traffic estimado CL: `84`
- Organic cost CL: `10`
- Backlinks: `2`
- Referring domains: `1`
- Authority/Trust score: `7`

## Problemas concretos detectados

### 1. Host del proyecto mal definido

El proyecto y el tracking estan montados sobre `abogadossanfelipe.cl`, pero la web real y el sitemap trabajan sobre `https://www.abogadossanfelipe.cl`.

Efecto:

- `23` URLs marcadas como `Incorrect pages found in sitemap.xml`
- El tracking con mask `abogadossanfelipe.cl/*` deja rankings reales fuera o en `-`

### 2. Tracking pobre

La campaña actual solo tiene `8` keywords y la mayoria son debiles o inutiles como KPI:

- `abogados`
- `san felipe`
- `derecho familiar`
- `derecho inmobiliario`
- `abogados san felipe adopcion`
- `abogados san felipe divorcio`
- `divorcio en chile`
- `proceso de divorcio en chile`

Solo dos rankean hoy para el sitio usando el mask correcto `*.abogadossanfelipe.cl/*`:

- `abogados san felipe adopcion`: posicion `1`
- `abogados san felipe divorcio`: posicion `5`

Problema: ambas tienen volumen `0`, asi que no sirven como KPI principal.

### 3. Dependencia organica peligrosa

La URL con mas trafico concentra `81/84` del trafico estimado:

- `https://www.abogadossanfelipe.cl/blog/debes-saber-sobre-herencia-y-sucesiones-guia-para-familias-en-chile/`

Eso equivale a `96.4%` del trafico organico estimado del dominio.

## Setup exacto recomendado

### Proyecto

Usar como dominio canonico del proyecto:

- `www.abogadossanfelipe.cl`

Si Semrush no permite cambiar el host base de forma limpia, recrear el proyecto con:

- URL principal: `https://www.abogadossanfelipe.cl`

### Site Audit

Configurar:

- Start URL: `https://www.abogadossanfelipe.cl/`
- Sitemap principal: `https://www.abogadossanfelipe.cl/sitemap.xml`
- Protocol: `https`
- Crawl limit: `100`
- Crawl subdomains: `false`
- JavaScript rendering: `disabled` por ahora
- User agent: mantener estandar de auditoria
- Frecuencia: semanal

Objetivo inmediato del audit:

- bajar errores de `23` a `<5`
- subir salud de `94` a `98+`

### Position Tracking

Crear dos campañas nuevas y luego eliminar o archivar la actual.

#### Campana 1

- Nombre sugerido: `ASF CL Mobile`
- Dominio: `www.abogadossanfelipe.cl`
- Scope/mask: `*.abogadossanfelipe.cl/*`
- Buscador: `Google`
- Pais: `Chile`
- Idioma: `Spanish`
- Dispositivo: `Mobile`

#### Campana 2

- Nombre sugerido: `ASF CL Desktop`
- Dominio: `www.abogadossanfelipe.cl`
- Scope/mask: `*.abogadossanfelipe.cl/*`
- Buscador: `Google`
- Pais: `Chile`
- Idioma: `Spanish`
- Dispositivo: `Desktop`

### Integraciones

Conectar:

- `Google Analytics 4`
- `Google Search Console`

## Issues a vigilar despues del siguiente audit

### Error principal

- `18 - Incorrect pages found in sitemap.xml`: `23`

### Warnings reales

- `12 - Broken external links`: `2`
- `104 - Multiple h1 tags`: `2`
- `112 - Low text to HTML ratio`: `2`

### Notice

- `219 - Llms.txt has formatting issues`: `1`

## Lectura practica de esas metricas

- El issue `18` no es de contenido: es una inconsistencia de host entre `no-www` y `www`.
- El issue `12` viene de `wa.me` devolviendo `429`, no de enlaces muertos internos.
- Los issues `104` y `219` ya fueron abordados en el repo; conviene rerun del audit despues del deploy.

## KPIs sugeridos para el dashboard

- Site Health
- Errors
- Top 10 keywords
- Top 3 keywords
- Visibility mobile
- Visibility desktop
- Referring domains
- Organic traffic share por URL

## Metas de 60-90 dias

- Keywords trackeadas: de `8` a `25-40`
- Keywords en top 10: de `2` a `8+`
- Referring domains: de `1` a `8+`
- Dependencia de una sola URL: de `96.4%` a `<70%`

## Archivo de apoyo

Usar este archivo para cargar keywords en tracking:

- [semrush-position-tracking-keywords-2026-04-20.csv](C:/Users/nbnla/vscode/sanity/docs/semrush-position-tracking-keywords-2026-04-20.csv)

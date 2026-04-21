# Growth Backlog 2026-04-20

## Objetivo

Convertir el análisis estratégico en un backlog ejecutable sobre el estado real
del proyecto, separando lo que ya está resuelto, lo que quedó a medio camino y
lo que todavía falta para mejorar captación, SEO local, conversión y operación.

## Criterio

Este backlog no parte del sitio "ideal", sino del sitio actual:

- Next.js 16 + Sanity 4 ya actualizados
- home y páginas clave ya rediseñadas
- SEO base, sitemap, metadata y JSON-LD ya implementados
- GTM y consentimiento ya implementados del lado código
- producción ya publicada

## 1. Ya Resuelto

Estas piezas ya no deberían volver a abrirse salvo por mantenimiento o ajuste.

### Base técnica

- Upgrade a `Next.js 16.2.4`
- Upgrade a `Sanity 4.22.0`
- Build productivo validado
- Studio y Presentation recuperados

### SEO técnico

- metadata centralizada
- `robots.txt` y `sitemap.xml`
- `generateStaticParams` en rutas críticas
- JSON-LD base para `Organization`, `LegalService`, `BreadcrumbList` y `FAQPage`
- políticas de privacidad y cookies publicadas

### Contenido y arquitectura

- home con estructura editorial más ordenada
- schemas nuevos para homepage y CTA
- limpieza de componentes contaminados en `inicio`
- correcciones editoriales críticas en áreas de práctica

### Analytics / cumplimiento

- GTM desacoplado de Iubenda
- consentimiento propio implementado
- GTM bloqueado hasta aceptación
- políticas legales mínimas publicadas
- taxonomía de eventos reducida a eventos de negocio

## 2. Parcialmente Resuelto

Estas áreas ya mejoraron, pero todavía no están cerradas.

### Home como herramienta de conversión

**Estado**

- mejoró diseño, jerarquía y CTA
- ya transmite más foco profesional que antes

**Lo que falta**

- afinar el hero para una promesa todavía más directa por problema real
- reforzar el camino hacia consulta virtual / WhatsApp
- incorporar una capa de trust más fuerte y verificable

### SEO de servicios y áreas

**Estado**

- estructura técnica mejor
- páginas de área y servicios ya indexables y más limpias

**Lo que falta**

- convertir 5 páginas de alta intención en verdaderas landings transaccionales
- mejorar títulos, intros, CTAs y linking interno con foco de negocio
- revisar consistencia completa de copy en todas las páginas de servicios

### Medición

**Estado**

- del lado código ya existe una taxonomía de negocio suficiente
- el consentimiento ya permite medir de forma más defendible

**Lo que falta**

- revisar el contenedor GTM
- validar tags/triggers reales en Tag Assistant
- confirmar llegada a GA4 DebugView
- decidir si `page_view` custom será la única fuente o si se usará pageview automático

## 3. Pendiente Prioridad Alta

Esto es lo que más retorno debería mover en negocio.

### 3.1. Landings "money pages"

**Objetivo**

Pasar de páginas informativas a páginas que expliquen, den confianza y empujen a
contacto.

**Páginas prioritarias**

- divorcio
- pensión de alimentos
- cuidado personal / custodia
- regularización de propiedades
- compraventa / litigio inmobiliario

**Criterio de implementación**

- un solo H1 claro
- intro orientada a problema real
- trust visible
- CTA primario claro
- CTA secundario a WhatsApp o llamada
- FAQ de decisión
- bloque de "qué hacer ahora"

### 3.2. Agenda virtual real

**Objetivo**

Cerrar la brecha entre interés y reserva.

**Pendiente**

- integrar agenda real tipo Calendly o flujo propio simple
- exponer disponibilidad para consulta virtual
- conectar CTA del hero y de páginas de servicio a ese flujo

### 3.3. Trust verificable

**Objetivo**

Subir la percepción de legitimidad y reducir fricción de contacto.

**Pendiente**

- integrar reseñas verificables de Google
- reforzar ubicación, cobertura y modalidad online
- añadir más señales institucionales comprobables

### 3.4. Validación operativa de analytics

**Objetivo**

Pasar de "código instrumentado" a "medición realmente útil".

**Pendiente**

- validar `contact_drawer_open`
- validar `lead_form_start`
- validar `lead_form_submit_success`
- validar `phone_click`
- validar `whatsapp_click`
- validar `practice_area_click`
- validar `article_click`

## 4. Pendiente Prioridad Media

### 4.1. Clusters SEO por intención

**Objetivo**

Organizar mejor la captación orgánica por problemas y no solo por taxonomía del
CMS.

**Clusters prioritarios**

- divorcio
- alimentos
- cuidado personal
- violencia intrafamiliar
- herencias / posesión efectiva
- regularización
- compraventa

**Pendiente**

- definir página madre por cluster
- reforzar interlinking artículo -> servicio -> área
- revisar canibalización

### 4.2. SEO local fuera del sitio

**Objetivo**

Subir señales de autoridad local reales.

**Pendiente**

- optimizar Google Business Profile
- citaciones locales y jurídicas
- pedir reseñas post-cierre
- revisar menciones en directorios relevantes

### 4.3. Performance fina

**Objetivo**

Exprimir la última parte del rendimiento sin reabrir arquitectura entera.

**Pendiente**

- seguir limpiando CSS bloqueante
- revisar imágenes LCP en home y servicios
- verificar duplicación o exceso de scripts cuando GTM quede activo

## 5. Pendiente Prioridad Baja

Estas tareas son útiles, pero no deberían adelantarse a las de arriba.

- expansión editorial masiva del blog
- automatización CRM avanzada
- experimentos agresivos de CRO
- nuevas áreas temáticas fuera de familia e inmobiliario
- cambios estéticos no vinculados a conversión o claridad

## 6. Roadmap Recomendado

### Sprint 1

**Meta**

Cerrar medición y conversión base.

**Tareas**

- validar GTM en producción con consentimiento
- revisar contenedor GTM y GA4 DebugView
- integrar agenda virtual
- reforzar CTA principales en home y servicios
- integrar trust verificable

### Sprint 2

**Meta**

Cerrar las 5 landings de más valor.

**Tareas**

- reescribir hero, intro, FAQ y CTA de cada landing prioritaria
- ajustar structured data si hace falta por tipo de página
- reforzar enlaces internos y navegación contextual

### Sprint 3

**Meta**

Escalar SEO local y clusters.

**Tareas**

- mapear clusters por intención
- optimizar Google Business Profile
- definir estrategia de reseñas y citaciones
- revisar Search Console y cobertura

## 7. KPIs Que Sí Importan

### Captación

- clics en CTA principal
- aperturas de drawer de contacto
- inicios de formulario
- envíos exitosos de formulario
- clics en teléfono
- clics en WhatsApp
- reservas de consulta virtual

### SEO

- clics orgánicos por landing principal
- impresiones de landings transaccionales
- consultas que contienen `san felipe`, `abogado`, `divorcio`, `propiedad`
- páginas indexadas correctamente
- posiciones de páginas de alta intención

### Negocio

- leads calificados
- reservas efectivas
- show rate
- cierres por línea de servicio

## 8. Qué No Hacer

- no volver a llenar GTM de eventos ruidosos
- no priorizar más artículos si las páginas transaccionales siguen débiles
- no copiar funnels demasiado agresivos que rompan el tono institucional
- no mezclar otra vez copy de inmobiliario y familia en plantillas compartidas
- no reabrir grandes refactors técnicos sin una hipótesis clara de retorno

## 9. Siguiente Paso Recomendado

Si hubiera que elegir solo un frente para el próximo ciclo:

**hacer operativa la captación**

Eso significa, en este orden:

1. validar GTM/GA4 en producción
2. integrar agenda virtual
3. rehacer 5 landings de alta intención
4. añadir trust verificable

Todo lo demás puede esperar detrás de eso.

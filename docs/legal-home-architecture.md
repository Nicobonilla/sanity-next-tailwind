# Legal Home Architecture

## Objetivo

La home debe volver a depender de Sanity como backend editorial, pero sin repetir el error de dejar todo el control visual en contenido libre. La responsabilidad queda dividida asi:

- React controla layout, sistema visual, componentes y funnel
- Sanity controla activacion, orden, imagenes, copy y SEO editorial

## Estado actual

- `inicio` existe en Sanity y contiene componentes activos
- el dataset mezcla contenido juridico valido con bloques heredados de otro proyecto
- la home rediseñada actual ya no renderiza `inicio` con `PageTemplate`
- paginas internas si siguen usando `PageTemplate`

## Modelo objetivo para `inicio`

La pagina `inicio` debe quedar limitada a un set pequeno y curado de bloques:

1. `carousel` con `variant=hero`
   - uso: hero principal
   - editable en Sanity: imagenes, orden de slides, CTA si aplica
   - restriccion: no usarlo para otros fines dentro de `inicio`

2. `highlight`
   - uso: bloque de presentacion del estudio
   - editable en Sanity: copy principal e imagen de respaldo

3. `unitBusiness`
   - uso: areas de practica
   - fuente: coleccion dedicada, no bloques manuales dentro de `inicio`

4. `post`
   - uso: articulos y SEO informativo
   - fuente: coleccion dedicada, no carruseles heredados dentro de `inicio`

## Componentes que deben ignorarse en la home juridica

- `carousel:post` dentro de `inicio`
- `bannerWithItems`
- `banner1`
- cualquier bloque legado de marketing digital, software o inteligencia de negocios

## Regla de renderizado

La home no debe hacer `PageTemplate` completo sobre `inicio`.

Debe hacer una adaptacion controlada:

- tomar desde Sanity solo los componentes soportados
- mapearlos a componentes UI juridicos estables
- ignorar bloques activos que no pertenecen a la arquitectura juridica
- usar fallback local mientras el contenido editorial no este limpio

## Mapa React

- `carousel:hero` -> `HomeHero`
- `highlight` -> `FirmIntro`
- `unitBusiness` -> `PracticeAreas`
- `settings.title` -> `LeadershipPreview`
- FAQ, metodologia, trust strip y cierre de contacto pueden seguir en frontend mientras no exista modelo editorial definitivo

## Funnel y tracking

Antes de reactivar GTM/GA4 para analisis serio, la taxonomia de eventos debe cambiar.

Eventos recomendados:

- `contact_drawer_open`
- `lead_form_start`
- `lead_form_submit_success`
- `lead_form_submit_error`
- `phone_click`
- `whatsapp_click`
- `practice_area_click`
- `article_click`
- `article_to_contact_click`

## Criterio de contenido

El copy de home no debe explicar la estrategia de marca. Debe resolver dudas del usuario, bajar ansiedad y facilitar contacto.

La regla editorial es:

- hablar de problemas concretos
- explicar pasos y expectativas
- evitar frases autoreferenciales
- usar lenguaje claro para publico de San Felipe

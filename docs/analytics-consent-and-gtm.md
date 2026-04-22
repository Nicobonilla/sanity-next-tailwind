# Analytics, consentimiento y GTM

## Resumen

La medicion de analytics ya no depende de Iubenda y ahora tiene dos capas:

- `GA4` se inicializa directamente desde la app cuando el usuario acepta analytics
- `GTM` se sigue cargando despues del consentimiento, pero ya no es el unico camino para registrar eventos de negocio

El sitio ahora:

- no carga GTM ni GA4 hasta que exista consentimiento para analytics
- persiste la decision del usuario en cookie y `localStorage`
- permite reabrir preferencias desde el footer
- bloquea en runtime scripts residuales de Iubenda inyectados por el contenedor GTM
- expone dos paginas legales:
  - `/politica-de-privacidad`
  - `/politica-de-cookies`

## Variables de entorno

Para activar la medicion:

- `NEXT_PUBLIC_ENABLE_GTM=true`
- `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX`

Si `NEXT_PUBLIC_ENABLE_GTM` es `false`, no se muestra banner ni se carga GTM.

## Eventos de negocio

Eventos que el frontend puede enviar al `dataLayer`:

- `page_view`
- `scroll_depth`
- `contact_drawer_open`
- `lead_form_start`
- `lead_form_service_select`
- `lead_form_submit_success`
- `lead_form_submit_error`
- `phone_click`
- `whatsapp_click`
- `practice_area_click`
- `article_click`
- `nav_click`
- `button_click`

Todos se envian con contexto base:

- `page_path`
- `page_location`
- `page_title`

## Parametros relevantes

### `page_view`

- `page_path`

### `contact_drawer_open`

- `source`

### `lead_form_start`

- `field_name`

### `lead_form_service_select`

- `practice_area`
- `service_slug`
- `service_title`

### `lead_form_submit_success`

- `practice_area`
- `service_title`

### `lead_form_submit_error`

- `error_type`

### `phone_click` / `whatsapp_click`

- `source`

### `practice_area_click`

- `area_slug`
- `area_title`
- `source`

### `article_click`

- `article_slug`
- `source`

### `nav_click`

- `link_text`
- `link_url`

### `button_click`

- `button_name`
- `source`

## Configuracion recomendada en GTM

### 1. Tag base de GA4

Si mantienes GA4 cargado directamente desde la app, el tag base de GA4 en GTM no debe duplicar eventos. La recomendacion es:

- Measurement ID: `G-EZE9DZN5J5`
- Trigger: solo si realmente usas GTM para otros tags o marketing
- Si dejas este tag activo, desactiva el envio automatico de `page_view` para evitar duplicados.

### 2. Triggers por evento

Si el contenedor se usara para reenviar eventos al mismo stream GA4, crea un `Custom Event Trigger` por cada evento de negocio. Si no, es mejor quitar esos tags y dejar que la app mande los eventos directamente.

Eventos disponibles:

- `page_view`
- `contact_drawer_open`
- `lead_form_start`
- `lead_form_service_select`
- `lead_form_submit_success`
- `lead_form_submit_error`
- `phone_click`
- `whatsapp_click`
- `practice_area_click`
- `article_click`
- `nav_click`
- `button_click`
- `scroll_depth`

### 3. Tags GA4 Event

Solo si decides mantener GTM como capa de reenvio:

- crear un tag `GA4 Event` por cada trigger anterior
- mapear parametros relevantes de `dataLayer`
- evitar tags duplicados para el mismo evento que ya sale por `gtag`

### 4. Debug

Validar con:

- GTM Preview / Tag Assistant
- GA4 DebugView

## Riesgos a evitar

- no mezclar pageviews automaticos con el `page_view` custom sin revisar duplicados
- no volver a agregar eventos ruidosos que no respondan preguntas de negocio
- no activar GTM en produccion sin consentimiento
- no volver a cargar Iubenda desde GTM; el runtime lo bloquea, pero el contenedor igual debe limpiarse

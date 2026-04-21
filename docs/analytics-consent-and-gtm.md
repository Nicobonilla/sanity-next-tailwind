# Analytics, consentimiento y GTM

## Resumen

La medicion de analytics quedo desacoplada de terceros como Iubenda.

El sitio ahora:

- no carga GTM hasta que exista consentimiento para analytics
- persiste la decision del usuario en cookie y `localStorage`
- permite reabrir preferencias desde el footer
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

Crear un tag de configuracion GA4 con:

- Measurement ID: `G-EZE9DZN5J5`
- Trigger: `Consent Initialization` o `Initialization` solo si analytics ya fue consentido por la capa del sitio
- Si vas a usar el evento custom `page_view`, desactiva el envio automatico de pageviews en el tag base para evitar duplicados.

### 2. Triggers por evento

Crear un `Custom Event Trigger` por cada evento de negocio:

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

Crear un tag GA4 Event por cada trigger anterior y mapear los parametros
relevantes de `dataLayer`.

### 4. Debug

Validar con:

- GTM Preview / Tag Assistant
- GA4 DebugView

## Riesgos a evitar

- no mezclar pageviews automaticos con el `page_view` custom sin revisar duplicados
- no volver a agregar eventos ruidosos que no respondan preguntas de negocio
- no activar GTM en produccion sin consentimiento

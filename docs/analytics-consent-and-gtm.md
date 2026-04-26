# Analytics, consentimiento y GTM

## Actualizacion 2026-04-26

La capa de medicion quedo alineada con el informe SEO/Semrush:

- `GA4` puede funcionar directo aunque `GTM` este desactivado, siempre con consentimiento.
- `GTM` sigue disponible para integraciones, pero ya no es obligatorio para emitir pageviews y eventos.
- Cada evento incluye contexto SEO: `page_type`, `content_type`, `city_intent`, `practice_area`, `service_slug`, `article_slug` y `article_topic` cuando aplica.
- Se agregaron eventos canonicos de funnel: `view_service`, `cta_click`, `form_start`, `lead_form_submit`, `email_click` y `scroll_90`.
- Se mantienen eventos legacy como `lead_form_submit_success` y `booking_click` para no romper reportes existentes.

Key events recomendados en GA4:

- `lead_form_submit`
- `whatsapp_click`
- `phone_click`
- `email_click`
- `download_checklist`
- `view_thank_you`

Dimensiones personalizadas recomendadas:

- `page_type`
- `content_type`
- `city_intent`
- `practice_area`
- `service_slug`
- `service_title`
- `article_slug`
- `article_topic`
- `form_id`
- `lead_type`
- `contact_method`
- `cta_location`
- `source`
- `faq_question`
- `scroll_depth`

## Resumen

La implementación final quedó así:

- la app decide el consentimiento
- `GA4` se carga directamente desde la app cuando el usuario acepta analytics
- la app envía los eventos de negocio a `GA4`
- la app sigue empujando esos eventos al `dataLayer`
- `GTM` se carga después del consentimiento, pero hoy queda limpio y sin tags activos de analytics

Motivo:

- el relay completo vía GTM introducía inconsistencias en algunos eventos del funnel
- el envío directo desde la app resultó más confiable para este sitio
- GTM queda saneado, sin Iubenda y disponible para futuras integraciones si hace falta

## Variables de entorno

Para activar la medición:

- `NEXT_PUBLIC_ENABLE_GA4=true`
- `GA=G-EZE9DZN5J5` o `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-EZE9DZN5J5`
- `NEXT_PUBLIC_ENABLE_GTM=true`
- `NEXT_PUBLIC_GTM_ID=GTM-NJLP7HKQ`

Si `NEXT_PUBLIC_ENABLE_GTM` es `false`, la medicion puede seguir activa por GA4 directo si existe measurement ID y `NEXT_PUBLIC_ENABLE_GA4` no es `false`.

## Qué se carga en producción

Solo después del consentimiento:

- `gtag.js` para `GA4` si `GA` o `NEXT_PUBLIC_GA_MEASUREMENT_ID` esta configurado y `NEXT_PUBLIC_ENABLE_GA4` no es `false`
- `GTM-NJLP7HKQ` si `NEXT_PUBLIC_ENABLE_GTM=true`

Además:

- se bloquean scripts residuales de `Iubenda` en runtime
- se persiste la decisión del usuario en cookie y `localStorage`
- se puede reabrir preferencias desde el footer

## Eventos que llegan a GA4

Eventos de negocio enviados por la app:

- `page_view`
- `view_service`
- `cta_click`
- `form_start`
- `lead_form_submit`
- `contact_drawer_open`
- `lead_form_start`
- `lead_form_service_select`
- `lead_form_submit_success`
- `lead_form_submit_error`
- `phone_click`
- `whatsapp_click`
- `email_click`
- `booking_click`
- `review_click`
- `practice_area_click`
- `article_click`
- `nav_click`
- `faq_expand`
- `scroll_90`

## Señales que quedan solo en dataLayer

Estas señales se conservan para observabilidad o futuras decisiones, pero hoy no son parte de la medición principal en GA4:

- `button_click`

## Contexto base por evento

Todos los eventos se envían con:

- `page_path`
- `page_location`
- `page_title`
- `page_type`
- `content_type`
- `city_intent`

## Parámetros útiles en GA4

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

### `booking_click`

- `source`
- `booking_mode`

### `review_click`

- `platform`
- `source`

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

### `faq_expand`

- `source`
- `faq_question`

## Estado actual de GTM

Contenedor:

- `GTM-NJLP7HKQ`

Estado esperado:

- sin Iubenda
- sin templates custom de Iubenda
- sin tags legacy de analytics

GTM hoy queda como soporte limpio para:

- inspección con `Tag Assistant`
- futuras integraciones
- mantener una ruta clara de expansión sin contaminación legacy

## Estado actual de GA4

Propiedad:

- `479618299`

Key events configurados:

- `lead_form_submit`
- `lead_form_submit_success`
- `booking_click`
- `whatsapp_click`
- `phone_click`
- `email_click`
- `download_checklist`
- `view_thank_you`

Custom dimensions activas:

- `source`
- `field_name`
- `page_type`
- `content_type`
- `city_intent`
- `practice_area`
- `service_slug`
- `service_title`
- `article_topic`
- `error_type`
- `form_id`
- `lead_type`
- `booking_mode`
- `contact_method`
- `cta_location`
- `platform`
- `area_slug`
- `area_title`
- `article_slug`
- `link_text`
- `link_url`
- `faq_question`

## Script de sincronización

El repo incluye un script para dejar GTM y GA4 en este estado:

- `scripts/analytics/sync_google_measurement.py`

Ejemplo:

```powershell
& 'C:\Users\nbnla\ga4-codex\.venv\Scripts\python.exe' scripts\analytics\sync_google_measurement.py --credentials 'C:\ruta\service-account.json'
```

## Validación recomendada

Validar con:

- `Tag Assistant`
- `GA4 Realtime`
- `GA4 DebugView`

Flujo mínimo:

1. aceptar analytics
2. abrir el drawer de contacto
3. escribir en el formulario
4. hacer clic en WhatsApp
5. expandir una FAQ

Eventos que deberías ver:

- `page_view`
- `cta_click`
- `contact_drawer_open`
- `form_start`
- `lead_form_start`
- `whatsapp_click`
- `booking_click`
- `faq_expand`

## Riesgos a evitar

- no reactivar tags de Iubenda en GTM
- no convertir `page_view`, `click` o `scroll` en key events
- no mezclar dos fuentes activas de pageview sin revisar duplicados
- no agregar eventos genéricos que no respondan preguntas de negocio

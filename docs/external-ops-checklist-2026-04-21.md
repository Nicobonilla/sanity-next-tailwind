# Checklist externo: GTM, GA4 y reseñas

## Estado actual

Ya quedó resuelto:

- `GTM-NJLP7HKQ` fue limpiado y republicado
- Iubenda ya no está en el contenedor activo
- `GA4` recibe los eventos de negocio directamente desde la app
- `dataLayer` se conserva para observabilidad y futuras integraciones
- las landings de alta intención siguen publicadas

Lo que sigue pendiente fuera del repo:

1. validar visualmente los eventos en `Realtime` y `DebugView`
2. cargar una fuente real de reseñas en Sanity
3. decidir si la agenda seguirá por formulario o por URL externa
4. opcional: habilitar `Measurement Protocol` para server-side analytics

## 1. Google Tag Manager

### Página a abrir

- `https://tagmanager.google.com/`
- contenedor: `GTM-NJLP7HKQ`

### Qué deberías ver

#### Workspace > Tags

No deberían quedar tags legacy de:

- `Iubenda`
- `Google Tag Analitics`
- `GA4 Event - ASF Measured Events`

Si el contenedor se ve prácticamente vacío, eso es correcto para el estado actual.

#### Workspace > Templates

No debería existir:

- `iubenda Privacy Controls and Cookie Solution`

#### Workspace > Variables

No deberían quedar variables legacy de analytics o cookie consent, salvo alguna variable suelta sin uso operativo. Si ves algo como `DLV - scroll_depth`, no es bloqueante porque el contenedor ya no lo usa.

#### Workspace > Versions

La versión viva más reciente debería corresponder a la limpieza aplicada el `2026-04-21`.

### Qué validar en Preview

Con `Tag Assistant`:

1. abre `https://www.abogadossanfelipe.cl`
2. acepta analytics
3. abre el drawer de contacto
4. escribe en el formulario
5. haz clic en WhatsApp
6. expande una FAQ

En `dataLayer` deberías ver:

- `page_view`
- `contact_drawer_open`
- `lead_form_start`
- `whatsapp_click`
- `booking_click`
- `faq_expand`

## 2. Google Analytics 4

### Propiedad

- propiedad: `479618299`
- stream web: `SB Abogados`
- measurement id: `G-EZE9DZN5J5`

### Página a abrir

- `https://analytics.google.com/`
- propiedad `SB Abogados`

### Qué revisar ahí

#### Reports > Realtime

Con el sitio abierto en otra pestaña:

1. acepta analytics
2. abre el drawer de contacto
3. escribe en el formulario
4. haz clic en WhatsApp
5. expande una FAQ

Eventos que deberías ver:

- `page_view`
- `contact_drawer_open`
- `lead_form_start`
- `whatsapp_click`
- `booking_click`
- `faq_expand`

#### Admin > Data display > DebugView

Parámetros que ya deberían estar llegando:

- `source`
- `field_name`
- `practice_area`
- `service_slug`
- `service_title`
- `error_type`
- `booking_mode`
- `platform`
- `area_slug`
- `area_title`
- `article_slug`
- `link_text`
- `link_url`
- `faq_question`

#### Admin > Data display > Custom definitions

Definiciones activas esperadas:

- `source`
- `field_name`
- `practice_area`
- `service_slug`
- `service_title`
- `error_type`
- `booking_mode`
- `platform`
- `area_slug`
- `area_title`
- `article_slug`
- `link_text`
- `link_url`
- `faq_question`

#### Admin > Data display > Key events

Key events esperados:

- `lead_form_submit_success`
- `booking_click`
- `whatsapp_click`
- `phone_click`

## 3. Sanity Studio: reseñas

### Página a abrir

- `https://www.abogadossanfelipe.cl/studio`
- documento: `Configuracion general`
- grupo: `Identidad y contacto`

### Campo a completar

- `Reseñas y perfiles externos`

### Qué cargar ahí

Por cada fuente real:

- `Plataforma`
- `Puntaje`
- `Cantidad de reseñas`
- `Resumen breve`
- `URL de reseñas`
- `Texto del enlace`

### Regla operativa

- no inventar números
- no usar testimonios internos como si fueran reseñas verificadas
- si no existe perfil público real, dejar este bloque vacío

## 4. Fuente real de agenda

### Página a abrir

- `https://www.abogadossanfelipe.cl/studio`
- documento: `Configuracion general`
- grupo: `Estructura`
- campo: `Agenda virtual`

### Qué hacer ahí

Si quieres agenda externa real:

- activar `URL externa de agenda`
- pegar URL de Calendly, Google Calendar appointment schedule o equivalente

Si quieres mantener solicitud manual:

- dejar `URL externa de agenda` vacía
- el sitio seguirá usando el drawer y el formulario actual

## 5. Measurement Protocol

No es necesario para la implementación actual.

Solo si quieres eventos server-side más adelante:

1. abre `https://analytics.google.com/`
2. entra a `Admin > Data collection and modification > Data streams > SB Abogados`
3. acepta el acknowledgement de `User Data Collection`
4. luego entra a `Measurement Protocol API secrets`

Referencias oficiales:

- `https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties/acknowledgeUserDataCollection`
- `https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events`

## Orden recomendado

1. validar `Realtime` y `DebugView`
2. cargar reseñas verificadas en Sanity
3. decidir si la agenda seguirá por formulario o pasará a enlace externo

## Resultado esperado

Cuando todo lo anterior esté hecho:

- `GA4` recibiendo eventos de negocio útiles y consistentes
- `GTM` limpio, sin Iubenda ni tags heredados
- home y landings mostrando reseñas reales si existen
- CTA de agenda apuntando al flujo correcto

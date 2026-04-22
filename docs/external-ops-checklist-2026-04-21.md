# Checklist externo: GTM, GA4 y reseñas

## Estado actual

Lo que ya esta resuelto en la app:

- GTM y GA4 solo cargan despues del consentimiento
- Iubenda ya no carga en runtime aunque el contenedor GTM siga contaminado
- los eventos de negocio ya salen directo a GA4 desde el frontend
- las landings de alta intencion ya estan publicadas

Lo que sigue pendiente fuera del repo:

1. limpiar el contenedor `GTM-NJLP7HKQ`
2. cargar una fuente real de reseñas en Sanity
3. opcional: habilitar Measurement Protocol en GA4 para eventos server-side futuros

## 1. Google Tag Manager

### Pagina a abrir

- `https://tagmanager.google.com/`
- contenedor: `GTM-NJLP7HKQ`

### Que hacer ahi

#### Workspace > Tags

Buscar por:

- `iub`
- `iubenda`
- `cookie`
- `consent`

Acciones:

- pausar o eliminar cualquier tag de `Iubenda`
- pausar o eliminar cualquier `Custom HTML` que cargue:
  - `cdn.iubenda.com`
  - `cs.iubenda.com`
  - `idb.iubenda.com`

#### Workspace > Triggers

Buscar triggers con nombres que incluyan:

- `iub`
- `iubenda`
- `consent initialization`
- `cookie banner`

Acciones:

- pausar o eliminar triggers usados solo por Iubenda

#### Workspace > Templates

Buscar templates importados o personalizados relacionados con:

- `Iubenda`
- `Consent`

Acciones:

- eliminar templates de Iubenda si ya no los usa ningun tag

#### Workspace > Variables

Buscar variables con nombres:

- `_iub`
- `iubenda`
- `cookie_consent`

Acciones:

- eliminar variables que solo existan para Iubenda

#### Workspace > Preview

Validar:

- al cargar `https://www.abogadossanfelipe.cl`, no deben aparecer requests a `iubenda`
- tras aceptar analytics, deben aparecer eventos como:
  - `contact_drawer_open`
  - `whatsapp_click`
  - `booking_click`
  - `lead_form_submit_success`

#### Workspace > Submit

- publicar una nueva version del contenedor
- dejar comentario tipo: `Remove Iubenda and keep direct GA4 events`

## 2. Google Analytics 4

### Propiedad

- propiedad: `479618299`
- stream web: `SB Abogados`
- measurement id: `G-EZE9DZN5J5`

### Pagina a abrir

- `https://analytics.google.com/`
- entrar a la propiedad `SB Abogados`

### Que revisar ahi

#### Admin > Data collection and modification > Data streams > SB Abogados

Confirmar:

- stream correcto: `G-EZE9DZN5J5`
- dominio principal correcto

#### Reports > Realtime

Con el sitio abierto en otra pestaña:

- aceptar analytics
- abrir/cerrar drawer de contacto
- hacer clic en WhatsApp

Eventos que deberias ver:

- `contact_drawer_open`
- `whatsapp_click`
- `booking_click`
- `lead_form_start`
- `lead_form_submit_success`

#### Admin > Data display > DebugView

Usar esta vista para validar parametros de evento:

- `source`
- `page_path`
- `page_title`
- `booking_mode`
- `service_title`
- `practice_area`

### Measurement Protocol

Hoy no es obligatorio porque la app ya envia eventos de negocio directo a GA4.

Si quieres dejarlo listo para eventos server-side en el futuro:

#### Paso 1

Debes aceptar el acknowledgement de recopilacion de datos de usuario para la propiedad.

Referencia oficial:

- `https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties/acknowledgeUserDataCollection`

#### Paso 2

Despues de aceptar eso, podras crear el secret en:

- `Admin > Data collection and modification > Data streams > SB Abogados > Measurement Protocol API secrets`

Referencia oficial:

- `https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events`

## 3. Sanity Studio: reseñas

### Pagina a abrir

- `https://www.abogadossanfelipe.cl/studio`
- documento: `Configuracion general`
- grupo: `Identidad y contacto`

### Campo a completar

- `Reseñas y perfiles externos`

### Que cargar ahi

Por cada fuente real:

- `Plataforma`
  - ejemplo: `Google`
- `Puntaje`
  - ejemplo: `4.9`
- `Cantidad de reseñas`
  - ejemplo: `18`
- `Resumen breve`
  - ejemplo: `Reseñas verificadas del estudio en Google.`
- `URL de reseñas`
  - enlace publico real del perfil
- `Texto del enlace`
  - ejemplo: `Ver reseñas en Google`

### Regla operativa

- no inventar numeros
- no usar testimonios internos como si fueran reseñas verificadas
- si no existe perfil publico real, dejar este bloque vacio

## 4. Fuente real de agenda

### Pagina a abrir

- `https://www.abogadossanfelipe.cl/studio`
- documento: `Configuracion general`
- grupo: `Estructura`
- campo: `Agenda virtual`

### Que hacer ahi

Si quieres agenda externa real:

- activar `URL externa de agenda`
- pegar URL de Calendly, Google Calendar appointment schedule o equivalente

Si quieres mantener solicitud manual:

- dejar `URL externa de agenda` vacia
- el sitio seguira usando el drawer + formulario con solicitud de fecha/hora

## 5. Orden recomendado

1. limpiar GTM
2. validar eventos en Realtime y DebugView
3. cargar reseñas verificadas en Sanity
4. decidir si la agenda seguira por formulario o si pasara a enlace externo

## Resultado esperado

Cuando todo lo anterior este hecho:

- GTM limpio, sin Iubenda
- GA4 recibiendo eventos de negocio utiles
- home y landings mostrando reseñas reales si existen
- CTA de agenda apuntando al flujo correcto

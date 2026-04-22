# Google Appointment Setup

## Objetivo

Dejar la web usando el enlace publico de Google Appointment Schedule para agendar videollamadas, manteniendo el formulario del sitio como respaldo cuando no exista URL externa.

## 1. Crear el horario en Google Calendar

Pagina:

- `https://calendar.google.com/`

Ruta:

1. Abrir el calendario de la cuenta que atendera las consultas.
2. En la barra lateral o en el panel principal, elegir `Appointment schedule`.
3. Crear un nuevo horario.
4. Configurar:
   - nombre visible: `Consulta virtual inicial`
   - duracion: `20 o 30 minutos`
   - modalidad: `Google Meet`
   - disponibilidad semanal
   - buffer si corresponde
5. Publicar y copiar la URL publica de reserva.

## 2. Cargar la URL en Sanity Studio

Pagina:

- `https://www.abogadossanfelipe.cl/studio`

Documento:

- `Configuracion general`

Grupo:

- `Estructura`

Campo:

- `Agenda virtual > URL externa de agenda`

Valor:

- pegar la URL publica del Appointment Schedule

## 3. Alternativa por script

Si prefieres dejarlo por codigo, exporta `GOOGLE_APPOINTMENT_URL` y ejecuta:

```powershell
npx sanity exec scripts/seed-booking-settings.ts
```

## Resultado esperado

- el boton principal de agenda cambia a enlace externo
- el evento `booking_click` sigue midiendose
- el formulario sigue disponible como respaldo si se quita la URL

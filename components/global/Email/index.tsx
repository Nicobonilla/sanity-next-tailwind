import * as React from 'react';

import { Html } from '@react-email/html';

interface EmailProps {
  name: string;
  rut: string;
  phone: string;
  comuna: string;
  email: string;
  consultationFormat: string;
  preferredDate?: string;
  preferredTimeSlot?: string;
  mainCategory: string;
  serviceCategory: string;
  message: string;
}

function formatPreferredDate(value?: string) {
  if (!value) {
    return 'Sin preferencia';
  }

  const parsedDate = new Date(`${value}T12:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  }).format(parsedDate);
}

function resolveNextStep(consultationFormat: string) {
  if (consultationFormat.toLowerCase().includes('video')) {
    return 'Siguiente paso sugerido: responder y confirmar un horario para videollamada por Google Meet.';
  }

  if (consultationFormat.toLowerCase().includes('whatsapp')) {
    return 'Siguiente paso sugerido: responder por WhatsApp y definir si conviene pasar luego a videollamada.';
  }

  if (consultationFormat.toLowerCase().includes('llamada')) {
    return 'Siguiente paso sugerido: coordinar una llamada inicial y confirmar si se requiere reunion posterior.';
  }

  return 'Siguiente paso sugerido: responder y confirmar el canal de atencion mas adecuado.';
}

export default function Email(props: EmailProps) {
  const {
    name,
    rut,
    phone,
    comuna,
    email,
    consultationFormat,
    preferredDate,
    preferredTimeSlot,
    mainCategory,
    serviceCategory,
    message,
  } = props;

  const detailRows = [
    ['Nombre completo', name],
    ['RUT', rut],
    ['Telefono', phone],
    ['Correo', email],
    ['Comuna', comuna],
  ];

  const consultationRows = [
    ['Modalidad preferida', consultationFormat],
    ['Fecha preferida', formatPreferredDate(preferredDate)],
    ['Bloque horario', preferredTimeSlot || 'Sin preferencia'],
    ['Area', mainCategory],
    ['Servicio', serviceCategory],
  ];

  return (
    <Html lang="es">
      <body
        style={{
          backgroundColor: '#f3efe8',
          color: '#1f2733',
          fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          margin: 0,
          padding: '24px 0',
        }}
      >
        <div
          style={{
            display: 'none',
            fontSize: '1px',
            lineHeight: '1px',
            maxHeight: 0,
            maxWidth: 0,
            opacity: 0,
            overflow: 'hidden',
          }}
        >
          Nueva solicitud de consulta de {name} para {serviceCategory}.
        </div>

        <table
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
          style={{ margin: '0 auto', maxWidth: '680px', width: '100%' }}
          width="100%"
        >
          <tbody>
            <tr>
              <td style={{ padding: '0 16px' }}>
                <table
                  cellPadding="0"
                  cellSpacing="0"
                  role="presentation"
                  style={{
                    backgroundColor: '#1f2733',
                    borderRadius: '20px 20px 0 0',
                    width: '100%',
                  }}
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td style={{ padding: '28px 32px 24px' }}>
                        <p
                          style={{
                            color: '#d7b56d',
                            fontSize: '12px',
                            fontWeight: 700,
                            letterSpacing: '0.16em',
                            margin: 0,
                            textTransform: 'uppercase',
                          }}
                        >
                          Nueva solicitud
                        </p>
                        <h1
                          style={{
                            color: '#ffffff',
                            fontSize: '30px',
                            fontWeight: 700,
                            lineHeight: '1.2',
                            margin: '12px 0 8px',
                          }}
                        >
                          Consulta inicial para {serviceCategory}
                        </h1>
                        <p
                          style={{
                            color: '#d6dde6',
                            fontSize: '15px',
                            lineHeight: '1.7',
                            margin: 0,
                          }}
                        >
                          {name} solicito contacto por {consultationFormat.toLowerCase()} y dejo una preferencia horaria para coordinar el siguiente paso.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table
                  cellPadding="0"
                  cellSpacing="0"
                  role="presentation"
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '0 0 20px 20px',
                    width: '100%',
                  }}
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td style={{ padding: '28px 32px' }}>
                        <table
                          cellPadding="0"
                          cellSpacing="0"
                          role="presentation"
                          style={{
                            backgroundColor: '#f8f5ef',
                            border: '1px solid rgba(31,39,51,0.08)',
                            borderRadius: '16px',
                            marginBottom: '24px',
                            width: '100%',
                          }}
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td style={{ padding: '20px 22px' }}>
                                <p
                                  style={{
                                    color: '#8b6a43',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    letterSpacing: '0.12em',
                                    margin: 0,
                                    textTransform: 'uppercase',
                                  }}
                                >
                                  Resumen operativo
                                </p>
                                <p
                                  style={{
                                    color: '#1f2733',
                                    fontSize: '16px',
                                    lineHeight: '1.7',
                                    margin: '10px 0 0',
                                  }}
                                >
                                  {resolveNextStep(consultationFormat)}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          cellPadding="0"
                          cellSpacing="0"
                          role="presentation"
                          style={{ marginBottom: '24px', width: '100%' }}
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td style={{ paddingBottom: '16px' }}>
                                <h2
                                  style={{
                                    color: '#1f2733',
                                    fontSize: '18px',
                                    fontWeight: 700,
                                    margin: 0,
                                  }}
                                >
                                  Datos de contacto
                                </h2>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <table
                                  cellPadding="0"
                                  cellSpacing="0"
                                  role="presentation"
                                  style={{
                                    borderCollapse: 'separate',
                                    borderSpacing: '0 10px',
                                    width: '100%',
                                  }}
                                  width="100%"
                                >
                                  <tbody>
                                    {detailRows.map(([label, value]) => (
                                      <tr key={label}>
                                        <td
                                          style={{
                                            color: '#5b6572',
                                            fontSize: '13px',
                                            fontWeight: 700,
                                            paddingRight: '20px',
                                            verticalAlign: 'top',
                                            width: '180px',
                                          }}
                                        >
                                          {label}
                                        </td>
                                        <td
                                          style={{
                                            color: '#1f2733',
                                            fontSize: '15px',
                                            lineHeight: '1.7',
                                          }}
                                        >
                                          {value}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          cellPadding="0"
                          cellSpacing="0"
                          role="presentation"
                          style={{ marginBottom: '24px', width: '100%' }}
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td style={{ paddingBottom: '16px' }}>
                                <h2
                                  style={{
                                    color: '#1f2733',
                                    fontSize: '18px',
                                    fontWeight: 700,
                                    margin: 0,
                                  }}
                                >
                                  Datos de la consulta
                                </h2>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <table
                                  cellPadding="0"
                                  cellSpacing="0"
                                  role="presentation"
                                  style={{
                                    borderCollapse: 'separate',
                                    borderSpacing: '0 10px',
                                    width: '100%',
                                  }}
                                  width="100%"
                                >
                                  <tbody>
                                    {consultationRows.map(([label, value]) => (
                                      <tr key={label}>
                                        <td
                                          style={{
                                            color: '#5b6572',
                                            fontSize: '13px',
                                            fontWeight: 700,
                                            paddingRight: '20px',
                                            verticalAlign: 'top',
                                            width: '180px',
                                          }}
                                        >
                                          {label}
                                        </td>
                                        <td
                                          style={{
                                            color: '#1f2733',
                                            fontSize: '15px',
                                            lineHeight: '1.7',
                                          }}
                                        >
                                          {value}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          cellPadding="0"
                          cellSpacing="0"
                          role="presentation"
                          style={{
                            backgroundColor: '#fcfbf8',
                            border: '1px solid rgba(31,39,51,0.08)',
                            borderRadius: '16px',
                            marginBottom: '24px',
                            width: '100%',
                          }}
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td style={{ padding: '20px 22px' }}>
                                <h2
                                  style={{
                                    color: '#1f2733',
                                    fontSize: '18px',
                                    fontWeight: 700,
                                    margin: '0 0 12px',
                                  }}
                                >
                                  Mensaje del cliente
                                </h2>
                                <p
                                  style={{
                                    color: '#1f2733',
                                    fontSize: '15px',
                                    lineHeight: '1.8',
                                    margin: 0,
                                    whiteSpace: 'pre-wrap',
                                  }}
                                >
                                  {message || 'No dejo comentarios adicionales.'}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          cellPadding="0"
                          cellSpacing="0"
                          role="presentation"
                          style={{ width: '100%' }}
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  color: '#5b6572',
                                  fontSize: '13px',
                                  lineHeight: '1.8',
                                }}
                              >
                                Este aviso fue generado por el formulario del sitio. Si la modalidad elegida es videollamada, puede responder este correo y enviar el enlace de Google Meet o derivar al enlace publico de Google Appointment cuando ya este configurado.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </Html>
  );
}

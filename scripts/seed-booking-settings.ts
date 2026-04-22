import { createClient } from '@sanity/client';

function getClient() {
  const token =
    process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_ADMIN_TOKEN;

  if (!token) {
    throw new Error('Missing SANITY_AUTH_TOKEN or SANITY_API_ADMIN_TOKEN');
  }

  return createClient({
    apiVersion: '2025-02-19',
    dataset: 'production',
    projectId: 'c5h3hsr1',
    token,
    useCdn: false,
  });
}

async function main() {
  const client = getClient();
  const currentSettings = await client.fetch<{
    _id: string;
    booking?: {
      bookingUrl?: string;
    };
  }>(`*[_id == "settings"][0]{_id, booking{bookingUrl}}`);

  if (!currentSettings?._id) {
    throw new Error('Settings document not found');
  }

  const bookingUrl =
    process.env.GOOGLE_APPOINTMENT_URL ||
    currentSettings.booking?.bookingUrl ||
    '';

  await client
    .patch(currentSettings._id)
    .set({
      booking: {
        _type: 'bookingSettings',
        isEnabled: true,
        title: 'Agendamiento de videollamada',
        description:
          'Puede agendar una videollamada por Google Appointment o, si lo prefiere, solicitar una fecha y horario tentativos desde el formulario del sitio.',
        buttonLabel: 'Agendar videollamada',
        bookingUrl,
        availabilityNote: 'Bloques sujetos a confirmacion del estudio',
        durationLabel: '20 a 30 minutos',
        priceLabel: 'Consulta virtual',
      },
      defaultContentCta: {
        _type: 'contactCta',
        isEnabled: true,
        eyebrow: 'Consulta inicial',
        title:
          'Puede agendar una videollamada para revisar su caso y ordenar el siguiente paso.',
        description:
          'Indique modalidad, antecedentes y horario tentativo. El estudio responde con orientacion inicial clara y confidencial.',
        primaryLabel: 'Agendar videollamada',
        secondaryLabel: 'Hablar por WhatsApp',
      },
    })
    .commit();

  console.log(
    bookingUrl
      ? `Booking settings updated with external appointment URL: ${bookingUrl}`
      : 'Booking settings updated without external appointment URL'
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

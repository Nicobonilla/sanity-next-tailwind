export const siteConfig = {
  firmName: 'Estudio Juridico Sebastian Bonilla Marin',
  shortName: 'Sebastian Bonilla Marin',
  descriptor: 'Asesoria legal y judicial en San Felipe',
  phoneDisplay: '+56 9 3359 6955',
  phoneHref: 'tel:+56933596955',
  whatsappHref: 'https://wa.me/56933596955',
  email: 'contacto@abogadossanfelipe.cl',
  emailHref: 'mailto:contacto@abogadossanfelipe.cl',
  addressLine: 'San Felipe, Region de Valparaiso, Chile',
  city: 'San Felipe',
  region: 'Valparaiso',
  booking: {
    isEnabled: true,
    title: 'Agendamiento de videollamada',
    description:
      'Puede agendar una videollamada por Google Appointment o, si lo prefiere, solicitar una fecha y horario tentativos desde el formulario del sitio.',
    buttonLabel: 'Agendar videollamada',
    bookingUrl: '',
    availabilityNote: 'Bloques sujetos a confirmacion del estudio',
    durationLabel: '20 a 30 minutos',
    priceLabel: 'Consulta virtual',
  },
  reviewProfiles: [] as Array<{
    ctaLabel?: string | null;
    platform?: string | null;
    rating?: number | null;
    reviewCount?: number | null;
    reviewUrl?: string | null;
    summary?: string | null;
  }>,
};

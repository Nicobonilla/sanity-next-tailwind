import { SettingsQueryResult } from '@/sanity.types';

import { siteConfig } from './site-config';

export type SiteIdentity = {
  firmName: string;
  shortName: string;
  responsibleLawyerName: string;
  descriptor: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
  email: string;
  emailHref: string;
  addressLine: string;
  city: string;
  region: string;
};

function sanitizePhoneNumber(value?: string | null) {
  return value?.replace(/[^\d+]/g, '') || '';
}

function sanitizeWhatsappNumber(value?: string | null) {
  return value?.replace(/\D/g, '') || '';
}

export function resolveSiteIdentity(
  settings?: SettingsQueryResult | null
): SiteIdentity {
  const phoneDisplay = settings?.phoneDisplay || siteConfig.phoneDisplay;
  const phoneNumber = sanitizePhoneNumber(phoneDisplay);
  const whatsappNumber =
    sanitizeWhatsappNumber(settings?.whatsappNumber) ||
    sanitizeWhatsappNumber(phoneDisplay);
  const email = settings?.email || siteConfig.email;

  return {
    firmName: settings?.firmName || siteConfig.firmName,
    shortName: settings?.shortName || siteConfig.shortName,
    responsibleLawyerName:
      settings?.responsibleLawyerName ||
      settings?.shortName ||
      siteConfig.shortName,
    descriptor: settings?.descriptor || siteConfig.descriptor,
    phoneDisplay,
    phoneHref: `tel:${phoneNumber || siteConfig.phoneHref.replace('tel:', '')}`,
    whatsappHref: `https://wa.me/${whatsappNumber || siteConfig.whatsappHref.replace('https://wa.me/', '')}`,
    email,
    emailHref: `mailto:${email}`,
    addressLine: settings?.addressLine || siteConfig.addressLine,
    city: settings?.city || siteConfig.city,
    region: settings?.region || siteConfig.region,
  };
}

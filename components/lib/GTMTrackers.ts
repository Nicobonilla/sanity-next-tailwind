'use client';

import {
  inferAnalyticsPageContext,
  inferCtaLocation,
  inferPracticeArea,
  inferServiceSlugFromSource,
} from './analyticsContext';

type AnalyticsPayload = Record<string, unknown>;
const directGaEvents = new Set([
  'page_view',
  'view_service',
  'cta_click',
  'contact_drawer_open',
  'form_start',
  'lead_form_submit',
  'lead_form_start',
  'lead_form_service_select',
  'lead_form_submit_success',
  'lead_form_submit_error',
  'phone_click',
  'whatsapp_click',
  'email_click',
  'booking_click',
  'review_click',
  'practice_area_click',
  'article_click',
  'nav_click',
  'faq_expand',
  'scroll_depth',
  'scroll_90',
  'download_checklist',
  'view_thank_you',
]);
const analyticsKeys = [
  'source',
  'field_name',
  'page_type',
  'content_type',
  'city_intent',
  'practice_area',
  'service_slug',
  'service_title',
  'article_topic',
  'error_type',
  'form_id',
  'lead_type',
  'booking_mode',
  'contact_method',
  'cta_location',
  'platform',
  'area_slug',
  'area_title',
  'article_slug',
  'link_text',
  'link_url',
  'scroll_depth',
  'faq_question',
  'button_name',
] as const;

function canSendAnalyticsEvents() {
  return (
    process.env.NODE_ENV === 'production' &&
    typeof window !== 'undefined' &&
    window.__asfTrackingEnabled === true &&
    window.__asfAnalyticsConsent === 'granted'
  );
}

function buildPageContext() {
  if (typeof window === 'undefined') {
    return {};
  }

  return {
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
    ...inferAnalyticsPageContext(window.location.pathname),
  };
}

function isGaDebugModeEnabled() {
  if (typeof window === 'undefined') {
    return false;
  }

  const searchParams = new URLSearchParams(window.location.search);

  return searchParams.get('ga_debug') === '1';
}

function buildAnalyticsKeyResetState() {
  return analyticsKeys.reduce<Record<string, undefined>>((accumulator, key) => {
    accumulator[key] = undefined;
    return accumulator;
  }, {});
}

function canSendDirectGtagEvent() {
  return (
    canSendAnalyticsEvents() &&
    typeof window.gtag === 'function'
  );
}

function sendDirectGtagEvent(event: string, payload: AnalyticsPayload = {}) {
  if (!directGaEvents.has(event) || !canSendDirectGtagEvent()) {
    return;
  }

  const { gtag } = window;

  if (typeof gtag !== 'function') {
    return;
  }

  gtag('event', event, {
    ...buildPageContext(),
    ...(isGaDebugModeEnabled() ? { debug_mode: true } : {}),
    ...payload,
  });
}

export const sendGTMEvent = (event: string, payload: AnalyticsPayload = {}) => {
  if (!canSendAnalyticsEvents()) {
    return;
  }

  const eventPayload = {
    event,
    ...buildAnalyticsKeyResetState(),
    ...buildPageContext(),
    ...payload,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);
  sendDirectGtagEvent(event, payload);
};

export const trackCtaClick = ({
  contactMethod,
  ctaLocation,
  practiceArea,
  serviceSlug,
  serviceTitle,
  source,
}: {
  contactMethod: 'form' | 'whatsapp' | 'phone' | 'email' | 'booking';
  ctaLocation?: string;
  practiceArea?: string;
  serviceSlug?: string;
  serviceTitle?: string;
  source: string;
}) => {
  const resolvedServiceSlug = serviceSlug || inferServiceSlugFromSource(source);

  sendGTMEvent('cta_click', {
    contact_method: contactMethod,
    cta_location: ctaLocation || inferCtaLocation(source),
    practice_area:
      practiceArea || inferPracticeArea(`${source} ${resolvedServiceSlug || ''}`),
    service_slug: resolvedServiceSlug,
    service_title: serviceTitle,
    source,
  });
};

export const trackContactDrawerOpen = (source: string) => {
  trackCtaClick({
    contactMethod: 'form',
    source,
  });
  sendGTMEvent('contact_drawer_open', {
    source,
  });
};

export const trackButtonClick = (buttonId: string, component: string) => {
  sendGTMEvent('button_click', {
    button_name: buttonId,
    source: component,
  });
};

export const trackScrollDepth = (scrollDepth: string) => {
  if (scrollDepth === '90') {
    sendGTMEvent('scroll_90', {
      scroll_depth: scrollDepth,
    });
  }

  sendGTMEvent('scroll_depth', {
    scroll_depth: scrollDepth,
  });
};

export const trackLeadFormStart = (fieldName: string) => {
  const payload = {
    field_name: fieldName,
    form_id: 'contacto_servicio',
    lead_type: 'primary',
  };

  sendGTMEvent('form_start', payload);
  sendGTMEvent('lead_form_start', {
    ...payload,
  });
};

export const trackLeadFormServiceSelect = ({
  areaTitle,
  serviceSlug,
  serviceTitle,
}: {
  areaTitle: string;
  serviceSlug: string;
  serviceTitle: string;
}) => {
  sendGTMEvent('lead_form_service_select', {
    area_title: areaTitle,
    practice_area: inferPracticeArea(`${areaTitle} ${serviceTitle}`) || areaTitle,
    service_slug: serviceSlug,
    service_title: serviceTitle,
  });
};

export const trackLeadFormSubmitSuccess = ({
  areaTitle,
  serviceTitle,
}: {
  areaTitle: string;
  serviceTitle: string;
}) => {
  const payload = {
    contact_method: 'form',
    form_id: 'contacto_servicio',
    lead_type: 'primary',
    practice_area: inferPracticeArea(`${areaTitle} ${serviceTitle}`) || areaTitle,
    service_title: serviceTitle,
  };

  sendGTMEvent('lead_form_submit', payload);
  sendGTMEvent('lead_form_submit_success', {
    ...payload,
  });
};

export const trackLeadFormSubmitError = (reason: string) => {
  sendGTMEvent('lead_form_submit_error', {
    error_type: reason,
  });
};

export const trackPhoneClick = (source: string) => {
  trackCtaClick({
    contactMethod: 'phone',
    source,
  });
  sendGTMEvent('phone_click', {
    contact_method: 'phone',
    cta_location: inferCtaLocation(source),
    source,
  });
};

export const trackWhatsappClick = (source: string) => {
  trackCtaClick({
    contactMethod: 'whatsapp',
    source,
  });
  sendGTMEvent('whatsapp_click', {
    contact_method: 'whatsapp',
    cta_location: inferCtaLocation(source),
    source,
  });
};

export const trackBookingClick = (source: string, mode: 'external' | 'request') => {
  trackCtaClick({
    contactMethod: mode === 'external' ? 'booking' : 'form',
    source,
  });
  sendGTMEvent('booking_click', {
    source,
    booking_mode: mode,
    contact_method: mode === 'external' ? 'booking' : 'form',
    cta_location: inferCtaLocation(source),
  });
};

export const trackEmailClick = (source: string) => {
  trackCtaClick({
    contactMethod: 'email',
    source,
  });
  sendGTMEvent('email_click', {
    contact_method: 'email',
    cta_location: inferCtaLocation(source),
    source,
  });
};

export const trackReviewClick = (platform: string, source: string) => {
  sendGTMEvent('review_click', {
    platform,
    source,
  });
};

export const trackPracticeAreaClick = (
  areaSlug: string,
  areaTitle: string,
  source: string
) => {
  sendGTMEvent('practice_area_click', {
    area_slug: areaSlug,
    area_title: areaTitle,
    practice_area: inferPracticeArea(`${areaSlug} ${areaTitle}`) || areaTitle,
    source,
  });
};

export const trackArticleClick = (articleSlug: string, source: string) => {
  sendGTMEvent('article_click', {
    article_slug: articleSlug,
    source,
  });
};

export const trackNavClick = (navText: string, navHref: string) => {
  sendGTMEvent('nav_click', {
    link_text: navText,
    link_url: navHref,
  });
};

export const trackFaqExpand = (source: string, question: string) => {
  sendGTMEvent('faq_expand', {
    source,
    faq_question: question,
    practice_area: inferPracticeArea(`${source} ${question}`),
  });
};

export const trackPageView = (pagePath: string) => {
  sendGTMEvent('page_view', {
    page_path: pagePath,
    ...inferAnalyticsPageContext(pagePath),
  });
};

export const trackServiceView = (pagePath: string) => {
  const context = inferAnalyticsPageContext(pagePath);

  if (context.page_type !== 'service') {
    return;
  }

  sendGTMEvent('view_service', {
    ...context,
  });
};

export const GTMEvents = {
  contactDrawerOpen: 'contact_drawer_open',
  buttonClick: 'button_click',
  ctaClick: 'cta_click',
  formStart: 'form_start',
  leadFormStart: 'lead_form_start',
  leadFormSubmit: 'lead_form_submit',
  leadFormServiceSelect: 'lead_form_service_select',
  leadFormSubmitSuccess: 'lead_form_submit_success',
  leadFormSubmitError: 'lead_form_submit_error',
  phoneClick: 'phone_click',
  whatsappClick: 'whatsapp_click',
  emailClick: 'email_click',
  bookingClick: 'booking_click',
  reviewClick: 'review_click',
  practiceAreaClick: 'practice_area_click',
  articleClick: 'article_click',
  navClick: 'nav_click',
  faqExpand: 'faq_expand',
  scrollDepth: 'scroll_depth',
  scroll90: 'scroll_90',
  pageView: 'page_view',
  viewService: 'view_service',
};

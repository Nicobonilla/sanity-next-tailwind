'use client';

type AnalyticsPayload = Record<string, unknown>;
const directGaEvents = new Set([
  'page_view',
  'contact_drawer_open',
  'lead_form_start',
  'lead_form_service_select',
  'lead_form_submit_success',
  'lead_form_submit_error',
  'phone_click',
  'whatsapp_click',
  'booking_click',
  'review_click',
  'practice_area_click',
  'article_click',
  'nav_click',
  'faq_expand',
]);
const analyticsKeys = [
  'source',
  'field_name',
  'practice_area',
  'service_slug',
  'service_title',
  'error_type',
  'booking_mode',
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
    ...buildPageContext(),
    ...buildAnalyticsKeyResetState(),
    ...payload,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);
  sendDirectGtagEvent(event, payload);
};

export const trackContactDrawerOpen = (source: string) => {
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
  sendGTMEvent('scroll_depth', {
    scroll_depth: scrollDepth,
  });
};

export const trackLeadFormStart = (fieldName: string) => {
  sendGTMEvent('lead_form_start', {
    field_name: fieldName,
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
    practice_area: areaTitle,
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
  sendGTMEvent('lead_form_submit_success', {
    practice_area: areaTitle,
    service_title: serviceTitle,
  });
};

export const trackLeadFormSubmitError = (reason: string) => {
  sendGTMEvent('lead_form_submit_error', {
    error_type: reason,
  });
};

export const trackPhoneClick = (source: string) => {
  sendGTMEvent('phone_click', {
    source,
  });
};

export const trackWhatsappClick = (source: string) => {
  sendGTMEvent('whatsapp_click', {
    source,
  });
};

export const trackBookingClick = (source: string, mode: 'external' | 'request') => {
  sendGTMEvent('booking_click', {
    source,
    booking_mode: mode,
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
  });
};

export const trackPageView = (pagePath: string) => {
  sendGTMEvent('page_view', {
    page_path: pagePath,
  });
};

export const GTMEvents = {
  contactDrawerOpen: 'contact_drawer_open',
  buttonClick: 'button_click',
  leadFormStart: 'lead_form_start',
  leadFormServiceSelect: 'lead_form_service_select',
  leadFormSubmitSuccess: 'lead_form_submit_success',
  leadFormSubmitError: 'lead_form_submit_error',
  phoneClick: 'phone_click',
  whatsappClick: 'whatsapp_click',
  bookingClick: 'booking_click',
  reviewClick: 'review_click',
  practiceAreaClick: 'practice_area_click',
  articleClick: 'article_click',
  navClick: 'nav_click',
  faqExpand: 'faq_expand',
  scrollDepth: 'scroll_depth',
  pageView: 'page_view',
};

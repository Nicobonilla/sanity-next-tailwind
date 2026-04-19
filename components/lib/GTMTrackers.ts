'use client';

export const sendGTMEvent = (eventData: Record<string, unknown>) => {
  if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);
};

export const trackContactDrawerOpen = (source: string) => {
  sendGTMEvent({
    event: 'contact_drawer_open',
    source,
  });
};

export const trackButtonClick = (buttonId: string, component: string) => {
  sendGTMEvent({
    event: 'button_click',
    buttonId,
    component,
  });
};

export const trackScrollDepth = (scrollDepth: string) => {
  sendGTMEvent({
    event: 'scroll_depth',
    scrollDepth,
  });
};

export const trackFormSubmit = (field: string) => {
  sendGTMEvent({
    event: 'form_submit',
    field,
  });
};

export const trackLeadFormStart = (fieldName: string) => {
  sendGTMEvent({
    event: 'lead_form_start',
    fieldName,
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
  sendGTMEvent({
    event: 'lead_form_service_select',
    areaTitle,
    serviceSlug,
    serviceTitle,
  });
};

export const trackLeadFormSubmitSuccess = ({
  areaTitle,
  serviceTitle,
}: {
  areaTitle: string;
  serviceTitle: string;
}) => {
  sendGTMEvent({
    event: 'lead_form_submit_success',
    areaTitle,
    serviceTitle,
  });
};

export const trackLeadFormSubmitError = (reason: string) => {
  sendGTMEvent({
    event: 'lead_form_submit_error',
    reason,
  });
};

export const trackPhoneClick = (source: string) => {
  sendGTMEvent({
    event: 'phone_click',
    source,
  });
};

export const trackWhatsappClick = (source: string) => {
  sendGTMEvent({
    event: 'whatsapp_click',
    source,
  });
};

export const trackPracticeAreaClick = (
  areaSlug: string,
  areaTitle: string,
  source: string
) => {
  sendGTMEvent({
    event: 'practice_area_click',
    areaSlug,
    areaTitle,
    source,
  });
};

export const trackArticleClick = (articleSlug: string, source: string) => {
  sendGTMEvent({
    event: 'article_click',
    articleSlug,
    source,
  });
};

export const trackSwipe = (direction: number) => {
  sendGTMEvent({
    event: 'swipe',
    direction,
  });
};

export const trackFormFieldClick = (fieldId: string, fieldType: string) => {
  sendGTMEvent({
    event: 'form_field_click',
    fieldId,
    fieldType,
  });
};

export const trackNavClick = (navText: string, navHref: string) => {
  sendGTMEvent({
    event: 'nav_click',
    navText,
    navHref,
  });
};

export const trackTimeOnPage = (timeSpent: number) => {
  sendGTMEvent({
    event: 'time_on_page',
    timeSpent,
  });
};

export const trackPinch = (scale: number) => {
  sendGTMEvent({
    event: 'pinch',
    scale,
  });
};

export const trackPushNotificationClick = (
  notificationTitle: string,
  notificationData: unknown
) => {
  sendGTMEvent({
    event: 'push_notification_click',
    notificationTitle,
    notificationData,
  });
};

export const trackGeolocationEnabled = (
  latitude: number,
  longitude: number
) => {
  sendGTMEvent({
    event: 'geolocation_enabled',
    latitude,
    longitude,
  });
};

export const trackJavascriptError = (
  errorMessage: string,
  source: string,
  line: number,
  column: number
) => {
  sendGTMEvent({
    event: 'javascript_error',
    errorMessage,
    source,
    line,
    column,
  });
};

export const trackExitIntent = () => {
  sendGTMEvent({
    event: 'exit_intent',
  });
};

export const trackPageView = (pagePath: string) => {
  sendGTMEvent({
    event: 'page_view',
    pagePath,
  });
};

export const GTMEvents = {
  buttonClick: 'button_click',
  contactDrawerOpen: 'contact_drawer_open',
  swipe: 'swipe',
  formSubmit: 'form_submit',
  leadFormStart: 'lead_form_start',
  leadFormServiceSelect: 'lead_form_service_select',
  leadFormSubmitSuccess: 'lead_form_submit_success',
  leadFormSubmitError: 'lead_form_submit_error',
  phoneClick: 'phone_click',
  whatsappClick: 'whatsapp_click',
  practiceAreaClick: 'practice_area_click',
  articleClick: 'article_click',
  formFieldClick: 'form_field_click',
  navClick: 'nav_click',
  scrollDepth: 'scroll_depth',
  timeOnPage: 'time_on_page',
  pinch: 'pinch',
  pushNotificationClick: 'push_notification_click',
  geolocationEnabled: 'geolocation_enabled',
  javascriptError: 'javascript_error',
  purchase: 'purchase',
  exitIntent: 'exit_intent',
  pageView: 'page_view',
};

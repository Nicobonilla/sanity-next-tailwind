'use client';

export const sendGTMEvent = (eventData: Record<string, unknown>) => {
  if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);
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
  swipe: 'swipe',
  formSubmit: 'form_submit',
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

'use client';

export const sendGTMEvent = (eventData: Record<string, any>) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);
};

export const initializeGTM = (gtmId: string) => {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);
};

// Funciones de eventos

export const trackButtonClick = (buttonId: string, buttonText: string) => {
  sendGTMEvent({
    event: 'buttonClick',
    buttonId,
    buttonText,
  });
};

export const trackSwipe = (direction: number) => {
  sendGTMEvent({
    event: 'swipe',
    direction,
  });
};

export const trackFormSubmit = (formId: string, formAction: string) => {
  sendGTMEvent({
    event: 'formSubmit',
    formId,
    formAction,
  });
};

export const trackFormFieldClick = (fieldId: string, fieldType: string) => {
  sendGTMEvent({
    event: 'formFieldClick',
    fieldId,
    fieldType,
  });
};

export const trackNavClick = (navText: string, navHref: string) => {
  sendGTMEvent({
    event: 'navClick',
    navText,
    navHref,
  });
};

export const trackScrollDepth = (scrollDepth: number) => {
  sendGTMEvent({
    event: 'scrollDepth',
    scrollDepth,
  });
};

export const trackTimeOnPage = (timeSpent: number) => {
  sendGTMEvent({
    event: 'timeOnPage',
    timeSpent,
  });
};

export const trackPinch = (scale: number) => {
  sendGTMEvent({
    event: 'pinch',
    scale,
  });
};

export const trackPushNotificationClick = (notificationTitle: string, notificationData: any) => {
  sendGTMEvent({
    event: 'pushNotificationClick',
    notificationTitle,
    notificationData,
  });
};

export const trackGeolocationEnabled = (latitude: number, longitude: number) => {
  sendGTMEvent({
    event: 'geolocationEnabled',
    latitude,
    longitude,
  });
};

export const trackJavaScriptError = (errorMessage: string, source: string, line: number, column: number) => {
  sendGTMEvent({
    event: 'javascriptError',
    errorMessage,
    source,
    line,
    column,
  });
};

export const trackPurchase = (transactionId: string, transactionTotal: string) => {
  sendGTMEvent({
    event: 'purchase',
    transactionId,
    transactionTotal,
  });
};

export const trackExitIntent = () => {
  sendGTMEvent({
    event: 'exitIntent',
  });
};

// Función para rastrear vistas de página
export const trackPageView = (pagePath: string) => {
  sendGTMEvent({
    event: 'pageView',
    pagePath,
  });
};

// Lista de nombres de eventos
export const GTMEvents = {
  BUTTON_CLICK: 'buttonClick',
  SWIPE: 'swipe',
  FORM_SUBMIT: 'formSubmit',
  FORM_FIELD_CLICK: 'formFieldClick',
  NAV_CLICK: 'navClick',
  SCROLL_DEPTH: 'scrollDepth',
  TIME_ON_PAGE: 'timeOnPage',
  PINCH: 'pinch',
  PUSH_NOTIFICATION_CLICK: 'pushNotificationClick',
  GEOLOCATION_ENABLED: 'geolocationEnabled',
  JAVASCRIPT_ERROR: 'javascriptError',
  PURCHASE: 'purchase',
  EXIT_INTENT: 'exitIntent',
  PAGE_VIEW: 'pageView',
};

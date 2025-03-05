'use client';

export const sendGTMEvent = (eventData: Record<string, any>) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  if (typeof window === 'undefined' || !window.dataLayer) {
    console.error(
      'dataLayer no está definido. Asegúrate de que GTM está correctamente cargado.'
    );
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);

  // Depuración: ver qué datos se envían
  console.log('Evento enviado a GTM:', eventData);
};

// Funciones de eventos
export const trackButtonClick = (buttonId: string, component: string) => {
  // DONE
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
  notificationData: any
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

// Función para rastrear vistas de página
export const trackPageView = (pagePath: string) => {
  sendGTMEvent({
    event: 'page_view',
    pagePath,
  });
};

// Lista de nombres de eventos
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

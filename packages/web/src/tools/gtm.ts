export function triggerTag(event: string, data?: any) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...data,
  });
}

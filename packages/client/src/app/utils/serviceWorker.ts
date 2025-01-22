export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").then(
        () => {
          //eslint-disable-next-line no-console
          console.info("ServiceWorker успешно зарегестрирован");
        },
        error => {
          //eslint-disable-next-line no-console
          console.error(`Ошибка регистрации ServiceWorker: ${error}`);
        },
      );
    });
  } else {
    //eslint-disable-next-line no-console
    console.warn("ServiceWorker не поддерживается");
  }
}

export function unregisterServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
  }
}

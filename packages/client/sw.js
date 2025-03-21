const CACHE_PREFIX = 'flappy-bird';
const CACHE_VERSION = 1;
const CACHE_NAME = `${CACHE_PREFIX}-v${CACHE_VERSION}`;

this.addEventListener('install', event => {
  //eslint-disable-next-line no-console
  console.log("Service Worker: Установлен");

  event.waitUntil(
    fetch('./manifest.json')
      .then(response => response.json())
      .then(manifest => {
        const URLS = [
          manifest['index.html'],
          manifest['src/assets/background.png'].file,
          manifest['src/assets/background-game.png'].file,
          manifest['src/assets/error404hamster.png'].file,
          manifest['src/assets/error-bird.png'].file,
          manifest['src/assets/game-icon.png'].file,
          manifest['src/assets/obstacle-to-game.png'].file,
          manifest['src/assets/fonts/JollyLodger-Regular.woff'].file,
          manifest['src/assets/birds/bird-wings-down.png'].file,
          manifest['src/assets/birds/bird-wings-down-v2.png'].file,
          manifest['src/assets/birds/bird-wings-down-v3.png'].file,
          manifest['src/assets/birds/bird-wings-up.png'].file,
          manifest['src/assets/birds/bird-wings-up-v2.png'].file,
          manifest['src/assets/birds/bird-wings-up-v3.png'].file,
        ];

        return caches.open(CACHE_NAME).then(cache => {
          //eslint-disable-next-line no-console
          console.log("Кэширование файлов:", URLS);
          return cache.addAll(URLS.map(url => `/${url}`));
        });
      })
      //eslint-disable-next-line no-console
      .catch(err => console.error("Ошибка загрузки манифеста:", err))
  );
});

this.addEventListener('fetch', event => {
  //eslint-disable-next-line no-console
  console.log("Service Worker: Запрос кэширования", event.request.url);
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

this.addEventListener('activate', event => {
  //eslint-disable-next-line no-console
  console.log("Service Worker: Активирован");
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            //eslint-disable-next-line no-console
            console.log("Service Worker: Удаление старого кэша", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

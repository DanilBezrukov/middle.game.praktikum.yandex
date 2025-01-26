const CACHE_PREFIX = 'flappy-bird';
const CACHE_VERSION = 1;
const CACHE_NAME = `${CACHE_PREFIX}-v${CACHE_VERSION}`;


const URLS = [
  '/index.html',
  'src/assets/background.png',
  'src/assets/background-game.png',
  'src/assets/error404hamster.png',
  'src/assets/error-bird.png',
  'src/assets/game-icon.png',
  'src/assets/obstacle-to-game.png',
  'src/assets/fonts/JollyLodger-Regular.woff',
  'src/assets/birds/bird-wings-down.png',
  'src/assets/birds/bird-wings-down-v2.png',
  'src/assets/birds/bird-wings-down-v3.png',
  'src/assets/birds/bird-wings-up.png',
  'src/assets/birds/bird-wings-up-v2.png',
  'src/assets/birds/bird-wings-up-v3.png',
];


this.addEventListener('install', event => {
  //eslint-disable-next-line no-console
  console.log("Service Worker: Установлен");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      //eslint-disable-next-line no-console
      console.log("Кэширование файлов...");
      return Promise.all(URLS.map(url =>
        fetch(url).then(response => {
          if (!response.ok) {
            //eslint-disable-next-line no-console
            console.error(`Не удалось загрузить файл: ${url}`);
            throw new Error(`Не удалось загрузить файл: ${url}`);
          }
          return cache.put(url, response);
        })
      ));
    })
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
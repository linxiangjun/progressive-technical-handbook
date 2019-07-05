var cacheStorageKey = 'pwa-v2'
var cacheList = [
  '../src/index.js',
  '../src/index.css',
  '../src/App.js',
  '../src/App.css',
]

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheStorageKey)
      .then(function (cache) { return cache.addAll(cacheList) })
      .then(function () { return self.skipWaiting() })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // 检测是否已经缓存过
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function (response) {
            // 检测请求是否有效
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(cacheStorageKey)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    // 遍历 caches 里所有缓存的 keys 值
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        // 获取所有不同于当前版本名称cache下的内容
        cacheNames.filter(function (cacheNames) {
          return cacheNames !== cacheStorageKey
        }).map(function (cacheNames) {
          return caches.delete(cacheNames)
        })
      );
    }).then(function () {
      return self.clients.claim()
    })
  );
});

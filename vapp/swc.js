const cacheName = 'cacheName'

let includes = ['list', '.png']

function isCache(event) {
    let url = event.request.url
    return includes.some(include => url.includes(include))
}

self.addEventListener('fetch', function (event) {
    console.log('fetch', event.request.url)
    if (isCache(event)) {
        event.respondWith(
            caches.open(cacheName).then(function (cache) {
                // console.log('fetch cacheName', cache)
                return cache.match(event.request).then(function (response) {
                    return response || fetch(event.request).then(function (response) {
                        cache.put(event.request, response.clone());
                        console.log('fetch put', response)
                        return response;
                    });
                });
            })
        );
    }
});

self.addEventListener('message', function (event) {
    // if (event.data == 'skipWaiting') {
    //     self.skipWaiting()
    // }
});

self.addEventListener('install', function (event) {
    event.currentTarget.skipWaiting()
});

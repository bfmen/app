const cacheName = 'cacheName'

function isCache1(event) {
	let url = event.request.url
	return [
		'.jpg', 
		'the-awesome-smanx-site.netlify.app/coverpic',
		'/pornstars/img',
		'/pornstars/webm'
	].some(include => url.includes(include))
}

function isCache2(event) {
	let url = event.request.url
	return ['6jwti3892pf605m004mn.lagoapps.com'].some(include => url.includes(include))
}

function isCache3(event) {
	return false
}

function isCacheType(event) {
	let url = event.request.url
	if (isCache1(event)) return 1
	if (isCache2(event)) return 2
	if (isCache3(event)) return 3
	return 0
}


self.addEventListener('fetch', function (event) {
	// console.log('fetch ==>', event.request.url)
	if (isCache1(event)) {
		event.respondWith(
			caches.open(cacheName).then((cache) => {
				return cache.match(event.request).then((cacheResponse) => {
					return cacheResponse || fetch(event.request).then((networkResponse) => {
						cache.put(event.request, networkResponse.clone())
						return networkResponse
					})
				})
			}))
	} else if (isCache2(event)) {
		event.respondWith(
			caches.open(cacheName).then((cache) => {
				return caches.match(event.request).then((cacheResponse) => {
					const fetchPromise = fetch(event.request).then((networkResponnse) => {
						cache.put(event.request, networkResponnse.clone())
						return networkResponnse
					})
					return cacheResponse || fetchPromise
				})
			})
		)
	} else if (isCache3(event)) {
		event.respondWith(
			caches.open(cacheName).then((cache) => {
				return fetch(event.request).then((networkResponse) => {
					cache.put(event.request, networkResponse.clone())
					return networkResponse
				}).cache(() => {
					return cache.match(event.request)
				})
			})
		)
	} else {
		caches.open(cacheName).then((cache) => {
			cache.delete(event.request)
		})
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




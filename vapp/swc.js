const cacheName = 'cacheName'

function isCache1(event) {
	let url = event.request.url
	return [
		'.jpg',
		'the-awesome-smanx-site.netlify.app/coverpic',
		'/pornstars/img',
		'/pornstars/webm'
	].some(include => url.includes(include)) && ['192.168'].some(include => !url.includes(include))
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

const proxyUrl = 'https://spectacular-youtiao-f4e424.netlify.app/api/file?uuu='

function isProxy(url) {
	let hosts = ['1257120875.vod2.myqcloud.com', 'd2zihajmogu5jn.cloudfront.net', '122.9.132.112', 'cdn77.91p49.com', 'www.baidu.com', 'hls-hw.xvideos-cdn.com']
	return !url.startsWith(proxyUrl) && hosts.some(host => url.includes(`//${host}`))
}


self.addEventListener('fetch', function (event) {
	// console.log('fetch ==>', event.request.url)
	if (isProxy(event.request.url)) {
		let request = event.request.clone()
		Object.defineProperty(request, 'url', { writable: true });
		request.url = proxyUrl + encodeURIComponent(event.request.url)
		// request.url = 'http://localhost:8080/favicon.ico'
		// request.url = proxyUrl + 'http://122.9.132.112/img/yslogo.91c887ee.png'
		// request.url = 'https://spectacular-youtiao-f4e424.netlify.app/api/file'
		console.log('proxy fetch ==>', event.request.url, request.url)
		event.respondWith(fetch(request.url).then(async (networkResponse) => {
			// console.log('networkResponse', networkResponse.body)
			let contentType = networkResponse.headers.get("content-type")
			console.log('contentType', request.url, contentType)
			let data = await networkResponse.text()
			if (['image/', 'video/'].some(str => contentType.includes(str))) {
				data = stringToUint8Array(data)
			} else if (contentType.includes('application/octet-stream')) {
				if (event.request.url.includes('.m3u8')) {
					data = modifyResponse(data, event.request.url)
				} else {
					data = stringToUint8Array(data)
				}
			}
			var myResponse = new Response(data, { "status": 200, "statusText": "SuperSmashingGreat!" });
			return myResponse
		}))
	} else if (isCache1(event)) {
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


function modifyResponse(response, url) {
	console.log('modifyResponse')
	let data = response
	let responseNew = ''
	if (url.includes('.m3u8')) {
		let urlReals = url.split('/')
		urlReals.pop()
		let urlReal = urlReals.join('/')
		responseNew = data.split('\n').map(str => {
			if (str.includes('.ts')) {
				if (str.startsWith('http')) {
					return str
				} else {
					return `${urlReal}/${str}`
				}
			} else {
				return str
			}
		}).join('\n')
	} else if (url.includes('.ts')) {
		responseNew = stringToUint8Array(data)
	}
	return responseNew
}

function stringToUint8Array(str) {
	var arr = [];
	for (var i = 0, j = str.length; i < j; ++i) {
		arr.push(str.charCodeAt(i));
	}
	var tmpUint8Array = new Uint8Array(arr);
	return tmpUint8Array
}
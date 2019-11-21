self.addEventListener('install', function(event) {
    console.log('-------> Service worker installed');

    event.waitUntil(
        caches.open('static')
            .then(function(cache){
            /* cache.add('/');
            cache.add('/index.html');
            cache.add('/src/js/app.js'); */
            console.log('Adding to cachec');

            cache.addAll([
                '/index.html',
                '/src/images/sf-boat.jpg',
                '/src/js/app.js',
                '/src/css/main.css',
                '/manifest.json'
            ]);
        })
    );
});

self.addEventListener('activate', function() {
    console.log('-------> Service worker activate');
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(res) {
            if (res) {
                console.log('get from cache------------>');

                return res;
            } else {
                return fetch(event.request);
            }
        })
    );
});
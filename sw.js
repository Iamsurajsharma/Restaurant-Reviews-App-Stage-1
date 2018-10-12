const cacheName = 'v1';

const cacheAssests=[
                '/',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/css/styles.css',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg'
]
 
// Call Install Event 

self.addEventListener('install',(e)=>{
    console.log('Service Worker : Install')

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache=>{
                console.log('Service Worker: Caching Files');
                cache.addAll(cacheAssests);
            })
            .then(()=> self.skipWaiting())
    )
})


self.addEventListener('activate',(e)=>{
    console.log('Service Worker : Activate')
    // Remove unwanted Caches
    e.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cache=>{
                    if(cache!==cacheName){
                        console.log('Service Worker Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})

//Calling Fetch Event 

self.addEventListener('fetch',e=>{
    console.log('Service worker Fetching ');
    e.respondWith(
        fetch(e.request).catch(()=> caches.match(e.request))
    )
})
const STUDENTS_CACHE = 'version-1'

const self = this


const addResourcesToCache = async (resources) => {
    const cache = await caches.open(STUDENTS_CACHE)
    await cache.addAll(resources)
}
self.addEventListener('install', (event) => {
    event.waitUntil(
        // caches.open(STUDENTS_CACHE).then((cache) => {
        //     return cache.addAll([
        //         './',
        //         'index.html',
        //         'App.jsx',
        //         'school icon.jpg'

        //     ]).catch((error) => {
        //         console.log('cache.all error', error)
        //     })
        // })

        addResourcesToCache([
            '/',
            './index.html',
            './src/App.jsx',
            './public/school icon.jpg'
        ])
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || event.request)
    )
})


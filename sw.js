importScripts('js/sw-utils.js')

const CACHE_STATIC = 'static-v4'
const CACHE_DINAMICO = 'dynamic-v1'
const CACHE_INMUTABLE = 'inmutable-v1'

const APP_SHELLStatic = [
    // '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js'
]

const APP_SHELLInmutable = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    "https://use.fontawesome.com/releases/v5.3.1/css/all.css",
    "css/animate.css",
    "js/libs/jquery.js"
]

self.addEventListener('install', e => {
    const esperaStatic = caches.open(CACHE_STATIC).then(cache => cache.addAll(APP_SHELLStatic))

    const esperaInmutble = caches.open(CACHE_INMUTABLE).then(cache => cache.addAll(APP_SHELLInmutable))


    e.waitUntil(Promise.all([esperaStatic, esperaInmutble]))
})

self.addEventListener('activate', e => {
    const respuesta = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key != CACHE_STATIC && key.includes('static')) {
                return caches.delete(key)
            }
        })
    })

    e.waitUntil(respuesta)
})

self.addEventListener('fetch', e => {
    const respuesta = caches.match(e.request).then(cache => {
        if (cache) {
            return cache
        } else {
            return fetch(e.request).then(NewResp => {


                return actualizarCacheDinamic(CACHE_DINAMICO, e.request, NewResp)


            })
        }
    })

    e.waitUntil(respuesta)
})
function actualizarCacheDinamic(dinamica, req, res) {
    if (res.ok) {
        return caches.open(dinamica).then(cache => {
            cache.put(req, res.clone())
            return res.clone()
        })
    } else {
        return res
    }


}
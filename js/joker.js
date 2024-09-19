document.addEventListener("DOMContentLoaded", function () {
    initProgressiveLoad(config)
    toc_masker()
    code_expander()
}), document.addEventListener("pjax:complete", function () {
    onPJAXComplete(config)
    toc_masker()
    code_expander()
});

/**
 * 清除Cookie
 */
function clearAllCachesAndReload() {
    if (caches) {
        caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (cacheName) {
                return caches.delete(cacheName);
            }));
        }).catch(function (error) {
            console.error('Failed to clear cache:', error);
        });
    }

    if (window.indexedDB) {
        const req = indexedDB.databases();
        req.then(dbs => {
            dbs.forEach(db => {
                const deleteReq = indexedDB.deleteDatabase(db.name);
                deleteReq.onsuccess = () => console.log(`IndexedDB ${db.name} deleted`);
                deleteReq.onerror = () => console.error(`Failed to delete IndexedDB ${db.name}`);
            });
        }).catch(error => {
            console.error('Failed to list IndexedDB databases:', error);
        });
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => {
                registration.unregister().then(() => {
                    console.log('Service Worker unregistered');
                }).catch(error => {
                    console.error('Failed to unregister Service Worker:', error);
                });
            });
        }).catch(error => {
            console.error('Failed to get Service Worker registrations:', error);
        });
    }

    localStorage.clear();
    sessionStorage.clear();
    window.location.reload(true);

    // 强制重新加载页面并添加时间戳以避免缓存
    const currentUrl = window.location.href.split('?')[0];
    const timestamp = new Date().getTime();
    window.location.href = `${currentUrl}?t=${timestamp}`;
}

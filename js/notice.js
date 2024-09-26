function showWarningOnPageLoad(timeoutDuration = 5000) {
    function showWarning() {
        if (anzhiyuPopupManager) {
            anzhiyuPopupManager.enqueuePopup('网络状态不佳🕓', '加载时间可能较长，请耐心等候或切换网络', null, 8000);
        }
    }

    let timeout = setTimeout(() => {
        if (document.readyState !== 'complete') {
            showWarning();
        }
    }, timeoutDuration); // 默认为5秒后执行

    window.addEventListener('load', () => {
        clearTimeout(timeout); // 如果页面在指定时间内加载完成，清除定时器
    });
}

showWarningOnPageLoad();

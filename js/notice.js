function showWarningOnPageLoad(timeoutDuration = 5000) {
    // 定义一个函数来显示提示信息
    function showWarning() {
        if (anzhiyuPopupManager) {
            anzhiyuPopupManager.enqueuePopup('网络状态不佳🕓', '加载时间可能较长，请耐心等候或切换网络', null, 8000);
        }
    }

    // 设置一个超时定时器
    let timeout = setTimeout(() => {
        // 检查页面是否已加载完成
        if (document.readyState !== 'complete') {
            showWarning();
        }
    }, timeoutDuration); // 默认为5秒后执行

    // 监听页面加载完成事件
    window.addEventListener('load', () => {
        clearTimeout(timeout); // 如果页面在指定时间内加载完成，清除定时器
    });
}

// 调用函数，使用默认的5秒超时时间
showWarningOnPageLoad();

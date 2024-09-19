window.addEventListener("popstate", function (e) {
    const selectedSlide = document.querySelector('.fancybox__slide.is-selected');
    if (selectedSlide) {
        // 关闭 Fancybox
        Fancybox.close();
    }
}, false);

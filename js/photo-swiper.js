/**
 * 注入PhotoSwiper
 */
function injectPhotoSwiper() {
    const galleryHtml = `
        <!-- Root element of PhotoSwipe. Must have class pswp. -->
        <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
        
            <!-- Background of PhotoSwipe.
                 It's a separate element as animating opacity is faster than rgba(). -->
            <div class="pswp__bg"></div>
        
            <!-- Slides wrapper with overflow:hidden. -->
            <div class="pswp__scroll-wrap">
        
                <!-- Container that holds slides.
                    PhotoSwipe keeps only 3 of them in the DOM to save memory.
                    Don't modify these 3 pswp__item elements, data is added later on. -->
                <div class="pswp__container">
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                </div>
        
                <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
                <div class="pswp__ui pswp__ui--hidden">
        
                    <div class="pswp__top-bar">
        
                        <!--  Controls are self-explanatory. Order can be changed. -->
        
                        <div class="pswp__counter"></div>
        
                        <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
        
                        <button class="pswp__button pswp__button--share" title="Share"></button>
        
                        <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
        
                        <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
        
                        <div class="pswp__preloader">
                            <div class="pswp__preloader__icn">
                                <div class="pswp__preloader__cut">
                                    <div class="pswp__preloader__donut"></div>
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                        <div class="pswp__share-tooltip"></div>
                    </div>
        
                    <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                    </button>
        
                    <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                    </button>
        
                    <div class="pswp__caption">
                        <div class="pswp__caption__center"></div>
                    </div>
        
                </div>
        
            </div>
        
        </div>
    `;
    $('body').append(galleryHtml);
}


/**
 * PhotoSwiper
 */
function initPhotoSwiper() {
    const pswpElement = document.querySelector('.pswp');
    const imgSrcItem = [];

    // 遍历每个 post 下的 img 标签
    $('.post img').each(function (index) {
        const imgPath = this.getAttribute('data-original') || this.src;
        $(this).addClass('swiper-img');

        // 生成 caption
        const alt = $(this).attr('alt');
        const title = $(this).attr('title');
        const captionText = alt || title;
        if (captionText) {
            const captionDiv = document.createElement('div');
            captionDiv.className = 'caption';
            captionDiv.innerHTML = `<b class='center-caption'>${captionText}</b>`;
            this.parentElement.insertAdjacentElement('afterend', captionDiv);
        }

        // 解析图片尺寸并添加到 imgSrcItem
        const dataSize = this.parentNode.getAttribute('data-size');
        const resolution = dataSize ? dataSize.split('x') : [this.naturalWidth || window.innerWidth, this.naturalHeight || window.innerHeight];
        imgSrcItem.push({
            src: imgPath,
            w: resolution[0],
            h: resolution[1],
            title: captionText
        });
    });

    // 为每个 post 下的图片元素添加点击事件
    $('.post img').each(function (i) {
        $(this).click(function () {
            const options = {
                index: i,
                barsSize: {top: 0, bottom: 0},
                captionEl: true,
                fullscreenEl: false,
                shareEl: false,
                bgOpacity: 0.5,
                tapToClose: true,
                tapToToggleControls: true,
                showHideOpacity: false,
                counterEl: true,
                preloaderEl: true,
                history: false,
                getThumbBoundsFn: (index) => {
                    const thumbnail = document.querySelectorAll('.post img')[index];
                    const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                    const rect = thumbnail.getBoundingClientRect();
                    return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
                }
            };

            const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, imgSrcItem, options);
            gallery.listen('imageLoadComplete', (index, item) => {
                // 更新图片源
                $('.post img')[index].src = item.data-lazy-src;
            });
            gallery.init();
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded triggered");
    injectPhotoSwiper()
    if (document.body.getAttribute('data-type') === 'post') {
        initPhotoSwiper();
    }
});

document.addEventListener("pjax:complete", function () {
    console.log("pjax:complete triggered");
    injectPhotoSwiper()
    if (document.body.getAttribute('data-type') === 'post') {
        initPhotoSwiper();
    }
});


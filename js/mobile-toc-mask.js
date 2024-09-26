function initTocMask () {
    const cardToc = document.getElementById('card-toc');
    const asideContent = document.getElementById('aside-content');
    const rightSide = document.getElementById('rightside');
    let mask = document.getElementById('aside-quit-mask');
    const mobileTocBtn = document.getElementById('mobile-toc-button');
    let isMaskVisible = false; // 用于跟踪遮罩的显示状态

    function handleClickOutside(event) {
        const target = event.target;

        if (mask && mask.style.display === 'block') {
            if (!rightSide.contains(target)) {
                mask.style.animation = 'to_hide .5s';
                setTimeout(() => {
                    mask.style.display = '';
                    isMaskVisible = false;
                    removeEventListeners();
                }, 500);
                cardToc.classList.remove('open');
            }
        }
    }

    function handleInteraction(event) {
        const target = event.target;

        if (!mask || mask.style.display !== 'block') {
            return;
        }

        if (cardToc && cardToc.contains(target)) {
            return;
        }

        if (event.type === 'touchmove') {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    function handleWheel(event) {
        const postElement = document.getElementById('post');
        if (postElement && postElement.contains(event.target)) {
            if (event.deltaY !== 0) {
                event.preventDefault(); // 阻止垂直滚动
            }
            if (event.deltaX !== 0) {
                event.preventDefault(); // 阻止水平滚动（如果需要）
            }
        }
    }

    function addEventListeners() {
        document.addEventListener('click', handleClickOutside, { passive: false });
        document.addEventListener('touchstart', handleInteraction, { passive: false });
        document.addEventListener('touchmove', handleInteraction, { passive: false });
        document.addEventListener('wheel', handleWheel, { passive: false }); // 添加滑轮事件监听器
    }

    function removeEventListeners() {
        document.removeEventListener('click', handleClickOutside, { passive: false });
        document.removeEventListener('touchstart', handleInteraction, { passive: false });
        document.removeEventListener('touchmove', handleInteraction, { passive: false });
        document.removeEventListener('wheel', handleWheel, { passive: false });
    }

    if (mobileTocBtn) {
        mobileTocBtn.addEventListener('click', function () {
            if (!mask) {
                mask = document.createElement('div');
                mask.className = 'mask';
                mask.id = 'aside-quit-mask';
                mask.style.display = 'block';
                mask.style.animation = '0.5s ease 0s 1 normal none running to_show';
                document.getElementById('aside-content').appendChild(mask);
                addEventListeners();
            } else {
                if (cardToc && cardToc.classList.contains('open')) {
                    mask.style.animation = 'to_hide .5s';
                    setTimeout(() => {
                        mask.style.display = '';
                        isMaskVisible = false;
                        removeEventListeners(); // 取消事件监听
                    }, 500);
                } else {
                    mask.style.display = 'block';
                    mask.style.animation = '0.5s ease 0s 1 normal none running to_show';
                    isMaskVisible = true;
                    addEventListeners();
                }
            }
        });
    }

    document.addEventListener('click', function (event) {
        if (isMaskVisible) {
            handleClickOutside(event);
        }
    }, { passive: false });
}

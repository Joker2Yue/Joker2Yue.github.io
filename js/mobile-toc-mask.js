
function toc_masker () {
    var cardToc = document.getElementById('card-toc');
    var rightSide = document.getElementById('rightside');
    var mask = document.getElementById('quit-mask');
    var postArea = document.getElementById('article-container'); // 假设 post 区域的 ID 是 'post-area'
    var isMaskVisible = false; // 用于跟踪遮罩的显示状态

    function handleClickOutside(event) {
        var target = event.target;

        // 如果点击的目标在 cardToc 或 rightSide 内部，则不处理
        // if (cardToc && cardToc.contains(target)) {
        if (mask && mask.style.display === 'block') {
            if (!rightSide.contains(target)) {
                mask.style.animation = 'to_hide .5s';
                setTimeout(() => {
                    mask.style.display = '';
                    isMaskVisible = false;
                }, 500);
                cardToc.classList.remove('open');
            }
        }
    }

    function handleInteraction(event) {
        var target = event.target;

        if (!mask || mask.style.display !== 'block') {
            return;
        }

        // 只允许在 cardToc 和 rightSide 中的点击和滑动
        if ((cardToc && cardToc.contains(target))) {
            return; // 允许事件
        }

        // 只阻止滑动事件，不阻止点击事件
        if (event.type === 'touchmove') {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    // 点击事件处理，设置 { passive: false } 选项
    document.addEventListener('click', handleClickOutside, {passive: false});
    document.addEventListener('touchstart', handleInteraction, {passive: false});
    document.addEventListener('touchmove', handleInteraction, {passive: false});

    document.getElementById('mobile-toc-button').addEventListener('click', function () {
        if (!mask) {
            mask = document.createElement('div');
            mask.className = 'mask';
            mask.id = 'quit-mask';
            mask.style.display = 'block';
            mask.style.animation = '0.5s ease 0s 1 normal none running to_show';
            document.body.appendChild(mask);
        } else {
            if (cardToc && cardToc.classList.contains('open')) {
                mask.style.animation = 'to_hide .5s';
                setTimeout(() => {
                    mask.style.display = '';
                    isMaskVisible = false;
                }, 500);
            } else {
                mask.style.display = 'block';
                mask.style.animation = '0.5s ease 0s 1 normal none running to_show';
                isMaskVisible = true;
            }
        }
    });

    // 禁用遮罩显示时的所有点击
    document.addEventListener('click', function (event) {
        if (isMaskVisible) {
            handleClickOutside(event);
        }
    }, {passive: false});
};

function initCodeExpander() {
    // 获取所有的 code-expand-btn 元素
    const expandButtons = document.querySelectorAll('.code-expand-btn');

    // 遍历每个按钮
    expandButtons.forEach(button => {
        // 获取当前按钮的父元素的下一个同级元素（table）
        const table = button.nextElementSibling;

        // 如果 table 存在且是 TABLE 元素
        if (table && table.tagName === 'TABLE') {
            table.style.maxHeight = '330px';
        }

        // 添加点击事件
        button.addEventListener('click', async () => {
            if (table && table.tagName === 'TABLE') {

                // 检查按钮是否包含 'expand-done' 类
                if (button.classList.contains('expand-done')) {
                    // 如果不包含 'expand-done' 类，则设置 max-height 为 300px
                    table.style.removeProperty('height');
                    table.style.maxHeight = '330px';
                } else {
                    // 如果包含 'expand-done' 类，则设置 max-height 为计算后的高度
                    const pre = table.querySelector('pre');
                    if (pre) {
                        const lineCount = pre.querySelectorAll('.line').length;
                        const calculatedHeight = (lineCount * 21) + 20;
                        table.style.removeProperty('height');
                        table.style.maxHeight = `${calculatedHeight}px`;
                    }
                }
            }
        }, {capture: true});
    });
};

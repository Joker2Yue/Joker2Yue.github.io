/**
 * 获取数据类型
 * @param {*} value
 * @returns {string}
 * @private
 */
function _typeof(value) {
    return typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? (value) => typeof value : (value) => value && typeof Symbol === 'function' && value.constructor === Symbol && value !== Symbol.prototype ? 'symbol' : typeof value;
}

/**
 * 校验类的实例化
 * @param {*} instance
 * @param {Function} Constructor
 * @throws {TypeError}
 */
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * 定义类属性
 * @param {Object} obj
 * @param {Array} props
 */
function _defineProperties(obj, props) {
    props.forEach(prop => {
        prop.enumerable = prop.enumerable || false;
        prop.configurable = true;
        if ('value' in prop) {
            prop.writable = true;
        }
        Object.defineProperty(obj, _toPropertyKey(prop.key), prop);
    });
}

/**
 * 创建类
 * @param {Function} Constructor
 * @param {Array} protoProps
 * @param {Array} staticProps
 * @returns {Function}
 */
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps);
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps);
    }
    Object.defineProperty(Constructor, 'prototype', {writable: false});
    return Constructor;
}

/**
 * 转换属性键
 * @param {*} key
 * @returns {string|symbol}
 */
function _toPropertyKey(key) {
    key = _toPrimitive(key, 'string');
    return _typeof(key) === 'symbol' ? key : String(key);
}

/**
 * 转换为原始值
 * @param {*} input
 * @param {string} preferredType
 * @returns {*}
 * @throws {TypeError}
 */
function _toPrimitive(input, preferredType) {
    if (typeof input !== 'object' || input === null) {
        return input;
    }
    const toPrimitive = input[Symbol.toPrimitive];
    if (toPrimitive === undefined) {
        return preferredType === 'string' ? String(input) : Number(input);
    }
    const result = toPrimitive.call(input, preferredType || 'default');
    if (typeof result !== 'object') {
        return result;
    }
    throw new TypeError('@@toPrimitive must return a primitive value.');
}

const ProgressiveLoad = _createClass(function ProgressiveLoad(smallSrc, largeSrc) {
    _classCallCheck(this, ProgressiveLoad);
    this.smallSrc = smallSrc;
    this.largeSrc = largeSrc;
    this.initTpl();
}, [{
    key: 'initTpl', value: function () {
        this.container = document.createElement('div');
        this.smallStage = document.createElement('div');
        this.largeStage = document.createElement('div');
        this.smallImg = new Image();
        this.largeImg = new Image();

        this.container.className = 'pl-container';
        this.smallStage.className = 'pl-img pl-blur';
        this.largeStage.className = 'pl-img';

        this.container.appendChild(this.smallStage);
        this.container.appendChild(this.largeStage);

        this.smallImg.onload = this._onSmallLoaded.bind(this);
        this.largeImg.onload = this._onLargeLoaded.bind(this);
    }
}, {
    key: 'progressiveLoad', value: function () {
        this.smallImg.src = this.smallSrc;
        this.largeImg.src = this.largeSrc;
    }
}, {
    key: '_onLargeLoaded', value: function () {
        this.largeStage.classList.add('pl-visible');
        this.largeStage.style.backgroundImage = `url('${this.largeSrc}')`;
    }
}, {
    key: '_onSmallLoaded', value: function () {
        this.smallStage.classList.add('pl-visible');
        this.smallStage.style.backgroundImage = `url('${this.smallSrc}')`;
    }
}]);

function _executeLoad(config, container) {
    console.log('执行渐进背景替换');
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const progressiveLoad = new ProgressiveLoad(isMobile ? config.mobileSmallSrc : config.smallSrc, isMobile ? config.mobileLargeSrc : config.largeSrc);

    if (container.children[0]) {
        container.insertBefore(progressiveLoad.container, container.children[0]);
    } else {
        container.appendChild(progressiveLoad.container);
    }

    progressiveLoad.progressiveLoad();
}

const config = {
    smallSrc: "https://resource.joker2yue.cn/blog/images/banner/eva01.webp",
    largeSrc: "https://resource.joker2yue.cn/blog/images/banner/eva02.webp",
    mobileSmallSrc: "https://resource.joker2yue.cn/blog/images/banner/m01.webp",
    mobileLargeSrc: "https://resource.joker2yue.cn/blog/images/banner/m02.webp",
    enableRoutes: ["/"]
};

function _removeContainers() {
    document.querySelectorAll('#page-header .pl-container').forEach(container => {
        container.remove();
    });
}

function initProgressiveLoad(config) {
    const header = document.getElementById('page-header');
    _removeContainers()
    if (header && header.classList.contains('full_page')) {
        _executeLoad(config, header);
    }
}

function onPJAXComplete(config) {
    const header = document.getElementById('page-header');
    _removeContainers()
    if (header && header.classList.contains('full_page')) {
        initProgressiveLoad(config);
    }
}

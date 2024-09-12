function _typeof(e) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
}

function _classCallCheck(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function")
}

function _defineProperties(e, a) {
    for (let t = 0; t < a.length; t++) {
        const r = a[t];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, _toPropertyKey(r.key), r)
    }
}

function _createClass(e, a, t) {
    return a && _defineProperties(e.prototype, a), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {writable: !1}), e
}

function _toPropertyKey(e) {
    e = _toPrimitive(e, "string");
    return "symbol" === _typeof(e) ? e : e + ""
}

function _toPrimitive(e, a) {
    if ("object" !== _typeof(e) || !e) return e;
    let t = e[Symbol.toPrimitive];
    if (void 0 === t) return ("string" === a ? String : Number)(e);
    t = t.call(e, a || "default");
    if ("object" !== _typeof(t)) return t;
    throw new TypeError("@@toPrimitive must return a primitive value.")
}

const ProgressiveLoad = (() => _createClass(function e(a, t) {
    _classCallCheck(this, e), this.smallSrc = a, this.largeSrc = t, this.initTpl()
}, [{
    key: "initTpl", value: function () {
        this.container = document.createElement("div"), this.smallStage = document.createElement("div"), this.largeStage = document.createElement("div"), this.smallImg = new Image, this.largeImg = new Image, this.container.className = "pl-container", this.smallStage.className = "pl-img pl-blur", this.largeStage.className = "pl-img", this.container.appendChild(this.smallStage), this.container.appendChild(this.largeStage), this.smallImg.onload = this._onSmallLoaded.bind(this), this.largeImg.onload = this._onLargeLoaded.bind(this)
    }
}, {
    key: "progressiveLoad", value: function () {
        this.smallImg.src = this.smallSrc, this.largeImg.src = this.largeSrc
    }
}, {
    key: "_onLargeLoaded", value: function () {
        this.largeStage.classList.add("pl-visible"), this.largeStage.style.backgroundImage = "url('".concat(this.largeSrc, "')")
    }
}, {
    key: "_onSmallLoaded", value: function () {
        this.smallStage.classList.add("pl-visible"), this.smallStage.style.backgroundImage = "url('".concat(this.smallSrc, "')")
    }
}]))(), executeLoad = function (e, a) {
    console.log("执行渐进背景替换");
    let t = window.matchMedia("(max-width: 767px)").matches;
    t = new ProgressiveLoad(t ? e.mobileSmallSrc : e.smallSrc, t ? e.mobileLargeSrc : e.largeSrc);
    a.children[0] && a.insertBefore(t.container, a.children[0]), t.progressiveLoad()
}, config = {
    smallSrc: "https://resource.joker2yue.cn/blog/images/banner/eva01.webp",
    largeSrc: "https://resource.joker2yue.cn/blog/images/banner/eva02.webp",
    mobileSmallSrc: "https://resource.joker2yue.cn/blog/images/banner/m01.webp",
    mobileLargeSrc: "https://resource.joker2yue.cn/blog/images/banner/m02.webp",
    enableRoutes: ["/"]
};

function initProgressiveLoad(e) {
    const a = document.getElementById("page-header");
    a && a.classList.contains("full_page") && executeLoad(e, a)
}

function onPJAXComplete(e) {
    const a = document.getElementById("page-header");
    a && a.classList.contains("full_page") && initProgressiveLoad(e)
}

document.addEventListener("DOMContentLoaded", function () {
    initProgressiveLoad(config)
}), document.addEventListener("pjax:complete", function () {
    onPJAXComplete(config)
});

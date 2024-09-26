function getDistance(lat1, lon1, lat2, lon2) {
    const toRadians = angle => angle * Math.PI / 180;
    const haversine = (lat1, lon1, lat2, lon2) => {
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
        return 2 * Math.asin(Math.sqrt(a)) * 6371; // Radius of Earth in kilometers
    };

    return Math.round(haversine(lat1, lon1, lat2, lon2));
}

function getGreeting(nation, province, city) {
    const greetings = {
        "日本": "よろしく，一起去看樱花吗",
        "美国": "Let us live in peace!",
        "英国": "想同你一起夜乘伦敦眼",
        "俄罗斯": "干了这瓶伏特加！",
        "法国": "C'est La Vie",
        "德国": "Die Zeit verging im Fluge.",
        "澳大利亚": "一起去大堡礁吧！",
        "加拿大": "拾起一片枫叶赠予你",
        "中国": {
            "北京市": "北——京——欢迎你~~~",
            "天津市": "讲段相声吧",
            "河北省": "山势巍巍成壁垒，天下雄关铁马金戈由此向，无限江山",
            "山西省": "展开坐具长三尺，已占山河五百余",
            "内蒙古自治区": "天苍苍，野茫茫，风吹草低见牛羊",
            "辽宁省": "我想吃烤鸡架！",
            "吉林省": "状元阁就是东北烧烤之王",
            "黑龙江省": "很喜欢哈尔滨大剧院",
            "上海市": "众所周知，中国只有两个城市",
            "江苏省": {
                "南京市": "这是我挺想去的城市啦",
                "苏州市": "上有天堂，下有苏杭",
                "default": "散装是必须要散装的"
            },
            "浙江省": "东风渐绿西湖柳，雁已还人未南归",
            "河南省": {
                "郑州市": "豫州之域，天地之中",
                "南阳市": "臣本布衣，躬耕于南阳此南阳非彼南阳！",
                "驻马店市": "峰峰有奇石，石石挟仙气嵖岈山的花很美哦！",
                "开封市": "刚正不阿包青天",
                "洛阳市": "洛阳牡丹甲天下",
                "default": "可否带我品尝河南烩面啦？"
            },
            "安徽省": {
                "淮南市": "来碗淮南牛肉汤！",
                "黄山市": "黄山归来不看岳，五月归来不看山。",
                "芜湖市": "蚌埠住了，芜湖起飞"
            },
            "福建省": "井邑白云间，岩城远带山",
            "江西省": "落霞与孤鹜齐飞，秋水共长天一色",
            "山东省": "遥望齐州九点烟，一泓海水杯中泻",
            "湖北省": {
                "黄冈市": "红安将军县！辈出将才！",
                "default": "来碗热干面~"
            },
            "湖南省": {
                "长沙市": "港话嗯是沁甜滴",
                "邵阳市": "老乡见老乡，两眼泪汪汪。",
                "default": "74751，长沙斯塔克"
            },
            "广东省": {
                "广州市": "看小蛮腰，喝早茶了嘛~",
                "深圳市": "今天你逛商场了嘛~",
                "default": "来两斤福建人~"
            },
            "广西壮族自治区": "桂林山水甲天下",
            "海南省": "朝观日出逐白浪，夕看云起收霞光",
            "四川省": "康康川妹子",
            "贵州省": "茅台，学生，再塞200",
            "云南省": "玉龙飞舞云缠绕，万仞冰川直耸天",
            "西藏自治区": "躺在茫茫草原上，仰望蓝天",
            "陕西省": "来份臊子面加馍",
            "甘肃省": "羌笛何须怨杨柳，春风不度玉门关",
            "青海省": "牛肉干和老酸奶都好好吃",
            "宁夏回族自治区": "大漠孤烟直，长河落日圆",
            "新疆维吾尔自治区": "驼铃古道丝绸路，胡马犹闻唐汉风",
            "台湾省": "我在这头，大陆在那头",
            "香港特别行政区": "永定贼有残留地鬼嚎，迎击光非岁玉",
            "澳门特别行政区": "性感荷官，在线发牌",
            "default": "带我去你的城市逛逛吧！"
        },
        "default": "带我去你的国家逛逛吧"
    };

    if (greetings[nation]) {
        if (typeof greetings[nation] === 'object') {
            if (greetings[nation][province]) {
                if (typeof greetings[nation][province] === 'object') {
                    return greetings[nation][province][city] || greetings[nation][province]['default'];
                }
                return greetings[nation][province];
            }
            return greetings[nation]['default'];
        }
        return greetings[nation];
    }
    return greetings['default'];
}

function getLocationString(result) {
    const nation = result.ad_info.nation || '';
    const province = result.ad_info.province || '';
    const city = result.ad_info.city || '';
    const district = result.ad_info.district || '';

    let locationParts = [];

    if (district) {
        locationParts.push(district);
    }
    if (city) {
        locationParts.push(city);
    }
    if (province) {
        locationParts.push(province);
    }
    if (!district && !city && !province && nation) {
        locationParts.push(nation);
    }

    locationParts = locationParts.slice(-3);

    return locationParts.reverse().join(' ');
}

function showWelcome() {
    const { result } = ipLocation;
    const distance = getDistance(111.010884, 27.111502, result.location.lng, result.location.lat);
    const nation = result.ad_info.nation;
    const province = result.ad_info.province;
    const city = result.ad_info.city;

    const locationString = getLocationString(result);
    const greeting = getGreeting(nation, province, city);

    const now = new Date();
    const hour = now.getHours();
    const timeOfDay = hour < 5 ? "夜深了，早点休息，少熬夜" :
        hour < 11 ? "<span>🌤️ 早上好，一日之计在于晨</span>" :
            hour < 13 ? "<span>☀️ 中午好，记得午休喔~</span>" :
                hour < 17 ? "<span>🕞 下午好，饮茶先啦！</span>" :
                    hour < 19 ? "<span>🚶‍♂️ 即将下班，记得按时吃饭~</span>" :
                        "<span>🌙 晚上好，夜生活嗨起来！</span>";

    const ip = ipLocation.result.ip.includes(":") ? "<br>好复杂，咱看不懂~(ipv6)" : ipLocation.result.ip;

    try {
        document.getElementById("welcome-info").innerHTML = `
            欢迎来自 <b><span style="color: var(--joker2yue-ip-color);font-size: var(--joker2yue-gl-size)">${locationString}</span></b> 的宝子🥰<br>
            ${greeting}🍂<br>
            当前位置距博主约 <b><span style="color: var(--joker2yue-ip-color)">${distance}</span></b> 公里！<br>
            您的IP地址为：<b><span>${ip}</span></b><br>
            ${timeOfDay} <br>
        `;
    } catch (error) {
        console.log("Pjax无法获取元素");
    }
}

function initWelcomeShower() {
    $.ajax({
        type: "get",
        url: "https://apis.map.qq.com/ws/location/v1/ip",
        data: { key: "4IWBZ-YUZKJ-K7XFB-XFBCQ-6WFX5-6PBKG", output: "jsonp" },
        dataType: "jsonp",
        success: function (response) {
            ipLocation = response;
            showWelcome();
        }
    });
}

window.addEventListener("load",()=>{let t=!1,r=[];const a=document.getElementById("search-mask"),e=()=>{var e=document.body.style;e.width="100%",e.overflow="hidden",anzhiyu.animateIn(a,"to_show 0.5s"),anzhiyu.animateIn(document.querySelector("#local-search .search-dialog"),"titleScale 0.5s"),setTimeout(()=>{document.querySelector("#local-search-input input").focus()},100),t||(o(),t=!0),document.addEventListener("keydown",function e(t){"Escape"===t.code&&(n(),document.removeEventListener("keydown",e))})},n=()=>{var e=document.body.style;e.width="",e.overflow="",anzhiyu.animateOut(document.querySelector("#local-search .search-dialog"),"search_close .5s"),anzhiyu.animateOut(a,"to_hide 0.5s")},l=()=>{document.querySelector("#search-button > .search").addEventListener("click",e),document.querySelector("#menu-search").addEventListener("click",e)};const s=e=>{return/\.json$/.test(e)},c=async e=>{let t=[];var a=await fetch(e);return t=s(e)?await a.json():(e=await a.text(),[...(await await(new window.DOMParser).parseFromString(e,"text/xml")).querySelectorAll("entry")].map(e=>{let a=[];e.querySelector("tags")&&e.querySelector("tags").getElementsByTagName("tag")&&Array.prototype.forEach.call(e.querySelector("tags").getElementsByTagName("tag"),function(e,t){a.push(e.textContent)});var t=e.querySelector("content")&&e.querySelector("content").textContent,r=/src=[\'\"]?([^\'\"]*)[\'\"]?/i,n=t.match(/<img.*?(?:>|\/>)/gi),l=[];if(n)for(let e=0;e<n.length;e++){var s=n[e].match(r);s[1].indexOf("http")||l.push(s[1])}return{title:e.querySelector("title").textContent,content:t,url:e.querySelector("url").textContent,tags:a,oneImage:l&&l[0]}})),a.ok&&((e=document.getElementById("loading-database")).nextElementSibling.style.display="block",e.remove()),t},o=()=>{GLOBAL_CONFIG.localSearch.preload||(r=c(GLOBAL_CONFIG.localSearch.path));var e=document.querySelector("#local-search-input input");const t=document.getElementById("local-search-results"),a=document.getElementById("loading-status");e.addEventListener("input",function(){const m=this.value.trim().toLowerCase().split(/[\s]+/);""!==m[0]&&(a.innerHTML='<i class="anzhiyufont anzhiyu-icon-spinner anzhiyu-pulse-icon"></i>'),t.innerHTML="";let y='<div class="search-result-list">';if(!(m.length<=0)){let u=0;r.then(e=>{e.forEach(l=>{let a=!0,s=l.title?l.title.trim().toLowerCase():"";var c=l.tags,o=l.oneImage??"";const i=l.content?l.content.trim().replace(/<[^>]+>/g,"").toLowerCase():"";l=l.url.startsWith("/")?l.url:GLOBAL_CONFIG.root+l.url;let r,n=-1,d=-1;if(""!==s||""!==i?m.forEach((e,t)=>{r=s.indexOf(e),n=i.indexOf(e),r<0&&n<0?a=!1:(n<0&&(n=0),0===t&&(d=n))}):a=!1,a){if(0<=d){let e=d-30,t=d+100,a="",r="",n=(0===(e=e<0?0:e)?t=100:a="...",t>i.length?t=i.length:r="...",i.substring(e,t));if(m.forEach(e=>{var t=new RegExp(e,"gi");n=n.replace(t,'<span class="search-keyword">'+e+"</span>"),s=s.replace(t,'<span class="search-keyword">'+e+"</span>")}),y=(y=(y+='<div class="local-search__hit-item">')+(o?`<div class="search-left"><img src=${o} alt=${s} data-fancybox='gallery'>`:'<div class="search-left" style="width:0">')+"</div>")+(o?'<div class="search-right"><a href="'+l+'" class="search-result-title">'+s+"</a>":'<div class="search-right" style="width: 100%"><a href="'+l+'" class="search-result-title">'+s+"</a>"),u+=1,""!==i&&(y+='<p class="search-result" onclick="pjax.loadUrl(`'+l+'`)">'+a+n+r+"</p>"),c.length){y+='<div class="search-result-tags">';for(let e=0;e<c.length;e++){var h=c[e].trim();y+='<a class="tag-list" href="/tags/'+h+'/" data-pjax-state="" one-link-mark="yes">#'+h+"</a>"}y+="</div>"}}y+="</div></div>"}}),0===u&&(y+='<div id="local-search__hits-empty">'+GLOBAL_CONFIG.localSearch.languages.hits_empty.replace(/\$\{query}/,this.value.trim())+"</div>"),y+="</div>",t.innerHTML=y,""!==m[0]&&(a.innerHTML=""),window.pjax&&window.pjax.refresh(t)})}})};l(),document.querySelector("#local-search .search-close-button").addEventListener("click",n),a.addEventListener("click",n),GLOBAL_CONFIG.localSearch.preload&&(r=c(GLOBAL_CONFIG.localSearch.path)),window.addEventListener("pjax:complete",()=>{anzhiyu.isHidden(a)||n(),l()})});
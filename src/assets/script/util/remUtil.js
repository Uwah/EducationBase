"use strict";
var Dpr = 1
  , uAgent = window.navigator.userAgent;
var isIOS = uAgent.match(/iphone/i);
var isYIXIN = uAgent.match(/yixin/i);
var is2345 = uAgent.match(/Mb2345/i);
var ishaosou = uAgent.match(/mso_app/i);
var isSogou = uAgent.match(/sogoumobilebrowser/gi);
var isLiebao = uAgent.match(/liebaofast/i);
var isGnbr = uAgent.match(/GNBR/i);
var $fixed = document.getElementById("fixed");
function resizeRoot() {
    var e = screen.width > 0 ? window.innerWidth >= screen.width || window.innerWidth == 0 ? screen.width : window.innerWidth : window.innerWidth, i, n;
    var t = screen.height > 0 ? window.innerHeight >= screen.height || window.innerHeight == 0 ? screen.height : window.innerHeight : window.innerHeight;
    if (window.devicePixelRatio) {
        i = window.devicePixelRatio
    } else {
        i = isIOS ? e > 818 ? 3 : e > 480 ? 2 : 1 : 1
    }
    if (isIOS) {
        e = screen.width;
        t = screen.height
    }
    if (e > t) {
        e = t
    }
    n = e > 1080 ? 144 : e / 7.5;
    n = n > 32 ? n : 32;
    window.screenWidth_ = e;
    if (isYIXIN || is2345 || ishaosou || isSogou || isLiebao || isGnbr) {
        setTimeout(function() {
            e = screen.width > 0 ? window.innerWidth >= screen.width || window.innerWidth == 0 ? screen.width : window.innerWidth : window.innerWidth;
            t = screen.height > 0 ? window.innerHeight >= screen.height || window.innerHeight == 0 ? screen.height : window.innerHeight : window.innerHeight;
            n = e > 1080 ? 144 : e / 7.5;
            n = n > 32 ? n : 32;
            document.getElementsByTagName("html")[0].style.fontSize = n + "px";
            if ($fixed) {
                $fixed.style.display = "none"
            }
        }, 500)
    } else {
        document.getElementsByTagName("html")[0].style.fontSize = n + "px";
        if ($fixed) {
            $fixed.style.display = "none"
        }
    }
}
resizeRoot();
var reviseViewPort = function(e, i) {
    var n = e || 200
      , t = 0
      , r = i || 5;
    var o = setInterval(function() {
        var e = screen.width > 0 ? window.innerWidth >= screen.width ? screen.width : window.innerWidth : window.innerWidth, i;
        if (e < window.screenWidth_) {
            window.screenWidth_ = e;
            i = e > 1080 ? 144 : e / 7.5;
            i = i > 32 ? i : 32;
            document.getElementsByTagName("html")[0].style.fontSize = i + "px";
            clearInterval(o)
        } else {
            t++
        }
        if (t >= r) {
            clearInterval(o)
        }
    }, n)
};
reviseViewPort(200);
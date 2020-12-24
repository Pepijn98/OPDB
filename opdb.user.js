// ==UserScript==
// @name         Open in ProtonDB
// @version      1.0.0
// @namespace    https://github.com/Pepijn98/OPDB
// @source       https://github.com/Pepijn98/OPDB
// @description  Open a steam game in ProtonDB
// @author       Pepijn98
// @include      /^https?:\/\/store\.steampowered\.com\/app\/\d+\/.*/
// @grant        none
// @homepageURL  https://github.com/Pepijn98/OPDB
// @supportURL   https://github.com/Pepijn98/OPDB
// @downloadURL  https://github.com/Pepijn98/OPDB/raw/master/opdb.user.js
// ==/UserScript==

(function() {
    "use strict";

    var css = `
        .open_in_proton {
            display: inline-block;
            position: relative;
        }

        .btnv6_pink_hoverfade:not(.btn_disabled):not(:disabled):not(.btn_active):not(.active):hover {
            text-decoration: none !important;
            color: #fff !important;
            background: #f50057;
            background: -webkit-linear-gradient(150deg, #f50057 5%,#f75790 95%);
            background: linear-gradient(-60deg, #f50057 5%,#f75790 95%);
        }

        .btnv6_pink_hoverfade {
            border-radius: 2px;
            border: none;
            padding: 1px;
            display: inline-block;
            cursor: pointer;
            text-decoration: none !important;
            color: #f75790 !important;
            background: rgba( 247, 87, 144, 0.2 );
        }
    `;

    var head = document.head || document.getElementsByTagName("head")[0];
    var style = document.createElement("style");

    head.appendChild(style);

    style.type = "text/css";
    if (style.styleSheet){
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    var group = document.querySelector(".queue_actions_ctn");
    var parts = window.location.href.split("/");
    if (parts.length >= 4) {
        // get appId index, // appId always comes after "app" so we add 1
        var index = parts.indexOf("app") + 1;
        var appId = parts[index];

        var div = document.createElement("div");
        div.className = "open_in_proton";

        var link = document.createElement("a");
        link.className = "btnv6_pink_hoverfade btn_medium";
        link.href = "https://www.protondb.com/app/" + appId;
        link.target = "_blank";

        var text = document.createElement("span");
        text.innerText = "Open in ProtonDB";

        link.appendChild(text);
        div.appendChild(link);
        // group.appendChild(div);

        // There"s an empty div at the end with style clear: both;
        // making our button be placed on a new line
        // insert before this div and it will be on the same line as the other buttons
        group.insertBefore(div, group.lastElementChild);
    }
})();

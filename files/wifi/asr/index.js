
// ==UserScript==
(function () {
    'use strict';
    clearInterval(timer)
    var timer = setInterval(() => {
        loop()
        // console.log('loop')
    }, 100)

    function loop() {
        addStyle()
        function addStyle() {
            let id = 'asrStyle'
            if (!document.querySelector(`#${id}`)) {
                var style = document.createElement('style')
                style.type = 'text/css'
                style.id = id
                style.innerHTML = `
                    #navigation {
                        height: auto;
                    }
                    #menu {
                        height: auto;
                    }
                    #lableWelcome {
                        display: none;
                    }
                    #header > div._flex-row-bet._pad-y-5._pos-rel {
                        min-height: auto !important;
                    }
                    .header, .mainColumn, .footer {
                        width: auto;
                    }
                    .loginArea {
                        width: auto;
                    }
                    .footer .footerMast {
                        width: auto;
                    }
                    .footer .footerMast div {
                        width: auto;
                    }
                    #mainColumn > div:nth-child(1) > img:nth-child(1) {
                        width: 50px
                    }
                    #mainColumn > div:nth-child(1) > img:nth-child(2) {
                        width: 50px
                    }
                    #mainColumn > div:nth-child(1) > img:nth-child(3) {
                        width: 50px
                    }
                    #mainColumn > div:nth-child(1) > img:nth-child(4) {
                        width: 50px
                    }
                    #mainColumn > div:nth-child(1) > img:nth-child(5) {
                        width: 50px
                    }
                    .loginArea {
                        position: initial;
                        padding: 0px 10px 0 0;
                        font-size: 16px;
                    }
                    ._pos-rel {
                        position: initial;
                    }
                    .header {
                        background: none;
                    }
                    #header > div._flex-row-bet._pad-y-5._pos-rel > div > br {
                        display: none;
                    }
                    ._flex-row-bet {
                        float: right;
                    }
                    .navigation ul, .navigation .date {
                        background: steelblue;
                    }
                    #menu {
                        justify-content: flex-start;
                        flex-wrap: wrap;
                        min-width: 100%;
                    }
                    #menu>li {
                        width: auto!important;
                        margin-right: 10px;
                    }
                    .navigation ul li {
                        height: auto;
                        background: none;
                    }
                    .content {
                        width: auto;
                    }
                    #Content {
                        width: auto;
                    }
                    #adminform > div {
                        // display: initial !important;
                    }
                    .liginbox label.copy {
                        width: auto;
                    }
                    .liginbox {
                        width: auto;
                    }
                    #header > div.logo {
                        display: none;
                    }
                    #header > div.loginArea {
                        margin-top: auto !important;
                        float: right;
                    }
                    .header, .mainColumn {
                        border-left: 0;
                        border-right: 0;
                    }
                    .navigation {
                        margin-left: 0px
                    }
                `
                document.head.appendChild(style)
            }
        }

        window.wifiTool.loadMobileMeta()
        let user = document.getElementById("tbarouter_username")
        let password = document.getElementById("tbarouter_password")
        if (user && password && user.value && password.value) {
            window.wifiTool.setWifiData({
                asr: {
                    username: user.value,
                    password: password.value
                }
            })
        }
        let lloginfailed = document.querySelector("#lloginfailed")
        if (lloginfailed && lloginfailed.style.display === 'none') {
            login()
        }
        function login() {
            let titleDiv = document.querySelector("#divAdminApp > div > div.title_box")
            let laUsername = document.querySelector("#laUsername")
            let btnSignIn = document.querySelector("#btnSignIn")
            if (titleDiv && user && password && laUsername && laUsername.innerText === '用户名' && btnSignIn && btnSignIn.value) {
                let asr = window.wifiTool.getWifiData().asr
                let username = 'admin'
                let pwd = 'admin'
                if (asr && asr.username && asr.password) {
                    username = asr.username
                    pwd = asr.password
                }
                user.value = username
                password.value = pwd
                Login();
            }
        }
    }

})();
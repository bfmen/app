// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-05-03
// @description  try to take over the world!
// @author       You
// @match        http://192.168.0.1/index.html
// @match        http://192.168.0.1/index_mobile.html
// @match        http://192.168.100.1/index.html
// @match        http://192.168.100.1/index_mobile.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    let password = 'admin'
    setTimeout(() => {
        if (location.href.includes('#login') || location.href.includes('#entry')) {
            login(() => {
                // location.reload()
                location.href = location.origin + '/index.html'
            })
        }
    }, 1000)

    function login(callback) {
        //http://192.168.0.1//reqproc/proc_post?isTest=false&goformId=LOGIN&password=YWRtaW4%3D
        let url = `${location.origin}/reqproc/proc_post?isTest=false&goformId=LOGIN&password=${Base64.encode(password)}`
        jQuery.ajax({
            url, success: (data) => {
                console.log('print onLoad login', data)
                if (JSON.parse(data).result === '0') {
                    callback && callback(1)
                }
            }
        })
    }

    window.addEventListener('hashchange', (e) => {
        console.log('hashchange', e)
        if (e.target.location.hash === '#home') {
            homeLoaded()
        }
        if (e.target.location.pathname === '/index_mobile.html') {
            // location.replace('index.html')
            // window.location = "index.html"
        }
    })
    document.addEventListener('DOMContentLoaded', function () {
        // DOM解析完成，但资源可能还没加载完  

    });
    if (location.pathname === '/index_mobile.html') {
        location.replace('index.html')
        // window.location = "index.html"
    }
    // homeLoaded()
    if (location.href.includes('/index.html#')) {
        homeLoaded()
    }

    clearInterval(window.timerLogin)
    window.timerLogin = setInterval(() => {
        login()
    }, 6000)


    addStyle()
    function homeLoaded() {
        append()
        function append() {
            let div = document.querySelector("#home_image > div > div")
            let traffic_control_container = document.querySelector("#container > div.row.margin-top-20.label-font-normal.margin-bottom-20 > div.text-center.traffic_control_container")
            let device_info_container_hastraffic = document.querySelector("#container > div.row.margin-top-20.label-font-normal.margin-bottom-20 > div.device_info_container.device_info_container_hastraffic")
            let connected_devices_container = document.querySelector("#home_image > div > div > div.connected_devices_container")
            let network_control_container = document.querySelector("#home_image > div > div > div.network_control_container")
            let internet_status_container = document.querySelector("#home_image > div > div > div.internet_status_container")

            if (traffic_control_container && device_info_container_hastraffic && connected_devices_container && network_control_container && internet_status_container && div) {
                div.append(device_info_container_hastraffic)
                div.append(internet_status_container)
                div.append(traffic_control_container)
                div.append(connected_devices_container)
                div.append(network_control_container)
                setTimeout(() => {

                    let div = document.querySelector("#home_image > div > div > div.device_info_container.device_info_container_hastraffic > div:nth-child(2)")
                    div.style.height = 'auto'
                    div.style.padding = 0
                }, 100);

                [...document.querySelector(".type_items").getElementsByTagName('a')].forEach((a) => {
                    if (a.children && a.children.length) {
                        [...a.children].forEach((item) => {
                            if (['IMG', 'BR'].includes(item.tagName)) {
                                item.remove()
                            }
                        })
                    }
                })
            } else {
                setTimeout(() => {
                    append()
                }, 100)

            }
        }
    }

    function addStyle() {
        // <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        var meta = document.createElement('meta')
        meta.name = 'viewport'
        meta.content = 'width=device-width, initial-scale=1.0'
        document.getElementsByTagName('head')[0].appendChild(meta)

        var style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML = `
            body {
                min-width: 0px;
            }
            .container {
                width: 100vw !important;
                padding-left: 0;
                padding-right: 0;
            }
            .type_items {
                margin: 0 0 0 0;
                max-width: 100vw;
                width: auto;
                height: 20px;
            }
            .device_info_container {
                margin-left:0;
                width: auto;
                height: auto;
                width: 100vw;
                margin-bottom: 5px;
                padding-bottom: 5px;
            }
            .row {
                margin-left: 0;
                margin-right: 0;
            }
            .internet_status_container {
                width: auto;
                height: auto;
                margin-left: auto;
                margin-right: auto;
                min-width: 160px;
            }
            .network_control_container {
                width: auto;
                height: auto;
                margin-left: 10px;
                padding-bottom: 10px;
                margin-bottom: 10px;
            }
            .connected_devices_container {
                width: auto;
                height: auto;
                margin-left: 0px;
                padding: 10px;
                position: relative;
            }
            .traffic_control_container {
                width: auto;
                height: auto;
                margin-left: auto;
                margin-bottom: 10px;
                padding-bottom: 5px;
                padding-right: 10px;
            }
            .my_router_list li a {
                width: 130px;
            }
            #home_image {
                height: auto;
            }
            .margin-top-20 {
                margin-top: 5px;
            }
            .type_items a {
                width: auto;
                height: auto;
            }
            .type_items ul {
                display: flex;
                justify-content: space-evenly;
                flex-wrap: wrap;
            }
            .header-row {
                width: auto;
            }
            #confirm-container {
                width: 80vw;
            }
            #showDetailInfo ~ .popover {
                min-width: 95vw;
                color: black;
                top: 0 !important;
            }
        `
        document.head.appendChild(style)
    }
})();
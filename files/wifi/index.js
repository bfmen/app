// ==UserScript==
// @name         ALL TEST
// @namespace    http://tampermonkey.net/
// @version      2024-05-06
// @description  try to take over the world!
// @author       You
// @match        http*://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    console.log('test')
    function initWifi() {
        let str = getWifiData().baseUrl || 'http://192.168.0.1'
        let url = prompt('输入页面地址', str)
        if (url && url.startsWith('http')) {
            setWifiData({ baseUrl: url })
            location.href = url
        } else {
            weuiLoaded(() => {
                loadMobileMeta()
                weui.dialog({ title: '页面地址需要以http开头' })
            }, () => {
                alert('页面地址需要以http开头')
            })
        }
    }
    if (location.pathname === '/index_mobile.html' && $('#indexContainer-mobile').length && $('#mainContainer-mobile').length) {
        location.href = location.origin + '/index.html'
    }
    if (location.pathname === '/index.html' && $('#statusBar').length && $('#indexContainer').length && $('#mainContainer').length) {
        var script = document.createElement('script');
        script.src = 'https://smanx.netlify.app/files/wifi/zxw/test.js'; 
        script.async = true;
        document.body.appendChild(script);
    }
    if (location.pathname === '/files/wifi/index.html') {
        initWifi()
    }
    if (location.href === 'about:blank') {
        initWifi()
    }

    function getWifiData() {
        try {
            return JSON.parse(localStorage.wifi)
        } catch (error) {
            return {}
        }
    }

    function setWifiData(data = {}) {
        localStorage.wifi = JSON.stringify({ ...getWifiData(), ...data })
    }

    function loadMobileMeta() {
        var meta = document.createElement('meta')
        meta.name = 'viewport'
        meta.content = 'width=device-width, initial-scale=1.0'
        document.getElementsByTagName('head')[0].appendChild(meta)
    }

    function weuiLoaded(onload = () => { }, onerror = () => { }) {
        if (window.weui) {
            onload()
        } else {
            var script = document.createElement('script');
            script.src = 'https://res.wx.qq.com/t/wx_fed/weui.js/res/1.2.21/weui.min.js';
            script.async = true;
            document.body.appendChild(script);
            script.onload = onload
            script.onerror = onerror
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://res.wx.qq.com/t/wx_fed/weui-source/res/2.5.16/weui.min.css';
            document.head.appendChild(link);
        }
    }
})();
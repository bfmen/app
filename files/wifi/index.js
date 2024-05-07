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
    window.wifiTool = {
        loadMobileMeta,
        loadScript,
        getWifiData,
        setWifiData
    }
    if (location.pathname === '/index_mobile.html' && $('#indexContainer-mobile').length && $('#mainContainer-mobile').length) {
        location.href = location.origin + '/index.html'
    }
    if (location.pathname === '/index.html' && $('#statusBar').length && $('#indexContainer').length && $('#mainContainer').length) {
        loadScript('https://smanx.netlify.app/files/wifi/zxw/test.js')
    }
    if (document.body.getAttribute('onload') === 'initIndex()') {
        loadScript('https://smanx.netlify.app/files/wifi/asr/index.js')

    }
    if (location.pathname === '/files/wifi/index.html') {
        initWifi()
    }
    if (location.href === 'about:blank') {
        initWifi()
    }

    function initWifi() {
        let str = getWifiData().baseUrl || 'http://192.168.0.1'
        location.href = str
    }

    function loadScript(url, onload = () => { }, onerror = () => { }) {
        var script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = onload
        script.onerror = onerror
        document.body.appendChild(script);
    }

    function getWifiData(key = 'wifi') {
        try {
            return JSON.parse(localStorage[key])
        } catch (error) {
            return {}
        }
    }

    function setWifiData(data = {}, key = 'wifi') {
        localStorage[key] = JSON.stringify({ ...getWifiData(), ...data })
    }

    function loadMobileMeta() {
        if (!document.querySelector("#mobileMeta")) {
            var meta = document.createElement('meta')
            meta.name = 'viewport'
            meta.id = 'mobileMeta'
            meta.content = 'width=device-width, initial-scale=1.0'
            document.getElementsByTagName('head')[0].appendChild(meta)
        }
    }

    function weuiLoaded(onload = () => { }, onerror = () => { }) {
        if (window.weui) {
            onload()
        } else {
            loadScript('https://res.wx.qq.com/t/wx_fed/weui.js/res/1.2.21/weui.min.js', onload, onerror)
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://res.wx.qq.com/t/wx_fed/weui-source/res/2.5.16/weui.min.css';
            document.head.appendChild(link);
        }
    }
})();
const axios = require('axios')
const config = require('./config')
let instance = axios.create({
    timeout: 10000,  // 超时，401
})
Object.assign(instance.defaults.headers.common, config.headers)
// 请求拦截器
instance.interceptors.request.use(req => {
    // req.headers = { ...config.headers, ...req.headers }
    // console.log('request', req)
    return req
}, err => { });
// 响应拦截器
instance.interceptors.response.use(res => {
    return res
}, err => { 
    console.log('axios err', err && err.message)
    return err;
});

module.exports = instance;
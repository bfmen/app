var f=Object.defineProperty,p=Object.defineProperties;var g=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var h=Object.prototype.hasOwnProperty,m=Object.prototype.propertyIsEnumerable;var n=(t,e,a)=>e in t?f(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,c=(t,e)=>{for(var a in e||(e={}))h.call(e,a)&&n(t,a,e[a]);if(d)for(var a of d(e))m.call(e,a)&&n(t,a,e[a]);return t},l=(t,e)=>p(t,g(e));import{c as s}from"./config.63bc69ee.js";import _ from"./list.3beb0ce6.js";import y from"./tagSelect.2e2edb36.js";import{n as v}from"./index.47e2b3c9.js";import"./array-method-has-species-support.518ddb83.js";var k=function(){var e=this,a=e.$createElement,i=e._self._c||a;return i("div",{staticClass:"class"},[e._l(e.tags,function(o,r){return i("tagSelect",{key:r,ref:"tagSelect".concat(r),refInFor:!0,attrs:{dataSource:o},on:{tagClick:function(D){return e.tagClick(r,arguments)}}})}),i("list",{attrs:{dataList:e.vodrows}}),e.dataSource.action?i("infinite-loading",{ref:"infiniteLoading",attrs:{identifier:e.identifier},on:{infinite:e.infinite}}):e._e()],2)},w=[];const q={components:{list:_,tagSelect:y},data(){return{page:0,identifier:0,vodrows:[],dataSource:{params:{},action:""},classList:[{key:"categories",query:"cateid",id:0},{key:"areas",query:"areaid",id:0},{key:"years",query:"yearid",id:0},{key:"definitions",query:"definition",id:0},{key:"durations",query:"duration",id:0},{key:"freetypes",query:"freetype",id:0},{key:"mosaics",query:"mosaic",id:0},{key:"langvoices",query:"langvoice",id:0},{key:"orders",query:"order",id:0}]}},computed:{tags(){let t=[];return this.classList.forEach(e=>{let a=this.dataSource[e.key];a&&t.push({items:[{id:0,title:"\u5168\u90E8"}].concat(a.map(i=>{let o=i.keyid||i.cateid||i.areaid||i.yearid;return l(c({},i),{id:o})})),id:e.id})}),t}},created(){this.loadBaseData()},methods:{tagClick(t,e){let a=0;e?a=e[0]:a=this.$refs["tagSelect"+t][0].idx,this.classList[t].id=this.tags[t].items[a].id},itemClick(t){t.spid&&uni.navigateTo({url:"./detail?spid="+t.spid})},infinite(t){console.log("onReachBottom"),this.loadPageData(this.page+1,t)},loadBaseData(){this.$axios.request({url:s.origin+"/vod/recommend",params:s.query()}).then(t=>{console.log("success",t),t.status==200&&t.data.retcode==0?this.dataSource=t.data.data:weui.topTips(t.data.errmsg||t.statusCode||"fail")}).catch(t=>{weui.topTips(t.message||"fail")})},loadPageData(t,e){this.$axios.request({url:s.origin+"/vod/listing-"+this.classList.map(a=>a.id).join("-")+"-"+this.page,params:s.query()}).then(a=>{console.log("success",a),a.status==200&&a.data.retcode==0?(this.page=t,this.page==1?this.vodrows=a.data.data.vodrows:this.vodrows=this.vodrows.concat(a.data.data.vodrows),a.data.data.vodrows.length<16?e&&e.complete():e&&e.loaded()):(weui.topTips(a.data.errmsg||a.statusCode||"fail"),e&&e.loaded())}).catch(a=>{e&&e.loaded(),weui.topTips(a.message||"fail")})}},watch:{classList:{deep:!0,handler(t){console.log("classList",t),this.page=0,this.vodrows=[],this.identifier=new Date().valueOf()}}}},u={};var S=v(q,k,w,!1,C,"4ad4aef5",null,null);function C(t){for(let e in u)this[e]=u[e]}var P=function(){return S.exports}();export{P as default};
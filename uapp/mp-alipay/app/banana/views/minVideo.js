(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["app/banana/views/minVideo"],{"118c":function(t,e,n){"use strict";(function(t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("8565"));function r(t){return t&&t.__esModule?t:{default:t}}var i={data:function(){return{rows:[],current:0,isShowMask:!0}},onLoad:function(){console.log("onLoad banana")},created:function(){console.log("created banana"),this.loadData(!0)},methods:{loadData:function(e){var n=this;t.request({url:a.default.origin+"/minivod/reqlist",data:a.default.query(),success:function(t){if(console.log("success",t),0==t.data.retcode){var o=[];t.data.data.rows.map((function(t){t.vodrow&&t.vodrow.vodid&&(t.videoUrl="",o.push(t))})),n.rows=e?o:n.rows.concat(o)}},fail:function(t){console.log("fail",t)}})},swiperChange:function(e){var n=this,r=e.detail.current,i=this.rows[r],u=i.vodrow.vodid;console.log("swiperChange",e,i),document&&(document.title=i.vodrow.title),this.current=r,t.request({url:a.default.origin+"/minivod/reqplay/"+u,data:a.default.query(),success:function(e){console.log("success",e);var o=e.data.data.httpurl||e.data.data.httpurl_preview;o?(console.log(o),n.rows[r].videoUrl=o):t.showToast({title:e.data.errmsg,icon:"none"})}}),r==this.rows.length-1&&this.loadData(),o.test=this,setTimeout((function(){}),1e3);for(var c=0;c<this.rows.length;c++){var s=this.$refs["video"+c]||t.createVideoContext("video"+c);Array.isArray(s)&&(s=s[0]),c==this.current?s&&s.play&&s.play():s&&s.pause&&s.pause()}}}};e.default=i}).call(this,n("c11b")["default"],n("c11b")["default"])},"2d8f":function(t,e,n){"use strict";var o=n("8d69"),a=n.n(o);a.a},"2f2c":function(t,e,n){"use strict";(function(t){n("6cdc"),n("921b");o(n("66fd"));var e=o(n("6d4b"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("c11b")["createPage"])},"5ab3":function(t,e,n){"use strict";n.r(e);var o=n("118c"),a=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=a.a},"6d4b":function(t,e,n){"use strict";n.r(e);var o=n("b783"),a=n("5ab3");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("2d8f");var i,u=n("f0c5"),c=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,"279c202e",null,!1,o["a"],i);e["default"]=c.exports},"8d69":function(t,e,n){},b783:function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}));var a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.rows,(function(e,n){var o=Math.abs(n-t.current);return{$orig:t.__get_orig(e),g0:o}})));t._isMounted||(t.e0=function(e){t.isShowMask=!t.isShowMask}),t.$mp.data=Object.assign({},{$root:{l0:n}})},r=[]}},[["2f2c","common/runtime","common/vendor"]]]);
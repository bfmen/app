import{c as d}from"./config.c00927f2.js";import g from"./list.05d2a58b.js";import"./index.df38932d.js";import"./index.dc42755c.js";import{a as k}from"./axios.646f38c1.js";import{_ as S,r as _,o as i,c,h as s,w,f as l,F as p,b as m,g as C,a as y,t as h}from"./index.25e73ab7.2022_10_30_03_17_57.js";const x={name:"keepAlive",components:{list:g},data(){return{dataSource:{}}},computed:{v2sliderows(){let t=[];return this.dataSource&&this.dataSource.v2sliderows&&this.dataSource.v2sliderows.forEach(n=>{n.scene=="special.detail"&&t.push(n)}),t}},activated(){this.loadData()},created(){this.loadData()},methods:{swiperClick(t){this.$router.push({path:"./detail",query:{spid:t.spid}})},loadData(){console.log("config",d,d.query()),k({url:d.home,params:d.query()}).then(t=>{console.log("success",t),t.status==200&&t.data.retcode==0?this.dataSource=t.data.data:window.$dialog.alert({title:t.data.errmsg||t.statusCode||"fail"})}).catch(t=>{window.$dialog.alert({title:t.message||"fail"})})}}},b={key:0,class:"home"},B=["src"],D=["textContent"],q={class:"swiper"},F=["onClick"],N=["src"],V=["textContent"];function E(t,n,I,A,e,r){const v=_("van-swipe-item"),f=_("van-swipe"),a=_("list");return e.dataSource?(i(),c("div",b,[s(f,{class:"my-swipe",autoplay:3e3,"indicator-color":"white"},{default:w(()=>[(i(!0),c(p,null,m(r.v2sliderows,(o,u)=>(i(),y(v,{key:u,onClick:L=>r.swiperClick(o)},{default:w(()=>[l("img",{class:"image",src:o.pic,style:{width:"100%"}},null,8,B),l("span",{textContent:h(o.title)},null,8,D)]),_:2},1032,["onClick"]))),128))]),_:1}),l("div",q,[(i(!0),c(p,null,m(r.v2sliderows,(o,u)=>(i(),c("div",{class:"swiperItem",key:u,onClick:L=>r.swiperClick(o)},[l("img",{class:"image",src:o.pic,mode:"widthFix"},null,8,N),l("span",{textContent:h(o.title)},null,8,V)],8,F))),128))]),s(a,{title:"\u9999\u8549\u5934\u6761dayrows",dataList:e.dataSource.dayrows},null,8,["dataList"]),s(a,{title:"\u6700\u65B0\u89C6\u9891latestrows",dataList:e.dataSource.latestrows},null,8,["dataList"]),s(a,{title:"\u731C\u4F60\u559C\u6B22likerows",dataList:e.dataSource.likerows},null,8,["dataList"]),s(a,{title:"\u5077\u62CD\u81EA\u62CDa_vodrows",dataList:e.dataSource.a_vodrows},null,8,["dataList"]),s(a,{title:"\u6210\u4EBA\u52A8\u6F2Bb_vodrows",dataList:e.dataSource.b_vodrows},null,8,["dataList"]),s(a,{title:"\u7ECF\u5178\u4F26\u7406c_vodrows",dataList:e.dataSource.c_vodrows},null,8,["dataList"]),s(a,{title:"\u4E2D\u6587\u5B57\u5E55d_vodrows",dataList:e.dataSource.d_vodrows},null,8,["dataList"]),s(a,{title:"\u4E0D\u96C5\u89C6\u9891tagvodrows",dataList:e.dataSource.tagvodrows},null,8,["dataList"]),s(a,{title:"\u70ED\u7247\u89C6\u9891hotrows",dataList:e.dataSource.hotrows},null,8,["dataList"])])):C("",!0)}const M=S(x,[["render",E],["__scopeId","data-v-4822cf3b"]]);export{M as default};
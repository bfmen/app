import{_ as u,l as r,r as a,o as l,c as n,h as p,w as m,F as v,b as d,a as h}from"./index.25e73ab7.2022_10_30_03_17_57.js";const k={data(){return{items:Object.keys(Object.assign({"./demo.vue":()=>r(()=>import("./demo.f2b5a28d.js"),["./demo.f2b5a28d.js","./index.df38932d.js","./index.25e73ab7.2022_10_30_03_17_57.js","./index.b1e74882.css","./data.d72af605.js","./index.dc42755c.js"],import.meta.url),"./list.vue":()=>r(()=>import("./list.e16120dc.js"),["./list.e16120dc.js","./ccList.3147cf62.js","./ccItem.d24328d4.js","./ccImg.76ba2cba.js","./index.dc42755c.js","./index.25e73ab7.2022_10_30_03_17_57.js","./index.b1e74882.css","./ccItem.69bc54be.css","./ccList.d744dcc0.css"],import.meta.url)})).map(e=>({title:e.replace(".vue","").replace("./",""),path:e.replace(".vue","")})),href:""}},methods:{itemClick(e){this.$router.push({path:e.path})}}};function f(e,C,x,E,o,c){const s=a("van-cell"),i=a("van-cell-group");return l(),n("div",null,[p(i,null,{default:m(()=>[(l(!0),n(v,null,d(o.items,(t,_)=>(l(),h(s,{key:_,title:t.title,value:t.href||t.title,"is-link":"",onClick:g=>c.itemClick(t)},null,8,["title","value","onClick"]))),128))]),_:1})])}const $=u(k,[["render",f]]);export{$ as default};
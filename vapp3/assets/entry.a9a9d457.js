import{_ as u,r as a,o as s,a as n,w as _,c as h,b as d,F as k}from"./index.25e73ab7.2022_10_30_03_17_57.js";const f={data(){return{list:[]}},created(){let e=this.$router.getRoutes().filter(t=>t.path.startsWith("/apps/")&&t.path.includes("/index")).map(t=>({title:t.path.split("/apps/")[1].split("/")[0],path:t.path}));this.list=e},methods:{itemClick(e){this.$router.push(e.path)}}};function m(e,t,v,C,r,o){const c=a("van-cell"),p=a("van-cell-group");return s(),n(p,null,{default:_(()=>[(s(!0),h(k,null,d(r.list,(l,i)=>(s(),n(c,{key:i,title:l.title,value:l.path,"is-link":"",onClick:x=>o.itemClick(l)},null,8,["title","value","onClick"]))),128))]),_:1})}const g=u(f,[["render",m]]);export{g as default};
import{e as s,_,r as n,o as l,d as o,w as u,c as d,b as v,F as m}from"./index.88845065.js";const k=Object.assign({"./apps/demo/index.vue":()=>s(()=>import("./index.50c32624.js"),["assets/index.50c32624.js","assets/index.88845065.js","assets/index.906da7a8.css"]),"./apps/ppp/views/index.vue":()=>s(()=>import("./index.bfc3254d.js"),["assets/index.bfc3254d.js","assets/index.88845065.js","assets/index.906da7a8.css"])});let h=Object.keys(k).map(e=>({title:e.split("/apps/")[1].split("/")[0],path:e.split("/apps/")[1].split(".vue")[0]}));const f={data(){return{list:h}},methods:{itemClick(e){this.$router.push(e.path)}}};function x(e,C,E,g,a,p){const r=n("van-cell"),i=n("van-cell-group");return l(),o(i,null,{default:u(()=>[(l(!0),d(m,null,v(a.list,(t,c)=>(l(),o(r,{key:c,title:t.title,value:t.path,"is-link":"",onClick:O=>p.itemClick(t)},null,8,["title","value","onClick"]))),128))]),_:1})}const b=_(f,[["render",x]]);export{b as default};
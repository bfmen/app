import{c as e}from"./config.c00927f2.js";import i from"./list.05d2a58b.js";import{a as r}from"./axios.646f38c1.js";import{_ as c,r as d,o as l,c as n,f as a,t as p,h as u}from"./index.25e73ab7.2022_10_30_03_17_57.js";import"./index.df38932d.js";const _={components:{list:i},data(){return{dataSource:{row:{}},spid:""}},computed:{},created(){this.spid=this.$route.query.spid,this.loadData()},methods:{loadData(){console.log("config",e,e.query()),r.request({url:e.origin+"/special/detail/"+this.spid,params:e.query()}).then(t=>{console.log("success",t),t.status==200&&t.data.retcode==0?this.dataSource=t.data.data:window.$dialog.alert({title:t.data.errmsg||t.statusCode||"fail"})}).catch(t=>{window.$dialog.alert({title:t.message||"fail"})})}}},m={class:"detail"},f=["src"];function g(t,h,w,v,o,S){const s=d("list");return l(),n("div",m,[a("img",{class:"image",mode:"widthFix",src:o.dataSource.row.pic||o.dataSource.row.coverpic},null,8,f),a("div",null,p(o.dataSource.row.intro),1),u(s,{dataList:o.dataSource.vodrows},null,8,["dataList"])])}const $=c(_,[["render",g],["__scopeId","data-v-5b167d13"]]);export{$ as default};
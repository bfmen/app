import{c as u}from"./config.c00927f2.js";import L from"./list.05d2a58b.js";import{a as y}from"./axios.646f38c1.js";import{_ as w,r as o,o as c,c as h,h as l,w as r,F as x,b as V,a as C,m as k,t as b}from"./index.25e73ab7.2022_10_30_03_17_57.js";import"./index.df38932d.js";const D={components:{list:L},data(){return{isLoading:!1,loading:!1,finished:!1,list:[{title:"\u70B9\u8D5E",items:[],src:"/minivod/topzan-0-0-0-0-0-0-0-0-0-0-",page:0},{title:"\u8BC4\u8BBA",items:[],src:"/minivod/topcomment-0-0-0-0-0-0-0-0-0-0-",page:0},{title:"\u64AD\u653E",items:[],src:"/minivod/topplay-0-0-0-0-0-0-0-0-0-0-",page:0},{title:"\u6700\u65B0",items:[],src:"/minivod/topnew-0-0-0-0-0-0-0-0-0-0-",page:0},{title:"\u6295\u5E01",items:[],src:"/minivod/topcoin-0-0-0-0-0-0-0-0-0-0-",page:0}],current:0,vodid:""}},onLoad(i){},created(){},computed:{items(){return this.list.map(i=>i.title)},isH5(){return!!window}},methods:{onRefresh(){this.loadData(1,this.$state)},onClickItem(i){this.loadData(1)},loadData(i,n){const m=u.origin+this.list[this.current].src+i,d=i,t=this.current;y({url:m,params:u.query()}).then(e=>{if(console.log("success",e),e.status==200&&e.data.retcode==0){var a=e.data.data.vodrows;this.list[t].items=d==1?a:this.list[t].items.concat(a),this.list[t].page=d,a.length<16?this.finished=!0:this.loading=!1}else window.$dialog.alert({title:e.data.errmsg||e.statusCode||"fail"}),this.loading=!1}).catch(e=>{this.loading=!1,window.$dialog.alert({title:e.message||"fail"})}).finally(()=>{this.isLoading=!1,this.loading=!1})},infinite(i){console.log("onReachBottom"),this.loading=!0,this.finished=!1,this.loadData(this.list[this.current].page+1)}}};function R(i,n,m,d,t,e){const a=o("van-tab"),p=o("van-tabs"),g=o("list"),_=o("van-list"),v=o("van-pull-refresh");return c(),h("div",null,[l(p,{active:t.current,"onUpdate:active":n[0]||(n[0]=s=>t.current=s),type:"card",onChange:e.onClickItem},{default:r(()=>[(c(!0),h(x,null,V(e.items,(s,f)=>(c(),C(a,{title:s,name:f,key:f},{default:r(()=>[k(b(s),1)]),_:2},1032,["title","name"]))),128))]),_:1},8,["active","onChange"]),l(v,{modelValue:t.isLoading,"onUpdate:modelValue":n[2]||(n[2]=s=>t.isLoading=s),onRefresh:e.onRefresh,style:{overflow:"inherit"}},{default:r(()=>[l(_,{modelValue:t.loading,"onUpdate:modelValue":n[1]||(n[1]=s=>t.loading=s),finished:t.finished,"finished-text":"\u6CA1\u6709\u66F4\u591A\u4E86",onLoad:e.infinite,style:{"min-height":"50vh"}},{default:r(()=>[l(g,{dataList:t.list[t.current].items,isMin:!0},null,8,["dataList"])]),_:1},8,["modelValue","finished","onLoad"])]),_:1},8,["modelValue","onRefresh"])])}const q=w(D,[["render",R],["__scopeId","data-v-7dfce9c4"]]);export{q as default};
import{n as l}from"./index.9d3e2adf.js";var c=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"entry"},[t("div",{staticClass:"weui-cells__title"},[e._v(e._s(e.title))]),t("div",{staticClass:"weui-cells"},e._l(e.items,function(i,a){return t("router-link",{key:a,staticClass:"weui-cell weui-cell_access",attrs:{to:i.path,href:"javascript:"}},[t("div",{staticClass:"weui-cell__bd"},[t("p",[e._v(e._s(i.title))])]),t("div",{staticClass:"weui-cell__ft"},[e._v(e._s(i.desc||i.path))])])}),1)])},r=[];const o={components:{},data(){return{title:"Hello",items:[{title:"banana",path:"/banana/views/index",desc:"desc"},{title:"ppp",path:"/ppp/views/index",desc:"desc"},{title:"nine",path:"/nine/views/index",desc:"desc"}]}},created(){},methods:{itemClick(e){},loadData(){return this.$request.find("Data",{where:'{"type":"webapp_find"}',limit:"100",order:"index"}).then(e=>{console.log("then",e),this.items=e}).catch(e=>{console.log("catch",e)})}},destroyed(){console.log("destroyed")}},n={};var d=l(o,c,r,!1,_,null,null,null);function _(e){for(let s in n)this[s]=n[s]}var p=function(){return d.exports}();export{p as default};
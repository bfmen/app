import{n as c}from"./index.15f5f5b8.js";var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"entry"},[e("div",{staticClass:"weui-cells__title"},[t._v(t._s(t.title))]),e("div",{staticClass:"weui-cells"},t._l(t.items,function(s,l){return e("router-link",{key:l,staticClass:"weui-cell weui-cell_access",attrs:{to:s.path,href:"javascript:"}},[e("div",{staticClass:"weui-cell__bd"},[e("p",[t._v(t._s(s.title))])]),e("div",{staticClass:"weui-cell__ft"},[t._v(t._s(s.path))])])}),1),e("van-switch",{model:{value:t.checked,callback:function(s){t.checked=s},expression:"checked"}})],1)},o=[];const r={components:{},data(){return{title:"Hello",checked:!1,items:[{title:"Home",path:"home"},{title:"\u70ED\u70B9",path:"hot"},{title:"\u6700\u65B0",path:"./latest"},{title:"p",path:"./p"},{title:"\u9891\u9053",path:"./special"},{title:"\u5206\u7C7B",path:"./class"},{title:"\u641C\u7D22",path:"./search"},{title:"\u5C0F\u89C6\u9891\u5217\u8868",path:"./minList"},{title:"\u5C0F\u89C6\u9891",path:"./minVideo"},{title:"\u5C0F\u89C6\u98912",path:"./minVideo2"}]}},created(){this.checked=this.$store.state.banana.isVipShow},watch:{checked(){this.$store.state.banana.isVipShow=this.checked}},methods:{itemClick(t){},loadData(){}},destroyed(){console.log("destroyed")}},a={};var h=c(r,n,o,!1,_,null,null,null);function _(t){for(let i in a)this[i]=a[i]}var p=function(){return h.exports}();export{p as default};
;my.defineComponent || (my.defineComponent = Component);(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["node-modules/npm-scope-dcloudio/uni-ui/lib/uni-collapse/uni-collapse"],{"167f":function(n,t,e){},"59d6":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u={name:"UniCollapse",props:{accordion:{type:[Boolean,String],default:!1}},data:function(){return{}},provide:function(){return{collapse:this}},created:function(){this.childrens=[]},methods:{onChange:function(){var n=[];this.childrens.forEach((function(t,e){t.isOpen&&n.push(t.nameSync)})),this.$emit("change",n)}}};t.default=u},"878b":function(n,t,e){"use strict";e.r(t);var u=e("59d6"),c=e.n(u);for(var i in u)"default"!==i&&function(n){e.d(t,n,(function(){return u[n]}))}(i);t["default"]=c.a},a55b:function(n,t,e){"use strict";var u=e("167f"),c=e.n(u);c.a},aa49:function(n,t,e){"use strict";e.r(t);var u=e("f63f"),c=e("878b");for(var i in c)"default"!==i&&function(n){e.d(t,n,(function(){return c[n]}))}(i);e("a55b");var a,r=e("f0c5"),o=Object(r["a"])(c["default"],u["b"],u["c"],!1,null,"2c7c34c2",null,!1,u["a"],a);t["default"]=o.exports},f63f:function(n,t,e){"use strict";var u;e.d(t,"b",(function(){return c})),e.d(t,"c",(function(){return i})),e.d(t,"a",(function(){return u}));var c=function(){var n=this,t=n.$createElement;n._self._c},i=[]}}]);
;(my["webpackJsonp"] = my["webpackJsonp"] || []).push([
    'node-modules/npm-scope-dcloudio/uni-ui/lib/uni-collapse/uni-collapse-create-component',
    {
        'node-modules/npm-scope-dcloudio/uni-ui/lib/uni-collapse/uni-collapse-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('c11b')['createComponent'](__webpack_require__("aa49"))
        })
    },
    [['node-modules/npm-scope-dcloudio/uni-ui/lib/uni-collapse/uni-collapse-create-component']]
]);

import{c as o}from"./config.959b753b.js";import i from"./list.cbe30d85.js";import{m as r,n as c}from"./index.6b215f2c.js";var d=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"detail"},[e("img",{staticClass:"image",attrs:{mode:"widthFix",src:t.dataSource.row.pic||t.dataSource.row.coverpic}}),e("div",[t._v(t._s(t.dataSource.row.intro))]),e("list",{attrs:{dataList:t.dataSource.vodrows}})],1)},n=[];const l={components:{list:i},data(){return{dataSource:{row:{}},spid:""}},computed:{...r({})},created(){this.spid=this.$route.query.spid,this.loadData()},methods:{loadData(){console.log("config",o,o.query()),this.$axios.request({url:o.origin+"/special/detail/"+this.spid,params:o.query()}).then(t=>{console.log("success",t),t.status==200&&t.data.retcode==0?this.dataSource=t.data.data:weui.topTips(t.data.errmsg||t.statusCode||"fail")}).catch(t=>{weui.topTips(t.message||"fail")})}}},s={};var u=c(l,d,n,!1,_,"1e8b80ee",null,null);function _(t){for(let a in s)this[a]=s[a]}var f=function(){return u.exports}();export{f as default};
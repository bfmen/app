import{_ as c,o as b,c as w,a as i,t as h,w as d,d as m,v as p,F as k,r as A,e as f,p as g,b as T}from"./index-DlMeXW2A.js";const I={mixins:[],data(){return{port:{},reader:{},isOpen:!1,dataR:"",dataW:"",timer:null,reader:{},writer:{},list:[1,3,5,8,38,39,40,41],checked:[],imei:"",sn:"",mac:"",bandStr:"",ip:"192.168.0.1"}},computed:{},created(){window.that=this,this.timer=setInterval(()=>{this.isOpen=!!this.port.readable},100)},methods:{async click(){if(!navigator.serial){alert("该浏览器不支持，仅支持基于chromium内核的pc浏览器");return}try{if(this.port.getInfo&&this.port.readable){try{this.reader.releaseLock(),this.writer.releaseLock()}catch{}await this.port.close(),this.reader={}}else{const e=await navigator.serial.requestPort();this.port=e,this.port.readable||(await e.open({dataBits:8,stopBits:1,parity:"none",baudRate:9600}),this.reader=this.port.readable.getReader(),this.writer=this.port.writable.getWriter(),this.write("AT+CGSN"),setTimeout(()=>{this.write("AT*MRD_SN?")},500),setTimeout(()=>{this.write("AT*MRD_WIFIID?")},1e3),setTimeout(()=>{this.getBand()},1500))}}catch(e){console.log("error",e),e.message&&!e.message.includes("No port selected by the user")&&alert(e.message)}},getBand(){this.write("AT*BAND?")},async read(){const e=this.reader,{value:t,done:s}=await e.read();let o=y(t);console.log("接收",o),this.dataR+=o,this.dataHandler(o)},async write(e){const t=this.writer;let s=(e||this.dataW)+`\r
`,o=S(s);await t.write(o),setTimeout(()=>{this.read()},500)},dataHandler(e){let t="ZLTEAMTBAND: ";if(t="*BAND:",e.includes(t)&&e.length>20){this.bandStr=e.split(t)[1].split(`\r
`)[0];let s=e.split(","),o=parseInt(s[3]).toString(2).split("").reverse(),l=parseInt(s[4]).toString(2).split("").reverse(),n=[];o.forEach((r,a)=>{r==="1"&&(a===5&&n.push(38),a===6&&n.push(39),a===7&&n.push(40),a===8&&n.push(41))}),l.forEach((r,a)=>{r==="1"&&[1,3,5,8].includes(a+1)&&n.push(a+1)}),this.checked=n}t="+CGSN: ",e.includes(t)&&(this.imei=e.split(t)[1].split(`\r
`)[0]),t=`AT+CGSN\r\r
`,!e.includes("+CGSN: ")&&e.includes(t)&&(this.imei=e.split(t)[1].split(`\r
`)[0]),t="*MRD_SN:",e.includes(t)&&(this.sn=e.split(t)[1].split(`\r
`)[0]),t="*MRD_WIFIID: ",e.includes(t)&&(this.mac=e.split(t)[1].split(`\r
`)[0].replaceAll(":",""))},submit(){let e=0,t=0;this.checked.forEach(l=>{l<=20&&(t+=Math.pow(2,l-1)),l>=38&&l<=41&&(e+=Math.pow(2,l-33))});let s=this.bandStr.split(",");s[3]=e,s[4]=t;let o=`AT*BAND=${s.join(",")}`;this.write(o)}},async unmounted(){clearInterval(this.timer);try{this.reader.releaseLock(),this.writer.releaseLock(),await this.port.close(),this.reader={}}catch{}},watch:{dataR(){this.$nextTick(()=>{const e=document.getElementById("scroll_text");e.scrollTop=e.scrollHeight})}}};function y(e){for(var t="",s=0;s<e.length;s++)t+=String.fromCharCode(e[s]);return t}function S(e){for(var t=[],s=0;s<e.length;s++)t.push(e.charCodeAt(s));var o=new Uint8Array(t);return o}const u=e=>(g("data-v-63c4d750"),e=e(),T(),e),C={class:"atMaster",style:{padding:"10px"}},D={class:"content"},M=u(()=>i("label",{style:{opacity:"0.5"}},"需开启工厂模式才能写号，写入之前先删除",-1)),R={style:{padding:"10px 0"}},x=u(()=>i("label",null,"IMEI: ",-1)),N={style:{padding:"10px 0"}},B=u(()=>i("label",null,"SN: ",-1)),W={style:{padding:"10px 0"}},E=u(()=>i("label",null,"MAC: ",-1)),U={style:{display:"flex","flex-wrap":"wrap","align-items":"center",padding:"10px 0"}},L={for:"option1"},F=["value"],V=u(()=>i("br",null,null,-1)),O=u(()=>i("br",null,null,-1)),_={class:"right"};function G(e,t,s,o,l,n){return b(),w("div",C,[i("button",{onClick:t[0]||(t[0]=(...r)=>n.click&&n.click(...r))},"选择端口 "+h(l.isOpen?"（已开启）":"（未开启）"),1),d(i("div",D,[i("div",null,[i("button",{onClick:t[1]||(t[1]=r=>n.write("AT*PROD=1"))},"工厂模式"),i("button",{onClick:t[2]||(t[2]=r=>n.write("AT*PROD=0"))},"退出工厂模式")]),M,i("div",R,[x,d(i("input",{type:"text","onUpdate:modelValue":t[3]||(t[3]=r=>l.imei=r)},null,512),[[p,l.imei]]),i("button",{onClick:t[4]||(t[4]=r=>n.write("AT+CGSN"))},"读取"),i("button",{onClick:t[5]||(t[5]=r=>n.write("AT*MRD_IMEI=D"))},"删除"),i("button",{onClick:t[6]||(t[6]=r=>n.write("AT*MRD_IMEI=W,0,01JAN1970,"+l.imei))},"写入")]),i("div",N,[B,d(i("input",{type:"text","onUpdate:modelValue":t[7]||(t[7]=r=>l.sn=r),placeholder:"仅支持有SN号的设备"},null,512),[[p,l.sn]]),i("button",{onClick:t[8]||(t[8]=r=>n.write("AT*MRD_SN?"))},"读取"),i("button",{onClick:t[9]||(t[9]=r=>n.write("AT*MRD_SN=D"))},"删除"),i("button",{onClick:t[10]||(t[10]=r=>n.write("AT*MRD_SN=W,0,01JAN1970,"+l.sn))},"写入")]),i("div",W,[E,d(i("input",{type:"text","onUpdate:modelValue":t[11]||(t[11]=r=>l.mac=r)},null,512),[[p,l.mac]]),i("button",{onClick:t[12]||(t[12]=r=>n.write("AT*MRD_WIFIID?"))},"读取"),i("button",{onClick:t[13]||(t[13]=r=>n.write("AT*MRD_WIFIID=D"))},"删除"),i("button",{onClick:t[14]||(t[14]=r=>n.write("AT*MRD_WIFIID=W,0,01JAN1970,"+l.mac))},"写入")]),i("div",null,[i("button",{onClick:t[15]||(t[15]=r=>n.write("AT+SWSIM=0"))},"切到卡1"),i("button",{onClick:t[16]||(t[16]=r=>n.write("AT+SWSIM=1"))},"切到卡2"),i("button",{onClick:t[17]||(t[17]=r=>n.write("AT+RESET"))},"重启")]),i("div",U,[(b(!0),w(k,null,A(l.list,(r,a)=>(b(),w("span",{key:a,style:{display:"flex","flex-wrap":"wrap","align-items":"center",padding:"0 5px"}},[i("label",L,"LTE B"+h(r),1),d(i("input",{type:"checkbox","onUpdate:modelValue":t[18]||(t[18]=v=>l.checked=v),value:r},null,8,F),[[f,l.checked,void 0,{number:!0}]]),V,O]))),128)),i("button",{onClick:t[19]||(t[19]=(...r)=>n.getBand&&n.getBand(...r))},"读取频段"),i("button",{onClick:t[20]||(t[20]=(...r)=>n.submit&&n.submit(...r))},"锁定频段")]),i("div",null,[d(i("input",{type:"text","onUpdate:modelValue":t[21]||(t[21]=r=>l.dataW=r),placeholder:"发送自定义AT指令"},null,512),[[p,l.dataW]]),i("button",{onClick:t[22]||(t[22]=r=>n.write())},"发送")]),i("div",_,[d(i("textarea",{id:"scroll_text",cols:"30",rows:"10","onUpdate:modelValue":t[23]||(t[23]=r=>l.dataR=r),readonly:""},null,512),[[p,l.dataR]]),i("button",{onClick:t[24]||(t[24]=r=>l.dataR="")},"清理")])],512),[[m,l.isOpen]])])}const J=c(I,[["render",G],["__scopeId","data-v-63c4d750"]]);export{J as default};
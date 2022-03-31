// 全球智能线路【VIP】 
// var proxy = "HTTPS natcm.iggwebcache.com:26443;HTTPS hk.cdn.nttsoftgroup.com:54300;HTTPS PP0x2VeWegUg.netvigatorscdn.com:50443;HTTPS 132236.statics.hgcbroadband.net:20443; DIRECT";
// HK - 香港原生【VIP2】 
// var proxy="HTTPS hk.cdn.nttsoftgroup.com:54300;HTTPS uu0x2VeWegUg.harmonycloudcache.com:22443;HTTPS node0x2VeWegUg.api.steamgamepowered.com:19443; DIRECT";
// JP - 日本东京 【VIP2】
 var proxy="HTTPS img0x2VeWegUg.virginatlanticgroup.com:27443;HTTPS jp.cdn.nttsoftgroup.com:52100; DIRECT";
// US - 美国硅谷【VIP2】
//  var proxy="HTTPS www.macyscdn.com:53100;HTTPS www.macyscdn.com:33100; DIRECT";
// RU - 俄罗斯西伯利亚【VIP2】
// var proxy="HTTPS ru.edge.netvigators.xyz:23389; DIRECT";

function FindProxyForURL(url, host) {
  return proxy;
}

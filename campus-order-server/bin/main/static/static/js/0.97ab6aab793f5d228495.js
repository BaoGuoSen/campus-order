webpackJsonp([0],{"3ClX":function(e,t,n){"use strict";var r,o,a=n("lr0p"),s=(n("aHQ8"),1567752802062),i=7;e.exports=function(e){var t="",n=Math.floor(.001*(Date.now()-s));return n===o?r++:(r=0,o=n),t+=a(i),t+=a(e),r>0&&(t+=a(r)),t+=a(n)}},"9tMA":function(e,t,n){"use strict";var r=n("aHQ8");e.exports=function(e){return!(!e||"string"!=typeof e||e.length<6||new RegExp("[^"+r.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(e))}},Fole:function(e,t,n){"use strict";var r=1;e.exports={nextValue:function(){return(r=(9301*r+49297)%233280)/233280},seed:function(e){r=e}}},Kg7Z:function(e,t,n){"use strict";var r=n("aHQ8"),o=n("3ClX"),a=n("9tMA"),s=n("sSHN")||0;function i(){return o(s)}e.exports=i,e.exports.generate=i,e.exports.seed=function(t){return r.seed(t),e.exports},e.exports.worker=function(t){return s=t,e.exports},e.exports.characters=function(e){return void 0!==e&&r.characters(e),r.shuffled()},e.exports.isValid=a},Z8es:function(e,t,n){"use strict";e.exports=n("Kg7Z")},Zkn8:function(e,t,n){"use strict";var r,o="object"==typeof window&&(window.crypto||window.msCrypto);r=o&&o.getRandomValues?function(e){return o.getRandomValues(new Uint8Array(e))}:function(e){for(var t=[],n=0;n<e;n++)t.push(Math.floor(256*Math.random()));return t},e.exports=r},aHQ8:function(e,t,n){"use strict";var r,o,a,s=n("Fole"),i="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function c(){a=!1}function l(e){if(e){if(e!==r){if(e.length!==i.length)throw new Error("Custom alphabet for shortid must be "+i.length+" unique characters. You submitted "+e.length+" characters: "+e);var t=e.split("").filter(function(e,t,n){return t!==n.lastIndexOf(e)});if(t.length)throw new Error("Custom alphabet for shortid must be "+i.length+" unique characters. These characters were not unique: "+t.join(", "));r=e,c()}}else r!==i&&(r=i,c())}function u(){return a||(a=function(){r||l(i);for(var e,t=r.split(""),n=[],o=s.nextValue();t.length>0;)o=s.nextValue(),e=Math.floor(o*t.length),n.push(t.splice(e,1)[0]);return n.join("")}())}e.exports={get:function(){return r||i},characters:function(e){return l(e),r},seed:function(e){s.seed(e),o!==e&&(c(),o=e)},lookup:function(e){return u()[e]},shuffled:u}},etcG:function(e,t){},lr0p:function(e,t,n){"use strict";var r=n("aHQ8"),o=n("Zkn8"),a=n("tQh0");e.exports=function(e){for(var t,n=0,s="";!t;)s+=a(o,r.get(),1),t=e<Math.pow(16,n+1),n++;return s}},sSHN:function(e,t,n){"use strict";e.exports=0},tQh0:function(e,t){e.exports=function(e,t,n){for(var r=(2<<Math.log(t.length-1)/Math.LN2)-1,o=-~(1.6*r*n/t.length),a="";;)for(var s=e(o),i=o;i--;)if((a+=t[s[i]&r]||"").length===+n)return a}},zH3v:function(e,t,n){"use strict";var r=n("/IwO"),o=new r.AMapManager,a={data:function(){var e=this;return{address:null,searchKey:"",amapManager:o,markers:[],searchOption:{city:"全国",citylimit:!0},center:[121.329402,31.228667],zoom:50,lng:0,lat:0,loaded:!1,markerEvent:{click:function(e){console.log(e)}},events:{init:function(){r.lazyAMapApiLoaderInstance.load().then(function(){e.initSearch()})},click:function(t){e.markers=[];var n=t.lnglat,r=n.lng,o=n.lat;e.lng=r,e.lat=o,e.center=[r,o],e.markers.push([r,o]),new AMap.Geocoder({radius:1e3,extensions:"all"}).getAddress([r,o],function(t,n){"complete"===t&&"OK"===n.info&&n&&n.regeocode&&(console.log(n.regeocode.formattedAddress,"testBGS"),e.address=n.regeocode.formattedAddress,e.searchKey=n.regeocode.formattedAddress,e.$nextTick())})}},plugin:[{pName:"Geolocation",events:{init:function(t){t.getCurrentPosition(function(t,n){console.log(n.message),n&&n.position&&(console.log(n),e.lng=n.position.lng,e.lat=n.position.lat,e.center=[e.lng,e.lat],e.markers.push([e.lng,e.lat]),e.loaded=!0,e.$nextTick())})}}},{pName:"ToolBar",events:{init:function(e){console.log(e)}}},{pName:"OverView",events:{init:function(e){console.log(e)}}},{pName:"MapType",defaultType:0,events:{init:function(e){console.log(e)}}},{pName:"PlaceSearch",events:{init:function(e){console.log(e)}}}]}},methods:{submitAddress:function(){console.log("经纬度",this.center),console.log("地址",this.address),this.$emit("addressControl",this.address,this.lng,this.lat)},initSearch:function(){console.log("Mapinit////////////////////");var e=this,t=this.amapManager.getMap();AMapUI.loadUI(["misc/PoiPicker"],function(n){var r=new n({input:"search",placeSearchOptions:{map:t,pageSize:10},suggestContainer:"searchTip",searchResultsContainer:"searchTip"});e.poiPicker=r,r.on("poiPicked",function(t){var n=t.source,o=t.item;if("search"!==n)r.searchByKeyword(o.name);else{r.clearSearchResults(),e.markers=[];var a=o.location.lng,s=o.location.lat,i=o.cityname+o.adname+o.name;e.center=[a,s],console.log(e.center),e.markers.push([a,s]),e.lng=a,e.lat=s,e.address=i,e.searchKey=i}})})},searchByHand:function(){""!==this.searchKey&&this.poiPicker.searchByKeyword(this.searchKey)}}},s={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{staticClass:"search-box"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.searchKey,expression:"searchKey"}],attrs:{type:"search",id:"search"},domProps:{value:e.searchKey},on:{input:function(t){t.target.composing||(e.searchKey=t.target.value)}}}),e._v(" "),n("button",{on:{click:e.searchByHand}},[e._v("搜索")]),e._v(" "),n("button",{staticStyle:{"margin-left":"2px"},on:{click:e.submitAddress}},[e._v("确认")]),e._v(" "),n("div",{staticClass:"tip-box",attrs:{id:"searchTip"}})]),e._v(" "),n("el-amap",{staticClass:"amap-box",attrs:{"amap-manager":e.amapManager,vid:"amap-vue",zoom:e.zoom,plugin:e.plugin,center:e.center,events:e.events}},e._l(e.markers,function(e,t){return n("el-amap-marker",{key:t,attrs:{position:e}})}),1)],1)},staticRenderFns:[]};var i=n("VU/8")(a,s,!1,function(e){n("etcG")},null,null);t.a=i.exports}});
//# sourceMappingURL=0.97ab6aab793f5d228495.js.map
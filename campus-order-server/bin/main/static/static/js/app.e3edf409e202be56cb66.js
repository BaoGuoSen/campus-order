webpackJsonp([17],{NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t("//Fk"),r=t.n(o),a=t("7+uW"),u={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var i=t("VU/8")({name:"App"},u,!1,function(e){t("mByn")},null,null).exports,c=t("/ocq");a.default.use(c.a);var s=new c.a({routes:[{path:"/",redirect:"/index/login"},{path:"/403",name:"403",component:function(){return t.e(12).then(t.bind(null,"9Ghf"))}},{path:"/index",name:"index",component:function(){return t.e(10).then(t.bind(null,"L8Y5"))},children:[{path:"login",name:"login",component:function(){return t.e(14).then(t.bind(null,"K31e"))}},{path:"chooseUserType",name:"chooseUserType",component:function(){return t.e(15).then(t.bind(null,"7sSW"))}},{path:"register",name:"register",component:function(){return Promise.all([t.e(0),t.e(13)]).then(t.bind(null,"q3Wa"))}}]},{path:"/customer",name:"customer",meta:{userTypes:["3","4"],requireAuth:!0},component:function(){return Promise.all([t.e(0),t.e(6)]).then(t.bind(null,"oSZb"))},children:[{path:"allDishs",name:"allDishs",component:function(){return Promise.all([t.e(0),t.e(2)]).then(t.bind(null,"0gtp"))}},{path:"cusOrderList",name:"cusOrderList",component:function(){return t.e(4).then(t.bind(null,"uD1y"))}},{path:"orderInfo/:id",name:"orderInfo",component:function(){return t.e(7).then(t.bind(null,"b5/6"))}}]},{path:"/store",name:"store",meta:{userTypes:["1"],requireAuth:!0},component:function(){return t.e(8).then(t.bind(null,"WBIc"))},children:[{path:"ownDishs",name:"ownDishs",component:function(){return Promise.all([t.e(0),t.e(1)]).then(t.bind(null,"ysa5"))}},{path:"orderList",name:"orderList",component:function(){return t.e(3).then(t.bind(null,"dzCT"))}}]},{path:"/storeInfo",name:"storeInfo",meta:{userTypes:["1"],requireAuth:!0},component:function(){return Promise.all([t.e(0),t.e(9)]).then(t.bind(null,"YIkU"))}},{path:"/rider",name:"rider",meta:{userTypes:["2"],requireAuth:!0},component:function(){return Promise.all([t.e(0),t.e(5)]).then(t.bind(null,"k1Ql"))}},{path:"/apply",name:"apply",component:function(){return t.e(11).then(t.bind(null,"sPvv"))}}]}),l=t("mtWM"),p=t.n(l),d=t("zL8q"),m=t.n(d),f=t("/IwO"),h=t.n(f),b=(t("tvR6"),null),y=null;function A(e){b.send(e)}function g(){b.close(),console.log("对话连接已关闭")}var k={initWebSocket:function(e){"WebSocket"in window?(b=new WebSocket(e),console.log(b)):alert("该浏览器不支持websocket!"),b.onopen=function(){console.log("WebSocket连接成功")},b.onmessage=function(e){!function(e){y(e.data)}(e)},b.onclose=function(){g()},b.onerror=function(){console.log("WebSocket连接发生错误")}},webSocketClose:g,sendSock:function(e,n){switch(y=n,b.readyState){case b.CONNECTING:setTimeout(function(){A(e)},1e3);break;case b.OPEN:A(e);break;case b.CLOSING:setTimeout(function(){A(e)},1e3);break;case b.CLOSED:}}};a.default.use(h.a),h.a.initAMapApiLoader({key:"2f3a1ccf54a3ffcd0591b284b9dc15c1",plugin:["AMap.Autocomplete","AMap.PlaceSearch","AMap.Scale","AMap.OverView","AMap.ToolBar","AMap.MapType","AMap.Geolocation","AMap.Geocoder","AMap.AMapManager","AMap.Marker"],v:"1.4.4",uiVersion:"1.0"}),a.default.prototype.socket=k,a.default.prototype.$axios=p.a,a.default.use(s),a.default.use(m.a),a.default.config.productionTip=!1,p.a.interceptors.response.use(function(e){return console.log(e),e},function(e){if(e.response)return r.a.reject(e.response.data)}),s.beforeEach(function(e,n,t){var o=sessionStorage.getItem("userType");e.meta.requireAuth?e.meta&&e.meta.userTypes.includes(o)?t():(console.log(e.meta.userTypes.includes(o),o,e.meta.userTypes),t({path:"/403"})):t()}),new a.default({el:"#app",router:s,components:{App:i},template:"<App/>"})},mByn:function(e,n){},tvR6:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.e3edf409e202be56cb66.js.map
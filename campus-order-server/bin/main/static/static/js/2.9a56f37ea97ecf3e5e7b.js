webpackJsonp([2],{"0gtp":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("7biW"),a=s("zAp8"),r=s("zH3v"),n={components:{search:i.a,dishCard:a.a,mymap:r.a},data:function(){return{dishs:[]}},computed:{imageList:function(){var t=[];return this.dishs.forEach(function(e){t.push(e.src)}),t}},mounted:function(){this.getAllDishs()},methods:{addDish:function(t){var e=this;this.$axios.post("api/store/addDish",t).then(function(t){e.$message({message:"注册成功",type:"success"}),e.getDishs()}).catch(function(t){e.$message.error(t.status+" "+t.error)})},getAllDishs:function(){var t=this;this.$axios.get("api/store/getAllDishs").then(function(e){t.dishs=e.data}).catch(function(e){t.$message.error(e.status+" "+e.error)})},searchByValue:function(t){var e=this;this.$axios.get("api/store/searchByValue",{params:{value:t}}).then(function(t){e.dishs=t.data}).catch(function(t){e.$message.error(t.status+" "+t.error)})},getStore:function(){var t=this;this.$axios.get("api/store/getStoreById",{params:{ownerId:sessionStorage.getItem("userId")}}).then(function(e){e.data||t.$router.push({name:"storeInfo",params:{type:"create"}}),t.store=e.data,sessionStorage.getItem("storeId")||sessionStorage.setItem("storeId",e.data.id)}).catch(function(e){t.$message.error(e.status+" "+e.error)})}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("search",{on:{searchByValue:t.searchByValue}}),t._v(" "),s("hr",{staticClass:"scale-half"}),t._v(" "),s("div",{staticClass:"cus-contentDish"},t._l(t.dishs,function(e,i){return s("dish-card",{key:i,attrs:{isEdit:!1,dish:e,imageList:t.imageList}})}),1)],1)},staticRenderFns:[]};var c=s("VU/8")(n,o,!1,function(t){s("yol+"),s("D+DQ")},"data-v-7887a019",null);e.default=c.exports},"7biW":function(t,e,s){"use strict";var i={name:"",data:function(){return{searchValue:""}},methods:{search:function(){console.log(this.searchValue),this.$emit("searchByValue",this.searchValue)}}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"search"},[s("el-input",{staticClass:"input",attrs:{placeholder:"请输入关键字，按回车键搜索"},nativeOn:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}})],1)},staticRenderFns:[]};var r=s("VU/8")(i,a,!1,function(t){s("h6jR")},"data-v-63610754",null);e.a=r.exports},"D+DQ":function(t,e){},h6jR:function(t,e){},pTgT:function(t,e){},"yol+":function(t,e){},zAp8:function(t,e,s){"use strict";var i={name:"",props:{isEdit:{type:Boolean,default:function(){return!0}},dish:{type:Object,default:function(){return{}}},imageList:{type:Array,default:function(){return[]}}},data:function(){return{fit:"cover",dialogVisible:!1,order:{dishId:"",dishSrc:"",storeId:"",customerId:""}}},methods:{deleteDish:function(){console.log("delete"),this.$emit("deleteDish",this.dish)},updateDish:function(){this.$emit("updateDish",this.dish),this.dialogVisible=!1},handleAvatarSuccess:function(t,e){console.log(t[0],"res"),console.log(e,"file"),this.dish.src=t[0]},handleExceed:function(t,e){this.$message.warning("当前限制选择 1 个文件，请将当前文件删除后在执行上传操作")},apply:function(){var t=this;this.$prompt("您将支付"+this.dish.price+"元，是否支付?","提示",{confirmButtonText:"支付",cancelButtonText:"取消",type:"warning",inputPlaceholder:"备注信息"}).then(function(e){var s=e.value;t.order.note=s,t.addOrder()}).catch(function(){t.$message({type:"info",message:"已取消支付"})})},addOrder:function(){var t=this;this.orderInit(),this.$axios.post("api/order/addOrder",this.order).then(function(e){if(t.$message({message:"下单成功",type:"success"}),200===e.status){var s=t.$router.resolve({path:"/apply",query:{html:e.data}});window.open(s.href,"_blank")}t.dish.sellCount=t.dish.sellCount+1,t.update()}).catch(function(e){t.$message.error(e.status+" "+e.error)})},update:function(t){var e=this;this.$axios.post("api/store/updateDish",this.dish).then(function(t){}).catch(function(t){e.$message.error(t.status+" "+t.error)})},orderInit:function(){this.order.dishId=this.dish.id,this.order.dishSrc=this.dish.src,this.order.storeId=this.dish.storeId,this.order.customerId=sessionStorage.getItem("userId"),this.order.startTime=(new Date).getTime(),this.order.dishName=this.dish.name,this.order.customerName=sessionStorage.getItem("userName"),this.order.amount=this.dish.price}}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-card",{staticClass:"card",attrs:{shadow:"hover"}},[s("el-image",{staticStyle:{width:"233px",height:"300px"},attrs:{src:t.dish.src,fit:t.fit,"preview-src-list":t.imageList}}),t._v(" "),s("div",{staticClass:"name-price"},[s("span",{staticStyle:{"font-size":"20px"}},[s("strong",[t._v(t._s(t.dish.name))])]),t._v(" "),s("span",{staticStyle:{float:"right",color:"red"}},[t._v("RMB "+t._s(t.dish.price))])]),t._v(" "),s("div",{staticClass:"cardDown"},[s("span",[t._v("已售:"+t._s(t.dish.sellCount))]),t._v(" "),t.isEdit?t._e():s("el-button",{staticClass:"operate",attrs:{type:"text"},on:{click:t.apply}},[t._v("立即下单")]),t._v(" "),t.isEdit?s("el-dropdown",{staticClass:"operate",attrs:{trigger:"click"}},[s("el-button",{staticClass:"btn",attrs:{type:"text"}},[t._v("操作")]),t._v(" "),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("el-dropdown-item",{nativeOn:{click:function(e){t.dialogVisible=!0}}},[t._v("编辑")]),t._v(" "),s("el-dropdown-item",{nativeOn:{click:function(e){return t.deleteDish(e)}}},[t._v("删除")])],1)],1):t._e()],1),t._v(" "),s("el-dialog",{attrs:{title:"修改菜品",visible:t.dialogVisible,width:"50%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[s("el-form",{staticStyle:{width:"80%"},attrs:{model:t.dish}},[s("el-form-item",{attrs:{label:"菜名:","label-width":"140px"}},[s("el-input",{attrs:{autocomplete:"off"},model:{value:t.dish.name,callback:function(e){t.$set(t.dish,"name",e)},expression:"dish.name"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"价格:","label-width":"140px"}},[s("el-input",{attrs:{autocomplete:"off"},model:{value:t.dish.price,callback:function(e){t.$set(t.dish,"price",e)},expression:"dish.price"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"菜品图片:","label-width":"140px"}},[t.dish.src?s("el-image",{staticStyle:{width:"148px",height:"148px"},attrs:{src:t.dish.src,"preview-src-list":[t.dish.src]}}):s("el-upload",{attrs:{action:"api/file/upload","list-type":"picture-card","on-success":t.handleAvatarSuccess,"on-exceed":t.handleExceed,limit:1}},[s("i",{staticClass:"el-icon-plus"})])],1)],1),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:t.updateDish}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var r=s("VU/8")(i,a,!1,function(t){s("pTgT")},"data-v-b0a6c072",null);e.a=r.exports}});
//# sourceMappingURL=2.9a56f37ea97ecf3e5e7b.js.map
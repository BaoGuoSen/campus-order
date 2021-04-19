webpackJsonp([1],{"7biW":function(e,t,s){"use strict";var i={name:"",data:function(){return{searchValue:""}},methods:{search:function(){console.log(this.searchValue),this.$emit("searchByValue",this.searchValue)}}},a={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"search"},[s("el-input",{staticClass:"input",attrs:{placeholder:"请输入关键字，按回车键搜索"},nativeOn:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}})],1)},staticRenderFns:[]};var o=s("VU/8")(i,a,!1,function(e){s("h6jR")},"data-v-63610754",null);t.a=o.exports},W5GF:function(e,t){},agaD:function(e,t){},h6jR:function(e,t){},pTgT:function(e,t){},qjo2:function(e,t){},ysa5:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("7biW"),a=s("zAp8"),o=s("Z8es"),r={name:"",props:{dialogDishVisible:{type:Boolean,default:function(){return!1}},dish:{type:Object,default:function(){return{}}}},data:function(){return{}},methods:{addDish:function(){this.dish.id=o.generate(),this.dish.storeId=sessionStorage.getItem("storeId"),this.$emit("addDish",this.dish),this.hideDialog()},hideDialog:function(){this.$emit("hideDialog")},handleRemove:function(e,t){console.log(e,t)},handleExceed:function(e,t){this.$message.warning("当前限制选择 1 个文件，请将当前文件删除后在执行上传操作")},handlePictureCardPreview:function(e){console.log("preview")},handleAvatarSuccess:function(e,t){console.log(e[0],"res"),console.log(t,"file"),this.dish.src=e[0]}}},n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("el-dialog",{attrs:{title:"新增菜品",center:!1,"close-on-click-modal":!1,"show-close":!1,visible:e.dialogDishVisible},on:{"update:visible":function(t){e.dialogDishVisible=t}}},[s("el-form",{staticStyle:{width:"80%"},attrs:{model:e.dish}},[s("el-form-item",{attrs:{label:"菜名:","label-width":"140px"}},[s("el-input",{attrs:{autocomplete:"off"},model:{value:e.dish.name,callback:function(t){e.$set(e.dish,"name",t)},expression:"dish.name"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"价格:","label-width":"140px"}},[s("el-input",{attrs:{autocomplete:"off"},model:{value:e.dish.price,callback:function(t){e.$set(e.dish,"price",t)},expression:"dish.price"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"上传店铺主页图片:","label-width":"140px"}},[s("el-upload",{attrs:{action:"api/file/upload","list-type":"picture-card","on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove,"on-success":e.handleAvatarSuccess,"on-exceed":e.handleExceed,limit:1}},[s("i",{staticClass:"el-icon-plus"})])],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:e.hideDialog}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.addDish}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var l=s("VU/8")(r,n,!1,function(e){s("qjo2")},"data-v-2f35a109",null).exports,d={components:{search:i.a,dishCard:a.a,mydialog:l},data:function(){return{dialogType:"",dialogDishVisible:!1,dish:{id:"",src:"",name:"",price:"",sellCount:"",storeId:""},dishs:[]}},computed:{imageList:function(){var e=[];return this.dishs.forEach(function(t){e.push(t.src)}),e}},mounted:function(){this.getDishs()},methods:{showAddDialog:function(){this.dialogType="create",this.dialogDishVisible=!0},showEditDialog:function(e){this.dialogType="edit",this.dish=e,this.dialogDishVisible=!0},hideDialog:function(){this.dialogDishVisible=!1},addDish:function(e){var t=this;this.$axios.post("api/store/addDish",e).then(function(e){t.$message({message:"注册成功",type:"success"}),t.getDishs()}).catch(function(e){t.$message.error(e.status+" "+e.error)})},update:function(e){var t=this;this.$axios.post("api/store/updateDish",e).then(function(e){t.$message({message:"修改成功",type:"success"})}).catch(function(e){t.$message.error(e.status+" "+e.error)})},getDishs:function(){var e=this;this.$axios.get("api/store/getDishsByStoreId",{params:{storeId:sessionStorage.getItem("storeId")}}).then(function(t){e.dishs=t.data}).catch(function(t){e.$message.error(t.status+" "+t.error)})},deleteDish:function(e){var t=this;this.$axios.post("api/store/deleteDish",e).then(function(e){t.$message({message:"删除成功",type:"success"}),console.log(333,e.data),t.getDishs()}).catch(function(e){t.$message.error(e.status+" "+e.error)})},searchByValue:function(e){var t=this;this.$axios.get("api/store/searchByValue",{params:{value:e}}).then(function(e){t.dishs=e.data}).catch(function(e){t.$message.error(e.status+" "+e.error)})},getStore:function(){var e=this;this.$axios.get("api/store/getStoreById",{params:{ownerId:sessionStorage.getItem("userId")}}).then(function(t){t.data||e.$router.push({name:"storeInfo",params:{type:"create"}}),e.store=t.data,sessionStorage.getItem("storeId")||sessionStorage.setItem("storeId",t.data.id)}).catch(function(t){e.$message.error(t.status+" "+t.error)})}}},c={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("search",{on:{searchByValue:e.searchByValue}}),e._v(" "),s("el-button",{staticStyle:{float:"right","margin-top":"-65px"},attrs:{type:"primary"},on:{click:e.showAddDialog}},[e._v("新建菜品")]),e._v(" "),s("hr",{staticClass:"scale-half"}),e._v(" "),s("div",{staticClass:"contentDish"},e._l(e.dishs,function(t,i){return s("dish-card",{key:i,attrs:{isEdit:!0,dish:t,imageList:e.imageList},on:{showEditDialog:e.showEditDialog,deleteDish:e.deleteDish,updateDish:e.update}})}),1),e._v(" "),s("mydialog",{attrs:{dialogDishVisible:e.dialogDishVisible,dish:e.dish},on:{hideDialog:e.hideDialog,addDish:e.addDish}})],1)},staticRenderFns:[]};var h=s("VU/8")(d,c,!1,function(e){s("W5GF"),s("agaD")},"data-v-277fa862",null);t.default=h.exports},zAp8:function(e,t,s){"use strict";var i={name:"",props:{isEdit:{type:Boolean,default:function(){return!0}},dish:{type:Object,default:function(){return{}}},imageList:{type:Array,default:function(){return[]}}},data:function(){return{fit:"cover",dialogVisible:!1,order:{dishId:"",dishSrc:"",storeId:"",customerId:""}}},methods:{deleteDish:function(){console.log("delete"),this.$emit("deleteDish",this.dish)},updateDish:function(){this.$emit("updateDish",this.dish),this.dialogVisible=!1},handleAvatarSuccess:function(e,t){console.log(e[0],"res"),console.log(t,"file"),this.dish.src=e[0]},handleExceed:function(e,t){this.$message.warning("当前限制选择 1 个文件，请将当前文件删除后在执行上传操作")},apply:function(){var e=this;this.$prompt("您将支付"+this.dish.price+"元，是否支付?","提示",{confirmButtonText:"支付",cancelButtonText:"取消",type:"warning",inputPlaceholder:"备注信息"}).then(function(t){var s=t.value;e.order.note=s,e.addOrder()}).catch(function(){e.$message({type:"info",message:"已取消支付"})})},addOrder:function(){var e=this;this.orderInit(),this.$axios.post("api/order/addOrder",this.order).then(function(t){if(e.$message({message:"下单成功",type:"success"}),200===t.status){var s=e.$router.resolve({path:"/apply",query:{html:t.data}});window.open(s.href,"_blank")}e.dish.sellCount=e.dish.sellCount+1,e.update()}).catch(function(t){e.$message.error(t.status+" "+t.error)})},update:function(e){var t=this;this.$axios.post("api/store/updateDish",this.dish).then(function(e){}).catch(function(e){t.$message.error(e.status+" "+e.error)})},orderInit:function(){this.order.dishId=this.dish.id,this.order.dishSrc=this.dish.src,this.order.storeId=this.dish.storeId,this.order.customerId=sessionStorage.getItem("userId"),this.order.startTime=(new Date).getTime(),this.order.dishName=this.dish.name,this.order.customerName=sessionStorage.getItem("userName"),this.order.amount=this.dish.price}}},a={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("el-card",{staticClass:"card",attrs:{shadow:"hover"}},[s("el-image",{staticStyle:{width:"233px",height:"300px"},attrs:{src:e.dish.src,fit:e.fit,"preview-src-list":e.imageList}}),e._v(" "),s("div",{staticClass:"name-price"},[s("span",{staticStyle:{"font-size":"20px"}},[s("strong",[e._v(e._s(e.dish.name))])]),e._v(" "),s("span",{staticStyle:{float:"right",color:"red"}},[e._v("RMB "+e._s(e.dish.price))])]),e._v(" "),s("div",{staticClass:"cardDown"},[s("span",[e._v("已售:"+e._s(e.dish.sellCount))]),e._v(" "),e.isEdit?e._e():s("el-button",{staticClass:"operate",attrs:{type:"text"},on:{click:e.apply}},[e._v("立即下单")]),e._v(" "),e.isEdit?s("el-dropdown",{staticClass:"operate",attrs:{trigger:"click"}},[s("el-button",{staticClass:"btn",attrs:{type:"text"}},[e._v("操作")]),e._v(" "),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("el-dropdown-item",{nativeOn:{click:function(t){e.dialogVisible=!0}}},[e._v("编辑")]),e._v(" "),s("el-dropdown-item",{nativeOn:{click:function(t){return e.deleteDish(t)}}},[e._v("删除")])],1)],1):e._e()],1),e._v(" "),s("el-dialog",{attrs:{title:"修改菜品",visible:e.dialogVisible,width:"50%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[s("el-form",{staticStyle:{width:"80%"},attrs:{model:e.dish}},[s("el-form-item",{attrs:{label:"菜名:","label-width":"140px"}},[s("el-input",{attrs:{autocomplete:"off"},model:{value:e.dish.name,callback:function(t){e.$set(e.dish,"name",t)},expression:"dish.name"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"价格:","label-width":"140px"}},[s("el-input",{attrs:{autocomplete:"off"},model:{value:e.dish.price,callback:function(t){e.$set(e.dish,"price",t)},expression:"dish.price"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"菜品图片:","label-width":"140px"}},[e.dish.src?s("el-image",{staticStyle:{width:"148px",height:"148px"},attrs:{src:e.dish.src,"preview-src-list":[e.dish.src]}}):s("el-upload",{attrs:{action:"api/file/upload","list-type":"picture-card","on-success":e.handleAvatarSuccess,"on-exceed":e.handleExceed,limit:1}},[s("i",{staticClass:"el-icon-plus"})])],1)],1),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.updateDish}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var o=s("VU/8")(i,a,!1,function(e){s("pTgT")},"data-v-b0a6c072",null);t.a=o.exports}});
//# sourceMappingURL=1.9e699d252a2398af8bec.js.map
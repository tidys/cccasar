"use strict";const e=require("fs"),t=require("path"),r=require("../utils/cache"),i=require("../utils/operation"),n=require("../utils/event"),o=require("../utils/communication");exports.template=e.readFileSync(t.join(__dirname,"../template/tools.html"),"utf-8"),exports.props=["filter"],exports.data=function(){return{input:!1}},exports.methods={t:e=>Editor.T(e),refresh(){n.emit("refresh-node-tree")},createPopup(e){o.popup("create",{x:e.x,y:e.y+5})},searchPopup(){o.popup("search",{x:event.x,y:event.y+5})},changeFold(){let e=r.queryNodes(),t=!e.some(e=>!(!e.children||0===e.children.length)&&e.fold);e.forEach(e=>{e.children.length>0&&i.fold(e.id,t)})},onFilterChange(e){let t=e.target.value;n.emit("filter-changed",t)},onInputnFocus(){this.input=!0},onInputBlur(){this.input=!1}};
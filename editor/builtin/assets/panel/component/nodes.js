"use strict";const e=require("fs"),t=require("path"),i=require("fire-url"),o=require("../utils/cache"),s=require("../utils/operation"),r=require("../utils/event"),l=require("../utils/display"),n=require("../utils/communication");exports.template=e.readFileSync(t.join(__dirname,"../template/nodes.html"),"utf-8"),exports.props=["length"],exports.components={node:require("./node"),highlight:require("./highlight")},exports.created=function(){r.on("nodes_focus",e=>{this.focused=e,e&&this.$el&&this.$el.parentElement.focus()})},exports.data=function(){return{focused:!1,start:0,nodes:o.queryShowNodes(),list:[],allNodes:o.queryNodes(),uh:{height:0},y:-999,highlight:{node:null,state:0}}},exports.watch={start(){this.reset()},length(){this.reset()},nodes(){this.reset()}},exports.methods={reset(){this._updateLock||(this._updateLock=!0,requestAnimationFrame(()=>{this._updateLock=!1,this.updateShowList()}))},updateShowList(){let e=o.queryShowNodes();this.uh.height=0,this.list.length=0;let t=this.start+Math.ceil(this.length);t=t>e.length?e.length:t;for(let i=this.start;i<t;i++)this.list.push(e[i]);this.uh.height=e.length*o.lineHeight+4},onMouseDown(e){if(2===e.button)return Editor.Selection.setContext("asset",null),n.popup("context",{x:e.clientX,y:e.clientY}),void 0;Editor.Selection.select("node")},onScroll(e){let t=e.target.scrollTop;this.start=t/o.lineHeight|0},onFocus(){this.focused=!0},onBlur(){this.focused=!1},scrollIfNeeded(e){let t=o.queryNode(e);if(!t)return;let i=o.queryShowNodes().indexOf(t);if(-1==i)return;let s=i*o.lineHeight,r=this.$el.scrollTop+this.$el.clientHeight-o.lineHeight-2;s<this.$el.scrollTop-2?this.$el.scrollTop-=this.$el.scrollTop-2-s:s>=r&&(this.$el.scrollTop+=s-r)},scrollToItem(e){let t=o.queryNode(e);if(!t)return;s.recParentNodes(e,!1);let i=o.queryShowNodes();setTimeout(()=>{let r=i.indexOf(t);r=r>=0?r:0,this.$el.scrollTop=o.lineHeight*r-o.lineHeight*this.length/2,s.hint(e)},0)},onDragStart(e){e.stopPropagation();let t=Editor.Selection.contexts("asset");if(!t||t.length<=0)return e.preventDefault(),void 0;s.staging(t);let i=[];t.forEach(e=>{i.push(o.queryNode(e))}),Editor.UI.DragDrop.start(e.dataTransfer,{buildImage:!0,effect:"copyMove",type:"asset",items:i.map(e=>({id:e.id,name:e.name}))})},onDragOver(e){e.stopPropagation(),e.preventDefault()},onDragEnd(e){e.stopPropagation(),s.restore(),Editor.UI.DragDrop.end()},onDropAreaMove(e){e.preventDefault(),e.stopPropagation(),e.target;let t=this.$el.getBoundingClientRect();this.y=this.$el.scrollTop+e.detail.clientY-t.top-5;let i=e.detail.dragType,o="none";"asset"===i||"file"===i?o="copy":"node"===i&&(o="move"),Editor.UI.DragDrop.updateDropEffect(e.detail.dataTransfer,o)},onDropAreaAccept(e){e.stopPropagation(),Editor.Selection.cancel();let r=l.point(this.y);if(!r.node)return;let n=e.detail.dragType,a=e.detail.dragItems;if("file"===n?a=(a=Editor.UI.DragDrop.filterFiles(a)).map(e=>e.path):"asset"!==n&&"node"!==n||(a=a.map(e=>e.id)),0===a.length)return;if(r.node&&-1!=a.indexOf(r.node.id))return;this.y=-999,1,r.node&&console.log(`插入目标节点：${r.node.name} - ${r.node.id}`);let d=e.detail.dragItems.map(e=>e.id),h=s.getRealUrl(r.node.id),p=!0;if("folder"!==r.node.assetType&&"mount"!==r.node.assetType&&(h=s.getPath(r.node.id),p=!1),"file"===e.detail.dragType){let e;if(p)e=r.node.children.map(e=>e.name+e.extname);else{let t=o.queryNode(r.node.parent);if(!t)return;e=t.children.map(e=>e.name+e.extname)}let i=[];for(let o=0;o<a.length;o++){let s=t.basename(a[o]);e.indexOf(s)>=0&&i.push(a[o])}if(i.length>0)for(let e=0;e<i.length;e++){let o=i.length-e,s=t.basename(i[e]),r=null,l="";o>1?(r=[Editor.T("MESSAGE.assets.skip"),Editor.T("MESSAGE.assets.merge"),Editor.T("MESSAGE.assets.skip_all"),Editor.T("MESSAGE.assets.merge_all")],l=Editor.T("MESSAGE.assets.left_count",{leftCount:o})):r=[Editor.T("MESSAGE.assets.skip"),Editor.T("MESSAGE.assets.merge")];let n=Editor.Dialog.messageBox({type:"warning",buttons:r,title:Editor.T("MESSAGE.warning"),message:Editor.T("MESSAGE.assets.import_conflict",{fileName:s}),detail:l,noLink:!0,defaultId:0,cancelId:1});if(0===n){let t=a.indexOf(i[e]);t>=0&&a.splice(t,1)}else{if(2===n){for(let t=e;t<i.length;t++){let e=a.indexOf(i[t]);e>=0&&a.splice(e,1)}break}if(3===n)break}}a.length>0&&Editor.assetdb.import(a,h,!0)}else d.forEach((t,l)=>{let n=h;switch(console.log("dragType",e.detail.dragType,n),e.detail.dragType){case"node":let l=a[0];Editor.Ipc.sendToPanel("scene","scene:create-prefab",l,n);break;case"asset":if(o.queryNode(t).parent===r.node.parent&&"folder"!==r.node.assetType)return;let d=s.getRealUrl(t);n=i.join(n,i.basename(d)),console.log("dest url ",n),Editor.assetdb.move(d,n,!0)}window.requestAnimationFrame(()=>{s.hint(t)})})}},exports.directives={init(e,t){requestAnimationFrame(()=>{this.vm.reset()})}};
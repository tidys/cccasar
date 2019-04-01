"use strict";require("fire-fs"),require("fire-path");const e=require("./event"),t={EXPAND_ALL:1,COLLAPSE_ALL:2,MEMORY_LAST_STATE:3};let n,o=!1,l={},r=[],i=[],d=[],s=t.COLLAPSE_ALL;exports.foldState=void 0,exports.queryCache=function(){return l},exports.queryRoots=function(){return r},exports.queryNodes=function(){return i},exports.queryNode=function(e){let t=l[e];return t||null},exports.getRootNodeByTargetNode=function(e){let t=e.parent;if(t){let e=this.queryNode(t);return this.getRootNodeByTargetNode(e)}return e};let f=function(e){let n=Editor.Selection.curSelection("node");return{id:e.id,name:e.name,prefabState:e.prefabState,locked:e.locked,isActive:e.isActive,parent:null,children:[],next:null,prev:null,index:0,showIndex:0,selected:-1!==n.indexOf(e.id),fold:function(e){if(void 0!==e.fold)return e.fold;return s===t.MEMORY_LAST_STATE?-1===d.indexOf(e.id):void 0!==exports.foldState?exports.foldState:e.fold}(e),show:!0,rename:!1,level:0,ignore:!1,hint:!1}};exports.add=function(t,n,o){if(n&&!l[n])return console.warn(`Hierarchy - 插入缓存失败，父节点不存在 ${n}`),!1;if(t=f(t),l[t.id]=t,!n){let e=r.indexOf(t.id);-1!==e&&o!==e&&(r.splice(e,1),e=-1),-1===e&&r.splice(o,0,t.id)}if(n){o=o||0,t.parent=n;let e=l[n],r=e.children.indexOf(t.id);-1!==r&&o!==r&&(e.children.splice(r,1),r=-1),-1===r&&e.children.splice(o,0,t.id),t.level=e.level+1,t.prev=e.children[o-1]||null,t.next=e.children[o+1]||null}else t.level=0,t.prev=r[o-1]||null,t.next=r[o+1]||null;t.prev&&(l[t.prev].next=t.id),t.next&&(l[t.next].prev=t.id);let d=0,s=0,a=t;for(;a&&!a.next;)a=l[a.parent];if(a){let e=l[a.next];i.splice(e.index,0,t),d=e.index,s=e.showIndex}else{for(let e=(d=i.length)-1;e>=0;e--){let t=i[e];if(t.show){s=t.showIndex+1;break}}i.push(t)}for(let e=d;e<i.length;e++){let t=i[e];t.index=e,t.show?t.showIndex=s++:t.showIndex=-1}0,e.emit("node-added",t)},exports.remove=function(t){let n=l[t];if(!n)return console.warn(`Hierarchy - 删除缓存失败，节点不存在 ${t}`),[];let d=[{id:t,oldNode:n}];if(n.parent){let e=l[n.parent],o=e.children.indexOf(t);-1!==o&&e.children.splice(o,1)}let s=l[n.prev],f=l[n.next];for(s&&(s.next=f?f.id:null),f&&(f.prev=s?s.id:null),o=!0;n.children.length>0;){exports.remove(n.children[0]).forEach(e=>{d.push({id:e.id,oldNode:e.oldNode})})}if(o=!1,delete l[t],!n.parent){let e=r.indexOf(t);-1!==e&&r.splice(e,1)}let a=n.index;if(i.splice(n.index,1),i.length>0){let e;if(a<=0)e=0;else for(let t=a-1;t>=0;t--){let n=i[t];if(n.show){e=n.showIndex+1;break}}for(let t=a;t<i.length;t++){let n=i[t];n.index=t,n.show?n.showIndex=e++:n.showIndex=-1}}return 0,e.emit("node-removed",n),d},exports.clear=function(){for(;i.length>0;)i.pop();for(;r.length>0;)r.pop();Object.keys(l).forEach(e=>{delete l[e]})},exports.initNodeState=function(){(s=Editor.globalProfile.data["node-tree-state"])===t.MEMORY_LAST_STATE?this.foldState=void 0:this.foldState=s===t.COLLAPSE_ALL},exports.initNodeStateProfile=function(){d=[],n=null,Editor.Profile.load("profile://local/node-tree-state.json",(e,t)=>{t&&(n=t,t.data.nodeFoldStates?t.data.nodeFoldStates.forEach(e=>{0,d.push(e)}):t.data.nodeFoldStates=[])})},exports.saveNodeTreeStateProfile=function(){n&&n.data&&(0,n.data.nodeFoldStates=d,n.save())},exports.saveNodeFoldState=function(e,t){let n=d.indexOf(e);if(-1!==n&&t)return 0,d.splice(n,1),void 0;if(!t&&-1===n){0,d.push(e);let t=d.length-500;t>0&&d.shift(0,t)}};
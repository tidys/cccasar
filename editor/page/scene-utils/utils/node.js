"use strict";let e={},t=cc.vmath.mat4.create();function n(e){var t,o=e._components.length;for(t=0;t<o;++t){var c=e._components[t];c._enabled&&cc.director._compScheduler.disableComp(c)}for(t=0,o=e._children.length;t<o;++t){var r=e._children[t];r._active&&n(r)}}e.getObbFromRect=function(e,t,n,o,c,r){let i=t.x,a=t.y,s=t.width,l=t.height,d=e.m00*i+e.m04*a+e.m12,f=e.m01*i+e.m05*a+e.m13,u=e.m00*s,g=e.m01*s,m=e.m04*l,h=e.m05*l;return n=n||cc.v2(),o=o||cc.v2(),c=c||cc.v2(),r=r||cc.v2(),o.x=d,o.y=f,c.x=u+d,c.y=g+f,n.x=m+d,n.y=h+f,r.x=u+m+d,r.y=g+h+f,[n,o,c,r]},e.getWorldBounds=function(e,n,o){n=n||e.getContentSize();let c=e.getAnchorPoint(),r=n.width,i=n.height,a=new cc.Rect(-c.x*r,-c.y*i,r,i);return e.getWorldMatrix(t),a.transformMat4(a,t),o?(o.x=a.x,o.y=a.y,o.width=a.width,o.height=a.height,o):a},e.getWorldOrientedBounds=function(n,o,c,r,i,a){o=o||n.getContentSize();let s=n.getAnchorPoint(),l=o.width,d=o.height,f=new cc.Rect(-s.x*l,-s.y*d,l,d);return n.getWorldMatrix(t),e.getObbFromRect(t,f,c,r,i,a)},e.getScenePosition=function(t){let n=cc.director.getScene();return n?n.convertToNodeSpaceAR(e.getWorldPosition(t)):(cc.error("Can not access scenePosition if no running scene"),cc.Vec2.ZERO)},e.setScenePosition=function(t,n){let o=cc.director.getScene();if(!o)return cc.error("Can not access scenePosition if no running scene"),void 0;e.setWorldPosition(t,cc.v2(o.convertToWorldSpaceAR(n)))},e.getSceneRotation=function(t){let n=cc.director.getScene();return n?e.getWorldRotation(t)-n.angle:(cc.error("Can not access sceneRotation if no running scene"),0)},e.setSceneRotation=function(t,n){let o=cc.director.getScene();if(!o)return cc.error("Can not access sceneRotation if no running scene"),void 0;e.setWorldRotation(o.angle+n)},e.getWorldPosition=function(e){let t=e.convertToWorldSpaceAR(cc.v2(0,0));return cc.v2(t.x,t.y)},e.setWorldPosition=function(e,t){if(t instanceof cc.Vec2)if(e.parent){let n=e.parent.convertToNodeSpaceAR(t);e.x=n.x,e.y=n.y}else e.x=t.x,e.y=t.y;else cc.error("The new worldPosition must be cc.Vec2")},e.getWorldRotation=function(t){let n=t.parent;return n?n instanceof cc.Scene?t.angle+n.angle:t.angle+e.getWorldRotation(n):t.angle},e.setWorldRotation=function(t,n){if(isNaN(n))cc.error("The new worldRotation must not be NaN");else{let o=t.parent;o?o instanceof cc.Scene?t.angle=n-o.angle:t.angle=n-e.getWorldRotation(o):t.angle=n}},e.getWorldScale=function(e){e.getWorldMatrix(t);let n=t.m00,o=t.m01,c=t.m04,r=t.m05,i=new cc.Vec2;return i.x=Math.sqrt(n*n+o*o),i.y=Math.sqrt(c*c+r*r),0!==n&&n===-r&&0===o&&0===c&&(n<0?i.x=-i.x:i.y=-i.y),i},e._hasFlagInComponents=function(e,t){let n=e._components;for(let e=0,o=n.length;e<o;++e){if(n[e]._objFlags&t)return!0}return!1},e._destroyForUndo=function(e,t){cc.Node.isNode(e)&&(e._activeInHierarchy&&n(e),function(e){let t=e._components.length;for(let n=0;n<t;++n){let t=e._components[n];if((cc.engine._isPlaying||t.constructor._executeInEditMode)&&t.onDestroy)try{t.onDestroy()}catch(e){cc._throw(e)}}for(let t=0,o=e.childrenCount;t<o;++t){let o=e._children[t];o._active&&n(o)}}(e)),t(),e.destroy(),Editor.Ipc.sendToAll("scene:delete-nodes-in-scene")},e.getNodePath=function(e){let t="";for(;e&&!(e instanceof cc.Scene);)t=t?e.name+"/"+t:e.name,e=e._parent;return t};var o=new Array(32);e.getChildUuids=function(e,t){var n=[];t&&n.push(e.uuid);var c=0;for(o[0]=e;c>=0;){var r=o[c];if(o[c]=null,--c,r){var i=r._children;if(i)for(var a=0,s=i.length;a<s;++a){var l=i[a];o[++c]=l,n.push(l.uuid)}}}return n},e.createNodeFromAsset=function(e,t){const n=require("../lib/sandbox");cc.AssetLibrary.queryAssetInfo(e,(o,c,r,i)=>{if(o)return t(o);if(r)return t(new Error("Can not create node from raw asset: "+cc.js.getClassName(i))),void 0;if(cc.js.isChildClassOf(i,cc._Script)){let o,r=Editor.Utils.UuidUtils.compressUuid(e),i=cc.js._getClassById(r);if(cc.js.isChildClassOf(i,cc.Component))(o=new cc.Node(cc.js.getClassName(i))).addComponent(i),t(null,o);else{let e=(!CC_TEST&&require("fire-url")).basename(c);"compiling"===Editor.remote.Compiler.state||n.reloading?t(new Error(`Can not load "${e}", please wait for the scene to reload.`)):t(new Error(`Can not find a component in the script "${e}".`))}}else cc.AssetLibrary.loadAsset(e,(e,n)=>{if(e)return t(e);if(n.createNode){if(n instanceof cc.Prefab){if(Editor.globalProfile.data["auto-sync-prefab"]){require("./prefab")._setPrefabSync(n.data,!0)}}n.createNode(t)}else t(new Error("Can not create node from "+cc.js.getClassName(i)))})})},e.createNodeFromClass=function(e,t){let n=new cc.Node,o=null;if(e){let t=cc.js._getClassById(e);if(t){var c=n.addComponent(t);c&&cc.director._nodeActivator.resetComp(c)}else o=new Error(`Unknown node to create: ${e}`)}t&&t(o,n)},module.exports=e;
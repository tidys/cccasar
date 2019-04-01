"use strict";const e=require("fire-fs"),i=require("path"),t=require("../libs/advice"),n=require("../libs/manager"),s=require("../libs/dump"),{promisify:r}=require("util");exports.template=e.readFileSync(i.join(__dirname,"../template/home.html"),"utf-8"),exports.watch={width(){try{let e=this.$els.grid;e.resize(),e.repaint()}catch(e){Editor.error(e)}},frame(){let e=this.$els.grid,i=this.frame*this.scale,n=e.clientWidth;try{let s=i+e.xAxisOffset;(s<0||s>n)&&t.emit("drag-move",e.xAxisOffset+i-n/2)}catch(e){Editor.error(e)}s.update()},clip(){try{this.clip&&this.clip.id;this.updateState(),this.updateMNodes(),t.emit("change-info"),t.emit("select-frame",0)}catch(e){Editor.error(e)}},hierarchy(){try{let e=Editor.Selection.curActivate("node");this.hierarchy.some(i=>i.id===e&&(t.emit("change-node",i),!0)),this.updateState(),this.updateClips()}catch(e){Editor.error(e)}},sample(){try{this.initGrid()}catch(e){Editor.error(e)}},record(){if(!(this.hierarchy&&this.hierarchy.length&&this.clip&&this.clip.id))return t.emit("change-frame",0),void 0;for(;this.selected.length;)this.selected.pop();Editor.Ipc.sendToPanel("scene","scene:query-animation-time",{rootId:this.hierarchy[0].id,clip:this.clip.id},(e,i)=>{if(e)return Editor.warn(e),void 0;let n=Math.round(i*this.sample);t.emit("change-frame",n)})}},exports.data=function(){return{state:-1,record:!1,paused:!0,event:-1,eline:null,scale:20,offset:-10,width:0,height:0,duration:0,speed:1,sample:60,mode:0,ignore_pointer:!1,frame:0,node:"",clip:"",hierarchy:[],mnodes:[],clips:[],props:[],selected:[]}},exports.methods={t:(e,...i)=>Editor.T(`timeline.home.${e}`,...i),init(){let e=Editor.Selection.curActivate("node"),i=Editor.Selection.curSelection("node");this.hierarchy.every(e=>-1===i.indexOf(e.id))&&(this.hierarchy=[]),e&&Editor.Ipc.sendToPanel("timeline","selection:activated","node",e),i&&i.length&&Editor.Ipc.sendToPanel("timeline","selection:selected","node",i),Editor.Ipc.sendToPanel("scene","scene:query-animation-record",(e,i)=>{if(e)return Editor.warn(e),void 0;i.record&&Editor.Ipc.sendToPanel("timeline","selection:activated","node",i.root),setTimeout(()=>{i.clip&&(this.clip=i.clip||{}),this.record=i.record},200)})},initEngine(){return this._initEngineFlag||window._Scene?Promise.resolve():new Promise((e,i)=>{window._Scene={},cc.game.run({id:this.$els.game},()=>{this._initEngineFlag=!0,e()})})},initGrid(){let e=this.$els.grid;e.setScaleH([5,2,3,2],20,100,"frame",this.sample),e.xAxisScaleAt(this.offset,this.scale),requestAnimationFrame(()=>{e.resize(),e.repaint(),this.offset=e.xAxisOffset})},updateState(){this.state=-1,clearTimeout(this._updateStateTimer),this._updateStateTimer=setTimeout(()=>{this.hierarchy&&this.hierarchy.length?s.hasAnimaiton(this.hierarchy[0].id)?this.clips&&this.clips.length?this.state=3:this.state=2:this.state=1:this.state=0},500)},async updateClips(){if(!this.hierarchy||!this.hierarchy.length||!this.hierarchy[0].id)return t.emit("change-clips",[]),void 0;let e=this.hierarchy[0].id,i=await r(Editor.Ipc.sendToPanel)("scene","scene:query-animation-list",e),n=[];for(let e=0;e<i.length;e++){let t=i[e],s=await r(Editor.Ipc.sendToPanel)("scene","scene:query-animation-clip",t);s?(s=await r(cc.AssetLibrary.loadJson)(s))._uuid=t:s=await r(cc.AssetLibrary.loadAsset)(t),n.push(s)}this.clips.every(e=>n.some(i=>i._uuid===e.id))&&this.clips.length===n.length||t.emit("change-clips",n)},updateMNodes(){let e=this.clip?this.clip.id:"",i=this.hierarchy[0],t=n.Clip.queryPaths(e)||[];this.mnodes=t.map(e=>({state:0,name:`/${i.name}/${e}`,path:e})).filter(e=>!this.hierarchy.some(i=>i.path===e.name))},scaleToChart(e,i){let t=this.$els.grid,n=Editor.Utils.smoothScale(this.scale,e);n=Editor.Math.clamp(n,t.hticks.minValueScale,t.hticks.maxValueScale),this.scale=n,t.xAxisScaleAt(i,n),t.repaint(),this.offset=t.xAxisOffset},moveToChart(e){let i=this.$els.grid;i.pan(-e,0),i.repaint(),this.offset=i.xAxisOffset},queryPinterStyle:(e,i,t)=>`transform: translateX(${e+i*t-1|0}px);`,_onClipChanged(e){this.clips.some(i=>i.name===e.target.value&&(this.clip=i,Editor.Ipc.sendToPanel("scene","scene:change-animation-current-clip",i.name),!0))},_onSampleChanged(e){let i=this.clip?this.clip.id:"";n.Clip.changeSample(i,e.target.value),t.emit("change-info")},_onSpeedChanged(e){let i=this.clip?this.clip.id:"";n.Clip.changeSpeed(i,e.target.value),t.emit("change-info")},_onModeChanged(){let e=this.clip?this.clip.id:"";n.Clip.changeMode(e,event.target.value),t.emit("change-info")},_onPointerMouseDown(e){let i=0,n=this.frame;Editor.UI.startDrag("ew-resize",e,(e,s,r,a,o)=>{i+=isNaN(s)?0:s;let h=Math.round(i/this.scale);t.emit("select-frame",Math.max(h+n,0))},(...e)=>{let s=Math.round(i/this.scale);t.emit("select-frame",Math.max(s+n,0))})},_onAddAnimationComponentClick(){this.hierarchy&&this.hierarchy.length&&Editor.Ipc.sendToPanel("scene","scene:add-component",this.hierarchy[0].id,"cc.Animation")},_onCreateClipClick(){this.hierarchy&&this.hierarchy.length&&Editor.Ipc.sendToMain("timeline:create-clip-file",this.hierarchy[0].id,e=>{setTimeout(()=>{this.updateClips()},200)},-1)}},exports.created=function(){let e=null;t.on("drag-zoom",(i,t)=>{this.ignore_pointer=!0,this.scaleToChart(-i,t),clearTimeout(e),e=setTimeout(()=>{this.ignore_pointer=!1},500)}),t.on("drag-move",i=>{this.ignore_pointer=!0,this.moveToChart(i),clearTimeout(e),e=setTimeout(()=>{this.ignore_pointer=!1},500)}),t.on("drag-key-end",e=>{let i=this.selected.map(e=>n.Clip.queryKey(e.id,e.path,e.component,e.property,e.frame)),s=this.selected.filter(t=>{let s=n.Clip.queryKey(t.id,t.path,t.component,t.property,t.frame+e);return!(!s||-1!==i.indexOf(s))});if(s&&s.length){let i=s.map(i=>{n.Clip.queryInfo(i.id);return`${i.path.replace(/\/[^\/]+/,"")} - ${i.component?`${i.component}.${i.property}`:i.property} - ${i.frame+e|0}`});if(i.length>5&&(i.length=5,i.push("...")),0===Editor.Dialog.messageBox({type:"question",buttons:[Editor.T("timeline.manager.move_key_button_cancel"),Editor.T("timeline.manager.move_key_button_confirm")],title:"",message:Editor.T("timeline.manager.move_key_title"),detail:`${i.join("\n")}\n${Editor.T("timeline.manager.move_key_title")}`,defaultId:0,cancelId:0,noLink:!0}))return!1}s.forEach(i=>{n.Clip.deleteKey(i.id,i.path,i.component,i.property,i.frame+e)});let r=this.selected.map(e=>{return n.Clip.deleteKey(e.id,e.path,e.component,e.property,e.frame)});this.selected.forEach((i,t)=>{let s=r[t];s&&n.Clip.addKey(i.id,i.path,i.component,i.property,i.frame+e,s.value)}),this.selected.forEach(i=>{i.frame+=e}),t.emit("change-info")}),t.on("ignore-pointer",e=>{this.ignore_pointer=e}),t.on("clip-data-update",()=>{this.updateMNodes(),t.emit("change-info")}),t.on("change-hierarchy",e=>{this.hierarchy=e}),t.on("change-node",e=>{this.node=e}),t.on("change-clips",e=>{for(;this.clips.length;)this.clips.pop();n.clear(),e.forEach(e=>{n.register(e),this.clips.push({id:e._uuid,name:e.name})}),this.clip&&this.clip.id&&!this.clips.every(e=>e._uuid!==this.clip.id)||(this.clip=this.clips&&this.clips.length?this.clips[0]:{}),s.update(()=>{this.updateState()})});t.on("change-frame",e=>{this.frame=e}),t.on("change-record",e=>{this.record=e});t.on("change-paused",async e=>{Editor.Ipc.sendToPanel("scene","scene:change-animation-state",{nodeId:this.node.id,clip:this.clip.name,state:e?"pause":"play"})}),t.on("change-info",()=>{let e=this.clip?this.clip.id:"",i=n.Clip.queryInfo(e);this.duration=i.duration,this.speed=i.speed,this.sample=i.sample,this.mode=i.wrapMode}),t.on("change-event",e=>{this.event=e}),t.on("change-eline",e=>{this.eline=e}),t.on("select-frame",e=>{Editor.Ipc.sendToPanel("scene","scene:animation-time-changed",{nodeId:this.node.id,clip:this.clip.name,time:e/this.sample}),t.emit("change-frame",e)}),require("../message/selection").activated(null,"node",Editor.Selection.curActivate("node")),t.on("create-new-clip",()=>{this._onCreateClipClick()})},exports.compiled=function(){this.initEngine(),this.initGrid(),Editor.Ipc.sendToPanel("scene","scene:is-ready",(e,i)=>{i&&this.init()},-1)};
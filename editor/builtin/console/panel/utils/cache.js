"use strict";let e=24,t=[],n=[];module.exports={add:function(n){t.push(function(t){let n=t.message.split("\n"),i=(n=n.filter(e=>!!e))[0],r=n.splice(1),s=/(^ *at (\S+ )*)(\(*[^\:]+\:.*\d+\:\d+\)*)/;return{message:i,infos:r=r.map(e=>{let t=e.match(s);return{info:(t=t||["",e,void 0,""])[1]||"",path:t[3]||""}}),type:t.type,num:1,fold:!0,height:e,bright:!1}}(n))},remove:function(e){let n=t.indexOf(e);-1!==n&&t.splice(n,1)},clear:function(e,n){if(n)try{e=new RegExp(e)}catch(e){return}for(let i=t.length-1;i>=0;i--){let r=t[i];n?e.exec(r.message)&&t.splice(i,1):-1!==r.message.indexOf(e)&&t.splice(i,1)}},query:function(e){let i=e.filter;if(e.regular)try{i=new RegExp(i)}catch(e){i=/.*/}let r=t.filter(t=>!!t.message&&(!e.type||"all"===e.type||t.type===e.type)&&(e.regular?i.test(t.message):-1!==t.message.indexOf(i))),s=null,l=0;return(r=r.filter(t=>e.collapse&&s&&s.message===t.message&&s.infos.join(" ")===t.infos.join(" ")&&s.type===t.type?(s.num+=1,!1):((s=t).num=1,!0))).forEach((e,t)=>{l+=e.height,e.bright=t%2==1}),e.start="start"in e?e.start:0,e.end="end"in e?e.end:r.length,n=r,{height:l,total:r.length,list:r.filter((t,n)=>n>=e.start&&n<=e.end)}},queryIndex:function(e){let t=0;for(let i=0;i<n.length;i++)if((t+=n[i].height)>e.height)return i;return 0},queryOffset:function(e){let t=0;for(let i=0;i<e;i++){let e=n[i];if(!e)break;t+=e.height}return t},changeHeight:function(n){e=parseInt(n),t.forEach(t=>{t.fold=!0,t.height=e})},messages:t};
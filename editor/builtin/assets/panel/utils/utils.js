"use strict";const{promisify:e}=require("util"),t=require("fire-fs");require("fire-path"),require("node-uuid");let r=async function(e){return await new Promise(r=>{t.exists(e,r)})};module.exports={isSubDir:function(e,t){return 0===e.indexOf(t)&&e!==t},copy:async function(i,a){if(!await r(i))return new Error(`File does not exist - ${i}`),void 0;for(;await r(a);)a=a.replace(/( - (\d+))?(\.[^\.]+)?$/,(e,t,r,i)=>{let a=r?parseInt(r):0,n=++a+"";for(;n.length<3;)n="0"+n;return` - ${n}${i||""}`});return await e(t.copy)(i,a),a},isDir:async function(r){return await e(t.isDir)(r)},uuid2path:async function(t){let r=await e(Editor.assetdb.queryUrlByUuid)(t);if(!r)return null;let i=Editor.url(r);return decodeURI(i)},exists:r,copyMeta:async function(r,i){r+=".meta",i+=".meta";let a=await e(t.readFile)(r,"utf-8"),n=await e(t.readFile)(i,"utf-8");if(!a||!n)return;let u=JSON.parse(a),s=JSON.parse(n),o=function(e,t){Object.keys(e).forEach(r=>{let i=e[r],a=t[r];"object"==typeof i?(a||(a=Array.isArray(i)?t[r]=[]:t[r]={}),o(i,a)):t[r]=i})};o(u,s)},isReadOnly:async function(t){let r=await e(Editor.assetdb.queryInfoByUuid)(t);if(!r)return!0;let i=await e(Editor.assetdb.queryUrlByUuid)(t);if(!i)return!0;let a=await e(Editor.assetdb.queryAssets)(i,r.type);return!(!a||!a[0]||!a[0].readonly)}};
"use strict";const e=require("fire-fs"),s=require("fire-path");let r=new(require("events").EventEmitter),t=function(){return new Promise((e,s)=>{Editor.Ipc.sendToMain("app:query-last-create-path",(s,r)=>{e(s||r)})})};exports.getUserHome=async function(){let r=await t();if(r&&e.existsSync(r))return r;if(!Editor.isWin32)return process.env.HOME||process.env.HOMEPATH||process.env.USERPROFILE;if(!process.env.USERPROFILE)return process.cwd();let n=s.join(process.env.USERPROFILE,"Documents");return e.existsSync(n)?n:(n=s.join(process.env.USERPROFILE,"My Documents"),e.existsSync(n)?n:process.cwd())},exports.event=r;
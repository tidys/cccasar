var t=["constructor","null","onLoad","start","onEnable","onDisable","onDestroy","update","lateUpdate","onFocusInEditor","onLostFocusInEditor","resetInEditor","onRestore","isRunning","realDestroyInEditor","getComponent","getComponentInChildren","getComponents","getComponentsInChildren"];module.exports=function(n){if(!n)return{};var e={};return n._components.forEach(function(n){for(var o=[],r=function(t){var n,e;"object"==typeof t?(n=Object.getOwnPropertyNames(t),e=t.constructor):(n=[],e=t);for(var o=[e].concat(cc.Class.getInheritanceChain(e)),r=0;r<o.length;r++)for(var s=Object.getOwnPropertyNames(o[r].prototype),c=0;c<s.length;c++){var a=s[c];n.includes(a)||n.push(a)}return n}(n.constructor),s=0;s<r.length;++s){var c=r[s];c&&-1===t.indexOf(c)&&(cc.js.getPropertyDescriptor(n,c).get||"function"==typeof n[c]&&"_"!==c[0]&&o.push(c))}e[cc.js.getClassName(n)]=o}),e};
function t(){this.contents=cc.js.createMap(!0),this.name=""}t.prototype.add=function(t,e){this.contents[t]&&Editor.warn("Key duplicated "+t),this.contents[t]=e.content},t.prototype.pack=function(t){var e=this.contents,n=Object.keys(e);n.sort();var c=n.map(function(t){return e[t]}).join("|"),s={type:cc.js._getClassId(cc.Texture2D),data:c};return{indices:n,data:JSON.stringify(s,null,t?0:2)}},Editor.TextureAssetPacker=module.exports=t;
var e = require("fire-fs"),
    r = require("fire-url"),
    t = require("fire-path"),
    i = require("async"),
    s = require("detective");
let u = Editor.remote.importPath;
module.exports = {
    INTERNAL: "db://internal",
    isScript: e => "javascript" === e || "coffeescript" === e || "typescript" === e,
    sortAssetTree(e, r) {
        if (!e.children) return r();
        e.children.sort((e, r) => e.name + e.type > r.name + r.type), i.each(e.children, this.sortAssetTree.bind(this), r)
    },
    queryDependScriptByUuid(e, r) {
        let t = [];
        Editor.assetdb.queryAssets(null, null, (i, s) => {
            this._queryDependScriptByUuid(e, t, s, () => {
                r(null, Object.keys(t))
            })
        })
    },
    _queryDependScriptByUuid(r, n, d, l) {
        if (n[r]) return l();
        n[r] = !0;
        let p = r.slice(0, 2) + t.sep + r + ".js",
            c = t.join(u, p),
            a = e.readFileSync(c, "utf-8"),
            y = s(a);
        if (0 === y.length) return l();
        i.each(y, (e, r) => {
            for (let i = 0; i < d.length; ++i) {
                let s = d[i];
                if (this.isScript(s.type)) {
                    if (e === t.basenameNoExt(s.path)) return this._queryDependScriptByUuid(s.uuid, n, d, r), void 0
                }
            }
            r()
        }, l)
    },
    queryDependsOfRawAssetByUrl(e, t) {
        let i = r.dirname(e),
            s = r.join(i, "*");
        Editor.assetdb.queryAssets(s, "texture", (e, r) => t(null, r))
    }
};
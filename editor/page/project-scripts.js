const e = require("fire-path"),
    t = require("globby"),
    r = require("async"),
    i = require("fire-url"),
    o = require("lodash"),
    n = Editor.remote.QuickCompiler.getTempPath();
let l = Object.create(null),
    a = [],
    s = require("module"),
    d = 0;

function u(t) {
    let r = e.basenameNoExt(t);
    delete require.cache[t], delete l[r]
}

function c(e) {
    try {
        require(e)
    } catch (t) {
        Editor.failed(`load script [${e}] failed : ${t.stack}`)
    }
}
cc.require = function (e, t) {
    let r;
    t = t || require, d++;
    try {
        r = t(e)
    } catch (t) {
        Editor.failed(`load script [${e}] failed : ${t.stack}`)
    }
    return d--, r
}, s._resolveFilenameVendor = s._resolveFilename, s._resolveFilename = function (t, r, i) {
    if (d > 0) {
        let i = e.basename(t);
        i.endsWith(".js") && (i = i.slice(0, -3));
        let o = l[i];
        if (! function (e) {
                return -1 !== e.replace(/\\/g, "/").indexOf("/node_modules/")
            }(r.filename) && o) return o.path
    }
    return s._resolveFilenameVendor(t, r, i)
}, module.exports = {
    load: function (e) {
        r.series([this.loadPlugins.bind(this), this.loadCommon.bind(this)], e)
    },
    loadScript: function (e, t) {
        var r = document.createElement("script");
        r.onload = function () {
            r.remove(), t()
        }, r.onerror = function () {
            r.remove(), Editor.error("Failed to load %s", e), t(new Error("Failed to load " + e))
        }, r.setAttribute("type", "text/javascript"), r.setAttribute("charset", "utf-8"), r.setAttribute("src", i.addRandomQuery(e)), document.head.appendChild(r)
    },
    loadPlugins: function (t) {
        console.time("query plugin scripts"), Editor.Ipc.sendToMain("app:query-plugin-scripts", "editor", (i, o) => {
            if (console.timeEnd("query plugin scripts"), i) return t(i);
            a = o.map(t => e.stripSep(t)), r.eachSeries(o, (e, t) => {
                this.loadScript("disable-commonjs://" + e, t)
            }, t)
        }, 3e4)
    },
    loadCommon: function (r) {
        for (let e in l) {
            u(l[e].path)
        }
        l = {};
        let i = [e.join(n, "/**/*.js"), "!" + e.join(n, "__node_modules/**")];
        t(i, (t, i) => {
            (i = o(i).map(t => e.stripSep(t)).filter(e => -1 === a.indexOf(e)).sortBy().value()).forEach(t => {
                (function (t, r) {
                    r = r || e.basenameNoExt(t);
                    let i = l[r];
                    return i || (i = l[r] = {
                        name: r,
                        path: t,
                        children: []
                    }), i
                })(t)
            }), d++;
            for (let e = 0; e < i.length; e++) c(i[e]);
            d--, r && r()
        })
    }
};
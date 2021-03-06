"use strict";
const t = require("async"),
    e = require("del"),
    i = require("fire-path"),
    s = require("fire-url"),
    u = require("fire-fs"),
    h = require("./meta");
module.exports = {
    _MOUNT_PREFIX: "mount-",
    _dbpath(t) {
        let e, i = [].slice.call(arguments, 1),
            u = s.join.apply(s, i);
        for (e = 0; e < u.length && "/" === u[e]; ++e);
        return u = u.substr(e), s.format({
            protocol: t,
            host: u,
            slashes: !0
        })
    },
    _fspath(t) {
        if (!t) return null;
        if (0 !== t.indexOf("db://")) return null;
        let e = t.substring(5),
            s = e.split("/"),
            u = "",
            h = null;
        for (let t = 0; t < s.length; ++t) {
            u = i.join(u, s[t]);
            let e = this._mounts[u];
            if (!e) break;
            h = e
        }
        return h ? (e = i.relative(h.mountPath, e), i.resolve(i.join(h.path, e))) : null
    },
    _url(t) {
        if (!t) return null;
        for (let e in this._mounts) {
            let u = this._mounts[e].path;
            if (i.contains(u, t)) return s.normalize(`db://${e}/${i.relative(u,t)}`)
        }
        return s.normalize("file://" + t)
    },
    _allPaths() {
        return this._pathsDirty && (this._paths = Object.keys(this._path2uuid), this._paths.sort(), this._pathsDirty = !1), this._paths
    },
    _metaToAssetPath(t) {
        let e = i.basename(t, ".meta");
        return i.join(i.dirname(t), e)
    },
    _isMountPath(t) {
        let e = i.resolve(t);
        for (let t in this._mounts)
            if (this._mounts[t].path === e) return !0;
        return !1
    },
    _isAssetPath(t) {
        if (!t) return !1;
        for (let e in this._mounts) {
            let s = this._mounts[e].path;
            if (i.contains(s, t)) return !0
        }
        return !1
    },
    _mountIDByMountPath(t) {
        return this._mounts[t] ? this._MOUNT_PREFIX + t : ""
    },
    _mountIDByPath(t) {
        for (let e in this._mounts)
            if (this._mounts[e].path === t) return this._MOUNT_PREFIX + e;
        return ""
    },
    _mountPaths() {
        let t = [];
        for (let e in this._mounts) t.push(this._mounts[e].path);
        return t
    },
    _uuidToImportPathNoExt(t) {
        return i.join(this._importPath, t.substring(0, 2), t)
    },
    _fspathToImportPathNoExt(t) {
        let e = this.fspathToUuid(t);
        return e ? this._uuidToImportPathNoExt(e) : null
    },
    _getDestPathByMeta(t) {
        if (t.useRawfile()) return null;
        let e = t.dests();
        if (!e.length) return null;
        let i = e[0];
        return u.existsSync(i) ? i : null
    },
    _rmMetas(s) {
        let u = [];
        for (let t in this._mounts) u.push(this._mounts[t].path);
        t.each(u, (t, s) => {
            e(i.join(t, "**/*.meta"), {
                force: !0
            }, s)
        }, s)
    },
    _dbAdd(t, e) {
        this._uuid2path[e] && this.failed(`uuid collision, the uuid for ${t} is already in used by ${this._uuid2path[e]}. Assigning a new uuid.`), this._path2uuid[t] && this.failed(`path collision, the path for ${e} is already in used by ${this._path2uuid[t]}. Assigning a new path.`), this._path2uuid[t] = e, this._uuid2path[e] = t, this._pathsDirty = !0
    },
    _dbMove(t, e) {
        let i = this._path2uuid[t];
        delete this._path2uuid[t], this._path2uuid[e] = i, this._uuid2path[i] = e, this._pathsDirty = !0
    },
    _dbDelete(t) {
        let e = this._path2uuid[t];
        delete this._path2uuid[t], delete this._uuid2path[e], delete this._uuid2meta[e], this._pathsDirty = !0
    },
    _dbReset() {
        this._mounts = {}, this._uuid2mtime = {}, this._uuid2path = {}, this._path2uuid = {}
    },
    _handleRefreshResults(t) {
        if (!this._eventCallback) return;
        let e = [],
            i = [];
        t.forEach(t => {
            t.error || ("uuid-change" === t.command ? this._dispatchEvent("asset-db:asset-uuid-changed", {
                type: t.type,
                uuid: t.uuid,
                oldUuid: t.oldUuid
            }) : "change" === t.command ? this._dispatchEvent("asset-db:asset-changed", {
                type: t.type,
                uuid: t.uuid
            }) : "create" === t.command ? i.push({
                path: t.path,
                url: t.url,
                uuid: t.uuid,
                parentUuid: t.parentUuid,
                type: t.type,
                hidden: t.hidden,
                readonly: t.readonly,
                name: t.name
            }) : "delete" === t.command && e.push({
                path: t.path,
                url: t.url,
                uuid: t.uuid,
                type: t.type
            }))
        }), e.length > 0 && this._dispatchEvent("asset-db:assets-deleted", e), i.length > 0 && this._dispatchEvent("asset-db:assets-created", i), this._handleErrorResults(t)
    },
    _handleErrorResults(t) {
        this._eventCallback && t.forEach(t => {
            t.error && "ESCRIPTIMPORT" === t.error.code && this._dispatchEvent("asset-db:script-import-failed", t)
        })
    },
    _handleMetaBackupResults(t) {
        this._eventCallback && t.length > 0 && this._dispatchEvent("asset-db:meta-backup", t)
    },
    _ensureDirSync(t) {
        if (!i.isAbsolute(t)) return [];
        let e = [];
        for (u.ensureDirSync(t); !this._isMountPath(t);) {
            if (u.isDirSync(t)) {
                let i = t + ".meta";
                if (!u.existsSync(i)) {
                    let s = h.create(this, i);
                    h.save(this, i, s), this._dbAdd(t, s.uuid), e.push(s)
                }
            }
            t = i.dirname(t)
        }
        return e
    },
    _dispatchEvent(t, e) {
        this._eventCallback && this._eventCallback(t, e)
    }
};
"use strict";
const t = require(Editor.url("app://editor/share/build-utils"));
module.exports = {
    state: "idle",
    progress: 0,
    task: "",
    options: {},
    load() {},
    unload() {},
    messages: {
        open() {
            Editor.Panel.open("builder")
        },
        "start-task"(s, i, e) {
            this.task = i, this.options = e, "compile" === i ? Editor.Ipc.sendToMain("app:compile-project", e) : "build" === i && (Editor.Ipc.sendToAll("editor:build-start", t.getCommonOptions(this.options)), Editor.Ipc.sendToMain("app:build-project", e))
        },
        "state-changed"(s, i, e) {
            this.state = i, this.progress = e, "error" !== i && "finish" !== i || ("build" === this.task && "finish" === i && Editor.Ipc.sendToAll("editor:build-finished", t.getCommonOptions(this.options)), this.task = "", this.options = {}), Editor.Ipc.sendToWins("builder:state-changed", this.state, this.progress)
        },
        "query-current-state"(t) {
            t.reply && t.reply(null, {
                task: this.task,
                state: this.state,
                progress: this.progress
            })
        },
        "query-build-options"(s) {
            if (!s.reply) return;
            let i = t.getCommonOptions();
            s.reply(null, i)
        }
    }
};
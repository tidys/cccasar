"use strict";
const e = require("electron"),
    r = e.BrowserWindow,
    a = Editor.require("app://editor/core/vscode-workflow");
Editor.Menu.register("create-node", () => [{
    label: Editor.T("MAIN_MENU.node.create_empty"),
    message: "scene:create-node-by-classid",
    panel: "scene",
    params: ["New Node", ""]
}, {
    label: Editor.T("MAIN_MENU.node.renderers"),
    submenu: [{
        label: Editor.T("MAIN_MENU.node.sprite"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New Sprite", Editor.assetdb.urlToUuid("db://internal/prefab/sprite.prefab")]
    }, {
        label: Editor.T("MAIN_MENU.node.sprite_splash"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New Sprite(Splash)", Editor.assetdb.urlToUuid("db://internal/prefab/sprite_splash.prefab")]
    }, {
        label: Editor.T("MAIN_MENU.node.label"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New Label", Editor.assetdb.urlToUuid("db://internal/prefab/label.prefab")]
    }, {
        label: Editor.T("MAIN_MENU.node.richtext"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New RichText", Editor.assetdb.urlToUuid("db://internal/prefab/richtext.prefab")]
    }, {
        label: Editor.T("MAIN_MENU.node.particle"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New Particle", Editor.assetdb.urlToUuid("db://internal/prefab/particlesystem.prefab")]
    }, {
        label: Editor.T("MAIN_MENU.node.tiledmap"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New TiledMap", Editor.assetdb.urlToUuid("db://internal/prefab/tiledmap.prefab")]
    }, {
        label: Editor.T("MAIN_MENU.node.tiledtile"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New TiledTile", Editor.assetdb.urlToUuid("db://internal/prefab/tiledtile.prefab")]
    }]
}, {
    label: Editor.T("MAIN_MENU.node.ui"),
    submenu: [{
        label: Editor.T("MAIN_MENU.node.layout"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New Layout", Editor.assetdb.urlToUuid("db://internal/prefab/layout.prefab")]
    }, {
        label: Editor.T("MAIN_MENU.node.button"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New Button", Editor.assetdb.urlToUuid("db://internal/prefab/button.prefab")]
    }, {
        label: Editor.T("MAIN_MENU.node.canvas"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New Canvas", Editor.assetdb.urlToUuid("db://internal/prefab/canvas.prefab")]
    }, {
        label: Editor.T("MAIN_MENU.node.scrollview"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New ScrollView", Editor.assetdb.urlToUuid("db://internal/prefab/scrollview.prefab")]
    }, {
        label: Editor.T("MAIN_MENU.node.slider"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New Slider", Editor.assetdb.urlToUuid("db://internal/prefab/slider.prefab")]
    }, {
        label: Editor.T("MAIN_MENU.node.pageview"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New PageView", Editor.assetdb.urlToUuid("db://internal/prefab/pageview.prefab")]
    }, {
        label: Editor.T("MAIN_MENU.node.progressbar"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New ProgressBar", Editor.assetdb.urlToUuid("db://internal/prefab/progressBar.prefab")]
    }, {
        label: Editor.T("MAIN_MENU.node.toggle"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New Toggle", Editor.assetdb.urlToUuid("db://internal/prefab/toggle.prefab")]
    }, {
        label: Editor.T("MAIN_MENU.node.toggleContainer"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New ToggleContainer", Editor.assetdb.urlToUuid("db://internal/prefab/toggleContainer.prefab")]
    }, {
        label: Editor.T("MAIN_MENU.node.toggleGroup"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New ToggleGroup", Editor.assetdb.urlToUuid("db://internal/prefab/toggleGroup.prefab")]
    }, {
        label: Editor.T("MAIN_MENU.node.editbox"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New EditBox", Editor.assetdb.urlToUuid("db://internal/prefab/editbox.prefab")]
    }, {
        label: Editor.T("MAIN_MENU.node.videoplayer"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New VideoPlayer", Editor.assetdb.urlToUuid("db://internal/prefab/videoplayer.prefab")]
    }, {
        label: Editor.T("MAIN_MENU.node.webview"),
        panel: "scene",
        message: "scene:create-node-by-prefab",
        params: ["New WebView", Editor.assetdb.urlToUuid("db://internal/prefab/webview.prefab")]
    }]
}]), module.exports = function () {
    let o = [{
            label: Editor.T("MAIN_MENU.edit.title"),
            submenu: [{
                label: Editor.T("MAIN_MENU.edit.undo"),
                accelerator: "CmdOrCtrl+Z",
                click() {
                    Editor.Ipc.sendToPanel("scene", "scene:undo")
                }
            }, {
                label: Editor.T("MAIN_MENU.edit.redo"),
                accelerator: "Shift+CmdOrCtrl+Z",
                click() {
                    Editor.Ipc.sendToPanel("scene", "scene:redo")
                }
            }, {
                type: "separator"
            }, {
                label: Editor.T("MAIN_MENU.edit.copy"),
                accelerator: "CmdOrCtrl+C",
                role: "copy"
            }, {
                label: Editor.T("MAIN_MENU.edit.paste"),
                accelerator: "CmdOrCtrl+V",
                role: "paste"
            }, {
                label: Editor.T("MAIN_MENU.edit.selectall"),
                accelerator: "CmdOrCtrl+A",
                role: "selectall"
            }]
        }, {
            label: Editor.T("MAIN_MENU.node.title"),
            id: "node",
            submenu: [{
                label: Editor.T("MAIN_MENU.node.link_prefab"),
                panel: "scene",
                message: "scene:link-prefab"
            }, {
                label: Editor.T("MAIN_MENU.node.break_prefab_instance"),
                panel: "scene",
                message: "scene:break-prefab-instance"
            }]
        }, {
            label: Editor.T("MAIN_MENU.component.title"),
            id: "component",
            submenu: []
        }, {
            label: Editor.T("MAIN_MENU.project.title"),
            id: "project",
            submenu: [{
                label: Editor.T("MAIN_MENU.project.play"),
                accelerator: "CmdOrCtrl+P",
                click() {
                    Editor.Ipc.sendToWins("scene:play-on-device")
                }
            }, {
                label: Editor.T("MAIN_MENU.project.reload"),
                accelerator: "CmdOrCtrl+Shift+P",
                click() {
                    Editor.Ipc.sendToWins("scene:reload-on-device")
                }
            }]
        }, {
            label: Editor.T("MAIN_MENU.panel.title"),
            id: "panel",
            submenu: []
        }, {
            label: Editor.T("MAIN_MENU.layout.title"),
            id: "layout",
            submenu: [{
                label: Editor.T("MAIN_MENU.layout.default"),
                click() {
                    Editor.Window.main.resetLayout(Editor.Window.defaultLayout)
                }
            }, {
                label: Editor.T("MAIN_MENU.layout.portrait"),
                click() {
                    Editor.Window.main.resetLayout("unpack://static/layout/portrait.json")
                }
            }, {
                label: Editor.T("MAIN_MENU.layout.classical"),
                click() {
                    Editor.Window.main.resetLayout("unpack://static/layout/classical.json")
                }
            }]
        }, {
            label: Editor.T("MAIN_MENU.package.title"),
            id: "package",
            submenu: [{
                label: Editor.T("MAIN_MENU.package.create.title"),
                submenu: [{
                    label: Editor.T("MAIN_MENU.package.create.global"),
                    click() {
                        Editor.Ipc.sendToMain("editor:create-package", "global")
                    }
                }, {
                    label: Editor.T("MAIN_MENU.package.create.project"),
                    click() {
                        Editor.Ipc.sendToMain("editor:create-package", "project")
                    }
                }]
            }]
        }, {
            label: Editor.T("MAIN_MENU.developer.title"),
            id: "developer",
            submenu: [{
                label: Editor.T("MAIN_MENU.developer.vscode.title"),
                submenu: [{
                    label: Editor.T("MAIN_MENU.developer.vscode.get_tsd"),
                    click() {
                        a.updateAPIData()
                    }
                }, {
                    label: Editor.T("MAIN_MENU.developer.vscode.copy_extension"),
                    click() {
                        a.updateDebugger()
                    }
                }, {
                    label: Editor.T("MAIN_MENU.developer.vscode.copy_tsconfig"),
                    click() {
                        a.updateTypeScriptConf()
                    }
                }, {
                    label: Editor.T("MAIN_MENU.developer.vscode.copy_debug_setting"),
                    click() {
                        a.updateDebugSetting()
                    }
                }, {
                    label: Editor.T("MAIN_MENU.developer.vscode.copy_compile_task"),
                    click() {
                        a.updateCompileTask()
                    }
                }]
            }, {
                label: Editor.T("MAIN_MENU.developer.command_palette"),
                enabled: !1,
                accelerator: "CmdOrCtrl+:",
                click() {
                    Editor.Window.main.focus(), Editor.Ipc.sendToMainWin("cmdp:show")
                }
            }, {
                type: "separator"
            }, {
                label: Editor.T("MAIN_MENU.developer.reload"),
                accelerator: "CmdOrCtrl+R",
                click() {
                    Editor.stashedScene = null, r.getFocusedWindow().reload()
                }
            }, {
                label: Editor.T("MAIN_MENU.developer.compile"),
                accelerator: "F7",
                click() {
                    Editor.QuickCompiler.compileAndReload(!0)
                }
            }, {
                label: Editor.T("MAIN_MENU.developer.compile_engine"),
                accelerator: "CmdOrCtrl+F7",
                click() {
                    Editor.Ipc.sendToMain("app:rebuild-editor-engine", e => {
                        e ? Editor.error("rebuild engine failed: " + e) : Editor.log("Compile engine finished")
                    }, -1)
                }
            }, {
                type: "separator",
                dev: !0
            }, {
                label: Editor.T("MAIN_MENU.developer.inspect"),
                accelerator: "CmdOrCtrl+Shift+C",
                click() {
                    let e = r.getFocusedWindow(),
                        a = Editor.Window.find(e);
                    a && a.send("editor:window-inspect")
                }
            }, {
                label: Editor.T("MAIN_MENU.developer.devtools"),
                accelerator: "CmdOrCtrl+Alt+I",
                click() {
                    let e = r.getFocusedWindow(),
                        a = Editor.Window.find(e);
                    if (a) return a.openDevTools(), void 0;
                    e.openDevTools(), e.devToolsWebContents && e.devToolsWebContents.focus()
                }
            }, {
                label: Editor.T("MAIN_MENU.developer.toggle_node_inspector"),
                type: "checkbox",
                checked: !1,
                dev: !0,
                click() {
                    Editor.Debugger.toggleNodeInspector()
                }
            }, {
                type: "separator",
                dev: !0
            }, {
                label: "Generate UUID",
                dev: !0,
                click() {
                    let e = require("node-uuid");
                    Editor.log(e.v4())
                }
            }, {
                label: "Remove All Meta Files",
                dev: !0,
                click() {
                    Editor.assetdb._rmMetas(() => {
                        Editor.success("Meta files removed")
                    })
                }
            }, {
                type: "separator",
                dev: !0
            }, {
                label: "Human Tests",
                dev: !0,
                submenu: [{
                    label: "Reload Scene",
                    accelerator: "Alt+F7",
                    click() {
                        var e = require("./compiler");
                        Editor.Ipc.sendToWins("scene:soft-reload", "failed" !== e.state)
                    }
                }, {
                    label: "Throw an Uncaught Exception",
                    click() {
                        throw new Error("editor-framework Unknown Error")
                    }
                }, {
                    label: "send2panel 'foo:bar' foobar.panel",
                    click() {
                        Editor.Ipc.sendToPanel("foobar.panel", "foo:bar")
                    }
                }, {
                    label: "Enable Build Worker Devtools",
                    click() {
                        Editor.Builder.debugWorker = !Editor.Builder.debugWorker
                    }
                }, {
                    label: "Enable Compile Worker Devtools",
                    click() {
                        Editor.Compiler.debugWorker = !Editor.Compiler.debugWorker
                    }
                }]
            }, {
                type: "separator",
                dev: !0
            }, {
                label: "UI Preview",
                dev: !0,
                submenu: []
            }, {
                type: "separator"
            }]
        }],
        l = function () {
            let e = new Editor.Window("about", {
                    title: Editor.T("MAIN_MENU.about", {
                        product: Editor.T("SHARED.product_name")
                    }),
                    width: 400,
                    height: 200,
                    alwaysOnTop: !0,
                    show: !1,
                    resizable: !1
                }),
                r = Editor.Window.main,
                a = r.nativeWin.getPosition(),
                o = r.nativeWin.getSize(),
                l = a[0] + o[0] / 2 - 200,
                t = a[1] + o[1] / 2 - 90;
            e.load("app://editor/page/app-about.html"), e.nativeWin.setPosition(Math.floor(l), Math.floor(t)), e.nativeWin.setMenuBarVisibility(!1), e.nativeWin.setTitle(Editor.T("MAIN_MENU.about", {
                product: Editor.T("SHARED.product_name")
            })), e.show()
        },
        t = {
            label: Editor.T("SHARED.product_name"),
            position: "before=help",
            submenu: [{
                label: Editor.T("MAIN_MENU.about", {
                    product: Editor.T("SHARED.product_name")
                }),
                id: 0,
                click: l
            }, {
                type: "separator"
            }, {
                label: Editor.T("MAIN_MENU.panel.preferences"),
                click() {
                    Editor.Ipc.sendToMain("preferences:open")
                }
            }, {
                type: "separator"
            }, {
                label: Editor.T("MAIN_MENU.window.hide", {
                    product: Editor.T("SHARED.product_name")
                }),
                id: 2,
                accelerator: "CmdOrCtrl+H",
                visible: Editor.isDarwin,
                role: "hide"
            }, {
                label: Editor.T("MAIN_MENU.window.hide_others"),
                accelerator: "CmdOrCtrl+Shift+H",
                visible: Editor.isDarwin,
                role: "hideothers"
            }, {
                label: Editor.T("MAIN_MENU.window.show_all"),
                role: "unhide",
                visible: Editor.isDarwin
            }, {
                label: Editor.T("MAIN_MENU.window.minimize"),
                accelerator: "CmdOrCtrl+M",
                role: "minimize"
            }, {
                label: Editor.T("MAIN_MENU.window.bring_all_front"),
                visible: Editor.isDarwin,
                role: "front"
            }, {
                type: "separator"
            }, {
                label: Editor.T("MAIN_MENU.window.close"),
                accelerator: "CmdOrCtrl+W",
                role: "close"
            }, {
                label: Editor.T("MAIN_MENU.window.quit"),
                accelerator: "CmdOrCtrl+Q",
                role: "close"
            }]
        },
        i = {
            label: Editor.T("MAIN_MENU.file.title"),
            submenu: [{
                label: Editor.T("MAIN_MENU.file.open_project"),
                click() {
                    Editor.App.runDashboard()
                }
            }, {
                type: "separator"
            }, {
                label: Editor.T("MAIN_MENU.file.new_scene"),
                accelerator: "CmdOrCtrl+N",
                click() {
                    Editor.Ipc.sendToPanel("scene", "scene:new-scene")
                }
            }, {
                label: Editor.T("MAIN_MENU.file.save_scene"),
                accelerator: "CmdOrCtrl+S",
                click() {
                    Editor.Ipc.sendToPanel("scene", "scene:stash-and-save")
                }
            }, {
                type: "separator"
            }, {
                label: Editor.T("MAIN_MENU.file.import_asset"),
                click() {
                    Editor.Ipc.sendToMain("package-asset:import")
                }
            }, {
                label: Editor.T("MAIN_MENU.file.export_asset"),
                click() {
                    Editor.Ipc.sendToMain("package-asset:export")
                }
            }]
        },
        d = {
            label: Editor.T("SHARED.help"),
            id: "help",
            role: "help",
            submenu: [{
                label: Editor.T("MAIN_MENU.help.docs"),
                click() {
                    require("../../share/manual").openManual("home")
                }
            }, {
                label: Editor.T("MAIN_MENU.help.api"),
                click() {
                    require("../../share/manual").openAPI("home")
                }
            }, {
                label: Editor.T("MAIN_MENU.help.forum"),
                click() {
                    let r = "zh" === Editor.lang ? "http://forum.cocos.com/c/Creator" : "http://discuss.cocos2d-x.org/c/creator";
                    e.shell.openExternal(r), e.shell.beep()
                }
            }, {
                type: "separator"
            }, {
                label: Editor.T("MAIN_MENU.help.subscribe"),
                click() {
                    e.shell.openExternal("http://eepurl.com/bh5w3z"), e.shell.beep()
                }
            }, {
                type: "separator"
            }, {
                label: Editor.T("MAIN_MENU.account.none"),
                enabled: !1
            }]
        };
    if (o.unshift(i), o.push(d), Editor.isDarwin) o.unshift(t);
    else {
        let e = [{
            type: "separator"
        }, {
            label: Editor.T("MAIN_MENU.panel.preferences"),
            click() {
                Editor.Ipc.sendToMain("preferences:open")
            }
        }, {
            type: "separator"
        }, {
            label: Editor.T("MAIN_MENU.window.quit"),
            accelerator: "CmdOrCtrl+Q",
            role: "close"
        }];
        i.submenu = i.submenu.concat(e);
        let r = [{
            label: Editor.T("MAIN_MENU.about", {
                product: Editor.T("SHARED.product_name")
            }),
            id: 0,
            click: l
        }, {
            type: "separator"
        }];
        d.submenu.splice(7, 0, ...r)
    }
    if ("zh" === Editor.lang) {
        let r = [{
            label: "AnySDK",
            click() {
                let r = `http://www.cocos.com/anysdk?from=creator&version=${Editor.versions.CocosCreator}`;
                e.shell.openExternal(r), e.shell.beep()
            }
        }, {
            type: "separator"
        }];
        d.submenu.splice(7, 0, ...r)
    }
    return o
};
! function(t, a) {
    "use strict";
    var l = {
            "font-styles": function(t, a) {
                var l = a && a.size ? " btn-" + a.size : "";
                return "<li class='dropdown'><a class='btn btn-default dropdown-toggle" + l + "' data-toggle='dropdown' href='#'><i class='glyphicon glyphicon-font'></i>&nbsp;<span class='current-font'>" + t.font_styles.normal + "</span>&nbsp;<b class='caret'></b></a><ul class='dropdown-menu'><li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='div' tabindex='-1'>" + t.font_styles.normal + "</a></li><li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h1' tabindex='-1'>" + t.font_styles.h1 + "</a></li><li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h2' tabindex='-1'>" + t.font_styles.h2 + "</a></li><li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h3' tabindex='-1'>" + t.font_styles.h3 + "</a></li></ul></li>"
            },
            emphasis: function(t, a) {
                var l = a && a.size ? " btn-" + a.size : "";
                return "<li><div class='btn-group'><a class='btn btn-default" + l + "' data-wysihtml5-command='bold' title='CTRL+B' tabindex='-1'>" + t.emphasis.bold + "</a><a class='btn btn-default" + l + "' data-wysihtml5-command='italic' title='CTRL+I' tabindex='-1'>" + t.emphasis.italic + "</a><a class='btn btn-default" + l + "' data-wysihtml5-command='underline' title='CTRL+U' tabindex='-1'>" + t.emphasis.underline + "</a></div></li>"
            },
            lists: function(t, a) {
                var l = a && a.size ? " btn-" + a.size : "";
                return "<li><div class='btn-group'><a class='btn btn-default" + l + "' data-wysihtml5-command='insertUnorderedList' title='" + t.lists.unordered + "' tabindex='-1'><i class='glyphicon glyphicon-list'></i></a><a class='btn btn-default" + l + "' data-wysihtml5-command='insertOrderedList' title='" + t.lists.ordered + "' tabindex='-1'><i class='glyphicon glyphicon-th-list'></i></a><a class='btn btn-default" + l + "' data-wysihtml5-command='Outdent' title='" + t.lists.outdent + "' tabindex='-1'><i class='glyphicon glyphicon-indent-right'></i></a><a class='btn btn-default" + l + "' data-wysihtml5-command='Indent' title='" + t.lists.indent + "' tabindex='-1'><i class='glyphicon glyphicon-indent-left'></i></a></div></li>"
            },
            link: function(t, a) {
                var l = a && a.size ? " btn-" + a.size : "";
                return "<li><div class='bootstrap-wysihtml5-insert-link-modal modal hide fade'><div class='modal-header'><a class='close' data-dismiss='modal'>&times;</a><h3>" + t.link.insert + "</h3></div><div class='modal-body'><input value='http://' class='bootstrap-wysihtml5-insert-link-url input-xlarge'></div><div class='modal-footer'><a href='#' class='btn btn-default' data-dismiss='modal'>" + t.link.cancel + "</a><a href='#' class='btn btn-primary' data-dismiss='modal'>" + t.link.insert + "</a></div></div><a class='btn btn-default" + l + "' data-wysihtml5-command='createLink' title='" + t.link.insert + "' tabindex='-1'><i class='glyphicon glyphicon-share'></i></a></li>"
            },
            image: function(t, a) {
                var l = a && a.size ? " btn-" + a.size : "";
                return "<li><div class='bootstrap-wysihtml5-insert-image-modal modal hide fade'><div class='modal-header'><a class='close' data-dismiss='modal'>&times;</a><h3>" + t.image.insert + "</h3></div><div class='modal-body'><input value='http://' class='bootstrap-wysihtml5-insert-image-url input-xlarge'></div><div class='modal-footer'><a href='#' class='btn btn-default' data-dismiss='modal'>" + t.image.cancel + "</a><a href='#' class='btn btn-primary' data-dismiss='modal'>" + t.image.insert + "</a></div></div><a class='btn btn-default" + l + "' data-wysihtml5-command='insertImage' title='" + t.image.insert + "' tabindex='-1'><i class='glyphicon glyphicon-picture'></i></a></li>"
            },
            html: function(t, a) {
                var l = a && a.size ? " btn-" + a.size : "";
                return "<li><div class='btn-group'><a class='btn btn-default" + l + "' data-wysihtml5-action='change_view' title='" + t.html.edit + "' tabindex='-1'><i class='glyphicon glyphicon-pencil'></i></a></div></li>"
            },
            color: function(t, a) {
                var l = a && a.size ? " btn-" + a.size : "";
                return "<li class='dropdown'><a class='btn btn-default dropdown-toggle" + l + "' data-toggle='dropdown' href='#' tabindex='-1'><span class='current-color'>" + t.colours.black + "</span>&nbsp;<b class='caret'></b></a><ul class='dropdown-menu'><li><div class='wysihtml5-colors' data-wysihtml5-command-value='black'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='black'>" + t.colours.black + "</a></li><li><div class='wysihtml5-colors' data-wysihtml5-command-value='silver'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='silver'>" + t.colours.silver + "</a></li><li><div class='wysihtml5-colors' data-wysihtml5-command-value='gray'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='gray'>" + t.colours.gray + "</a></li><li><div class='wysihtml5-colors' data-wysihtml5-command-value='maroon'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='maroon'>" + t.colours.maroon + "</a></li><li><div class='wysihtml5-colors' data-wysihtml5-command-value='red'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='red'>" + t.colours.red + "</a></li><li><div class='wysihtml5-colors' data-wysihtml5-command-value='purple'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='purple'>" + t.colours.purple + "</a></li><li><div class='wysihtml5-colors' data-wysihtml5-command-value='green'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='green'>" + t.colours.green + "</a></li><li><div class='wysihtml5-colors' data-wysihtml5-command-value='olive'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='olive'>" + t.colours.olive + "</a></li><li><div class='wysihtml5-colors' data-wysihtml5-command-value='navy'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='navy'>" + t.colours.navy + "</a></li><li><div class='wysihtml5-colors' data-wysihtml5-command-value='blue'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='blue'>" + t.colours.blue + "</a></li><li><div class='wysihtml5-colors' data-wysihtml5-command-value='orange'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='orange'>" + t.colours.orange + "</a></li></ul></li>"
            }
        },
        i = function(t, a, i) {
            return l[t](a, i)
        },
        s = function(a, i) {
            this.el = a;
            var s = i || e;
            for (var o in s.customTemplates) l[o] = s.customTemplates[o];
            this.toolbar = this.createToolbar(a, s), this.editor = this.createEditor(i), window.editor = this.editor, t("iframe.wysihtml5-sandbox").each(function(a, l) {
                t(l.contentWindow).off("focus.wysihtml5").on({
                    "focus.wysihtml5": function() {
                        t("li.dropdown").removeClass("open")
                    }
                })
            })
        };
    s.prototype = {
        constructor: s,
        createEditor: function(l) {
            l = l || {}, l = t.extend(!0, {}, l), l.toolbar = this.toolbar[0];
            var i = new a.Editor(this.el[0], l);
            if (l && l.events)
                for (var s in l.events) i.on(s, l.events[s]);
            return i
        },
        createToolbar: function(a, l) {
            var s = this,
                o = t("<ul/>", {
                    "class": "wysihtml5-toolbar",
                    style: "display:none"
                }),
                r = l.locale || e.locale || "en";
            for (var d in e) {
                var c = !1;
                void 0 !== l[d] ? l[d] === !0 && (c = !0) : c = e[d], c === !0 && (o.append(i(d, n[r], l)), "html" === d && this.initHtml(o), "link" === d && this.initInsertLink(o), "image" === d && this.initInsertImage(o))
            }
            if (l.toolbar)
                for (d in l.toolbar) o.append(l.toolbar[d]);
            return o.find("a[data-wysihtml5-command='formatBlock']").click(function(a) {
                var l = a.target || a.srcElement,
                    i = t(l);
                s.toolbar.find(".current-font").text(i.html())
            }), o.find("a[data-wysihtml5-command='foreColor']").click(function(a) {
                var l = a.target || a.srcElement,
                    i = t(l);
                s.toolbar.find(".current-color").text(i.html())
            }), this.el.before(o), o
        },
        initHtml: function(t) {
            var a = "a[data-wysihtml5-action='change_view']";
            t.find(a).click(function() {
                t.find("a.btn").not(a).toggleClass("disabled")
            })
        },
        initInsertImage: function(a) {
            var l, i = this,
                s = a.find(".bootstrap-wysihtml5-insert-image-modal"),
                o = s.find(".bootstrap-wysihtml5-insert-image-url"),
                e = s.find("a.btn-primary"),
                n = o.val(),
                r = function() {
                    var t = o.val();
                    o.val(n), i.editor.currentView.element.focus(), l && (i.editor.composer.selection.setBookmark(l), l = null), i.editor.composer.commands.exec("insertImage", t)
                };
            o.keypress(function(t) {
                13 == t.which && (r(), s.modal("hide"))
            }), e.click(r), s.on("shown", function() {
                o.focus()
            }), s.on("hide", function() {
                i.editor.currentView.element.focus()
            }), a.find("a[data-wysihtml5-command=insertImage]").click(function() {
                var a = t(this).hasClass("wysihtml5-command-active");
                return a ? !0 : (i.editor.currentView.element.focus(!1), l = i.editor.composer.selection.getBookmark(), s.appendTo("body").modal("show"), s.on("click.dismiss.modal", '[data-dismiss="modal"]', function(t) {
                    t.stopPropagation()
                }), !1)
            })
        },
        initInsertLink: function(a) {
            var l, i = this,
                s = a.find(".bootstrap-wysihtml5-insert-link-modal"),
                o = s.find(".bootstrap-wysihtml5-insert-link-url"),
                e = s.find("a.btn-primary"),
                n = o.val(),
                r = function() {
                    var t = o.val();
                    o.val(n), i.editor.currentView.element.focus(), l && (i.editor.composer.selection.setBookmark(l), l = null), i.editor.composer.commands.exec("createLink", {
                        href: t,
                        target: "_blank",
                        rel: "nofollow"
                    })
                };
            o.keypress(function(t) {
                13 == t.which && (r(), s.modal("hide"))
            }), e.click(r), s.on("shown", function() {
                o.focus()
            }), s.on("hide", function() {
                i.editor.currentView.element.focus()
            }), a.find("a[data-wysihtml5-command=createLink]").click(function() {
                var a = t(this).hasClass("wysihtml5-command-active");
                return a ? !0 : (i.editor.currentView.element.focus(!1), l = i.editor.composer.selection.getBookmark(), s.appendTo("body").modal("show"), s.on("click.dismiss.modal", '[data-dismiss="modal"]', function(t) {
                    t.stopPropagation()
                }), !1)
            })
        }
    };
    var o = {
        resetDefaults: function() {
            t.fn.wysihtml5.defaultOptions = t.extend(!0, {}, t.fn.wysihtml5.defaultOptionsCache)
        },
        bypassDefaults: function(a) {
            return this.each(function() {
                var l = t(this);
                l.data("wysihtml5", new s(l, a))
            })
        },
        shallowExtend: function(a) {
            var l = t.extend({}, t.fn.wysihtml5.defaultOptions, a || {}),
                i = this;
            return o.bypassDefaults.apply(i, [l])
        },
        deepExtend: function(a) {
            var l = t.extend(!0, {}, t.fn.wysihtml5.defaultOptions, a || {}),
                i = this;
            return o.bypassDefaults.apply(i, [l])
        },
        init: function(t) {
            var a = this;
            return o.shallowExtend.apply(a, [t])
        }
    };
    t.fn.wysihtml5 = function(a) {
        return o[a] ? o[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? void t.error("Method " + a + " does not exist on jQuery.wysihtml5") : o.init.apply(this, arguments)
    }, t.fn.wysihtml5.Constructor = s;
    var e = t.fn.wysihtml5.defaultOptions = {
        "font-styles": !0,
        color: !1,
        emphasis: !0,
        lists: !0,
        html: !1,
        link: !0,
        image: !0,
        events: {},
        parserRules: {
            classes: {
                "wysiwyg-color-silver": 1,
                "wysiwyg-color-gray": 1,
                "wysiwyg-color-white": 1,
                "wysiwyg-color-maroon": 1,
                "wysiwyg-color-red": 1,
                "wysiwyg-color-purple": 1,
                "wysiwyg-color-fuchsia": 1,
                "wysiwyg-color-green": 1,
                "wysiwyg-color-lime": 1,
                "wysiwyg-color-olive": 1,
                "wysiwyg-color-yellow": 1,
                "wysiwyg-color-navy": 1,
                "wysiwyg-color-blue": 1,
                "wysiwyg-color-teal": 1,
                "wysiwyg-color-aqua": 1,
                "wysiwyg-color-orange": 1
            },
            tags: {
                b: {},
                i: {},
                br: {},
                ol: {},
                ul: {},
                li: {},
                h1: {},
                h2: {},
                h3: {},
                blockquote: {},
                u: 1,
                img: {
                    check_attributes: {
                        width: "numbers",
                        alt: "alt",
                        src: "url",
                        height: "numbers"
                    }
                },
                a: {
                    set_attributes: {
                        target: "_blank",
                        rel: "nofollow"
                    },
                    check_attributes: {
                        href: "url"
                    }
                },
                span: 1,
                div: 1,
                code: 1,
                pre: 1
            }
        },
        stylesheets: ["./lib/css/wysiwyg-color.css"],
        locale: "en"
    };
    void 0 === t.fn.wysihtml5.defaultOptionsCache && (t.fn.wysihtml5.defaultOptionsCache = t.extend(!0, {}, t.fn.wysihtml5.defaultOptions));
    var n = t.fn.wysihtml5.locale = {
        en: {
            font_styles: {
                normal: "Normal text",
                h1: "Heading 1",
                h2: "Heading 2",
                h3: "Heading 3"
            },
            emphasis: {
                //bold: "Bold",
                //italic: "Italic",
                //underline: "Underline"
                bold: "B",
                italic: "I",
                underline: "U"
            },
            lists: {
                unordered: "Unordered list",
                ordered: "Ordered list",
                outdent: "Outdent",
                indent: "Indent"
            },
            link: {
                insert: "Insert link",
                cancel: "Cancel"
            },
            image: {
                insert: "Insert image",
                cancel: "Cancel"
            },
            html: {
                edit: "Edit HTML"
            },
            colours: {
                black: "Black",
                silver: "Silver",
                gray: "Grey",
                maroon: "Maroon",
                red: "Red",
                purple: "Purple",
                green: "Green",
                olive: "Olive",
                navy: "Navy",
                blue: "Blue",
                orange: "Orange"
            }
        }
    }
}(window.jQuery, window.wysihtml5);
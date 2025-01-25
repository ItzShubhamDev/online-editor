"use client";

import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";

import "codemirror/lib/codemirror.css";

import "codemirror/theme/3024-day.css";
import "codemirror/theme/3024-night.css";
import "codemirror/theme/abcdef.css";
import "codemirror/theme/ambiance-mobile.css";
import "codemirror/theme/ambiance.css";
import "codemirror/theme/ayu-dark.css";
import "codemirror/theme/ayu-mirage.css";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/bespin.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/cobalt.css";
import "codemirror/theme/colorforth.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/duotone-dark.css";
import "codemirror/theme/duotone-light.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/erlang-dark.css";
import "codemirror/theme/gruvbox-dark.css";
import "codemirror/theme/hopscotch.css";
import "codemirror/theme/icecoder.css";
import "codemirror/theme/idea.css";
import "codemirror/theme/isotope.css";
import "codemirror/theme/lesser-dark.css";
import "codemirror/theme/liquibyte.css";
import "codemirror/theme/lucario.css";
import "codemirror/theme/material-darker.css";
import "codemirror/theme/material-ocean.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/theme/material.css";
import "codemirror/theme/mbo.css";
import "codemirror/theme/mdn-like.css";
import "codemirror/theme/midnight.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/moxer.css";
import "codemirror/theme/neat.css";
import "codemirror/theme/neo.css";
import "codemirror/theme/night.css";
import "codemirror/theme/nord.css";
import "codemirror/theme/oceanic-next.css";
import "codemirror/theme/panda-syntax.css";
import "codemirror/theme/paraiso-dark.css";
import "codemirror/theme/paraiso-light.css";
import "codemirror/theme/pastel-on-dark.css";
import "codemirror/theme/railscasts.css";
import "codemirror/theme/rubyblue.css";
import "codemirror/theme/seti.css";
import "codemirror/theme/shadowfox.css";
import "codemirror/theme/solarized.css";
import "codemirror/theme/ssms.css";
import "codemirror/theme/the-matrix.css";
import "codemirror/theme/tomorrow-night-bright.css";
import "codemirror/theme/tomorrow-night-eighties.css";
import "codemirror/theme/ttcn.css";
import "codemirror/theme/twilight.css";
import "codemirror/theme/vibrant-ink.css";
import "codemirror/theme/xq-dark.css";
import "codemirror/theme/xq-light.css";
import "codemirror/theme/yeti.css";
import "codemirror/theme/yonce.css";
import "codemirror/theme/zenburn.css";

// Languages
import "codemirror/mode/clike/clike";
import "codemirror/mode/css/css";
import "codemirror/mode/diff/diff";
import "codemirror/mode/dockerfile/dockerfile";
import "codemirror/mode/gfm/gfm";
import "codemirror/mode/go/go";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/lua/lua";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/nginx/nginx";
import "codemirror/mode/perl/perl";
import "codemirror/mode/php/php";
import "codemirror/mode/properties/properties";
import "codemirror/mode/python/python";
import "codemirror/mode/ruby/ruby";
import "codemirror/mode/rust/rust";
import "codemirror/mode/sass/sass";
import "codemirror/mode/shell/shell";
import "codemirror/mode/sql/sql";
import "codemirror/mode/toml/toml";
import "codemirror/mode/vue/vue";
import "codemirror/mode/xml/xml";
import "codemirror/mode/yaml/yaml";

// Add-ons
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/search/search";
import "codemirror/addon/search/searchcursor";
import "codemirror/addon/search/jump-to-line";
import "codemirror/addon/dialog/dialog";
import "codemirror/addon/dialog/dialog.css";

import modes from "@/utils/modes";

export interface CodeEditorProps {
    mime: string;
    theme: string;
    value: string;
    onChange: (value: string) => void;
    options?: CodeMirror.EditorConfiguration;
}

const CodeEditor = ({
    mime,
    theme,
    value,
    onChange,
    options,
}: CodeEditorProps) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const cmInstanceRef = useRef<CodeMirror.Editor | null>(null);

    useEffect(() => {
        if (editorRef.current && !cmInstanceRef.current) {
            const mode =
                modes.find((m) => m.mimes?.includes(mime))?.mode ||
                "javascript";
            cmInstanceRef.current = CodeMirror(editorRef.current, {
                value,
                mode,
                theme,
                lineNumbers: true,
                autoCloseBrackets: true,
                autoCloseTags: true,
                foldGutter: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                lineWrapping: true,
                tabSize: 2,
                indentWithTabs: false,
                ...options,
            });

            cmInstanceRef.current.on("change", (instance) => {
                onChange(instance.getValue());
            });
        }
    }, []);

    useEffect(() => {
        const mode =
            modes.find((m) => m.mimes?.includes(mime)) ??
            modes.find((m) => m.mime === mime);
        if (cmInstanceRef.current) {
            cmInstanceRef.current.setOption("mode", mode?.mode);
        }
    }, [mime]);

    useEffect(() => {
        if (cmInstanceRef.current) {
            cmInstanceRef.current.setOption("theme", theme);
        }
    }, [theme]);

    return <div ref={editorRef} className="hover:cursor-text" />;
};

export default CodeEditor;

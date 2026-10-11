"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { TiptapRichTextMenuBar } from "./TiptapRichTextMenuBar";
import { Bold } from "@tiptap/extension-bold";
import { TextAlign } from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import { Typography } from "@tiptap/extension-typography";
import { ControllerRenderProps } from "react-hook-form";
import { Highlight } from "@tiptap/extension-highlight";

interface iAppPros {
  field: ControllerRenderProps;
}

export function TiptapRichTextEditor({ field }: iAppPros) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        heading: false,
      }),
      Bold,
      Typography,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Highlight.configure({
        multicolor: false,
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] p-4 max-w-none focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:props-xl dark:prose-invert ",
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? JSON.parse(field.value) : "<p>Hello World</p>",
  });

  return (
    <div className="w-full border rounded-lg overflow-hidden bg-card">
      <TiptapRichTextMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

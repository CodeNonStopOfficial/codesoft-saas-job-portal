
"use client";

import { Editor, useEditorState } from "@tiptap/react";
import { Highlighter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface HighlightColorSelectProps {
  editor: Editor;
}

const highlightColors = [
  { label: "Yellow", value: "#FFFF00" },
  { label: "Green", value: "#00FF00" },
  { label: "Cyan", value: "#00FFFF" },
  { label: "Pink", value: "#FF69B4" },
  { label: "Orange", value: "#FFA500" },
  { label: "Red", value: "#FF0000" },
  { label: "Blue", value: "#87CEFA" },
  { label: "Purple", value: "#DDA0DD" },
  { label: "Gray", value: "#D3D3D3" },
];

export function HighlightColorSelect({
  editor,
}: HighlightColorSelectProps) {
  const currentColor = useEditorState({
    editor,
    selector: ({ editor }) =>
      editor.getAttributes("highlight").color || "yellow",
  });

  const handleColorChange = (color: string) => {
    if (color === "none") {
      editor.chain().focus().unsetHighlight().run();
      return;
    }

    editor
      .chain()
      .focus()
      .setHighlight({ color })
      .run();
  };

  return (
    <Select
      value={currentColor}
      onValueChange={handleColorChange}
    >
      <SelectTrigger
        className="h-8 w-36.25 gap-2"
        aria-label="Highlight color"
      >
        <Highlighter className="size-4 shrink-0" />

        <SelectValue placeholder="Highlight color" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="none">
          <span className="flex items-center gap-2">
            <span className="size-4 rounded-sm border bg-background" />
            No highlight
          </span>
        </SelectItem>

        {highlightColors.map((color) => (
          <SelectItem key={color.value} value={color.value}>
            <span className="flex items-center gap-2">
              <span
                className="size-4 rounded-sm border"
                style={{ backgroundColor: color.value }}
              />
              {color.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
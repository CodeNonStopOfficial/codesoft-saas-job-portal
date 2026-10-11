"use client";

import { Editor } from "@tiptap/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import {
  AlignCenter,
  AlignCenterHorizontal,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  ListIcon,
  ListOrdered,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";
import { cn } from "cn";
import { HighlightColorSelect } from "./HighlightColorSelect";

interface iAppPros {
  editor: Editor | null;
}
export function TiptapRichTextMenuBar({ editor }: iAppPros) {
  if (!editor) {
    return null;
  }
  return (
    <div className="border rounded-t-lg p-2 pg-card flex flex-wrap gap-2 items-center">
      <TooltipProvider>
        <div className="flex flex-wrap gap-2">
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={false}
                  disabled={!editor.can().undo()}
                  onPressedChange={() => {
                    editor.chain().focus().undo().run();
                  }}
                  className={cn("disabled:opacity-50")}
                >
                  <Undo2 />
                </Toggle>
              }
            />
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={false}
                  disabled={!editor.can().redo()}
                  onPressedChange={() => {
                    editor.chain().focus().redo().run();
                  }}
                  className={cn("disabled:opacity-50")}
                >
                  <Redo2 />
                </Toggle>
              }
            />
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </div>
        <div className="w-px h-6 bg-border mx-2"></div>
        <div className="flex flex-wrap gap-2">
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("bold")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleBold().run()
                  }
                  className={cn(
                    editor.isActive("bold") &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Bold />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("Italic")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleItalic().run()
                  }
                  className={cn(
                    editor.isActive("Italic") &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Italic />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("strike")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleStrike().run()
                  }
                  className={cn(
                    editor.isActive("strike") &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Strikethrough />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Strike</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("underline")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleUnderline().run()
                  }
                  className={cn(
                    editor.isActive("underline") &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Underline />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Underline</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("heading", { level: 1 })}
                  onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={cn(
                    editor.isActive("heading", { level: 1 }) &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Heading1 />
                </Toggle>
              }
            />
            <TooltipContent>Heading 1</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("heading", { level: 2 })}
                  onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={cn(
                    editor.isActive("heading", { level: 2 }) &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Heading2 />
                </Toggle>
              }
            />
            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("heading", { level: 3 })}
                  onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  className={cn(
                    editor.isActive("heading", { level: 3 }) &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Heading3 />
                </Toggle>
              }
            />
            <TooltipContent>Heading 3</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("bulletList")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={cn(
                    editor.isActive("bulletList") &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <ListIcon />
                </Toggle>
              }
            />
            <TooltipContent>BulletList</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("orderedList")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={cn(
                    editor.isActive("orderedList") &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <ListOrdered />
                </Toggle>
              }
            />
            <TooltipContent>OrderList</TooltipContent>
          </Tooltip>

          <div className="flex flex-wrap items-center gap-2">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Toggle
                    size="sm"
                    pressed={editor.isActive({ textAlign: "left" })}
                    onPressedChange={() =>
                      editor.chain().focus().setTextAlign("left").run()
                    }
                    className={cn(
                      editor.isActive({ textAlign: "left" }) &&
                        "bg-muted text-muted-foreground border",
                    )}
                  >
                    <AlignLeft />
                  </Toggle>
                }
              ></TooltipTrigger>
              <TooltipContent>Align Left</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Toggle
                    size="sm"
                    pressed={editor.isActive({ textAlign: "right" })}
                    onPressedChange={() =>
                      editor.chain().focus().setTextAlign("right").run()
                    }
                    className={cn(
                      editor.isActive({ textAlign: "right" }) &&
                        "bg-muted text-muted-foreground border",
                    )}
                  >
                    <AlignRight />
                  </Toggle>
                }
              ></TooltipTrigger>
              <TooltipContent>Align Right</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Toggle
                    size="sm"
                    pressed={editor.isActive({ textAlign: "center" })}
                    onPressedChange={() =>
                      editor.chain().focus().setTextAlign("center").run()
                    }
                    className={cn(
                      editor.isActive({ textAlign: "center" }) &&
                        "bg-muted text-muted-foreground border",
                    )}
                  >
                    <AlignCenter />
                  </Toggle>
                }
              ></TooltipTrigger>
              <TooltipContent>Align center</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Toggle
                    size="sm"
                    pressed={editor.isActive({ textAlign: "justify" })}
                    onPressedChange={() =>
                      editor.chain().focus().setTextAlign("justify").run()
                    }
                    className={cn(
                      editor.isActive({ textAlign: "justify" }) &&
                        "bg-muted text-muted-foreground border",
                    )}
                  >
                    <AlignJustify />
                  </Toggle>
                }
              ></TooltipTrigger>
              <TooltipContent>Align justify</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Toggle
                    size="sm"
                    pressed={editor.isActive({ textAlign: "right" })}
                    onPressedChange={() =>
                      editor.chain().focus().toggleTextAlign("right").run()
                    }
                    className={cn(
                      editor.isActive({ textAlign: "right" }) &&
                        "bg-muted text-muted-foreground border",
                    )}
                  >
                    <AlignCenterHorizontal />
                  </Toggle>
                }
              ></TooltipTrigger>
              <TooltipContent>Align Toggle</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="w-px h-6 bg-border mx-2"></div>
        <div className="flex flex-wrap gap-2">
          <HighlightColorSelect editor={editor} />
        </div>
      </TooltipProvider>
    </div>
  );
}

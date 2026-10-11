"use client";

import * as React from "react";
import Image from "next/image";
import {
  Upload,
  X,
  FileVideo,
  Loader2,
  FileText,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { uploadFiles } from "../layouts/UploadThingReExport";

export type UploadedFile = {
  url: string;
  key: string;
  name?: string;
  size?: number;
  type?: string;
};

type MediaUploaderProps = {
  endpoint: "imageUploader" | "pdfUploader";

  value?: UploadedFile | null | undefined;

  onChange?: (file: UploadedFile | null) => void;

  accept?: string;

  maxSize?: string;

  className?: string;
};

export function MediaUploader({
  endpoint,
  value,
  onChange,
  accept = "image/*",
  maxSize = "Maximum 4MB",
  className,
}: MediaUploaderProps) {
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError(null);
    setUploading(true);
    setProgress(0);

    try {
      const result = await uploadFiles(endpoint, {
        files: [file],

        onUploadProgress: ({ progress }) => {
          setProgress(Math.round(progress));
        },
      });

      const uploadedFile = result[0];

      if (!uploadedFile) {
        throw new Error("Upload failed.");
      }

      const fileData: UploadedFile = {
        url: uploadedFile.ufsUrl,
        key: uploadedFile.key,
        name: uploadedFile.name,
        size: uploadedFile.size,
        type: uploadedFile.type,
      };

      onChange?.(fileData);
    } catch (error) {
      console.error("Upload error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while uploading.",
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const removeFile = () => {
    onChange?.(null);
    setProgress(0);
    setError(null);
  };

  const isVideo = value?.type?.startsWith("video/");
  const isImage = value?.type?.startsWith("image/");
  const isPdf =
    value?.type === "application/pdf" ||
    value?.name?.toLowerCase().endsWith(".pdf") ||
    value?.url?.toLowerCase().includes(".pdf");

  return (
    <div className={cn("w-full", className)}>
      {/* Uploaded File */}
      {value && !uploading ? (
        <div className="group relative overflow-hidden rounded-xl border bg-muted/30">
          <div className="relative aspect-video w-full">
            {isImage ? (
              <Image
                src={value.url ?? ""}
                alt={value.name || "Uploaded image"}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                priority
                className="object-contain p-2"
              />
            ) : isVideo ? (
              <video
                src={value.url ?? ""}
                controls
                className="h-full w-full object-contain"
              />
            ) : isPdf ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
                <FileText className="size-16 text-red-500" />{" "}
                <p className="max-w-full truncate text-sm font-medium">
                  {value.name || "PDF document"}{" "}
                </p>
                <a
                  href={value.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
                >
                  View PDF <ExternalLink className="size-4" />{" "}
                </a>{" "}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <FileVideo className="size-10 text-muted-foreground" />
              </div>
            )}

            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={removeFile}
            >
              <X className="size-4" />
            </Button>
          </div>

          {value.name && (
            <div className="border-t px-4 py-3">
              <p className="truncate text-sm font-medium">{value.name}</p>

              {value.size !== undefined && (
                <p className="text-xs text-muted-foreground">
                  {(value.size / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Upload Button */}
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex w-full flex-col items-center justify-center",
              "rounded-xl border border-dashed",
              "bg-muted/20 px-6 py-10 text-center",
              "transition-colors",
              "hover:border-primary/50 hover:bg-muted/40",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-ring",
              uploading && "cursor-not-allowed opacity-70",
            )}
          >
            {uploading ? (
              <>
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
                  <Loader2 className="size-6 animate-spin text-primary" />
                </div>

                <p className="text-sm font-medium">Uploading your file...</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Please don't close this page.
                </p>
              </>
            ) : (
              <>
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
                  <Upload className="size-6 text-primary" />
                </div>

                <p className="text-sm font-medium">Click to upload</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Choose a file from your device
                </p>

                <p className="mt-3 text-xs text-muted-foreground">{maxSize}</p>
              </>
            )}
          </button>

          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />

          {/* Progress */}
          {uploading && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Uploading</span>

                <span className="font-medium">{progress}%</span>
              </div>

              <Progress value={progress} />
            </div>
          )}
        </>
      )}

      {/* Error */}
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}

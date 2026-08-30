"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, ImagePlus, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { uploadWardrobeImage } from "@/lib/wardrobe/upload-client";
import { validateWardrobeImageFile } from "@/lib/wardrobe/upload";

interface WardrobeImagePickerProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export function WardrobeImagePicker({
  value,
  onChange,
  disabled = false,
}: WardrobeImagePickerProps) {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setPreview(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const processFile = useCallback(
    async (file: File) => {
      try {
        validateWardrobeImageFile(file);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Invalid image");
        return;
      }

      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);
      setUploading(true);

      try {
        const url = await uploadWardrobeImage(file);
        URL.revokeObjectURL(localUrl);
        setPreview(url);
        onChange(url);
        toast.success("Photo uploaded");
      } catch (err) {
        URL.revokeObjectURL(localUrl);
        setPreview(value);
        toast.error(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onChange, value]
  );

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) void processFile(file);
  };

  const clearImage = () => {
    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview("");
    onChange("");
  };

  const displaySrc = preview || value;

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled && !uploading) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!disabled && !uploading) handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "relative mx-auto flex h-44 w-44 items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed transition-colors",
          dragging
            ? "border-[#D4C4A8]/60 bg-[#D4C4A8]/10"
            : displaySrc
              ? "border-[#202020] bg-[#0a0a0a]"
              : "border-[#D4C4A8]/30 bg-[#D4C4A8]/5"
        )}
      >
        {displaySrc ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displaySrc}
              alt="Item preview"
              className="h-full w-full object-cover"
            />
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Loader2 className="h-8 w-8 animate-spin text-[#D4C4A8]" />
              </div>
            )}
            {!uploading && !disabled && (
              <button
                type="button"
                onClick={clearImage}
                className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
                aria-label="Remove photo"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 text-center">
            {uploading ? (
              <Loader2 className="h-10 w-10 animate-spin text-[#D4C4A8]" />
            ) : (
              <ImagePlus className="h-10 w-10 text-[#D4C4A8]" />
            )}
            <p className="text-xs text-gray-500">
              {dragging ? "Drop image here" : "Add a photo of your item"}
            </p>
          </div>
        )}
      </div>

      <input
        ref={uploadInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        disabled={disabled || uploading}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        disabled={disabled || uploading}
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div className="flex justify-center gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={disabled || uploading}
          onClick={() => uploadInputRef.current?.click()}
        >
          <Upload className="h-4 w-4" />
          Upload
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={disabled || uploading}
          onClick={() => cameraInputRef.current?.click()}
        >
          <Camera className="h-4 w-4" />
          Camera
        </Button>
      </div>

      <div>
        <label className="mb-1.5 block text-xs text-gray-500">
          Or paste image URL (optional)
        </label>
        <Input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setPreview(e.target.value);
          }}
          disabled={disabled || uploading}
          placeholder="https://..."
        />
      </div>
    </div>
  );
}

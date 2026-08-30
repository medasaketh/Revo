import { WardrobeApiError } from "@/lib/wardrobe/client";
import { validateWardrobeImageFile } from "@/lib/wardrobe/upload";

export async function uploadWardrobeImage(file: File): Promise<string> {
  validateWardrobeImageFile(file);

  const body = new FormData();
  body.append("file", file);

  const res = await fetch("/api/wardrobe/upload", {
    method: "POST",
    body,
  });

  const json = await res.json();

  if (!json.success) {
    throw new WardrobeApiError(
      json.error?.code ?? "UPLOAD_FAILED",
      json.error?.message ?? "Upload failed",
      res.status
    );
  }

  return json.data.url as string;
}

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_BYTES = 5 * 1024 * 1024;

export class WardrobeUploadError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

export function validateWardrobeImageFile(file: File) {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new WardrobeUploadError(
      "INVALID_TYPE",
      "Please upload a JPG, PNG, WebP, or GIF image."
    );
  }

  if (file.size > MAX_BYTES) {
    throw new WardrobeUploadError(
      "FILE_TOO_LARGE",
      "Image must be 5 MB or smaller."
    );
  }
}

export function fileExtension(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && ["jpg", "jpeg", "png", "webp", "gif"].includes(fromName)) {
    return fromName === "jpeg" ? "jpg" : fromName;
  }

  switch (file.type) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return "jpg";
  }
}

export function buildWardrobeImagePath(userId: string, file: File): string {
  const ext = fileExtension(file);
  return `${userId}/${crypto.randomUUID()}.${ext}`;
}

export function getWardrobeImagePublicUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) {
    throw new WardrobeUploadError(
      "CONFIG_ERROR",
      "Missing NEXT_PUBLIC_SUPABASE_URL."
    );
  }
  return `${base}/storage/v1/object/public/wardrobe-images/${path}`;
}

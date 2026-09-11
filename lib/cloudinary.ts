import { v2 as cloudinary } from "cloudinary";
import { siteConfig } from "./site-config";
export const CLOUDINARY_ROOT_FOLDER = siteConfig.cloudinaryRootFolder;

export function getCloudinary() { const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env; if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) throw new Error("Cloudinary is not configured."); cloudinary.config({ cloud_name: CLOUDINARY_CLOUD_NAME, api_key: CLOUDINARY_API_KEY, api_secret: CLOUDINARY_API_SECRET }); return cloudinary; }
export const allowedUploadKinds = ["image/jpeg", "image/png", "image/webp", "image/avif"] as const;

export async function uploadProductAsset(file: string, options: { folder?: string; publicId?: string } = {}) {
  return getCloudinary().uploader.upload(file, {
    folder: options.folder ? `${CLOUDINARY_ROOT_FOLDER}/${options.folder}` : CLOUDINARY_ROOT_FOLDER,
    public_id: options.publicId,
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "avif"],
  });
}

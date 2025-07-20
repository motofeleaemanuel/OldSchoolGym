import { Image } from "@/lib/models/Image";
import dbConnect from "@/lib/mongodb";
import cloudinary from "../../cloudinary";

export const getGalleryImages = async () => {
    try {
        await dbConnect();
        const images = await Image.find({});
        if (!images) {
            throw new Error("No images found");
        }
        return images;
    } catch (error) {
        throw new Error("Failed to fetch gallery images", { cause: error });
    }
}

export const createImageDocuments = async (imageData: { secure_url: string, public_id: string }[]) => {
    try{
        await dbConnect();
        const imageDocuments = await Image.insertMany(
            imageData.map(({ secure_url, public_id }) => ({ cloudinaryUrl: secure_url, publicId: public_id }))
        );
        return imageDocuments;
    }catch(err){
        console.error('Error creating image documents:', err);
        throw new Error('Failed to create image documents');
    }
}

export const deleteImageById = async (id: string) => {
  await dbConnect();

  // 1) Find (but don’t delete) so you can still roll back if cloudinary fails
  const image = await Image.findById(id);
  if (!image) {
    throw new Error(`Image with id ${id} not found`);
  }
  if (!image.publicId) {
    throw new Error(`Image ${id} has no Cloudinary publicId`);
  }

  // 2) Delete from Cloudinary
  const result = await cloudinary.uploader.destroy(image.publicId);
  if (result.result !== 'ok') {
    // you can inspect result for more detail (e.g. 'not found')
    throw new Error(`Cloudinary delete failed: ${result.result}`);
  }

  // 3) Now delete from Mongo
  const deleted = await Image.findByIdAndDelete(id);
  // (you know it exists, so deleted should be non-null)
  return deleted;
};
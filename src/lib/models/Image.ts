import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IImage extends Document {
  cloudinaryUrl: string;
  description?: string;
  publicId: string;
}

const ImageSchema = new Schema<IImage>(
  {
    cloudinaryUrl: { type: String, required: true },
    description: { type: String, default: '' },
    publicId: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export const Image: Model<IImage> =
  mongoose.models.Image ||
  mongoose.model<IImage>('Image', ImageSchema);

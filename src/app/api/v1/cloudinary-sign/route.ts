import { NextResponse } from "next/server";
import cloudinary from "../../../../../cloudinary";

export async function GET() {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: 'gallery_uploads' },
    process.env.CLOUDINARY_API_SECRET!
  );
  console.log('Generated signature:', signature, 'at timestamp:', timestamp);
  return NextResponse.json({ signature, timestamp });
}
import { NextRequest, NextResponse } from 'next/server';
import { createImageDocuments, getGalleryImages } from '@/actions/gallery.actions';

export async function GET() {
    try {
        const images = await getGalleryImages();
        return NextResponse.json({images}, { status: 200 });
    } catch (error) {
        const errorMessage = typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message: string }).message
          : String(error);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

type BodyImage = { url: string; public_id: string };

export async function POST(req: NextRequest) {
  const { images }: { images: BodyImage[] } = await req.json();
  const formattedImages = images.map(img => ({
    secure_url: img.url,
    public_id: img.public_id
  }));
  const saved = await createImageDocuments(formattedImages);
  return NextResponse.json({ success: true, images: saved });
}



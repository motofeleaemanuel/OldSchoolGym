import { NextRequest, NextResponse } from 'next/server';
import { createImageDocuments, getGalleryImages } from '@/actions/gallery.actions';
import cloudinary from '../../../../../cloudinary';

export const runtime = 'nodejs';

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

type UploadResult = {
  secure_url: string
  public_id: string
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const fileEntries = formData.getAll('files') as File[]

    if (!fileEntries.length) {
      return NextResponse.json({ success: false, error: 'No files uploaded' }, { status: 400 })
    }

    const uploadPromises = fileEntries.map((file) => {
      return new Promise<UploadResult>(async (resolve, reject) => {
        try {
          const buffer = Buffer.from(await file.arrayBuffer())
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'gallery_uploads' },
            (error: unknown, result: UploadResult | undefined) => {
              if (error || !result) {
                return reject(error || new Error('Upload failed'))
              }
              resolve({ secure_url: result.secure_url, public_id: result.public_id })
            }
          )
          stream.end(buffer)
        } catch (err) {
          reject(err)
        }
      })
    })

    const imageData = await Promise.all(uploadPromises)

    let images
    try {
      images = await createImageDocuments(imageData)
    } catch (dbError) {
      console.error('Error creating image documents:', dbError)
      return NextResponse.json(
        { success: false, imageData, error: 'Uploaded but failed to save image records' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, images },
      { status: 200 }
    )
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json(
      { success: false, error: 'Server error during upload' },
      { status: 500 }
    )
  }
}



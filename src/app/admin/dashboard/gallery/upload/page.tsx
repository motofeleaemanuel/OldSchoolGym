'use client';
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import FileUploader from '@/components/FileUploader';
import { useRouter } from 'next/navigation';

type SignResponse = { signature: string; timestamp: number };

export default function GalleryUploadPage() {
  const router = useRouter();
  const [files, setFiles]     = useState<File[]>([]);
  const [isUploading, setUploading] = useState(false);
  const [sign, setSign]       = useState<SignResponse | null>(null);

  // 1) Fetch signature once on mount
  useEffect(() => {
    fetch('/api/v1/cloudinary-sign')
      .then(r => r.json())
      .then(setSign)
      .catch(() => toast.error('Could not get upload signature'));
  }, []);

  // 2) Upload each file directly to Cloudinary
  const uploadFiles = async () => {
    if (!sign) throw new Error('No signature');
    setUploading(true);

    try {
      const uploaded = await Promise.all(files.map(async (file) => {
        const form = new FormData();
        form.append('file', file);
        form.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
        form.append('timestamp', String(sign.timestamp));
        form.append('signature', sign.signature);
        form.append('folder', 'gallery_uploads');
        // optional: you can pass eager transformations, etc.
        console.log()
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: form,
        });
        if (!res.ok) throw new Error('Cloudinary upload failed');
        return res.json();  // returns { secure_url, public_id, … }
      }));

      // 3) Persist the array of URLs/IDs in your own database:
      const saveRes = await fetch('/api/v1/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: uploaded.map(u => ({ url: u.secure_url, public_id: u.public_id })) }),
      });
      if (!saveRes.ok) throw new Error('Save to DB failed');

      toast.success('All images uploaded and saved!');
      router.push('/admin/dashboard/gallery');

    } catch (err) {
      console.error(err);
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Upload Gallery Images</h1>
      <FileUploader multiple onChange={setFiles} />
      <button
        onClick={uploadFiles}
        disabled={!files.length || !sign || isUploading}
        className="mt-4 px-4 py-2 bg-primary rounded text-white disabled:opacity-50 flex items-center gap-2"
      >
        {isUploading ? <><Loader2 className="animate-spin" /> Uploading…</> : 'Save'}
      </button>
    </main>
  );
}

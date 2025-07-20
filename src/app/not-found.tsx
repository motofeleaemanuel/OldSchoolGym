// app/not-found.tsx
'use client';

import { Dumbbell } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white p-6">
      <div className="flex flex-col items-center">
        <Dumbbell className="w-16 h-16 text-primary mb-4 animate-bounce" />
        <h1 className="text-5xl font-extrabold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8 text-center max-w-md">
          Looks like this page doesn’t exist. Try checking the URL or head back to the homepage.
        </p>
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-primary rounded-lg hover:bg-primary/80 transition"
        >
          <span>Back to Home Gym</span>
        </Link>
      </div>
    </main>
  );
}

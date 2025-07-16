"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {  Loader2 } from "lucide-react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 1000); // show for 1000ms
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center space-y-6">
      {/* Logo at the top */}
      <div className="relative w-24 h-24">
        <Image
          src="/images/logo.jpg"
          alt="Logo"
          fill
            sizes="(max-width: 768px) 50px, (min-width: 769px) 100px"
          className="object-cover rounded-full"
          priority
        />
      </div>

      {/* Five-dot loading indicator */}
      <div className="flex space-x-3">
        <Loader2 className="animate-spin text-primary" size={36} />
      </div>
    </div>
  );
}
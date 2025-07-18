
import Sidebar from '@/components/Sidebar';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[var(--black)] text-gray-50">
      <Sidebar />
      <main className="flex-1 pt-16 md:pt-8 p-8 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 h-screen">
        {children}
      </main>
    </div>
  );
}
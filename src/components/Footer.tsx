import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--black)] text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Old School Gym. All rights reserved.
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" aria-label="Instagram">
            <Instagram className="w-6 h-6 hover:text-[var(--primary)] transition-colors" />
          </a>
          <a href="#" aria-label="Twitter">
            <Twitter className="w-6 h-6 hover:text-[var(--primary)] transition-colors" />
          </a>
          <a href="#" aria-label="Facebook">
            <Facebook className="w-6 h-6 hover:text-[var(--primary)] transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  )
}

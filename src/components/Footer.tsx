import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
     <footer className="bg-[var(--black)] text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center md:items-start text-sm space-y-1">
          <span>&copy; {new Date().getFullYear()} Old School Gym. All rights reserved.</span>
          <span className="text-[10px]">
            Powered by{' '}
            <a
              href="https://www.exemplu-portfolio.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary)] hover:underline"
            >
              Motofelea Emanuel
            </a>
          </span>
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

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
    Home as HomeIcon,
    CreditCard,
    Image as GalleryIcon,
    Edit,
    LogOut,
    ChevronDown,
    Menu,
    X,
    ChevronUp,
} from 'lucide-react';

const navItems = [
    { label: 'Home', href: '/admin/dashboard/home', Icon: HomeIcon },
    { label: 'Subscriptions', href: '/admin/dashboard/subscriptions', Icon: CreditCard },
    { label: 'Gallery', href: '/admin/dashboard/gallery', Icon: GalleryIcon },
    { label: 'Blog', href: '/admin/dashboard/blog', Icon: Edit },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSignOut = () => {
        signOut({ redirect: false }).then(() => router.push('/admin/login'));
    };

    return (
        <>
            {/* Mobile menu button fixed top-left */}
            <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-black h-14 flex items-center px-4">
                <button
                    className="p-2 text-gray-200 bg-black rounded-lg hover:bg-gray-800 transition"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>


            {/* Sidebar overlay for mobile when open */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    } md:hidden`}
                onClick={() => setSidebarOpen(false)}
            />

            <aside
                className={`fixed inset-y-0  h-screen left-0 w-76 bg-[#111] border-r border-[#333] flex flex-col justify-between transform z-50 transition-transform
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex`}
            >
                <div>
                    <div className="flex items-center justify-between p-6 md:hidden">
                        <h2 className="text-2xl font-extrabold text-white">Dashboard</h2>
                        <button onClick={() => setSidebarOpen(false)}>
                            <X className="w-6 h-6 text-gray-200" />
                        </button>
                    </div>

                    <h2 className="hidden md:block text-2xl font-extrabold text-white p-6">
                        Dashboard
                    </h2>

                    <nav className="space-y-2">
                        {navItems.map(({ label, href, Icon }) => {
                            const active = pathname.includes(href);
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`flex items-center gap-3 px-6 py-3 transition-all rounded-lg mx-4
                    ${active
                                            ? 'bg-[var(--primary)] text-white shadow-[0_0_10px_var(--primary)]'
                                            : 'text-gray-50 hover:bg-[#222] hover:text-white'
                                        }`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="mb-6 px-6">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full flex items-center justify-between text-gray-200 bg-[#222] px-4 py-3 rounded-lg hover:bg-[#333] transition"
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xl">
                                {session?.user?.name?.charAt(0) || 'A'}
                            </span>
                            <div className="text-left overflow-hidden">
                                <p className="text-sm truncate">Hello,</p>
                                <p className="font-semibold truncate">{session?.user?.name || 'Admin'}</p>
                            </div>
                        </div>
                        {dropdownOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>

                    {dropdownOpen && (
                        <div className="mt-2 bg-[#222] rounded-lg shadow-lg overflow-hidden">
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-[var(--primary)] hover:text-black transition"
                            >
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}

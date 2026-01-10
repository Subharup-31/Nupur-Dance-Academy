'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SausageNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-xl border border-border shadow-lg rounded-full px-2 py-2 flex items-center gap-1 z-50 animate-slide-down max-w-[94vw] md:max-w-fit">

            {/* Logo & Brand */}
            <div className="flex items-center gap-2.5 pl-2.5 pr-3 border-r border-border/60 mr-1">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-background shadow-sm ring-1 ring-border">
                    <img
                        src="/logo.png"
                        alt="Nupur Dance Academy"
                        className="object-cover w-full h-full"
                    />
                </div>
                <span className="font-semibold text-sm text-foreground whitespace-nowrap hidden md:block tracking-tight">
                    Nupur Dance Academy
                </span>
                <span className="font-semibold text-sm text-foreground whitespace-nowrap md:hidden tracking-tight">
                    NDA
                </span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-0.5">
                <Link
                    href="/"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${pathname === '/'
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                >
                    Home
                </Link>
                <Link
                    href="/login"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${pathname === '/login'
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                >
                    Log In
                </Link>
                <Link
                    href="/signup"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${pathname === '/signup'
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                >
                    Sign Up
                </Link>
            </div>
        </nav>
    );
}

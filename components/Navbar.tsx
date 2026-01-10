'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LogOut } from 'lucide-react';

interface NavbarProps {
    userName: string;
    isAdmin: boolean;
}

export default function Navbar({ userName, isAdmin }: NavbarProps) {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-background border-b border-border sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <Link href={isAdmin ? '/admin/dashboard' : '/dashboard'} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white shadow-sm ring-1 ring-black/5">
                        <img
                            src="/logo.png"
                            alt="Nupur Dance Academy"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <span className="font-bold text-lg tracking-tight">Nupur Dance Academy</span>
                </Link>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold">{userName}</span>
                    {isAdmin && <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">Admin</span>}
                </div>
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary px-4 py-2 rounded-md transition-all sm:w-auto"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign Out</span>
                </button>
            </div>
        </nav>
    );
}

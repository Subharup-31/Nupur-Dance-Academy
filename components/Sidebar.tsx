'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LayoutDashboard, History, Users, LogOut, ChevronRight } from 'lucide-react';

interface SidebarProps {
    userName: string;
    userRole?: string;
    isAdmin?: boolean;
}

export default function Sidebar({ userName, userRole = 'Student', isAdmin = false }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    const isActive = (path: string) => pathname === path;

    const NavLink = ({ href, icon: Icon, label, active }: { href: string; icon: typeof LayoutDashboard; label: string; active: boolean }) => (
        <Link
            href={href}
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
        >
            <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}`} />
            <span className="flex-1">{label}</span>
            {active && <ChevronRight className="w-4 h-4 opacity-50" />}
        </Link>
    );

    return (
        <aside className="w-full md:w-64 flex flex-col p-4 md:p-5 bg-card border-b md:border-b-0 md:border-r border-border h-auto md:h-full shrink-0">
            {/* User Profile */}
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-base shrink-0 shadow-sm ring-2 ring-primary/20">
                    {userName.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden flex-1 min-w-0">
                    <div className="font-semibold text-foreground truncate text-sm">{userName}</div>
                    <div className="text-xs text-muted-foreground">{isAdmin ? 'Administrator' : 'Student Account'}</div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1 flex-1">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                    Menu
                </p>

                {isAdmin ? (
                    <NavLink
                        href="/admin/dashboard"
                        icon={Users}
                        label="Students"
                        active={isActive('/admin/dashboard')}
                    />
                ) : (
                    <>
                        <NavLink
                            href="/dashboard"
                            icon={LayoutDashboard}
                            label="Overview"
                            active={isActive('/dashboard')}
                        />
                        <NavLink
                            href="/dashboard/history"
                            icon={History}
                            label="History"
                            active={isActive('/dashboard/history')}
                        />
                    </>
                )}

                {/* Spacer */}
                <div className="flex-1 min-h-4"></div>

                {/* Sign Out */}
                <div className="pt-4 border-t border-border mt-2">
                    <button
                        onClick={handleSignOut}
                        className="group flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <LogOut className="w-4 h-4 shrink-0 group-hover:text-destructive" />
                        Sign Out
                    </button>
                </div>
            </nav>
        </aside>
    );
}

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getMyEntries, getTodayEntry, getProfile } from '@/lib/actions';
import EntryForm from '@/components/EntryForm';
import EntryList from '@/components/EntryList';
import Sidebar from '@/components/Sidebar';
import { Clock } from 'lucide-react';

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const [{ profile }, { entry: todayEntry }, { entries }] = await Promise.all([
        getProfile(),
        getTodayEntry(),
        getMyEntries(),
    ]);

    console.log('DEBUG DASHBOARD: Role check for user:', profile?.name, 'Role:', profile?.role);

    if (profile?.role === 'admin') {
        redirect('/admin/dashboard');
    }

    return (
        <div className="flex min-h-screen min-h-[100dvh] w-full bg-background flex-col sm:flex-row">
            <Sidebar
                userName={profile?.name || user?.user_metadata?.name || 'Student'}
                userRole="Student"
                isAdmin={false}
            />

            <main className="flex-1 flex flex-col p-4 sm:p-5 md:p-6 lg:p-8 w-full overflow-x-hidden">
                <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
                    {/* Header */}
                    <header className="mb-4 sm:mb-6 shrink-0">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1">Dashboard</h1>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            Welcome back, <span className="font-medium text-foreground">{profile?.name || user?.user_metadata?.name}</span>
                        </p>
                    </header>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_320px] gap-4 sm:gap-6">
                        {/* Entry Form (Main Box) */}
                        <section className="flex flex-col order-1">
                            <div className="flex-1 min-h-[280px] sm:min-h-[350px] bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                                <EntryForm hasSubmittedToday={!!todayEntry} />
                            </div>
                        </section>

                        {/* Recent Activity (Sidebar) */}
                        <section className="flex flex-col order-2">
                            <div className="flex items-center gap-2 mb-2 sm:mb-3 shrink-0">
                                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                                <h2 className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wider">
                                    Recent Activity
                                </h2>
                            </div>
                            <div className="flex-1 bg-card rounded-xl border border-border overflow-hidden min-h-[200px] max-h-[350px] lg:max-h-none">
                                <div className="h-full overflow-y-auto scrollbar-thin">
                                    <EntryList entries={entries} />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

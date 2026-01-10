import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getMyEntries, getProfile } from '@/lib/actions';
import Sidebar from '@/components/Sidebar';
import EntryList from '@/components/EntryList';
import { History, BookMarked } from 'lucide-react';

export default async function HistoryPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const [{ profile }, { entries }] = await Promise.all([
        getProfile(),
        getMyEntries(),
    ]);

    return (
        <div className="flex h-screen w-full bg-background flex-col md:flex-row overflow-hidden">
            <Sidebar
                userName={profile?.name || user?.user_metadata?.name || 'Student'}
                userRole="Student"
                isAdmin={false}
            />

            <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 w-full overflow-hidden">
                <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <header className="mb-6 shrink-0">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <History className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground">My History</h1>
                        </div>
                        <p className="text-sm text-muted-foreground ml-12">
                            A complete log of your dance journey
                        </p>
                    </header>

                    {/* Entries Container */}
                    <div className="flex-1 bg-card rounded-xl border border-border overflow-hidden flex flex-col">
                        {entries.length > 0 ? (
                            <>
                                {/* Stats Bar */}
                                <div className="shrink-0 px-4 py-3 border-b border-border bg-secondary/30 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <BookMarked className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm font-medium text-foreground">
                                            {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                                        </span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        Most recent first
                                    </span>
                                </div>
                                {/* Entry List */}
                                <div className="flex-1 overflow-y-auto scrollbar-thin">
                                    <EntryList entries={entries} />
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                                    <History className="w-7 h-7 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">No history yet</h3>
                                <p className="text-sm text-muted-foreground max-w-xs">
                                    Start logging your classes from the dashboard to build your dance journey history.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

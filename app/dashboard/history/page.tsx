import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getMyEntries, getProfile } from '@/lib/actions';
import Sidebar from '@/components/Sidebar';
import HistoryContent from '@/components/HistoryContent';
import { History } from 'lucide-react';

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

                    {/* History Content - Client Component */}
                    <HistoryContent entries={entries} />
                </div>
            </main>
        </div>
    );
}

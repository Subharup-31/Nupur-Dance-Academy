import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getAllStudents, getStudentEntries, getAllEntries, getProfile } from '@/lib/actions';
import Sidebar from '@/components/Sidebar';
import StudentList from '@/components/StudentList';
import EntryList from '@/components/EntryList';
import Link from 'next/link';
import { ArrowLeft, Users, Activity } from 'lucide-react';

interface AdminDashboardProps {
    searchParams: Promise<{ student?: string }>;
}

export default async function AdminDashboardPage({ searchParams }: AdminDashboardProps) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { profile } = await getProfile();

    if (profile?.role !== 'admin') {
        redirect('/dashboard');
    }

    const params = await searchParams;
    const selectedStudentId = params.student;

    const { students } = await getAllStudents();
    const { entries: allEntries } = await getAllEntries();

    // Calculate entry counts per student
    const entryCounts: Record<string, number> = {};
    allEntries.forEach((entry) => {
        entryCounts[entry.student_id] = (entryCounts[entry.student_id] || 0) + 1;
    });

    // Get selected student's entries if a student is selected
    let selectedStudentEntries: Awaited<ReturnType<typeof getStudentEntries>>['entries'] = [];
    let selectedStudent = null;

    if (selectedStudentId) {
        const result = await getStudentEntries(selectedStudentId);
        selectedStudentEntries = result.entries;
        selectedStudent = students.find(s => s.id === selectedStudentId);
    }

    return (
        <div className="flex min-h-screen min-h-[100dvh] w-full bg-background flex-col sm:flex-row">
            <Sidebar
                userName={profile?.name || 'Admin'}
                userRole="Admin"
                isAdmin={true}
            />

            <main className="flex-1 flex flex-col p-4 sm:p-5 md:p-6 lg:p-8 w-full overflow-x-hidden">
                <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
                    {/* Header */}
                    <header className="mb-4 sm:mb-6 shrink-0">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1">Overview</h1>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            Monitor student progress and learning logs
                        </p>
                    </header>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-4 sm:gap-6">
                        {/* Students List */}
                        <aside className="flex flex-col order-2 lg:order-1">
                            <div className="flex items-center gap-2 mb-2 sm:mb-3 shrink-0">
                                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                                <h2 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                    Students ({students.length})
                                </h2>
                            </div>
                            <div className="bg-card rounded-xl border border-border overflow-hidden min-h-[150px] max-h-[250px] lg:max-h-none lg:flex-1">
                                <div className="h-full overflow-y-auto scrollbar-thin">
                                    <StudentList students={students} entryCounts={entryCounts} />
                                </div>
                            </div>
                        </aside>

                        {/* Entry Detail Panel */}
                        <section className="flex flex-col order-1 lg:order-2">
                            <div className="flex-1 min-h-[280px] sm:min-h-[350px] lg:min-h-0 bg-card rounded-xl border border-border overflow-hidden flex flex-col">
                                {selectedStudent ? (
                                    <>
                                        {/* Selected Student Header */}
                                        <div className="shrink-0 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-border bg-secondary/30 flex items-center gap-2 sm:gap-3 flex-wrap">
                                            <Link
                                                href="/admin/dashboard"
                                                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                            >
                                                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                <span className="hidden sm:inline">Back</span>
                                            </Link>
                                            <div className="h-4 sm:h-5 w-px bg-border hidden sm:block"></div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] sm:text-xs font-semibold">
                                                    {selectedStudent.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-semibold text-foreground text-sm">{selectedStudent.name}</span>
                                            </div>
                                            <span className="ml-auto text-[10px] sm:text-xs text-muted-foreground">
                                                {selectedStudentEntries.length} {selectedStudentEntries.length === 1 ? 'entry' : 'entries'}
                                            </span>
                                        </div>
                                        {/* Entries */}
                                        <div className="flex-1 overflow-y-auto scrollbar-thin">
                                            <EntryList entries={selectedStudentEntries} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Default View Header */}
                                        <div className="shrink-0 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-border bg-secondary/30 flex items-center gap-2">
                                            <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                                            <h2 className="font-semibold text-foreground text-xs sm:text-sm">Latest Activity</h2>
                                            <span className="ml-auto text-[10px] sm:text-xs text-muted-foreground hidden sm:block">
                                                Select a student to view details
                                            </span>
                                        </div>
                                        {/* Recent Entries */}
                                        <div className="flex-1 overflow-y-auto scrollbar-thin">
                                            <EntryList entries={allEntries.slice(0, 20)} showStudentName={true} />
                                        </div>
                                    </>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

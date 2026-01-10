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

    const { students, error: studentsError } = await getAllStudents();
    const { entries: allEntries, error: entriesError } = await getAllEntries();

    console.log('[AdminDashboard] Students fetch result:', students?.length, 'Error:', studentsError);
    console.log('[AdminDashboard] Entries fetch result:', allEntries?.length, 'Error:', entriesError);
    if (studentsError) console.error(studentsError);
    if (entriesError) console.error(entriesError);

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
        <div className="flex h-screen w-full bg-background flex-col md:flex-row overflow-hidden">
            <Sidebar
                userName={profile?.name || 'Admin'}
                userRole="Admin"
                isAdmin={true}
            />

            <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 w-full overflow-hidden">
                <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <header className="mb-6 shrink-0">
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Overview</h1>
                        <p className="text-sm text-muted-foreground">
                            Monitor student progress and learning logs
                        </p>
                    </header>

                    {/* Main Grid */}
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 overflow-hidden min-h-0">
                        {/* Students List */}
                        <aside className="flex flex-col overflow-hidden min-h-0 order-2 lg:order-1">
                            <div className="flex items-center gap-2 mb-3 shrink-0">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Students ({students.length})
                                </h2>
                            </div>
                            <div className="overflow-y-auto flex-1 scrollbar-thin pr-1">
                                <StudentList students={students} entryCounts={entryCounts} />
                            </div>
                        </aside>

                        {/* Entry Detail Panel */}
                        <section className="flex flex-col overflow-hidden order-1 lg:order-2 min-h-[400px] lg:min-h-0">
                            <div className="flex-1 bg-card rounded-xl border border-border overflow-hidden flex flex-col">
                                {selectedStudent ? (
                                    <>
                                        {/* Selected Student Header */}
                                        <div className="shrink-0 px-4 py-3 border-b border-border bg-secondary/30 flex items-center gap-3">
                                            <Link
                                                href="/admin/dashboard"
                                                className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                            >
                                                <ArrowLeft className="w-4 h-4" />
                                                Back
                                            </Link>
                                            <div className="h-5 w-px bg-border"></div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                                                    {selectedStudent.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-semibold text-foreground">{selectedStudent.name}</span>
                                            </div>
                                            <span className="ml-auto text-xs text-muted-foreground">
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
                                        <div className="shrink-0 px-4 py-3 border-b border-border bg-secondary/30 flex items-center gap-2">
                                            <Activity className="w-4 h-4 text-muted-foreground" />
                                            <h2 className="font-semibold text-foreground text-sm">Latest Activity</h2>
                                            <span className="ml-auto text-xs text-muted-foreground">
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

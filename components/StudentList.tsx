import Link from 'next/link';
/**
 * StudentList component displays student profiles for administrators.
 */
import { Profile } from '@/lib/types';
import { User, FileText, CalendarDays, ChevronRight } from 'lucide-react';

interface StudentListProps {
    students: Profile[];
    entryCounts: Record<string, number>;
}

export default function StudentList({ students, entryCounts }: StudentListProps) {
    if (students.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-border rounded-xl">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">No students yet</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Students will appear here once they sign up</p>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="flex flex-col gap-2">
            {students.map((student) => {
                const entryCount = entryCounts[student.id] || 0;

                return (
                    <Link
                        key={student.id}
                        href={`/admin/dashboard?student=${student.id}`}
                        className="group bg-card border border-border rounded-xl p-4 flex items-center gap-3 hover:border-primary/30 hover:shadow-md hover:bg-secondary/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-primary/10 border border-border text-primary flex items-center justify-center shrink-0 font-semibold text-sm group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors duration-200">
                            {student.name.charAt(0).toUpperCase()}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                                {student.name}
                            </h3>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                <CalendarDays className="w-3 h-3" />
                                Joined {formatDate(student.created_at)}
                            </p>
                        </div>

                        {/* Entry Count Badge */}
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="flex items-center gap-1.5 bg-secondary border border-border rounded-lg px-2.5 py-1.5 group-hover:bg-card transition-colors">
                                <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                                <span className="text-sm font-bold text-foreground tabular-nums">{entryCount}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

import Link from 'next/link';
/**
 * StudentList component displays student profiles for administrators.
 * Optimized for mobile and desktop layouts.
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
            <div className="flex flex-col items-center justify-center py-10 sm:py-16 px-4 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center mb-3 sm:mb-4">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">No students yet</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground/70 mt-1">Students will appear here once they sign up</p>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="flex flex-col">
            {students.map((student, index) => {
                const entryCount = entryCounts[student.id] || 0;

                return (
                    <Link
                        key={student.id}
                        href={`/admin/dashboard?student=${student.id}`}
                        className={`group flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 hover:bg-secondary/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${index !== students.length - 1 ? 'border-b border-border' : ''
                            }`}
                    >
                        {/* Avatar */}
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-semibold text-xs sm:text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                            {student.name.charAt(0).toUpperCase()}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-xs sm:text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                                {student.name}
                            </h3>
                            <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                <CalendarDays className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                {formatDate(student.created_at)}
                            </p>
                        </div>

                        {/* Entry Count Badge */}
                        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                            <div className="flex items-center gap-1 sm:gap-1.5 bg-secondary rounded-md sm:rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5">
                                <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground" />
                                <span className="text-xs sm:text-sm font-bold text-foreground tabular-nums">{entryCount}</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

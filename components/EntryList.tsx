/**
 * EntryList component displays a list of class entries.
 * Optimized for mobile and desktop layouts.
 * Can be used in both student dashboard and admin dashboard.
 */
import { ClassEntry, ClassEntryWithStudent } from '@/lib/types';
import { FileText, User, Calendar, BookOpen } from 'lucide-react';

interface EntryListProps {
    entries: ClassEntry[];
    showStudentName?: boolean;
}

export default function EntryList({ entries, showStudentName = false }: EntryListProps) {
    if (entries.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-10 sm:py-16 px-4 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center mb-3 sm:mb-4">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">No entries found</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground/70 mt-1">Start logging your classes to see them here</p>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    const formatFullDate = (dateString: string) => {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="flex flex-col">
            {entries.map((entry, index) => (
                <article
                    key={entry.id}
                    className={`group p-3 sm:p-4 hover:bg-secondary/50 transition-colors duration-150 ${index !== entries.length - 1 ? 'border-b border-border' : ''
                        }`}
                >
                    <div className="flex items-start gap-2.5 sm:gap-3">
                        {/* Icon */}
                        <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                            {showStudentName && 'profiles' in entry ? (
                                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                            ) : (
                                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                                <h4 className="font-medium text-foreground text-xs sm:text-sm truncate">
                                    {showStudentName && 'profiles' in entry
                                        ? (entry as unknown as { profiles: { name: string } }).profiles?.name
                                        : 'Learning Log'}
                                </h4>
                                <time
                                    dateTime={entry.entry_date}
                                    title={formatFullDate(entry.entry_date)}
                                    className="flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-muted-foreground bg-secondary px-1.5 sm:px-2 py-0.5 rounded shrink-0"
                                >
                                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                    {formatDate(entry.entry_date)}
                                </time>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                {entry.content}
                            </p>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}

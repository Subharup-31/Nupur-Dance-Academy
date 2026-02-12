'use client';

import { useState } from 'react';
import { ClassEntry } from '@/lib/types';
import EntryList from '@/components/EntryList';
import EntryDetailModal from '@/components/EntryDetailModal';
import { History, BookMarked } from 'lucide-react';

interface HistoryContentProps {
    entries: ClassEntry[];
}

export default function HistoryContent({ entries }: HistoryContentProps) {
    const [selectedEntry, setSelectedEntry] = useState<ClassEntry | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEntryClick = (entry: ClassEntry) => {
        setSelectedEntry(entry);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedEntry(null), 200);
    };

    return (
        <>
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
                            <EntryList entries={entries} onEntryClick={handleEntryClick} />
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

            {/* Entry Detail Modal */}
            <EntryDetailModal
                entry={selectedEntry}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}

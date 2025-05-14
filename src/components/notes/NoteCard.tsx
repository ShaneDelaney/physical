import React from 'react';
import Image from 'next/image';
import { ClipboardDocumentCheckIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Note } from '@/types';
import { formatDate, truncateText, cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface NoteCardProps {
  note: Note;
  onCreateTask: (note: Note) => void;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  className?: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onCreateTask, onEdit, onDelete, className }) => {
  return (
    <div className={cn("note-card", className)}>
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-lg">
          Note from {formatDate(note.createdAt)}
        </h3>
        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-3">
        <div className="relative h-32 w-full sm:w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded-lg overflow-hidden">
          <Image
            src={note.imageUrl}
            alt="Handwritten note"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        
        <div className="flex-1">
          <p className="text-sm text-neutral-600 dark:text-neutral-300 whitespace-pre-line">
            {truncateText(note.extractedText, 200)}
          </p>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(note)}
          className="text-danger hover:text-danger hover:bg-danger-50 dark:hover:bg-danger-900/20"
        >
          <TrashIcon className="w-4 h-4 mr-1" />
          <span>Delete</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(note)}
        >
          <PencilSquareIcon className="w-4 h-4 mr-1" />
          <span>Edit</span>
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onCreateTask(note)}
          className="bg-primary-50 text-primary hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/30"
        >
          <ClipboardDocumentCheckIcon className="w-4 h-4 mr-1" />
          <span>Create Tasks</span>
        </Button>
      </div>
    </div>
  );
};

export default NoteCard; 
import React from 'react';
import Image from 'next/image';
import { ClipboardDocumentCheckIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Note } from '@/types';
import { formatDate, truncateText } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface NoteCardProps {
  note: Note;
  onCreateTask: (note: Note) => void;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onCreateTask, onEdit, onDelete }) => {
  return (
    <div className="note-card flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">
          Note from {formatDate(note.createdAt)}
        </h3>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative h-32 w-full sm:w-1/3 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
          <Image
            src={note.imageUrl}
            alt="Handwritten note"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
            {truncateText(note.extractedText, 200)}
          </p>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 mt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(note)}
          className="text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-950 dark:border-red-800"
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
        >
          <ClipboardDocumentCheckIcon className="w-4 h-4 mr-1" />
          <span>Create Tasks</span>
        </Button>
      </div>
    </div>
  );
};

export default NoteCard; 
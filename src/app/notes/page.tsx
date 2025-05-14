'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import NoteCard from '@/components/notes/NoteCard';
import { Note } from '@/types';
import { generateSmartTaskSuggestions } from '@/utils/ocr';
import Button from '@/components/ui/Button';

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll load from localStorage
    try {
      const storedNotes = localStorage.getItem('notes');
      if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes);
        setNotes(parsedNotes);
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteNote = useCallback((noteToDelete: Note) => {
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.filter(note => note.id !== noteToDelete.id);
      // Update localStorage
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  }, []);

  const handleEditNote = useCallback((noteToEdit: Note) => {
    // In a real app, this would open an edit modal or navigate to an edit page
    console.log('Edit note:', noteToEdit);
  }, []);

  const handleCreateTask = useCallback(async (note: Note) => {
    // In a real app, this would navigate to the task creation page with the note context
    const taskSuggestions = await generateSmartTaskSuggestions(note.extractedText);
    
    // Store the suggestions in localStorage to be used in the tasks page
    localStorage.setItem('currentTaskSuggestions', JSON.stringify(taskSuggestions));
    localStorage.setItem('currentNoteId', note.id);
    
    // Navigate to the tasks page
    window.location.href = '/tasks/create';
  }, []);

  const filteredNotes = notes.filter(note => 
    note.extractedText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-app py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Notes</h1>
        <Link href="/capture">
          <Button 
            variant="primary" 
            size="sm"
            startIcon={<PlusIcon className="w-4 h-4" />}
          >
            New
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-neutral-400" />
        </div>
        <input
          type="text"
          className="glass-panel-subtle w-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : notes.length === 0 ? (
        <div className="glass-panel p-8 text-center">
          <h3 className="text-lg font-medium mb-4">No notes yet</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Capture your handwritten notes to get started
          </p>
          <Button
            variant="primary"
            startIcon={<PlusIcon className="w-5 h-5" />}
          >
            <Link href="/capture" className="w-full h-full flex items-center justify-center">
              Capture a Note
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {filteredNotes.length === 0 ? (
            <div className="col-span-full text-center py-8 glass-panel-subtle">
              <p>No notes match your search</p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onCreateTask={handleCreateTask}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))
          )}
        </div>
      )}
      
      <Link href="/capture" className="floating-action-button">
        <PlusIcon className="w-6 h-6" />
      </Link>
    </div>
  );
} 
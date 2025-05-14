'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CalendarIcon, PlusIcon, ClockIcon, BellIcon, TagIcon, 
  CheckIcon, XMarkIcon, ArrowLeftIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import TaskSuggestionList from '@/components/tasks/TaskSuggestionList';
import NavBar from '@/components/ui/NavBar';
import { Task, TaskSuggestion } from '@/types';
import { formatDate, generateId } from '@/lib/utils';

export default function CreateTaskPage() {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<TaskSuggestion[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  
  useEffect(() => {
    // Try to load task suggestions if we're coming from the note page
    try {
      const storedSuggestions = localStorage.getItem('currentTaskSuggestions');
      if (storedSuggestions) {
        setSuggestions(JSON.parse(storedSuggestions));
      }
    } catch (error) {
      console.error('Error loading suggestions:', error);
    }
  }, []);
  
  const handleAcceptSuggestion = (suggestion: TaskSuggestion) => {
    setTitle(suggestion.title);
    if (suggestion.description) setDescription(suggestion.description);
    setPriority(suggestion.priority);
    if (suggestion.dueDate) setDueDate(suggestion.dueDate);
    setTags(suggestion.tags);
    
    // Remove this suggestion from the list
    setSuggestions(prev => prev.filter(s => s.title !== suggestion.title));
  };
  
  const handleRejectSuggestion = (suggestion: TaskSuggestion) => {
    setSuggestions(prev => prev.filter(s => s.title !== suggestion.title));
  };
  
  const handleAcceptAllSuggestions = () => {
    // Create tasks for all suggestions
    const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const noteId = localStorage.getItem('currentNoteId');
    
    const newTasks = suggestions.map(suggestion => {
      return {
        id: generateId(),
        userId: 'user-1', // In a real app, this would be the authenticated user's ID
        noteId: noteId || undefined,
        title: suggestion.title,
        description: suggestion.description || '',
        priority: suggestion.priority,
        status: 'pending' as const,
        dueDate: suggestion.dueDate,
        tags: suggestion.tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    });
    
    localStorage.setItem('tasks', JSON.stringify([...existingTasks, ...newTasks]));
    
    // Clear suggestions
    localStorage.removeItem('currentTaskSuggestions');
    localStorage.removeItem('currentNoteId');
    
    // Navigate back to tasks page
    router.push('/tasks');
  };
  
  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags(prev => [...prev, currentTag.trim()]);
      setCurrentTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };
  
  const handleCreateTask = () => {
    if (!title.trim()) return;
    
    const newTask: Task = {
      id: generateId(),
      userId: 'user-1', // In a real app, this would be the authenticated user's ID
      noteId: localStorage.getItem('currentNoteId') || undefined,
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      status: 'pending',
      dueDate: dueDate || undefined,
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Save the new task
    const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    localStorage.setItem('tasks', JSON.stringify([...existingTasks, newTask]));
    
    // Clear form and suggestions
    localStorage.removeItem('currentTaskSuggestions');
    localStorage.removeItem('currentNoteId');
    
    // Navigate back to tasks page
    router.push('/tasks');
  };
  
  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.back()} 
            className="mr-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">Create Task</h1>
        </div>
        
        {/* AI Suggestions */}
        <TaskSuggestionList 
          suggestions={suggestions}
          onAccept={handleAcceptSuggestion}
          onReject={handleRejectSuggestion}
          onAcceptAll={handleAcceptAllSuggestions}
        />
        
        {/* Task Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 min-h-[100px]"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Priority
            </label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={priority === 'low' ? 'default' : 'outline'}
                size="sm"
                className={priority === 'low' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                onClick={() => setPriority('low')}
              >
                Low
              </Button>
              <Button
                type="button"
                variant={priority === 'medium' ? 'default' : 'outline'}
                size="sm"
                className={priority === 'medium' ? 'bg-amber-500 hover:bg-amber-600' : ''}
                onClick={() => setPriority('medium')}
              >
                Medium
              </Button>
              <Button
                type="button"
                variant={priority === 'high' ? 'default' : 'outline'}
                size="sm"
                className={priority === 'high' ? 'bg-red-500 hover:bg-red-600' : ''}
                onClick={() => setPriority('high')}
              >
                High
              </Button>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
              Due Date
            </label>
            <div className="flex items-center">
              <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="date"
                id="dueDate"
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900"
                value={dueDate ? new Date(dueDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setDueDate(e.target.value ? new Date(e.target.value).toISOString() : '')}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm font-medium mb-1">
              Tags
            </label>
            <div className="flex items-center">
              <TagIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                id="tags"
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900"
                placeholder="Add a tag and press Enter"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleAddTag}
                className="ml-2"
              >
                <PlusIcon className="w-5 h-5" />
              </Button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <div 
                    key={tag} 
                    className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end mt-6">
            <Button
              type="button"
              variant="outline"
              className="mr-2"
              onClick={() => router.push('/tasks')}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!title.trim()}
              onClick={handleCreateTask}
            >
              <CheckIcon className="w-5 h-5 mr-1" />
              Create Task
            </Button>
          </div>
        </div>
      </div>
      
      <NavBar />
    </div>
  );
} 
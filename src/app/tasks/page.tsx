'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Task } from '@/types';
import TaskItem from '@/components/tasks/TaskItem';
import NavBar from '@/components/ui/NavBar';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'date'>('date');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Mock loading tasks from API/localStorage
  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: '1',
        userId: 'user123',
        title: 'Review project proposal',
        description: 'Go through the project proposal and provide feedback',
        priority: 'high',
        status: 'pending',
        dueDate: new Date(Date.now() + 86400000).toISOString(), // tomorrow
        tags: ['work', 'review'],
        noteId: '123',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        userId: 'user123',
        title: 'Buy groceries',
        description: 'Milk, eggs, bread, and vegetables',
        priority: 'medium',
        status: 'completed',
        dueDate: new Date().toISOString(),
        tags: ['personal', 'shopping'],
        noteId: '124',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        userId: 'user123',
        title: 'Prepare presentation slides',
        description: 'Create slides for the quarterly meeting',
        priority: 'high',
        status: 'pending',
        dueDate: new Date(Date.now() + 172800000).toISOString(), // day after tomorrow
        tags: ['work', 'meeting'],
        noteId: '125',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    setTimeout(() => {
      setTasks(mockTasks);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort tasks
  const filteredAndSortedTasks = React.useMemo(() => {
    let filtered = tasks;
    if (filter !== 'all') {
      filtered = tasks.filter(task => 
        filter === 'completed' ? task.status === 'completed' : task.status !== 'completed'
      );
    }

    return [...filtered].sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority as keyof typeof priorityOrder] - 
               priorityOrder[b.priority as keyof typeof priorityOrder];
      } else {
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        } else if (a.dueDate) {
          return -1; // a has due date, b doesn't, so a comes first
        } else if (b.dueDate) {
          return 1; // b has due date, a doesn't, so b comes first
        } else {
          // If neither has due date, sort by creation date
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
      }
    });
  }, [tasks, filter, sortBy]);

  const handleStatusChange = (task: Task, status: Task['status']) => {
    setTasks(prev => 
      prev.map(t => 
        t.id === task.id ? { ...t, status, updatedAt: new Date().toISOString() } : t
      )
    );
  };

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    // Navigate to task detail or open modal
  };

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Tasks</h1>
          <Link href="/tasks/create" className="floating-action-button -mt-2">
            <PlusIcon className="w-6 h-6" />
          </Link>
        </div>
        
        {/* Filters and Sort Options */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-l-md ${filter === 'all' ? 'bg-blue-100 dark:bg-blue-900/30 text-primary' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium ${filter === 'pending' ? 'bg-blue-100 dark:bg-blue-900/30 text-primary' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-r-md ${filter === 'completed' ? 'bg-blue-100 dark:bg-blue-900/30 text-primary' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          
          <div className="flex items-center ml-auto gap-2">
            <FunnelIcon className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              className="bg-white dark:bg-gray-800 text-sm border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1.5"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'priority' | 'date')}
            >
              <option value="date">Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Create tasks from your notes or add them manually
            </p>
            <Link
              href="/tasks/create"
              className="btn-primary inline-flex items-center justify-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Create Task
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAndSortedTasks.length === 0 ? (
              <p className="text-center py-4">No tasks match your filters</p>
            ) : (
              filteredAndSortedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onSelect={handleSelectTask}
                />
              ))
            )}
          </div>
        )}
      </div>

      <NavBar />
    </div>
  );
} 
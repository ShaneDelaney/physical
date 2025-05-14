import React from 'react';
import { Task } from '@/types';
import { formatDate, isToday, isTomorrow } from '@/lib/utils';
import { CheckCircleIcon, BellIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';

interface TaskItemProps {
  task: Task;
  onStatusChange: (task: Task, status: Task['status']) => void;
  onSelect: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange, onSelect }) => {
  const isCompleted = task.status === 'completed';
  
  const handleStatusToggle = () => {
    const newStatus = isCompleted ? 'pending' : 'completed';
    onStatusChange(task, newStatus);
  };
  
  const renderDueDate = () => {
    if (!task.dueDate) return null;
    
    let dateDisplay = formatDate(task.dueDate);
    let colorClass = 'text-gray-500 dark:text-gray-400';
    
    if (isToday(task.dueDate)) {
      dateDisplay = 'Today';
      colorClass = 'text-blue-500 font-medium';
    } else if (isTomorrow(task.dueDate)) {
      dateDisplay = 'Tomorrow';
      colorClass = 'text-indigo-500 font-medium';
    } else if (new Date(task.dueDate) < new Date()) {
      colorClass = 'text-red-500 font-medium';
    }
    
    return (
      <div className={`flex items-center gap-1 text-xs ${colorClass}`}>
        <CalendarIcon className="w-3 h-3" />
        <span>{dateDisplay}</span>
      </div>
    );
  };
  
  return (
    <div 
      className={`task-item ${isCompleted ? 'opacity-75' : ''}`}
      onClick={() => onSelect(task)}
    >
      <button 
        className="flex-shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          handleStatusToggle();
        }}
      >
        {isCompleted ? (
          <CheckCircleSolidIcon className="w-6 h-6 text-green-500" />
        ) : (
          <CheckCircleIcon className="w-6 h-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
        )}
      </button>
      
      <div className="flex-1 min-w-0">
        <h3 className={`text-sm font-medium truncate ${isCompleted ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
          {task.title}
        </h3>
        
        {task.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
            {task.description}
          </p>
        )}
        
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {renderDueDate()}
          
          {task.reminderType && task.reminderType !== 'none' && (
            <div className="flex items-center gap-1 text-xs text-purple-500">
              <BellIcon className="w-3 h-3" />
              <span>Reminder</span>
            </div>
          )}
          
          {task.tags && task.tags.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <TagIcon className="w-3 h-3" />
              <span>{task.tags[0]}{task.tags.length > 1 && ` +${task.tags.length - 1}`}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 ml-auto">
            <span className={`h-2 w-2 rounded-full ${
              task.priority === 'high' 
                ? 'bg-red-500' 
                : task.priority === 'medium' 
                  ? 'bg-yellow-500' 
                  : 'bg-blue-500'
            }`} />
            <span className="capitalize">{task.priority}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem; 
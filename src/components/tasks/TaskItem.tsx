import React from 'react';
import { Task } from '@/types';
import { formatDate, isToday, isTomorrow, cn } from '@/lib/utils';
import { CheckCircleIcon, BellIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';

interface TaskItemProps {
  task: Task;
  onStatusChange: (task: Task, status: Task['status']) => void;
  onSelect: (task: Task) => void;
  className?: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange, onSelect, className }) => {
  const isCompleted = task.status === 'completed';
  
  const handleStatusToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = isCompleted ? 'pending' : 'completed';
    onStatusChange(task, newStatus);
  };
  
  const renderDueDate = () => {
    if (!task.dueDate) return null;
    
    let dateDisplay = formatDate(task.dueDate);
    let colorClass = 'text-neutral-500 dark:text-neutral-400';
    
    if (isToday(task.dueDate)) {
      dateDisplay = 'Today';
      colorClass = 'text-primary-600 dark:text-primary-400 font-medium';
    } else if (isTomorrow(task.dueDate)) {
      dateDisplay = 'Tomorrow';
      colorClass = 'text-primary-500 dark:text-primary-400 font-medium';
    } else if (new Date(task.dueDate) < new Date()) {
      colorClass = 'text-danger font-medium';
    }
    
    return (
      <div className={`flex items-center gap-1 text-xs ${colorClass}`}>
        <CalendarIcon className="w-3.5 h-3.5" />
        <span>{dateDisplay}</span>
      </div>
    );
  };
  
  const priorityColors = {
    high: 'bg-danger text-white',
    medium: 'bg-warning text-neutral-900',
    low: 'bg-success text-white'
  };
  
  return (
    <div 
      className={cn(
        "task-item group transition-all hover:shadow-md cursor-pointer",
        isCompleted ? "opacity-75" : "",
        className
      )}
      onClick={() => onSelect(task)}
    >
      <button 
        className="flex-shrink-0 transition-transform group-hover:scale-110"
        onClick={handleStatusToggle}
        aria-label={isCompleted ? "Mark as pending" : "Mark as completed"}
      >
        {isCompleted ? (
          <CheckCircleSolidIcon className="w-6 h-6 text-success" />
        ) : (
          <CheckCircleIcon className="w-6 h-6 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200" />
        )}
      </button>
      
      <div className="flex-1 min-w-0">
        <h3 className={cn(
          "text-sm font-medium truncate",
          isCompleted && "line-through text-neutral-500 dark:text-neutral-400"
        )}>
          {task.title}
        </h3>
        
        {task.description && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
            {task.description}
          </p>
        )}
        
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {renderDueDate()}
          
          {task.reminderType && task.reminderType !== 'none' && (
            <div className="flex items-center gap-1 text-xs text-accent-500 dark:text-accent-400">
              <BellIcon className="w-3.5 h-3.5" />
              <span>Reminder</span>
            </div>
          )}
          
          {task.tags && task.tags.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
              <TagIcon className="w-3.5 h-3.5" />
              <span>{task.tags[0]}{task.tags.length > 1 && ` +${task.tags.length - 1}`}</span>
            </div>
          )}
          
          <div className="ml-auto">
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full font-medium capitalize",
              priorityColors[task.priority as keyof typeof priorityColors]
            )}>
              {task.priority}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem; 
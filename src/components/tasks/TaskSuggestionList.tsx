import React from 'react';
import { TaskSuggestion } from '@/types';
import Button from '@/components/ui/Button';
import { CheckIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

interface TaskSuggestionListProps {
  suggestions: TaskSuggestion[];
  onAccept: (suggestion: TaskSuggestion) => void;
  onReject: (suggestion: TaskSuggestion) => void;
  onAcceptAll: () => void;
}

const TaskSuggestionList: React.FC<TaskSuggestionListProps> = ({
  suggestions,
  onAccept,
  onReject,
  onAcceptAll,
}) => {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">AI Suggested Tasks</h3>
        {suggestions.length > 1 && (
          <Button 
            size="sm" 
            variant="secondary"
            onClick={onAcceptAll}
            className="text-xs"
          >
            Accept All
          </Button>
        )}
      </div>
      
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div 
            key={index} 
            className="border border-gray-200 dark:border-gray-700 rounded-md p-3 bg-gray-50 dark:bg-gray-900"
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <h4 className="font-medium">{suggestion.title}</h4>
                {suggestion.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {suggestion.description}
                  </p>
                )}
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {suggestion.dueDate && (
                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                      Due: {new Date(suggestion.dueDate).toLocaleDateString()}
                    </span>
                  )}
                  
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    suggestion.priority === 'high' 
                      ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' 
                      : suggestion.priority === 'medium' 
                        ? 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300' 
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  }`}>
                    {suggestion.priority.charAt(0).toUpperCase() + suggestion.priority.slice(1)} Priority
                  </span>
                  
                  {suggestion.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onReject(suggestion)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <XMarkIcon className="w-5 h-5" />
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onAccept(suggestion)}
                  className="text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                >
                  <PlusIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskSuggestionList; 
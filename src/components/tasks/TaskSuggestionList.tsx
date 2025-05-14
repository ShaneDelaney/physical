import React, { useState } from 'react';
import { TaskSuggestion } from '@/types';
import Button from '@/components/ui/Button';
import { CheckIcon, XMarkIcon, PlusIcon, FaceSmileIcon, FaceFrownIcon } from '@heroicons/react/24/outline';
import { provideTaskSuggestionFeedback } from '@/utils/ocr';

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
  const [feedback, setFeedback] = useState<Record<number, boolean | null>>({});
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  if (suggestions.length === 0) {
    return null;
  }

  const handleFeedback = (index: number, isPositive: boolean) => {
    setFeedback(prev => ({
      ...prev,
      [index]: isPositive
    }));
  };
  
  const submitFeedback = async () => {
    if (Object.keys(feedback).length === 0) return;
    
    const feedbackItems = Object.entries(feedback).map(([indexStr, isPositive]) => {
      const index = parseInt(indexStr, 10);
      return {
        taskSuggestion: suggestions[index],
        isAccurate: Boolean(isPositive),
        userComments: feedbackComment
      };
    });
    
    try {
      await provideTaskSuggestionFeedback(feedbackItems);
      setFeedbackSubmitted(true);
      setTimeout(() => {
        setFeedbackSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

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
                
                {/* Feedback buttons */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-500">Is this suggestion accurate?</span>
                  <button 
                    onClick={() => handleFeedback(index, true)}
                    className={`p-1 rounded-full ${feedback[index] === true ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-green-500'}`}
                    aria-label="Yes, this is accurate"
                  >
                    <FaceSmileIcon className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleFeedback(index, false)}
                    className={`p-1 rounded-full ${feedback[index] === false ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-red-500'}`}
                    aria-label="No, this is not accurate"
                  >
                    <FaceFrownIcon className="w-4 h-4" />
                  </button>
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
      
      {/* Feedback section */}
      {Object.keys(feedback).length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium mb-2">Help us improve</h4>
          <textarea
            placeholder="Any comments on these suggestions? (optional)"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-sm resize-none"
            rows={2}
            value={feedbackComment}
            onChange={e => setFeedbackComment(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button 
              size="sm"
              onClick={submitFeedback}
              variant="outline"
              className="text-xs"
            >
              Submit Feedback
            </Button>
          </div>
          {feedbackSubmitted && (
            <p className="text-green-600 text-xs mt-2">Thank you for your feedback!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskSuggestionList; 
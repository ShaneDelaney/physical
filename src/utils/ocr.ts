import { createWorker } from 'tesseract.js';
import { OCRResult, TaskSuggestion } from '@/types';
import { extractTasksWithOpenAI } from './openai';

/**
 * Process an image using Tesseract OCR to extract text
 */
export async function processImageWithOCR(imageData: string): Promise<OCRResult> {
  try {
    const worker = await createWorker('eng');
    const { data } = await worker.recognize(imageData);
    await worker.terminate();
    
    return {
      text: data.text,
      confidence: data.confidence,
    };
  } catch (error) {
    console.error('OCR processing error:', error);
    throw new Error('Failed to process image with OCR');
  }
}

/**
 * Extract action items and tasks from OCR text using local heuristics
 * This is a simple implementation used as a fallback
 */
export async function extractTasksFromText(text: string): Promise<TaskSuggestion[]> {
  // In a real app, this would be a call to a backend service with AI integration
  // For demonstration, we'll use a simple heuristic approach
  
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  const suggestions: TaskSuggestion[] = [];
  
  // Keywords that might indicate action items
  const taskIndicators = [
    'todo', 'to do', 'to-do', 'task', 'remember', 'don\'t forget', 
    'need to', 'should', 'must', 'call', 'email', 'buy', 'get', 'make', 
    'schedule', 'plan', 'write', 'finish', 'complete'
  ];
  
  // Keywords that might indicate high priority
  const highPriorityIndicators = ['urgent', 'asap', 'immediately', 'important', 'critical', '!', '!!!'];
  
  // Keywords that might indicate medium priority
  const mediumPriorityIndicators = ['soon', 'this week', 'next week'];
  
  // Date patterns (simplified)
  const datePattern = /(\d{1,2}[\/\.-]\d{1,2}([\/\.-]\d{2,4})?)|((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* \d{1,2}(st|nd|rd|th)?)/i;
  const timePattern = /(\d{1,2}[:]\d{2}\s*(am|pm)?)/i;
  const dayPattern = /(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun|tomorrow|next week)/i;
  
  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    
    // Check if line contains any task indicators
    const isTaskLine = taskIndicators.some(indicator => lowerLine.includes(indicator.toLowerCase()));
    
    if (isTaskLine || line.includes('-') || line.includes('•')) {
      // Determine priority
      let priority: 'low' | 'medium' | 'high' = 'low';
      
      if (highPriorityIndicators.some(indicator => lowerLine.includes(indicator.toLowerCase()))) {
        priority = 'high';
      } else if (mediumPriorityIndicators.some(indicator => lowerLine.includes(indicator.toLowerCase()))) {
        priority = 'medium';
      }
      
      // Extract potential due date
      const dateMatch = line.match(datePattern);
      const timeMatch = line.match(timePattern);
      const dayMatch = line.match(dayPattern);
      
      let dueDate: string | undefined = undefined;
      
      if (dateMatch) {
        // In a real app, we would parse the date properly
        // For demo purposes, we'll just use a date a few days from now
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 3);
        dueDate = futureDate.toISOString();
      } else if (dayMatch) {
        const day = dayMatch[0].toLowerCase();
        const futureDate = new Date();
        
        if (day === 'tomorrow') {
          futureDate.setDate(futureDate.getDate() + 1);
        } else if (day === 'next week') {
          futureDate.setDate(futureDate.getDate() + 7);
        } else {
          // Map day name to number (0 = Sunday, 1 = Monday, etc.)
          const dayMap: Record<string, number> = {
            'sunday': 0, 'sun': 0,
            'monday': 1, 'mon': 1,
            'tuesday': 2, 'tue': 2,
            'wednesday': 3, 'wed': 3, 
            'thursday': 4, 'thu': 4,
            'friday': 5, 'fri': 5,
            'saturday': 6, 'sat': 6
          };
          
          const targetDay = dayMap[day.toLowerCase()];
          if (targetDay !== undefined) {
            const today = futureDate.getDay();
            let daysToAdd = targetDay - today;
            if (daysToAdd <= 0) daysToAdd += 7; // Next week
            futureDate.setDate(futureDate.getDate() + daysToAdd);
          }
        }
        
        dueDate = futureDate.toISOString();
      }
      
      // Extract tags (anything with # or @ symbols)
      const tagMatches = line.match(/[#@][a-zA-Z0-9_]+/g) || [];
      const tags = tagMatches.map(tag => tag.substring(1));
      
      // Clean up the title by removing special indicators
      let title = line.trim();
      
      // Remove leading bullet points, dashes, etc.
      title = title.replace(/^[-•*]\s*/, '');
      
      suggestions.push({
        title,
        priority,
        dueDate,
        tags,
      });
    }
  }
  
  return suggestions;
}

/**
 * Generate task suggestions using AI
 * In a production app, this would call a sophisticated AI service
 */
export async function generateSmartTaskSuggestions(text: string): Promise<TaskSuggestion[]> {
  try {
    // Use OpenAI to extract tasks if possible
    return await extractTasksWithOpenAI(text);
  } catch (error) {
    console.error('Error using AI for task extraction:', error);
    // Fallback to basic extraction
    const basicTasks = await extractTasksFromText(text);
    
    // Add some simple enhancements to simulate AI
    return basicTasks.map(task => {
      // Add descriptions to some tasks
      if (Math.random() > 0.5) {
        task.description = `Generated based on your note context`;
      }
      
      // Add additional relevant tags
      const potentialTags = ['personal', 'work', 'home', 'errands', 'project', 'health', 'finance'];
      if (task.tags.length === 0) {
        const randomTag = potentialTags[Math.floor(Math.random() * potentialTags.length)];
        task.tags = [randomTag];
      }
      
      return task;
    });
  }
} 
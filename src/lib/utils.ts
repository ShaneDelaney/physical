import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge multiple class names together using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string into a human-readable format
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format a time string into a human-readable format
 */
export function formatTime(date: string | Date): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Truncate a string to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Extract verbs from a text string
 */
export function extractVerbs(text: string): string[] {
  // This is a simplified implementation
  // In a real app, you would use NLP libraries for better accuracy
  const words = text.split(/\s+/);
  const commonVerbs = [
    'call', 'email', 'text', 'buy', 'get', 'make', 'schedule', 'plan', 'write', 'read',
    'study', 'create', 'finish', 'complete', 'send', 'reply', 'meet', 'talk', 'discuss',
    'pick', 'drop', 'clean', 'organize',
  ];
  
  return words.filter(word => commonVerbs.includes(word.toLowerCase()));
}

/**
 * Check if the date is today
 */
export function isToday(date: string | Date): boolean {
  const today = new Date();
  const checkDate = new Date(date);
  
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if the date is tomorrow
 */
export function isTomorrow(date: string | Date): boolean {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkDate = new Date(date);
  
  return (
    checkDate.getDate() === tomorrow.getDate() &&
    checkDate.getMonth() === tomorrow.getMonth() &&
    checkDate.getFullYear() === tomorrow.getFullYear()
  );
} 
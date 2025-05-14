export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  householdId?: string;
}

export interface Note {
  id: string;
  userId: string;
  imageUrl: string;
  extractedText: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  userId: string;
  noteId?: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed' | 'canceled';
  dueDate?: string;
  scheduledDate?: string;
  reminderType?: 'none' | 'push' | 'email' | 'text';
  reminderTime?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Household {
  id: string;
  name: string;
  members: User[];
  createdAt: string;
  updatedAt: string;
}

export interface OCRResult {
  text: string;
  confidence: number;
}

export interface TaskSuggestion {
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  tags: string[];
}

export interface Calendar {
  id: string;
  name: string;
  provider: 'google' | 'apple' | 'outlook';
  userId: string;
}

export interface ReminderSettings {
  userId: string;
  defaultReminder: 'none' | 'push' | 'email' | 'text';
  smartCadence: boolean;
  quietHours: {
    start: string;
    end: string;
  };
  activeDays: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
}

export interface ProgressStats {
  userId: string;
  tasksCompleted: number;
  streak: number;
  lastCompletedDate: string;
} 
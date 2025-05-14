import { TaskSuggestion } from '@/types';
import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Extract tasks from text using OpenAI API
 * @param text The text to extract tasks from
 * @returns A list of task suggestions
 */
export async function extractTasksWithOpenAI(text: string): Promise<TaskSuggestion[]> {
  try {
    // If running on client side and no API key is available, fall back to the local implementation
    if (typeof window !== 'undefined' && !OPENAI_API_KEY) {
      console.warn('OpenAI API key not found, falling back to local implementation');
      const { extractTasksFromText } = await import('./ocr');
      return extractTasksFromText(text);
    }

    const prompt = `
Extract actionable tasks from the following text. For each task:
- Extract the title (main action)
- Identify priority (high, medium, low) based on urgency
- Extract or infer due dates if mentioned
- Identify relevant tags/categories
- Provide a brief description if there's context

Text to analyze:
"""
${text}
"""

Return your analysis as a JSON array with objects having these properties:
- title: string (required)
- priority: "high" | "medium" | "low" (required)
- dueDate: ISO string (optional)
- tags: string[] (required, can be empty)
- description: string (optional)

Example of expected output format:
[
  {
    "title": "Call Dr. Smith to schedule appointment",
    "priority": "high",
    "dueDate": "2023-06-15T00:00:00.000Z",
    "tags": ["health", "calls"],
    "description": "Need to discuss test results from last visit"
  }
]`;

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4-turbo-preview',  // Use appropriate model
        messages: [
          { role: 'system', content: 'You are a helpful assistant that extracts actionable tasks from text.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    const content = response.data.choices[0].message.content;
    
    // Parse the JSON response
    try {
      // Extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const taskSuggestions = JSON.parse(jsonMatch[0]);
        return taskSuggestions;
      }
      
      // If no JSON found, just parse the entire content
      return JSON.parse(content);
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      throw new Error('Failed to parse task suggestions from OpenAI response');
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    // Fall back to the local implementation
    const { extractTasksFromText } = await import('./ocr');
    return extractTasksFromText(text);
  }
} 
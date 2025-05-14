import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { TaskSuggestion } from '@/types';

// Initialize the Gemini API with the key from environment
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Initialize the Gemini API client
 * @returns The Gemini API client instance
 */
const initGeminiApi = () => {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables');
  }
  
  return new GoogleGenerativeAI(GEMINI_API_KEY);
};

/**
 * Extract tasks from text using Gemini API
 * @param textContent The text to extract tasks from
 * @returns A list of task suggestions
 */
export async function extractTasksWithGemini(textContent: string): Promise<TaskSuggestion[]> {
  try {
    // Initialize the Gemini API client
    const genAI = initGeminiApi();
    // For text-only processing, use the Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Configure safety settings
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ];

    // Create the prompt for extracting tasks
    const prompt = `
Extract actionable tasks from the following text. For each task:
- Extract the title (main action)
- Identify priority (high, medium, low) based on urgency
- Extract or infer due dates if mentioned
- Identify relevant tags/categories
- Provide a brief description if there's context

Text to analyze:
"""
${textContent}
"""

Return your analysis as a valid JSON array with objects having these properties:
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
]

Ensure you provide a well-formed JSON response that can be parsed without errors. Only respond with the JSON array and nothing else.`;

    // Generate the response
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      safetySettings,
      generationConfig: {
        temperature: 0.2,
        topP: 0.8,
        topK: 40,
      },
    });

    const response = result.response;
    const responseText = response.text();
    
    // Parse the JSON response
    try {
      // Find JSON in the response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const taskSuggestions = JSON.parse(jsonMatch[0]);
        return taskSuggestions;
      }
      
      // If no JSON pattern found, try parsing the entire response
      return JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      throw new Error('Failed to parse task suggestions from Gemini response');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

/**
 * Extract tasks directly from an image using Gemini Vision
 * @param imageData Base64 image data
 * @returns A list of task suggestions
 */
export async function extractTasksFromImageWithGemini(imageData: string): Promise<TaskSuggestion[]> {
  try {
    // Remove data URL prefix if present
    const base64Image = imageData.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    
    // Initialize the Gemini API client
    const genAI = initGeminiApi();
    // For image processing, use the Gemini Pro Vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    // Configure safety settings
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ];

    // Create the prompt for image-based task extraction
    const prompt = `
Look at this image of handwritten notes and:
1. Extract the text content
2. Identify actionable tasks and to-dos
3. Determine priority levels for each task
4. Identify any dates or deadlines mentioned
5. Extract any relevant categories or tags

Return your analysis as a valid JSON array with objects having these properties:
- title: string (required) - The main task action
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
]

Only respond with the JSON array and nothing else.`;

    // Generate the response
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            { inlineData: { mimeType: "image/jpeg", data: base64Image } }
          ]
        }
      ],
      safetySettings,
      generationConfig: {
        temperature: 0.2,
        topP: 0.8,
        topK: 40,
      },
    });

    const response = result.response;
    const responseText = response.text();
    
    // Parse the JSON response
    try {
      // Find JSON in the response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const taskSuggestions = JSON.parse(jsonMatch[0]);
        return taskSuggestions;
      }
      
      // If no JSON pattern found, try parsing the entire response
      return JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing Gemini Vision response:', parseError);
      throw new Error('Failed to parse task suggestions from Gemini Vision response');
    }
  } catch (error) {
    console.error('Error calling Gemini Vision API:', error);
    throw error;
  }
}

/**
 * Get feedback from users and improve future task extraction
 * @param feedback User feedback on task suggestions
 * @param originalText The original text that was analyzed
 * @returns A success message
 */
export async function submitFeedbackForImprovement(
  feedback: {
    taskSuggestion: TaskSuggestion,
    isAccurate: boolean,
    userComments?: string
  }[]
): Promise<string> {
  // In a production app, this would send feedback to a backend service
  // that would store it and use it to improve future suggestions
  // For now, we just log it for demonstration
  console.log('Received feedback:', feedback);
  return 'Feedback received. Thank you for helping us improve!';
} 
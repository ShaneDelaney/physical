'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowPathIcon, CheckIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import CameraCapture from '@/components/notes/CameraCapture';
import NavBar from '@/components/ui/NavBar';
import { processImageWithAI, processImageWithOCR } from '@/utils/ocr';
import { Note, TaskSuggestion } from '@/types';
import { generateId } from '@/lib/utils';

export default function CapturePage() {
  const router = useRouter();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [taskSuggestions, setTaskSuggestions] = useState<TaskSuggestion[]>([]);
  const [isCameraSupported, setIsCameraSupported] = useState(true);
  const [processingMethod, setProcessingMethod] = useState<'ai' | 'ocr'>('ai');
  const [aiProcessingInfo, setAiProcessingInfo] = useState<string | null>(null);
  
  // Check if the browser supports camera access
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsCameraSupported(!!navigator.mediaDevices?.getUserMedia);
    }
  }, []);
  
  const handleCapture = useCallback((imageData: string) => {
    if (imageData) {
      console.log('Image captured successfully');
      setCapturedImage(imageData);
      setExtractedText(null);
      setTaskSuggestions([]);
      setAiProcessingInfo(null);
    } else {
      console.log('Image capture cleared');
      setCapturedImage(null);
    }
  }, []);
  
  const handleRetake = useCallback(() => {
    setCapturedImage(null);
    setExtractedText(null);
    setTaskSuggestions([]);
    setAiProcessingInfo(null);
  }, []);
  
  const toggleProcessingMethod = useCallback(() => {
    setProcessingMethod(prev => prev === 'ai' ? 'ocr' : 'ai');
  }, []);
  
  const processImage = useCallback(async () => {
    if (!capturedImage) return;
    
    setIsProcessing(true);
    setAiProcessingInfo("AI is analyzing your image...");
    
    try {
      if (processingMethod === 'ai') {
        // Use the new AI-powered image processing
        console.log('Processing image with AI...');
        const result = await processImageWithAI(capturedImage);
        setExtractedText(result.text);
        setTaskSuggestions(result.taskSuggestions);
        
        setAiProcessingInfo(
          `AI found ${result.taskSuggestions.length} potential tasks in your image.`
        );
        
        // In a real app, we would save this to a database
        const note: Note = {
          id: generateId(),
          userId: 'user-1', // In a real app, this would be the authenticated user's ID
          imageUrl: capturedImage,
          extractedText: result.text,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        // Store note in local storage for demo purposes
        const existingNotes = JSON.parse(localStorage.getItem('notes') || '[]');
        localStorage.setItem('notes', JSON.stringify([...existingNotes, note]));
        
        // Store the task suggestions for use on the task creation page
        localStorage.setItem('currentTaskSuggestions', JSON.stringify(result.taskSuggestions));
        localStorage.setItem('currentNoteId', note.id);
        
        // Wait a moment to show the results before navigating
        setTimeout(() => {
          router.push('/tasks/create');
        }, 2000);
      } else {
        // Use the traditional OCR method
        console.log('Processing image with OCR...');
        const result = await processImageWithOCR(capturedImage);
        setExtractedText(result.text);
        
        // In a real app, we would save this to a database
        const note: Note = {
          id: generateId(),
          userId: 'user-1', // In a real app, this would be the authenticated user's ID
          imageUrl: capturedImage,
          extractedText: result.text,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        // Store note in local storage for demo purposes
        const existingNotes = JSON.parse(localStorage.getItem('notes') || '[]');
        localStorage.setItem('notes', JSON.stringify([...existingNotes, note]));
        
        // Navigate to the notes page after a brief delay
        setTimeout(() => {
          router.push('/notes');
        }, 1500);
      }
    } catch (error) {
      console.error('Error processing image:', error);
      setExtractedText('Error processing image. Please try again.');
      setAiProcessingInfo("There was an error processing your image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [capturedImage, router, processingMethod]);
  
  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-center my-4">Capture Note</h1>
        
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={toggleProcessingMethod}
              className="text-sm flex items-center text-primary cursor-pointer mr-2"
            >
              <span className={`inline-block w-8 h-4 ${processingMethod === 'ai' ? 'bg-primary' : 'bg-gray-300'} rounded-full mr-2 relative transition-colors`}>
                <span className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform transform ${processingMethod === 'ai' ? 'translate-x-4' : ''}`}></span>
              </span>
              Use AI Analysis
            </button>
            <InformationCircleIcon className="w-4 h-4 text-gray-400 cursor-help" title="AI analysis can extract tasks directly from your image." />
          </div>
        </div>
        
        {!isCameraSupported && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 text-amber-800">
            <p className="text-sm">
              Your browser doesn't support camera access. Please use Chrome, Firefox, or Safari on a device with a camera.
            </p>
          </div>
        )}
        
        {!capturedImage ? (
          <CameraCapture onCapture={handleCapture} />
        ) : (
          <div className="mt-4 flex flex-col">
            <div className="relative aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
              <Image
                src={capturedImage}
                alt="Captured note"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                priority
              />
            </div>
            
            <div className="flex gap-4 mt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleRetake}
                disabled={isProcessing}
              >
                <ArrowPathIcon className="w-5 h-5 mr-2" />
                Retake
              </Button>
              
              <Button
                variant="default"
                className="flex-1"
                onClick={processImage}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckIcon className="w-5 h-5 mr-2" />
                    {processingMethod === 'ai' ? 'Analyze with AI' : 'Extract Text'}
                  </>
                )}
              </Button>
            </div>
            
            {aiProcessingInfo && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-800 dark:text-blue-200 text-sm">
                <p>{aiProcessingInfo}</p>
              </div>
            )}
            
            {extractedText && (
              <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="font-medium mb-2">Extracted Text:</h3>
                <p className="text-sm whitespace-pre-line">
                  {extractedText}
                </p>
              </div>
            )}
            
            {taskSuggestions.length > 0 && (
              <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="font-medium mb-2">Found {taskSuggestions.length} Tasks:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {taskSuggestions.slice(0, 3).map((task, index) => (
                    <li key={index} className="text-sm">
                      {task.title}
                      <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                        task.priority === 'high' 
                          ? 'bg-red-100 text-red-800' 
                          : task.priority === 'medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}>
                        {task.priority}
                      </span>
                    </li>
                  ))}
                  {taskSuggestions.length > 3 && (
                    <li className="text-xs text-gray-500">
                      ...and {taskSuggestions.length - 3} more
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      
      <NavBar />
    </div>
  );
} 
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowPathIcon, CheckIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import CameraCapture from '@/components/notes/CameraCapture';
import NavBar from '@/components/ui/NavBar';
import { processImageWithOCR } from '@/utils/ocr';
import { Note } from '@/types';
import { generateId } from '@/lib/utils';

export default function CapturePage() {
  const router = useRouter();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isCameraSupported, setIsCameraSupported] = useState(true);
  
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
    } else {
      console.log('Image capture cleared');
      setCapturedImage(null);
    }
  }, []);
  
  const handleRetake = useCallback(() => {
    setCapturedImage(null);
    setExtractedText(null);
  }, []);
  
  const processImage = useCallback(async () => {
    if (!capturedImage) return;
    
    setIsProcessing(true);
    
    try {
      console.log('Processing image...');
      const result = await processImageWithOCR(capturedImage);
      setExtractedText(result.text);
      console.log('OCR completed with confidence:', result.confidence);
      
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
      
      // Navigate to the notes page after a brief delay to show the extracted text
      setTimeout(() => {
        router.push('/notes');
      }, 1500);
    } catch (error) {
      console.error('Error processing image:', error);
      setExtractedText('Error processing image. Please try again.');
      // In a real app, we would show a proper error message to the user
    } finally {
      setIsProcessing(false);
    }
  }, [capturedImage, router]);
  
  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-center my-4">Capture Note</h1>
        
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
                    Use Photo
                  </>
                )}
              </Button>
            </div>
            
            {extractedText && (
              <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="font-medium mb-2">Extracted Text:</h3>
                <p className="text-sm whitespace-pre-line">
                  {extractedText}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <NavBar />
    </div>
  );
} 
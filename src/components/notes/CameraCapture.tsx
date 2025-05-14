import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { CameraIcon, ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import Button from '@/components/ui/Button';

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");

  // Define video constraints
  const videoConstraints = {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    facingMode: facingMode
  };

  // Handle when camera successfully starts
  const handleUserMedia = useCallback(() => {
    console.log("Camera successfully initialized");
    setIsCameraReady(true);
    setCameraError(null);
  }, []);

  // Handle camera errors
  const handleCameraError = useCallback((error: string | DOMException) => {
    console.error("Camera error:", error);
    setIsCameraReady(false);
    
    let errorMessage = "Could not access camera.";
    if (error instanceof DOMException) {
      if (error.name === 'NotAllowedError') {
        errorMessage = "Camera access denied. Please allow camera permissions.";
      } else if (error.name === 'NotFoundError') {
        errorMessage = "No camera found on your device.";
      } else if (error.name === 'NotReadableError') {
        errorMessage = "Camera is in use by another application.";
      } else {
        errorMessage = `Camera error: ${error.message}`;
      }
    }
    
    setCameraError(errorMessage);
  }, []);

  // Switch between front and back camera
  const switchCamera = useCallback(() => {
    setFacingMode(prevMode => 
      prevMode === "user" ? "environment" : "user"
    );
  }, []);

  // Take a photo
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onCapture(imageSrc);
      } else {
        setCameraError("Failed to capture image. Please try again.");
      }
    }
  }, [onCapture]);

  // Reset state if needed
  const retake = useCallback(() => {
    onCapture('');
  }, [onCapture]);

  // Check if browser supports getUserMedia
  useEffect(() => {
    if (typeof navigator !== 'undefined' && !navigator.mediaDevices?.getUserMedia) {
      setCameraError("Your browser doesn't support camera access. Try using Chrome, Firefox, or Safari.");
    }
  }, []);

  return (
    <div className="camera-container aspect-[3/4] my-4 relative bg-black rounded-lg">
      {cameraError ? (
        <div className="w-full h-full flex items-center justify-center flex-col text-center p-6">
          <ExclamationTriangleIcon className="w-12 h-12 text-amber-500 mb-4" />
          <p className="text-white mb-4">{cameraError}</p>
          <Button 
            onClick={() => {
              setCameraError(null);
              setIsCameraReady(false);
            }}
            className="bg-primary text-white hover:bg-blue-600"
          >
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            onUserMedia={handleUserMedia}
            onUserMediaError={handleCameraError}
            className="w-full h-full object-cover rounded-lg"
            mirrored={facingMode === "user"}
          />
          
          {isCameraReady && (
            <>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <Button 
                  onClick={capture}
                  className="bg-white text-black hover:bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
                >
                  <CameraIcon className="w-8 h-8" />
                </Button>
              </div>
              
              <div className="absolute top-4 right-4 flex gap-2">
                <Button 
                  onClick={switchCamera}
                  variant="ghost"
                  size="icon"
                  className="bg-black/20 text-white hover:bg-black/30 rounded-full"
                >
                  <ArrowPathIcon className="w-6 h-6" />
                </Button>
              </div>
            </>
          )}
          
          {!isCameraReady && !cameraError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CameraCapture; 
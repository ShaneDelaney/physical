import Link from 'next/link';
import { 
  CameraIcon, 
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  UserIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { SparklesIcon as SparklesSolidIcon } from '@heroicons/react/24/solid';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 to-black overflow-hidden">
      {/* Logo */}
      <header className="w-full pt-12 px-4">
        <div className="flex items-center justify-center">
          <SparklesSolidIcon className="h-10 w-10 text-primary mr-2" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-400">
            PhysicalNotes
          </h1>
        </div>
      </header>

      {/* Main Content - Extremely Minimal */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-sm mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Turn handwritten notes into <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">digital tasks</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-10">
            Capture, digitize, and organize your physical notes with AI
          </p>
        </div>
        
        {/* Big CTA Button */}
        <Link 
          href="/capture" 
          className="bg-primary text-white hover:bg-blue-600 transition-colors rounded-full px-8 py-4 font-medium text-lg shadow-lg flex items-center justify-center mb-12 w-full max-w-xs"
        >
          <CameraIcon className="w-5 h-5 mr-2" />
          Capture a Note
        </Link>
        
        {/* Simple Steps - Very Minimal */}
        <div className="flex gap-8 mb-12 max-w-xs w-full justify-between">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
              <span className="text-primary font-medium">1</span>
            </div>
            <span className="text-xs text-gray-500">Capture</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
              <span className="text-primary font-medium">2</span>
            </div>
            <span className="text-xs text-gray-500">Process</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
              <span className="text-primary font-medium">3</span>
            </div>
            <span className="text-xs text-gray-500">Organize</span>
          </div>
        </div>
      </main>

      {/* Slider Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-2 py-2 sm:py-3">
        <div className="max-w-md mx-auto">
          <ul className="flex items-center justify-around">
            <li className="w-full">
              <Link 
                href="/notes" 
                className="flex flex-col items-center py-2 px-2 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BookOpenIcon className="w-6 h-6" />
                <span className="text-xs mt-1">Notes</span>
              </Link>
            </li>
            <li className="w-full">
              <Link 
                href="/capture" 
                className="flex flex-col items-center py-2 px-2 rounded-lg transition-colors bg-blue-100 dark:bg-blue-900/30 text-primary"
              >
                <CameraIcon className="w-6 h-6" />
                <span className="text-xs mt-1">Capture</span>
              </Link>
            </li>
            <li className="w-full">
              <Link 
                href="/tasks" 
                className="flex flex-col items-center py-2 px-2 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ClipboardDocumentCheckIcon className="w-6 h-6" />
                <span className="text-xs mt-1">Tasks</span>
              </Link>
            </li>
            <li className="w-full">
              <Link 
                href="/profile" 
                className="flex flex-col items-center py-2 px-2 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <UserIcon className="w-6 h-6" />
                <span className="text-xs mt-1">Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

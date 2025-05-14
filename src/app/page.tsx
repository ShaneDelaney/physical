import Link from 'next/link';
import { 
  CameraIcon, 
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { SparklesIcon as SparklesSolidIcon } from '@heroicons/react/24/solid';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Header with logo and theme toggle */}
      <header className="container-app pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <SparklesSolidIcon className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-600 dark:from-primary-400 dark:to-primary-500">
              PhysicalNotes
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="container-app py-8">
          <div className="glass-panel p-8 max-w-md mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
              Turn <span className="text-primary">handwritten</span> notes into <span className="text-primary">digital tasks</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 mb-8">
              Capture, digitize, and organize your physical notes with AI-powered processing
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                size="lg"
                startIcon={<CameraIcon className="w-5 h-5" />}
                className="w-full sm:w-auto"
              >
                <Link href="/capture" className="w-full h-full flex items-center justify-center">
                  Capture a Note
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                startIcon={<BookOpenIcon className="w-5 h-5" />}
                className="w-full sm:w-auto"
              >
                <Link href="/notes" className="w-full h-full flex items-center justify-center">
                  View Notes
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* How it Works Section */}
        <section className="container-app py-8">
          <h3 className="text-xl font-display font-medium mb-6 text-center">How it works</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel-subtle p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-4">
                <CameraIcon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium mb-2">Capture</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Take a photo of your handwritten notes, whiteboards, or papers
              </p>
            </div>
            
            <div className="glass-panel-subtle p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-4">
                <SparklesIcon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium mb-2">Process</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Our AI extracts text and identifies tasks from your captured content
              </p>
            </div>
            
            <div className="glass-panel-subtle p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-4">
                <ClipboardDocumentCheckIcon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium mb-2">Organize</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Review, edit, and organize your digital tasks and notes
              </p>
            </div>
          </div>
        </section>
        
        {/* Get Started CTA */}
        <section className="container-app py-8 mb-8">
          <div className="glass-panel bg-primary-50 dark:bg-primary-900/10 p-6 text-center max-w-md mx-auto">
            <h3 className="font-display font-medium mb-4">Ready to get started?</h3>
            <Button 
              variant="primary" 
              size="lg"
              endIcon={<ArrowRightIcon className="w-5 h-5" />}
            >
              <Link href="/capture" className="w-full h-full flex items-center justify-center">
                Try it now
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

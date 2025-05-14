'use client';

import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "toggle-switch",
        theme === 'dark' ? 'data-[state=checked]' : 'data-[state=unchecked]',
        className
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="sr-only">
        Switch to {theme === 'dark' ? 'light' : 'dark'} mode
      </span>
      <div className="relative w-full h-full">
        {theme === 'dark' ? (
          <MoonIcon className="absolute left-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white z-10" />
        ) : (
          <SunIcon className="absolute right-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-yellow-500 z-10" />
        )}
        <span 
          className={cn(
            "toggle-thumb",
            theme === 'dark' ? 'data-[state=checked]' : 'data-[state=unchecked]'
          )}
        />
      </div>
    </button>
  );
} 
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpenIcon, CameraIcon, UserIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Notes',
      href: '/notes',
      icon: BookOpenIcon,
    },
    {
      name: 'Capture',
      href: '/capture',
      icon: CameraIcon,
    },
    {
      name: 'Tasks',
      href: '/tasks',
      icon: ClipboardDocumentCheckIcon,
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: UserIcon,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-2 py-2 sm:py-3">
      <div className="max-w-md mx-auto">
        <ul className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.name} className="w-full">
                <Link 
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center py-2 px-2 rounded-lg transition-colors",
                    isActive 
                      ? "text-primary bg-blue-100 dark:bg-blue-900/30" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-xs mt-1">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar; 
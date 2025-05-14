'use client';

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
    <nav className="nav-bottom">
      <div className="max-w-md mx-auto">
        <ul className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.name} className="w-full">
                <Link 
                  href={item.href}
                  className={cn(
                    "nav-item",
                    isActive 
                      ? "nav-item-active"
                      : "nav-item-inactive"
                  )}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-xs mt-1 font-medium">{item.name}</span>
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
'use client';

import React, { useState } from 'react';
import { UserIcon, BellAlertIcon, CalendarIcon, CogIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import NavBar from '@/components/ui/NavBar';

export default function ProfilePage() {
  // In a real app, these would be loaded from the user's account
  const [user] = useState({
    name: 'Demo User',
    email: 'user@example.com',
    image: '/profile-placeholder.jpg',
  });
  
  const [stats] = useState({
    notesCount: 0,
    tasksCount: 0,
    tasksCompleted: 0,
    streak: 0,
  });
  
  const [settings, setSettings] = useState({
    smartCadence: true,
    defaultReminder: 'push' as 'none' | 'push' | 'email' | 'text',
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
    calendarSync: false,
    darkMode: false,
  });
  
  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  
  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        
        {/* User Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">Your Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Notes Created</p>
              <p className="text-2xl font-bold">{stats.notesCount}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Tasks Created</p>
              <p className="text-2xl font-bold">{stats.tasksCount}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Tasks Completed</p>
              <p className="text-2xl font-bold">{stats.tasksCompleted}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak</p>
              <p className="text-2xl font-bold">{stats.streak} days</p>
            </div>
          </div>
        </div>
        
        {/* Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BellAlertIcon className="w-5 h-5 text-gray-400" />
                <span>Smart Cadence Reminders</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.smartCadence}
                  onChange={e => handleSettingChange('smartCadence', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BellAlertIcon className="w-5 h-5 text-gray-400" />
                <span>Default Reminder Type</span>
              </div>
              <select
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900"
                value={settings.defaultReminder}
                onChange={e => handleSettingChange('defaultReminder', e.target.value)}
              >
                <option value="none">None</option>
                <option value="push">Push Notification</option>
                <option value="email">Email</option>
                <option value="text">Text Message</option>
              </select>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BellAlertIcon className="w-5 h-5 text-gray-400" />
                <span>Quiet Hours</span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Start</label>
                  <input
                    type="time"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900"
                    value={settings.quietHoursStart}
                    onChange={e => handleSettingChange('quietHoursStart', e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">End</label>
                  <input
                    type="time"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900"
                    value={settings.quietHoursEnd}
                    onChange={e => handleSettingChange('quietHoursEnd', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-gray-400" />
                <span>Calendar Sync</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.calendarSync}
                  onChange={e => handleSettingChange('calendarSync', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CogIcon className="w-5 h-5 text-gray-400" />
                <span>Dark Mode</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.darkMode}
                  onChange={e => handleSettingChange('darkMode', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-950 dark:border-red-800"
            >
              <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      
      <NavBar />
    </div>
  );
} 
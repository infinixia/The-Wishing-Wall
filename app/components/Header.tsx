"use client"

import { useTheme } from 'next-themes'
import { Moon, Sun, Github } from 'lucide-react'
import React from 'react';
import { Star, TreesIcon as Tree } from 'lucide-react';

const Header = () => {
  const { theme, setTheme } = useTheme()

  return (
    <header className="absolute top-4 right-4 z-20 flex items-center space-x-4">
      <a
        href="https://github.com/yourusername/your-repo"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
      >
        <Github size={24} />
      </a>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  )
}

export default Header

const WishingWall: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-80 h-28">
        <svg className="w-full h-full" viewBox="0 0 320 112" preserveAspectRatio="xMidYMid meet">
          <path
            d="M 32,16 Q 160,48 288,16 L 288,96 Q 160,128 32,96 Z"
            fill="none"
            stroke="#C41E3A"
            strokeWidth="3"
          />
          <defs>
            <path id="curve" d="M 32,56 Q 160,88 288,56" fill="transparent" />
          </defs> 
          <text className="fill-[#EF4444] text-2xl font-bold">
            <textPath href="#curve" startOffset="50%" textAnchor="middle">
              THE WISHING WALL 
            </textPath>
          </text>
          <circle cx="32" cy="16" r="4" fill="#FFD700" />
          <circle cx="288" cy="16" r="4" fill="#FFD700" />
          <circle cx="32" cy="96" r="4" fill="#FFD700" />
          <circle cx="288" cy="96" r="4" fill="#FFD700" />
        </svg>
        <Star className="absolute top-0 left-0 w-6 h-6 text-yellow-400" />
        <Star className="absolute top-0 right-0 w-6 h-6 text-yellow-400" />
        <Tree className="absolute bottom-0 left-0 w-6 h-6 text-[#165B33]" />
        <Tree className="absolute bottom-0 right-0 w-6 h-6 text-[#165B33]" />
      </div>
    </div>
  );
};


'use client'

import React, { useState } from 'react'
import { useTheme, themes, ThemeType } from '../../lib/contexts/ThemeContext'

export default function ThemeSwitcher() {
  const { currentTheme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme)
    setIsOpen(false)
  }

  return (
    <div className="fixed top-6 right-6 z-50">
      {/* Paint Palette Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            group relative flex items-center justify-center w-12 h-12 
            bg-white/20 backdrop-blur-md border border-white/30 
            rounded-2xl shadow-lg hover:shadow-xl
            transition-all duration-300 ease-out
            hover:scale-110 hover:rotate-12

            ${isOpen ? 'scale-110 rotate-12' : ''}
          `}
          style={{
            background: isOpen ? 'var(--effect-gradient)' : undefined,
            boxShadow: isOpen ? 'var(--effect-glow)' : undefined,
          }}
        >
          {/* Paint Brush Icon */}
          <svg
            className={`w-6 h-6 text-white transition-all duration-300 ${
              isOpen ? 'rotate-45' : 'group-hover:rotate-12'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 8h8m-8 4h8m-8 4h8"
            />
          </svg>
          
          {/* Active Theme Indicator */}
          <div 
            className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: themes[currentTheme].ui.primary }}
          />
        </button>

        {/* Theme Palette Dropdown */}
        {isOpen && (
          <div 
            className={`
              absolute top-16 right-0 
              bg-white/10 backdrop-blur-xl border border-white/20 
              rounded-3xl p-4 shadow-2xl
              transition-all duration-300 ease-out transform
              ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'}
            `}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)',
            }}
          >
            <div className="flex flex-col space-y-3 min-w-[200px]">
              <div className="text-xs font-medium text-white/80 uppercase tracking-wider mb-1">
                Choose Theme
              </div>
              
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => handleThemeChange(key as ThemeType)}
                  className={`
                    group flex items-center space-x-3 p-3 rounded-2xl
                    transition-all duration-200 ease-out
                    hover:scale-105 hover:shadow-lg
                    ${currentTheme === key 
                      ? 'bg-white/20 shadow-md' 
                      : 'hover:bg-white/10'
                    }
                  `}
                  style={{
                    background: currentTheme === key ? theme.effects.gradient : undefined,
                  }}
                >
                  {/* Theme Color Swatch */}
                  <div className="relative">
                    <div 
                      className="w-8 h-8 rounded-xl shadow-md border border-white/30 group-hover:scale-110 transition-transform duration-200"
                      style={{ 
                        background: theme.effects.gradient,
                        boxShadow: currentTheme === key ? theme.effects.glow : undefined,
                      }}
                    />
                    {/* Theme Emoji */}
                    <div className="absolute -top-1 -right-1 text-xs">
                      {theme.emoji}
                    </div>
                  </div>
                  
                  {/* Theme Info */}
                  <div className="flex-1 text-left">
                    <div className="font-medium text-white text-sm">
                      {theme.name}
                    </div>
                    <div className="text-xs text-white/70">
                      {theme.description}
                    </div>
                  </div>
                  
                  {/* Active Indicator */}
                  {currentTheme === key && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* Fun Footer */}
            <div className="mt-4 pt-3 border-t border-white/20">
              <div className="text-xs text-white/60 text-center">
                ✨ Made with magic & code
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click Outside Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
} 
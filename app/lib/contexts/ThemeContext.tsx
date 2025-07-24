'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type ThemeType = 'star-wars' | 'lovable' | 'july-4th'

export interface ThemeColors {
  name: string
  emoji: string
  description: string
  
  // Backgrounds
  bg: {
    primary: string
    secondary: string
    tertiary: string
    card: string
    hover: string
  }
  
  // Text colors
  text: {
    primary: string
    secondary: string
    muted: string
    accent: string
  }
  
  // UI colors
  ui: {
    primary: string
    secondary: string
    accent: string
    success: string
    warning: string
    error: string
    border: string
    input: string
    inputFocus: string
  }
  
  // Chart colors
  chart: {
    buy: string
    rent: string
    positive: string
    negative: string
    neutral: string
  }
  
  // Special effects
  effects: {
    glow: string
    shadow: string
    gradient: string
  }
}

export const themes: Record<ThemeType, ThemeColors> = {
  'star-wars': {
    name: 'Dark',
    emoji: '🌌',
    description: 'Professional dark mode',
    bg: {
      primary: '#0f1419',
      secondary: '#1c2128',
      tertiary: '#21262d',
      card: 'rgba(33, 38, 45, 0.95)',
      hover: 'rgba(88, 166, 255, 0.1)',
    },
    text: {
      primary: '#f0f6fc',
      secondary: '#c9d1d9',
      muted: '#8b949e',
      accent: '#58a6ff',
    },
    ui: {
      primary: '#58a6ff', // Clean blue
      secondary: '#56d364', // Github green
      accent: '#f85149', // Alert red
      success: '#56d364',
      warning: '#d29922',
      error: '#f85149',
      border: 'rgba(88, 166, 255, 0.2)',
      input: 'rgba(33, 38, 45, 0.95)',
      inputFocus: 'rgba(88, 166, 255, 0.1)',
    },
    chart: {
      buy: '#58a6ff',
      rent: '#56d364',
      positive: '#56d364',
      negative: '#f85149',
      neutral: '#d29922',
    },
    effects: {
      glow: '0 0 20px rgba(88, 166, 255, 0.2)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      gradient: 'linear-gradient(135deg, #1c2128 0%, #21262d 100%)',
    },
  },
  
  'lovable': {
    name: 'Modern',
    emoji: '💜',
    description: 'Clean & sophisticated',
    bg: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      card: 'rgba(255, 255, 255, 0.8)',
      hover: 'rgba(99, 102, 241, 0.05)',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      muted: '#64748b',
      accent: '#6366f1',
    },
    ui: {
      primary: '#6366f1', // Clean indigo
      secondary: '#10b981', // Success green
      accent: '#06b6d4', // Info cyan
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      border: 'rgba(99, 102, 241, 0.15)',
      input: 'rgba(255, 255, 255, 0.95)',
      inputFocus: 'rgba(99, 102, 241, 0.05)',
    },
    chart: {
      buy: '#6366f1',
      rent: '#10b981',
      positive: '#10b981',
      negative: '#ef4444',
      neutral: '#06b6d4',
    },
    effects: {
      glow: '0 0 20px rgba(99, 102, 241, 0.15)',
      shadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #10b981 100%)',
    },
  },
  
  'july-4th': {
    name: 'Classic',
    emoji: '🇺🇸',
    description: 'Timeless & professional',
    bg: {
      primary: '#fefefe',
      secondary: '#f9fafb',
      tertiary: '#f3f4f6',
      card: 'rgba(255, 255, 255, 0.95)',
      hover: 'rgba(55, 65, 81, 0.05)',
    },
    text: {
      primary: '#111827',
      secondary: '#374151',
      muted: '#6b7280',
      accent: '#1f2937',
    },
    ui: {
      primary: '#374151', // Professional gray
      secondary: '#059669', // Success green  
      accent: '#dc2626', // Accent red
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626',
      border: 'rgba(55, 65, 81, 0.2)',
      input: 'rgba(255, 255, 255, 0.95)',
      inputFocus: 'rgba(55, 65, 81, 0.05)',
    },
    chart: {
      buy: '#374151',
      rent: '#059669',
      positive: '#059669',
      negative: '#dc2626',
      neutral: '#6b7280',
    },
    effects: {
      glow: '0 0 20px rgba(55, 65, 81, 0.1)',
      shadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      gradient: 'linear-gradient(135deg, #374151 0%, #059669 100%)',
    },
  },
}

interface ThemeContextType {
  currentTheme: ThemeType
  theme: ThemeColors
  setTheme: (theme: ThemeType) => void
  isTransitioning: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('lovable')
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('calculator-theme') as ThemeType
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  // Apply theme to CSS variables
  useEffect(() => {
    const theme = themes[currentTheme]
    const root = document.documentElement

    // Apply all theme colors as CSS variables
    Object.entries(theme.bg).forEach(([key, value]) => {
      root.style.setProperty(`--color-bg-${key}`, value)
    })
    
    Object.entries(theme.text).forEach(([key, value]) => {
      root.style.setProperty(`--color-text-${key}`, value)
    })
    
    Object.entries(theme.ui).forEach(([key, value]) => {
      root.style.setProperty(`--color-ui-${key}`, value)
    })
    
    Object.entries(theme.chart).forEach(([key, value]) => {
      root.style.setProperty(`--color-chart-${key}`, value)
    })
    
    Object.entries(theme.effects).forEach(([key, value]) => {
      root.style.setProperty(`--effect-${key}`, value)
    })

    // Add theme class to body for specific overrides
    document.body.className = `theme-${currentTheme}`
  }, [currentTheme])

  const setTheme = (theme: ThemeType) => {
    setIsTransitioning(true)
    setCurrentTheme(theme)
    localStorage.setItem('calculator-theme', theme)
    
    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    setTheme,
    isTransitioning,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 
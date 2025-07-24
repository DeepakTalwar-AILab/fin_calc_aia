'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type ThemeType = 'lovable' | 'star-wars' | 'july-4th'

export interface ThemeColors {
  name: string
  emoji: string
  description: string
  bg: {
    primary: string
    secondary: string
    tertiary: string
    card: string
    hover: string
  }
  text: {
    primary: string
    secondary: string
    muted: string
    accent: string
  }
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
  chart: {
    buy: string
    rent: string
    positive: string
    negative: string
    neutral: string
  }
  effects: {
    glow: string
    shadow: string
    gradient: string
  }
}

export const themes: Record<ThemeType, ThemeColors> = {
  'lovable': {
    name: 'Modern',
    emoji: '💚',
    description: 'Clean & sophisticated',
    bg: {
      primary: '#ffffff',
      secondary: '#fafafa',
      tertiary: '#f8f9fa',
      card: 'rgba(255, 255, 255, 0.98)',
      hover: 'rgba(16, 185, 129, 0.05)',
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
      muted: '#9ca3af',
      accent: '#10b981', // Green accent from prototype
    },
    ui: {
      primary: '#10b981', // Green from prototype "Buy Is Better"
      secondary: '#059669', // Darker green
      accent: '#06b6d4', // Teal accent
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      border: 'rgba(229, 231, 235, 0.8)',
      input: 'rgba(255, 255, 255, 0.98)',
      inputFocus: 'rgba(16, 185, 129, 0.1)',
    },
    chart: {
      buy: '#10b981', // Green for buy
      rent: '#06b6d4', // Teal for rent  
      positive: '#10b981',
      negative: '#ef4444',
      neutral: '#6366f1',
    },
    effects: {
      glow: '0 4px 20px rgba(16, 185, 129, 0.15)',
      shadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
      gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    },
  },
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
      primary: '#58a6ff',
      secondary: '#56d364',
      accent: '#f85149',
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
      primary: '#374151',
      secondary: '#059669',
      accent: '#dc2626',
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
  setTheme: (theme: ThemeType) => void
  theme: ThemeColors
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('lovable')

  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme)
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as ThemeType
      if (savedTheme && themes[savedTheme]) {
        setCurrentTheme(savedTheme)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const theme = themes[currentTheme]
      const root = document.documentElement

      // Apply CSS variables
      root.style.setProperty('--color-bg-primary', theme.bg.primary)
      root.style.setProperty('--color-bg-secondary', theme.bg.secondary)
      root.style.setProperty('--color-bg-tertiary', theme.bg.tertiary)
      root.style.setProperty('--color-bg-card', theme.bg.card)
      root.style.setProperty('--color-bg-hover', theme.bg.hover)

      root.style.setProperty('--color-text-primary', theme.text.primary)
      root.style.setProperty('--color-text-secondary', theme.text.secondary)
      root.style.setProperty('--color-text-muted', theme.text.muted)
      root.style.setProperty('--color-text-accent', theme.text.accent)

      root.style.setProperty('--color-ui-primary', theme.ui.primary)
      root.style.setProperty('--color-ui-secondary', theme.ui.secondary)
      root.style.setProperty('--color-ui-accent', theme.ui.accent)
      root.style.setProperty('--color-ui-success', theme.ui.success)
      root.style.setProperty('--color-ui-warning', theme.ui.warning)
      root.style.setProperty('--color-ui-error', theme.ui.error)
      root.style.setProperty('--color-ui-border', theme.ui.border)
      root.style.setProperty('--color-ui-input', theme.ui.input)
      root.style.setProperty('--color-ui-inputFocus', theme.ui.inputFocus)

      root.style.setProperty('--color-chart-buy', theme.chart.buy)
      root.style.setProperty('--color-chart-rent', theme.chart.rent)
      root.style.setProperty('--color-chart-positive', theme.chart.positive)
      root.style.setProperty('--color-chart-negative', theme.chart.negative)
      root.style.setProperty('--color-chart-neutral', theme.chart.neutral)

      root.style.setProperty('--effect-glow', theme.effects.glow)
      root.style.setProperty('--effect-shadow', theme.effects.shadow)
      root.style.setProperty('--effect-gradient', theme.effects.gradient)
    }
  }, [currentTheme])

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, theme: themes[currentTheme] }}>
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
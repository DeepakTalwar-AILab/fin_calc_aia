'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorInputs, CalculatorResults, DEFAULT_INPUTS } from '../../lib/types/calculator'
import { calculateFullComparison } from '../../lib/calculations/comparisons'
import CompactParameterPanel from './CompactParameterPanel'
import DashboardResults from './DashboardResults'
import IntegratedCharts from './IntegratedCharts'
import { useTheme, ThemeType } from '../../lib/contexts/ThemeContext'

export default function DashboardLayout() {
  const { currentTheme, setTheme } = useTheme()
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS)
  const [results, setResults] = useState<CalculatorResults | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  // Handle input changes
  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  // Recalculate results when inputs change
  useEffect(() => {
    const calculateResults = async () => {
      setIsCalculating(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 50)) // Minimal delay
        const newResults = calculateFullComparison(inputs)
        setResults(newResults)
      } catch (error) {
        console.error('Calculation error:', error)
      } finally {
        setIsCalculating(false)
      }
    }
    calculateResults()
  }, [inputs])

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>
      {/* Compact Header */}
      <header className="border-b" style={{ borderColor: 'var(--color-ui-border)', background: 'var(--color-bg-card)' }}>
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                Buy vs Rent Calculator
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Subtle Theme Selector */}
              <select 
                className="text-sm px-3 py-1 rounded-lg border-0 outline-none cursor-pointer"
                style={{ 
                  background: 'var(--color-bg-tertiary)', 
                  color: 'var(--color-text-primary)',
                  fontSize: '13px'
                }}
                value={currentTheme}
                onChange={(e) => setTheme(e.target.value as ThemeType)}
              >
                <option value="lovable">💜 Modern</option>
                <option value="star-wars">🌌 Dark</option>
                <option value="july-4th">🇺🇸 Classic</option>
              </select>

              {/* Export Actions */}
              {results && (
                <>
                  <button className="btn-secondary text-sm px-4 py-2">
                    <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-1a2 2 0 00-2-2H9a2 2 0 00-2 2v1a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print
                  </button>
                  <button className="btn-primary text-sm px-4 py-2">
                    <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-12 gap-4 h-full">
          {/* Left Sidebar - Compact Parameters */}
          <div className="col-span-12 lg:col-span-3">
            <CompactParameterPanel
              parameters={inputs}
              onParameterChange={handleInputChange}
            />
          </div>

          {/* Main Content - Results & Charts */}
          <div className="col-span-12 lg:col-span-9">
            {isCalculating ? (
              <div className="flex items-center justify-center h-32">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" style={{ color: 'var(--color-ui-primary)' }}></div>
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Calculating...</span>
                </div>
              </div>
            ) : results ? (
              <div className="space-y-4">
                {/* Professional Results Grid */}
                <DashboardResults results={results} />
                
                {/* Integrated Charts */}
                <IntegratedCharts results={results} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-32">
                <div className="text-center" style={{ color: 'var(--color-text-secondary)' }}>
                  <p className="text-sm">Adjust parameters to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
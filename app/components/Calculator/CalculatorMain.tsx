'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorInputs, CalculatorResults, DEFAULT_INPUTS } from '../../lib/types/calculator'
import { calculateFullComparison } from '../../lib/calculations/comparisons'
import ParameterSection from './ParameterSection'
import ResultsDisplay from './ResultsDisplay'
import ComparisonChart from '../Charts/ComparisonChart'
import ThemeSwitcher from '../ui/ThemeSwitcher'

export default function CalculatorMain() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS)
  const [results, setResults] = useState<CalculatorResults | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [activeTab, setActiveTab] = useState<'results' | 'charts'>('results')

  // Handle input changes
  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Recalculate results when inputs change
  useEffect(() => {
    const calculateResults = async () => {
      setIsCalculating(true)
      try {
        // Add small delay to prevent excessive calculations during rapid input changes
        await new Promise(resolve => setTimeout(resolve, 100))
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
    <div className="max-w-7xl mx-auto relative">
      {/* Theme Switcher */}
      <ThemeSwitcher />
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Buy vs Rent Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Make an informed decision about whether to buy or rent your next home with our comprehensive financial analysis.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Input Parameters - Left Side */}
        <div className="lg:col-span-2">
          <div className="sticky top-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Calculator Parameters
            </h2>
            <ParameterSection 
              inputs={inputs} 
              onInputChange={handleInputChange} 
            />
          </div>
        </div>

        {/* Results & Charts - Right Side */}
        <div className="lg:col-span-3">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('results')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'results'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📊 Results & Analysis
            </button>
            <button
              onClick={() => setActiveTab('charts')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'charts'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📈 Charts & Trends
            </button>
          </div>

          {/* Loading State */}
          {isCalculating && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              <span className="ml-3 text-gray-600">Calculating...</span>
            </div>
          )}

          {/* Results Display */}
          {!isCalculating && results && (
            <div className="animate-fade-in">
              {activeTab === 'results' && (
                <ResultsDisplay results={results} />
              )}
              
              {activeTab === 'charts' && (
                <ComparisonChart yearlyData={results.yearlyBreakdown} />
              )}
            </div>
          )}

          {/* Error State */}
          {!isCalculating && !results && (
            <div className="text-center py-8 text-red-600">
              Error calculating results. Please check your inputs and try again.
            </div>
          )}
        </div>
      </div>

             {/* Summary Footer */}
       {results && !isCalculating && (
         <div 
           className="mt-12 p-6 rounded-xl border theme-transition"
           style={{
             background: 'var(--effect-gradient)',
             borderColor: 'var(--color-ui-border)',
             boxShadow: 'var(--effect-glow)',
           }}
         >
           <div className="text-center">
             <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
               🎉 Milestone 3 Complete: Premium Themes & Polish
             </h3>
             <p className="mb-3" style={{ color: 'var(--color-text-secondary)' }}>
               🎨 Three beautiful themes with smooth transitions<br/>
               ✨ Slick paint palette theme switcher<br/>
               📤 Export & sharing functionality<br/>
               🚀 Production-ready calculator
             </p>
             <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
               Your recommendation: <span className="font-semibold">{results.comparison.recommendation}</span> with {results.comparison.confidenceLevel.toLowerCase()} confidence
             </p>
           </div>
         </div>
       )}
    </div>
  )
} 
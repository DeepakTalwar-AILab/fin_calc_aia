'use client'

import React from 'react'
import { CalculatorResults } from '../../lib/types/calculator'

interface DashboardResultsProps {
  results: CalculatorResults
}

export default function DashboardResults({ results }: DashboardResultsProps) {
  const { buyScenario, rentScenario, comparison } = results

  return (
    <div className="space-y-6">
      {/* Elegant Recommendation Banner - Matching Prototype */}
      <div className="recommendation-banner">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="recommendation-icon">
              {comparison.recommendation === 'BUY' ? '🏠' : comparison.recommendation === 'RENT' ? '🏢' : '⚖️'}
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                {comparison.recommendation === 'BUY' ? 'Buy Is Better' : comparison.recommendation === 'RENT' ? 'Rent Is Better' : 'Neutral'}
              </h2>
                             <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                 10-year analysis
               </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              {comparison.confidenceLevel} Confidence
            </div>
          </div>
        </div>
      </div>

      {/* Clean Metrics Grid - Matching Prototype */}
      <div className="grid grid-cols-2 gap-4">
        {/* Monthly Buy Cost */}
        <div className="metric-card">
          <div className="metric-header">
            <h3>🏠 Monthly Buy</h3>
          </div>
          <div className="metric-value" style={{ color: 'var(--color-chart-buy)' }}>
            ${buyScenario.totalMonthlyCost.toLocaleString()}
          </div>
        </div>

        {/* Monthly Rent Cost */}
        <div className="metric-card">
          <div className="metric-header">
            <h3>🏢 Monthly Rent</h3>
          </div>
          <div className="metric-value" style={{ color: 'var(--color-chart-rent)' }}>
            ${rentScenario.totalMonthlyCost.toLocaleString()}
          </div>
        </div>

        {/* Break-Even */}
        <div className="metric-card">
          <div className="metric-header">
            <h3>⏱️ Break-Even</h3>
          </div>
          <div className="metric-value" style={{ color: 'var(--color-text-primary)' }}>
            {comparison.breakEvenPoint} Years
          </div>
        </div>

        {/* Net Worth Difference */}
        <div className="metric-card">
          <div className="metric-header">
            <h3>💰 Net Worth Diff</h3>
          </div>
          <div 
            className="metric-value"
            style={{ 
              color: comparison.netWorthDifference > 0 
                ? 'var(--color-chart-positive)' 
                : 'var(--color-chart-negative)' 
            }}
          >
            {comparison.netWorthDifference > 0 ? '+' : ''}${Math.abs(comparison.netWorthDifference).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Detailed Analysis Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Buying Scenario */}
        <div className="chart-container">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 rounded" style={{ background: 'var(--color-chart-buy)' }}></div>
            <h3 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Buying Scenario</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Monthly Payment:</span>
              <span className="font-mono font-semibold">${buyScenario.monthlyMortgagePayment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Total Monthly:</span>
              <span className="font-mono font-semibold">${buyScenario.totalMonthlyCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pt-2" style={{ borderColor: 'var(--color-ui-border)' }}>
              <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Net Worth:</span>
                             <span className="font-mono font-bold text-lg" style={{ color: 'var(--color-chart-positive)' }}>
                 ${buyScenario.currentEquity.toLocaleString()}
               </span>
            </div>
          </div>
        </div>

        {/* Renting Scenario */}
        <div className="chart-container">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 rounded" style={{ background: 'var(--color-chart-rent)' }}></div>
            <h3 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Renting Scenario</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Monthly Rent:</span>
              <span className="font-mono font-semibold">${rentScenario.monthlyRent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Investment Growth:</span>
              <span className="font-mono font-semibold">7.0%</span>
            </div>
            <div className="flex justify-between border-t pt-2" style={{ borderColor: 'var(--color-ui-border)' }}>
              <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Net Worth:</span>
                             <span className="font-mono font-bold text-lg" style={{ color: 'var(--color-chart-rent)' }}>
                 ${rentScenario.totalInvestmentValue.toLocaleString()}
               </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
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
      <div className="recommendation-banner" style={{ borderLeft: '4px solid #10b981' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="recommendation-icon" style={{ background: '#10b981', color: 'white' }}>
              🏠
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

      {/* Detailed Analysis Sections - Prototype Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="metric-card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-4 h-4 rounded" style={{ background: '#10b981' }}></div>
            <h3 className="font-semibold text-base" style={{ color: 'var(--color-text-primary)' }}>Buying Scenario</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Monthly Payment:</span>
              <span className="font-mono font-semibold text-sm">${buyScenario.monthlyMortgagePayment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Total Monthly:</span>
              <span className="font-mono font-semibold text-sm">${buyScenario.totalMonthlyCost.toLocaleString()}</span>
            </div>
            <div className="border-t pt-3" style={{ borderColor: 'var(--color-ui-border)' }}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Net Worth:</span>
                <span className="font-mono font-bold text-lg" style={{ color: '#10b981' }}>
                  ${buyScenario.currentEquity.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-4 h-4 rounded" style={{ background: '#06b6d4' }}></div>
            <h3 className="font-semibold text-base" style={{ color: 'var(--color-text-primary)' }}>Renting Scenario</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Monthly Rent:</span>
              <span className="font-mono font-semibold text-sm">${rentScenario.monthlyRent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Investment Growth:</span>
              <span className="font-mono font-semibold text-sm">7.0%</span>
            </div>
            <div className="border-t pt-3" style={{ borderColor: 'var(--color-ui-border)' }}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Net Worth:</span>
                <span className="font-mono font-bold text-lg" style={{ color: '#06b6d4' }}>
                  ${rentScenario.totalInvestmentValue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
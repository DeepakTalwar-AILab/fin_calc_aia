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
      {/* Elegant Recommendation Banner */}
      <div 
        className="relative overflow-hidden rounded-2xl p-6"
        style={{
          background: `linear-gradient(135deg, ${
            comparison.recommendation === 'BUY' 
              ? 'var(--color-chart-positive)' 
              : comparison.recommendation === 'RENT'
              ? 'var(--color-chart-negative)'
              : 'var(--color-ui-primary)'
          }15, ${
            comparison.recommendation === 'BUY' 
              ? 'var(--color-chart-positive)' 
              : comparison.recommendation === 'RENT'
              ? 'var(--color-chart-negative)'
              : 'var(--color-ui-primary)'
          }08)`,
          border: `1px solid ${
            comparison.recommendation === 'BUY' 
              ? 'var(--color-chart-positive)' 
              : comparison.recommendation === 'RENT'
              ? 'var(--color-chart-negative)'
              : 'var(--color-ui-primary)'
          }20`,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold text-white"
              style={{
                background: comparison.recommendation === 'BUY' 
                  ? 'var(--color-chart-positive)' 
                  : comparison.recommendation === 'RENT'
                  ? 'var(--color-chart-negative)'
                  : 'var(--color-ui-primary)'
              }}
            >
              {comparison.recommendation === 'BUY' ? '🏠' : comparison.recommendation === 'RENT' ? '🏢' : '⚖️'}
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                {comparison.recommendation}
              </h2>
              <div className="flex items-center space-x-3 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                <span>Confidence: <strong>{comparison.confidenceLevel}</strong></span>
                <span>•</span>
                <span>Break-even: <strong>{comparison.breakEvenPoint} years</strong></span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Net Worth Advantage</div>
            <div 
              className="text-xl font-bold font-mono"
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
      </div>

      {/* Compact Metrics Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {/* Monthly Buy Cost */}
        <div className="metric-card">
          <div className="metric-header">
            <h3>Monthly Buy Cost</h3>
            <div className="metric-icon" style={{ background: 'var(--color-chart-buy)15' }}>
              <svg className="w-4 h-4" style={{ color: 'var(--color-chart-buy)' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
          </div>
          <div className="metric-value">${buyScenario.totalMonthlyCost.toLocaleString()}</div>
          <div className="metric-breakdown">
            <div>Mortgage: ${buyScenario.monthlyMortgagePayment.toLocaleString()}</div>
            <div>Tax & Insurance: ${(buyScenario.monthlyPropertyTax + buyScenario.monthlyInsurance).toLocaleString()}</div>
            <div>Maintenance: ${buyScenario.monthlyMaintenance.toLocaleString()}</div>
          </div>
        </div>

        {/* Monthly Rent Cost */}
        <div className="metric-card">
          <div className="metric-header">
            <h3>Monthly Rent Cost</h3>
            <div className="metric-icon" style={{ background: 'var(--color-chart-rent)15' }}>
              <svg className="w-4 h-4" style={{ color: 'var(--color-chart-rent)' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2h2v4H7V6zm2 6H7v2h2v-2zm2-6h2v2h-2V6zm2 4h-2v2h2v-2zm2-4h2v2h-2V6zm2 4h-2v2h2v-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="metric-value">${rentScenario.totalMonthlyCost.toLocaleString()}</div>
          <div className="metric-breakdown">
            <div>Rent: ${rentScenario.monthlyRent.toLocaleString()}</div>
            <div>Insurance: ${rentScenario.monthlyRentersInsurance.toLocaleString()}</div>
          </div>
        </div>

        {/* Home Equity */}
        <div className="metric-card">
          <div className="metric-header">
            <h3>Home Equity</h3>
            <div className="metric-icon" style={{ background: 'var(--color-chart-positive)15' }}>
              <svg className="w-4 h-4" style={{ color: 'var(--color-chart-positive)' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="metric-value">${buyScenario.currentEquity.toLocaleString()}</div>
          <div className="metric-breakdown">
            <div>Home Value: ${buyScenario.homeValue.toLocaleString()}</div>
            <div>Mortgage: ${buyScenario.mortgageBalance.toLocaleString()}</div>
          </div>
        </div>

        {/* Investment Growth */}
        <div className="metric-card">
          <div className="metric-header">
            <h3>Investment Growth</h3>
            <div className="metric-icon" style={{ background: 'var(--color-chart-neutral)15' }}>
              <svg className="w-4 h-4" style={{ color: 'var(--color-chart-neutral)' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="metric-value">${rentScenario.totalInvestmentValue.toLocaleString()}</div>
          <div className="metric-breakdown">
            <div>Principal: ${rentScenario.investedDownPayment.toLocaleString()}</div>
            <div>Growth: +${rentScenario.investmentGrowth.toLocaleString()}</div>
          </div>
        </div>
      </div>


    </div>
  )
} 
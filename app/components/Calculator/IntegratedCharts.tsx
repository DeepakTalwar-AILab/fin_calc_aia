'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { CalculatorResults } from '../../lib/types/calculator'
import { useTheme } from '../../lib/contexts/ThemeContext'

interface IntegratedChartsProps {
  results: CalculatorResults
}

export default function IntegratedCharts({ results }: IntegratedChartsProps) {
  const { theme } = useTheme()
  
  // Prepare chart data
  const chartData = results.yearlyBreakdown.map(year => ({
    year: year.year,
    buyCumulative: Math.abs(year.buyTotalCost),
    rentCumulative: Math.abs(year.rentTotalCost),
    buyNetWorth: year.buyNetWorth,
    rentNetWorth: year.rentNetWorth,
    buyMonthly: year.buyMonthlyCosts,
    rentMonthly: year.rentMonthlyCosts,
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Cumulative Cost Chart */}
      <div className="metric-card">
        <div className="metric-header">
          <h3>Cumulative Costs</h3>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="year" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`,
                  name === 'buyCumulative' ? 'Buy' : 'Rent'
                ]}
                labelFormatter={(value) => `Year ${value}`}
                contentStyle={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-ui-border)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line
                type="monotone"
                dataKey="buyCumulative"
                stroke={theme.chart.buy}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="rentCumulative"
                stroke={theme.chart.rent}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-4 mt-3 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded mr-2" style={{ background: theme.chart.buy }}></div>
            <span style={{ color: 'var(--color-text-muted)' }}>Buy</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded mr-2" style={{ background: theme.chart.rent }}></div>
            <span style={{ color: 'var(--color-text-muted)' }}>Rent</span>
          </div>
        </div>
      </div>

      {/* Net Worth Chart */}
      <div className="metric-card">
        <div className="metric-header">
          <h3>Net Worth Growth</h3>
        </div>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="year" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`,
                  name === 'buyNetWorth' ? 'Buy Net Worth' : 'Rent Net Worth'
                ]}
                labelFormatter={(value) => `Year ${value}`}
                contentStyle={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-ui-border)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line
                type="monotone"
                dataKey="buyNetWorth"
                stroke={theme.chart.positive}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="rentNetWorth"
                stroke={theme.chart.neutral}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-4 mt-3 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded mr-2" style={{ background: theme.chart.positive }}></div>
            <span style={{ color: 'var(--color-text-muted)' }}>Buy</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded mr-2" style={{ background: theme.chart.neutral }}></div>
            <span style={{ color: 'var(--color-text-muted)' }}>Rent</span>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="metric-card">
        <div className="metric-header">
          <h3>Key Insights</h3>
        </div>
        <div className="space-y-2">
          <div>
            <h4 className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>Factors</h4>
            <ul className="space-y-1">
              {results.comparison.keyFactors.slice(0, 2).map((factor, index) => (
                <li key={index} className="text-xs flex items-start" style={{ color: 'var(--color-text-muted)' }}>
                  <span className="mr-1" style={{ color: 'var(--color-ui-primary)' }}>•</span>
                  {factor.slice(0, 40)}...
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 
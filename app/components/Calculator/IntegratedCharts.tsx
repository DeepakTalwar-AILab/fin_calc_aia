'use client'

import React from 'react'
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Cost Comparison Chart - Matching Prototype Gradients */}
      <div className="chart-container">
        <div className="metric-header">
          <h3>📊 Cost Comparison</h3>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="buyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="rentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.1} />
                </linearGradient>
              </defs>
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
                tickFormatter={(value) => `$${value/1000}k`}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-ui-border)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
              />
              <Area
                type="monotone"
                dataKey="buyCumulative"
                stroke="#10b981"
                fill="url(#buyGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="rentCumulative"
                stroke="#06b6d4"
                fill="url(#rentGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Net Worth Growth Chart - Clean Lines Like Prototype */}
      <div className="chart-container">
        <div className="metric-header">
          <h3>📈 Net Worth Growth</h3>
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
                  name === 'buyNetWorth' ? 'Buy Net Worth' : 'Rent Net Worth'
                ]}
                labelFormatter={(value) => `Year ${value}`}
                contentStyle={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-ui-border)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: 'var(--effect-shadow)'
                }}
              />
              <Line
                type="monotone"
                dataKey="buyNetWorth"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#10b981' }}
              />
              <Line
                type="monotone"
                dataKey="rentNetWorth"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#06b6d4' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
} 
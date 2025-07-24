'use client'

import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { YearlyBreakdown } from '../../lib/types/calculator'
import { useTheme } from '../../lib/contexts/ThemeContext'
import Card from '../ui/Card'

interface ComparisonChartProps {
  yearlyData: YearlyBreakdown[]
}

export default function ComparisonChart({ yearlyData }: ComparisonChartProps) {
  const { theme } = useTheme()
  // Format data for cumulative cost comparison
  const costData = yearlyData.map(year => ({
    year: year.year,
    'Buy Total Cost': Math.abs(year.buyTotalCost),
    'Rent Total Cost': Math.abs(year.rentTotalCost),
    'Buy Net Worth': year.buyNetWorth,
    'Rent Net Worth': year.rentNetWorth,
  }))

  // Format data for monthly cost comparison
  const monthlyData = yearlyData.map(year => ({
    year: year.year,
    'Buy Monthly': year.buyMonthlyCosts,
    'Rent Monthly': year.rentMonthlyCosts,
    'Difference': year.monthlyDifference,
  }))

  return (
    <div className="space-y-6">
      {/* Cumulative Cost Comparison */}
      <Card title="Cumulative Cost Comparison">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `Year ${value}`}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`,
                  name
                ]}
                labelFormatter={(value) => `Year ${value}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="Buy Total Cost"
                stackId="1"
                stroke={theme.chart.buy}
                fill={theme.chart.buy}
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="Rent Total Cost"
                stackId="2"
                stroke={theme.chart.rent}
                fill={theme.chart.rent}
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Net Worth Comparison */}
      <Card title="Net Worth Growth Comparison">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `Year ${value}`}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`,
                  name
                ]}
                labelFormatter={(value) => `Year ${value}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="Buy Net Worth"
                stroke={theme.chart.positive}
                fill={theme.chart.positive}
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="Rent Net Worth"
                stroke={theme.chart.neutral}
                fill={theme.chart.neutral}
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Monthly Cost Trends */}
      <Card title="Monthly Cost Trends">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `Year ${value}`}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`,
                  name
                ]}
                labelFormatter={(value) => `Year ${value}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="Buy Monthly"
                stroke={theme.chart.buy}
                fill={theme.chart.buy}
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="Rent Monthly"
                stroke={theme.chart.rent}
                fill={theme.chart.rent}
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            This chart shows how monthly costs change over time due to inflation, rent increases, and changing mortgage payments.
          </p>
        </div>
      </Card>
    </div>
  )
} 
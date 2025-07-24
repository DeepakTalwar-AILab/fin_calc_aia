'use client'

import React from 'react'
import { CalculatorInputs } from '../../lib/types/calculator'
import { useTheme } from '../../lib/contexts/ThemeContext'

interface CompactParameterPanelProps {
  parameters: CalculatorInputs
  onParameterChange: (field: keyof CalculatorInputs, value: number) => void
}

const InputField = ({ label, value, onChange, type, suffix }: {
  label: string
  value: number
  onChange: (value: number) => void
  type: 'currency' | 'percentage' | 'number'
  suffix?: string
}) => {
  const formatValue = () => {
    if (type === 'currency') return `$${value.toLocaleString()}`
    if (type === 'percentage') return `${value}%`
    return value.toString()
  }

  return (
    <div>
      <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="input-field text-sm"
        style={{
          background: 'var(--color-ui-input)',
          border: '1px solid var(--color-ui-border)',
          color: 'var(--color-text-primary)',
        }}
      />
    </div>
  )
}

export default function CompactParameterPanel({ parameters, onParameterChange }: CompactParameterPanelProps) {
  const { theme } = useTheme()

  return (
    <div className="sticky top-4 space-y-4">
      <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
        Parameters
      </h2>

      {/* Property Section */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Property</h3>
        </div>
        <div className="space-y-3">
          <InputField
            label="Price"
            value={parameters.purchasePrice}
            onChange={(value) => onParameterChange('purchasePrice', value)}
            type="currency"
          />
          <div className="grid grid-cols-2 gap-2">
            <InputField
              label="Down Payment"
              value={parameters.downPaymentPercentage}
              onChange={(value) => onParameterChange('downPaymentPercentage', value)}
              type="percentage"
            />
            <div></div>
          </div>
          <InputField
            label="Monthly Rent"
            value={parameters.monthlyRent}
            onChange={(value) => onParameterChange('monthlyRent', value)}
            type="currency"
          />
        </div>
      </div>

      {/* Loan Section */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Loan</h3>
        </div>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <InputField
              label="Rate"
              value={parameters.mortgageRate}
              onChange={(value) => onParameterChange('mortgageRate', value)}
              type="percentage"
            />
            <InputField
              label="Term"
              value={parameters.timeHorizon}
              onChange={(value) => onParameterChange('timeHorizon', value)}
              type="number"
              suffix="yr"
            />
          </div>
        </div>
      </div>

      {/* Costs Section */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Costs</h3>
        </div>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <InputField
              label="Tax"
              value={parameters.propertyTaxRate}
              onChange={(value) => onParameterChange('propertyTaxRate', value)}
              type="percentage"
            />
            <InputField
              label="Insurance"
              value={parameters.homeInsurance}
              onChange={(value) => onParameterChange('homeInsurance', value)}
              type="currency"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <InputField
              label="Maintenance"
              value={parameters.maintenanceRate}
              onChange={(value) => onParameterChange('maintenanceRate', value)}
              type="percentage"
            />
            <div></div>
          </div>
        </div>
      </div>

      {/* Economic Section */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Economic</h3>
        </div>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <InputField
              label="Stock Return"
              value={parameters.stockMarketGrowthRate}
              onChange={(value) => onParameterChange('stockMarketGrowthRate', value)}
              type="percentage"
            />
            <InputField
              label="Inflation"
              value={parameters.inflationRate}
              onChange={(value) => onParameterChange('inflationRate', value)}
              type="percentage"
            />
          </div>
          <InputField
            label="Home Appreciation"
            value={parameters.homePriceAppreciation}
            onChange={(value) => onParameterChange('homePriceAppreciation', value)}
            type="percentage"
          />
        </div>
      </div>
    </div>
  )
} 
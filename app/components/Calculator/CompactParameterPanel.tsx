'use client'

import React from 'react'
import { CalculatorInputs } from '../../lib/types/calculator'
import { CurrencyInput, PercentageInput, NumberInput } from '../ui/Input'

interface CompactParameterPanelProps {
  inputs: CalculatorInputs
  onInputChange: (field: keyof CalculatorInputs, value: number) => void
}

export default function CompactParameterPanel({ inputs, onInputChange }: CompactParameterPanelProps) {
  return (
    <div className="space-y-4">
      <div className="sticky top-4">
        <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
          Parameters
        </h2>
        
        {/* Primary Inputs */}
        <div className="space-y-3 mb-4">
          <CurrencyInput
            label="Purchase Price"
            value={inputs.purchasePrice}
            onValueChange={(value) => onInputChange('purchasePrice', value)}
            helpText="Total home cost"
          />
          
          <div className="grid grid-cols-2 gap-3">
            <PercentageInput
              label="Down Payment"
              value={inputs.downPaymentPercentage}
              onValueChange={(value) => onInputChange('downPaymentPercentage', value)}
              min={5}
              max={50}
            />
            
            <NumberInput
              label="Time Horizon"
              value={inputs.timeHorizon}
              onValueChange={(value) => onInputChange('timeHorizon', value)}
              suffix="years"
              min={1}
              max={30}
            />
          </div>
          
          <CurrencyInput
            label="Monthly Rent"
            value={inputs.monthlyRent}
            onValueChange={(value) => onInputChange('monthlyRent', value)}
            helpText="Equivalent rental cost"
          />
        </div>

        {/* Collapsible Advanced Section */}
        <details className="group">
          <summary className="cursor-pointer list-none flex items-center justify-between p-3 rounded-lg hover:bg-opacity-50" style={{ background: 'var(--color-bg-tertiary)' }}>
            <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Advanced Parameters</span>
            <svg className="w-5 h-5 transition-transform group-open:rotate-180" style={{ color: 'var(--color-text-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          
                      <div className="mt-2 space-y-2">
            {/* Rates */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Interest Rates</h4>
              <PercentageInput
                label="Mortgage Rate"
                value={inputs.mortgageRate}
                onValueChange={(value) => onInputChange('mortgageRate', value)}
                min={1}
                max={15}
                step={0.01}
              />
              <PercentageInput
                label="Stock Growth"
                value={inputs.stockMarketGrowthRate}
                onValueChange={(value) => onInputChange('stockMarketGrowthRate', value)}
                min={1}
                max={15}
                step={0.1}
              />
            </div>

            {/* Property Costs */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Property Costs</h4>
              <div className="grid grid-cols-2 gap-3">
                <PercentageInput
                  label="Property Tax"
                  value={inputs.propertyTaxRate}
                  onValueChange={(value) => onInputChange('propertyTaxRate', value)}
                  min={0.1}
                  max={5}
                  step={0.1}
                />
                <PercentageInput
                  label="Maintenance"
                  value={inputs.maintenanceRate}
                  onValueChange={(value) => onInputChange('maintenanceRate', value)}
                  min={0.5}
                  max={5}
                  step={0.1}
                />
              </div>
              <CurrencyInput
                label="Home Insurance"
                value={inputs.homeInsurance}
                onValueChange={(value) => onInputChange('homeInsurance', value)}
              />
            </div>

            {/* Economic Factors */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Economic Factors</h4>
              <div className="grid grid-cols-2 gap-3">
                <PercentageInput
                  label="Home Appreciation"
                  value={inputs.homePriceAppreciation}
                  onValueChange={(value) => onInputChange('homePriceAppreciation', value)}
                  min={0}
                  max={10}
                  step={0.1}
                />
                <PercentageInput
                  label="Rent Growth"
                  value={inputs.rentGrowthRate}
                  onValueChange={(value) => onInputChange('rentGrowthRate', value)}
                  min={0}
                  max={10}
                  step={0.1}
                />
              </div>
            </div>

            {/* Tax Settings */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Tax Settings</h4>
              <PercentageInput
                label="Tax Bracket"
                value={inputs.taxBracket}
                onValueChange={(value) => onInputChange('taxBracket', value)}
                min={10}
                max={37}
                step={1}
              />
            </div>
          </div>
        </details>
      </div>
    </div>
  )
} 
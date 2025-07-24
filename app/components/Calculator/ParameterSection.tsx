'use client'

import React from 'react'
import { CalculatorInputs } from '../../lib/types/calculator'
import { CurrencyInput, PercentageInput, NumberInput } from '../ui/Input'
import Card from '../ui/Card'

interface ParameterSectionProps {
  inputs: CalculatorInputs
  onInputChange: (field: keyof CalculatorInputs, value: number) => void
}

export default function ParameterSection({ inputs, onInputChange }: ParameterSectionProps) {
  return (
    <div className="space-y-6">
      {/* Property Details */}
      <Card title="Property Details">
        <div className="grid md:grid-cols-2 gap-4">
          <CurrencyInput
            label="Purchase Price"
            value={inputs.purchasePrice}
            onValueChange={(value) => onInputChange('purchasePrice', value)}
            helpText="Total cost of the home"
          />
          
          <PercentageInput
            label="Down Payment"
            value={inputs.downPaymentPercentage}
            onValueChange={(value) => onInputChange('downPaymentPercentage', value)}
            helpText="Typically 10-20%"
            min={5}
            max={50}
          />
          
          <CurrencyInput
            label="Monthly Rent"
            value={inputs.monthlyRent}
            onValueChange={(value) => onInputChange('monthlyRent', value)}
            helpText="Rent for equivalent property"
          />
          
          <NumberInput
            label="Time Horizon"
            value={inputs.timeHorizon}
            onValueChange={(value) => onInputChange('timeHorizon', value)}
            suffix="years"
            helpText="Analysis period"
            min={1}
            max={30}
          />
        </div>
      </Card>

      {/* Loan & Interest Rates */}
      <Card title="Loan & Interest Rates">
        <div className="grid md:grid-cols-3 gap-4">
          <PercentageInput
            label="Mortgage Rate"
            value={inputs.mortgageRate}
            onValueChange={(value) => onInputChange('mortgageRate', value)}
            helpText="Annual interest rate"
            min={1}
            max={15}
            step={0.01}
          />
          
          <NumberInput
            label="Mortgage Term"
            value={inputs.mortgageTerm}
            onValueChange={(value) => onInputChange('mortgageTerm', value)}
            suffix="years"
            helpText="Loan duration"
            min={10}
            max={30}
            step={5}
          />
          
          <PercentageInput
            label="Stock Market Growth"
            value={inputs.stockMarketGrowthRate}
            onValueChange={(value) => onInputChange('stockMarketGrowthRate', value)}
            helpText="Expected annual return"
            min={1}
            max={15}
            step={0.1}
          />
        </div>
      </Card>

      {/* Property Costs */}
      <Card title="Property Costs">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PercentageInput
            label="Property Tax Rate"
            value={inputs.propertyTaxRate}
            onValueChange={(value) => onInputChange('propertyTaxRate', value)}
            helpText="Annual % of home value"
            min={0.1}
            max={5}
            step={0.1}
          />
          
          <CurrencyInput
            label="Home Insurance"
            value={inputs.homeInsurance}
            onValueChange={(value) => onInputChange('homeInsurance', value)}
            helpText="Annual premium"
          />
          
          <CurrencyInput
            label="HOA Fees"
            value={inputs.hoaFees}
            onValueChange={(value) => onInputChange('hoaFees', value)}
            helpText="Monthly HOA fees"
          />
          
          <PercentageInput
            label="Maintenance Rate"
            value={inputs.maintenanceRate}
            onValueChange={(value) => onInputChange('maintenanceRate', value)}
            helpText="Annual % of home value"
            min={0.5}
            max={5}
            step={0.1}
          />
          
          <PercentageInput
            label="PMI Rate"
            value={inputs.pmiRate}
            onValueChange={(value) => onInputChange('pmiRate', value)}
            helpText="If down payment < 20%"
            min={0.1}
            max={2}
            step={0.1}
          />
        </div>
      </Card>

      {/* Economic Factors */}
      <Card title="Economic Factors">
        <div className="grid md:grid-cols-3 gap-4">
          <PercentageInput
            label="Home Price Appreciation"
            value={inputs.homePriceAppreciation}
            onValueChange={(value) => onInputChange('homePriceAppreciation', value)}
            helpText="Annual increase"
            min={0}
            max={10}
            step={0.1}
          />
          
          <PercentageInput
            label="Inflation Rate"
            value={inputs.inflationRate}
            onValueChange={(value) => onInputChange('inflationRate', value)}
            helpText="General inflation"
            min={0}
            max={8}
            step={0.1}
          />
          
          <PercentageInput
            label="Rent Growth Rate"
            value={inputs.rentGrowthRate}
            onValueChange={(value) => onInputChange('rentGrowthRate', value)}
            helpText="Annual rent increases"
            min={0}
            max={10}
            step={0.1}
          />
        </div>
      </Card>

      {/* Additional Costs */}
      <Card title="Additional Costs">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <PercentageInput
            label="Closing Costs"
            value={inputs.closingCostRate}
            onValueChange={(value) => onInputChange('closingCostRate', value)}
            helpText="% of purchase price"
            min={1}
            max={8}
            step={0.1}
          />
          
          <CurrencyInput
            label="Moving Costs"
            value={inputs.movingCosts}
            onValueChange={(value) => onInputChange('movingCosts', value)}
            helpText="One-time expense"
          />
          
          <CurrencyInput
            label="Renter's Insurance"
            value={inputs.rentersInsurance}
            onValueChange={(value) => onInputChange('rentersInsurance', value)}
            helpText="Annual cost"
          />
          
          <CurrencyInput
            label="Utility Difference"
            value={inputs.utilityDifference}
            onValueChange={(value) => onInputChange('utilityDifference', value)}
            helpText="Monthly (+ if owning costs more)"
          />
        </div>
      </Card>

      {/* Tax Settings */}
      <Card title="Tax Settings">
        <div className="grid md:grid-cols-2 gap-4">
          <PercentageInput
            label="Tax Bracket"
            value={inputs.taxBracket}
            onValueChange={(value) => onInputChange('taxBracket', value)}
            helpText="Federal marginal rate"
            min={10}
            max={37}
            step={1}
          />
          
          <CurrencyInput
            label="SALT Deduction Limit"
            value={inputs.saltDeductionLimit}
            onValueChange={(value) => onInputChange('saltDeductionLimit', value)}
            helpText="State & local tax limit"
          />
        </div>
      </Card>
    </div>
  )
} 
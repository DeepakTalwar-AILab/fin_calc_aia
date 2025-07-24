'use client'

import React from 'react'
import { CalculatorResults } from '../../lib/types/calculator'
import Card from '../ui/Card'
import ExportButton from '../ui/ExportButton'

interface ResultsDisplayProps {
  results: CalculatorResults
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const { buyScenario, rentScenario, comparison } = results

  return (
    <div className="space-y-6">
      {/* Export Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Analysis</h2>
        <ExportButton results={results} />
      </div>
      
      {/* Main Recommendation */}
      <Card title="Recommendation" className="bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="text-center">
          <div className={`text-4xl font-bold mb-3 ${
            comparison.recommendation === 'BUY' ? 'text-secondary-600' :
            comparison.recommendation === 'RENT' ? 'text-error' :
            'text-accent-600'
          }`}>
            {comparison.recommendation}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div>
              <div className="metric-label">Confidence</div>
              <div className="metric-value text-lg">{comparison.confidenceLevel}</div>
            </div>
            <div>
              <div className="metric-label">Break-even</div>
              <div className="metric-value text-lg">{comparison.breakEvenPoint} years</div>
            </div>
            <div>
              <div className="metric-label">Monthly Difference</div>
              <div className={`metric-value text-lg ${
                comparison.monthlyDifference > 0 ? 'metric-negative' : 'metric-positive'
              }`}>
                ${Math.abs(comparison.monthlyDifference).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="metric-label">Net Worth Advantage</div>
              <div className={`metric-value text-lg ${
                comparison.netWorthDifference > 0 ? 'metric-positive' : 'metric-negative'
              }`}>
                ${Math.abs(comparison.netWorthDifference).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Monthly Cost Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Buy Scenario - Monthly Costs">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Mortgage Payment</span>
              <span className="font-mono">${buyScenario.monthlyMortgagePayment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Property Tax</span>
              <span className="font-mono">${buyScenario.monthlyPropertyTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Insurance</span>
              <span className="font-mono">${buyScenario.monthlyInsurance.toLocaleString()}</span>
            </div>
            {buyScenario.monthlyPMI > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">PMI</span>
                <span className="font-mono">${buyScenario.monthlyPMI.toLocaleString()}</span>
              </div>
            )}
            {buyScenario.monthlyHOA > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">HOA Fees</span>
                <span className="font-mono">${buyScenario.monthlyHOA.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Maintenance</span>
              <span className="font-mono">${buyScenario.monthlyMaintenance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Utilities</span>
              <span className="font-mono">${buyScenario.monthlyUtilities.toLocaleString()}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-semibold">
              <span>Total Monthly Cost</span>
              <span className="font-mono text-lg">${buyScenario.totalMonthlyCost.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        <Card title="Rent Scenario - Monthly Costs">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Rent</span>
              <span className="font-mono">${rentScenario.monthlyRent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Renter's Insurance</span>
              <span className="font-mono">${rentScenario.monthlyRentersInsurance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Utilities</span>
              <span className="font-mono">${rentScenario.monthlyUtilities.toLocaleString()}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-semibold">
              <span>Total Monthly Cost</span>
              <span className="font-mono text-lg">${rentScenario.totalMonthlyCost.toLocaleString()}</span>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Investment Growth</h4>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Down Payment Invested</span>
                <span className="font-mono">${rentScenario.investedDownPayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Investment Growth</span>
                <span className="font-mono text-secondary-600">+${rentScenario.investmentGrowth.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total Investment Value</span>
                <span className="font-mono">${rentScenario.totalInvestmentValue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Equity & Net Worth */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Buy Scenario - Equity & Value">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Home Value</span>
              <span className="font-mono">${buyScenario.homeValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Mortgage Balance</span>
              <span className="font-mono">${buyScenario.mortgageBalance.toLocaleString()}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-semibold">
              <span>Home Equity</span>
              <span className="font-mono text-lg text-secondary-600">${buyScenario.currentEquity.toLocaleString()}</span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Annual Tax Savings</span>
                <span className="font-mono text-secondary-600">${buyScenario.annualTaxSavings.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Net Worth Comparison">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Buy Scenario</span>
                <span className="text-sm font-mono">${comparison.buyNetWorth.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-secondary-500 h-2 rounded-full" 
                  style={{ 
                    width: `${Math.max(comparison.buyNetWorth / Math.max(comparison.buyNetWorth, comparison.rentNetWorth) * 100, 10)}%` 
                  }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Rent Scenario</span>
                <span className="text-sm font-mono">${comparison.rentNetWorth.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full" 
                  style={{ 
                    width: `${Math.max(comparison.rentNetWorth / Math.max(comparison.buyNetWorth, comparison.rentNetWorth) * 100, 10)}%` 
                  }}
                ></div>
              </div>
            </div>
            
            <div className="pt-3 border-t">
              <div className="flex justify-between font-semibold">
                <span>Net Worth Advantage</span>
                <span className={`font-mono ${
                  comparison.netWorthDifference > 0 ? 'text-secondary-600' : 'text-error'
                }`}>
                  {comparison.netWorthDifference > 0 ? 'Buy +' : 'Rent +'}
                  ${Math.abs(comparison.netWorthDifference).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Key Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Key Factors">
          <ul className="space-y-2">
            {comparison.keyFactors.map((factor, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary-500 mr-2 mt-1">•</span>
                <span className="text-gray-700 text-sm">{factor}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Important Assumptions">
          <ul className="space-y-2">
            {comparison.assumptions.map((assumption, index) => (
              <li key={index} className="flex items-start">
                <span className="text-accent-500 mr-2 mt-1">•</span>
                <span className="text-gray-700 text-sm">{assumption}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Risks */}
      <Card title="Risks to Consider" className="bg-yellow-50 border-yellow-200">
        <ul className="space-y-2">
          {comparison.risks.map((risk, index) => (
            <li key={index} className="flex items-start">
              <span className="text-yellow-600 mr-2 mt-1">⚠</span>
              <span className="text-gray-700 text-sm">{risk}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
} 
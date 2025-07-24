import { CalculatorInputs, BuyScenarioResults } from '../types/calculator';
import { calculateMortgageForYear, calculateMonthlyMortgagePayment, calculateRemainingBalance, calculatePMI } from './mortgageCalculations';

/**
 * Calculate all costs and benefits for the buy scenario in a specific year
 */
export function calculateBuyScenario(inputs: CalculatorInputs, year: number): BuyScenarioResults {
  const {
    purchasePrice,
    downPaymentPercentage,
    mortgageRate,
    mortgageTerm,
    propertyTaxRate,
    homeInsurance,
    hoaFees,
    maintenanceRate,
    pmiRate,
    closingCostRate,
    movingCosts,
    utilityDifference,
    homePriceAppreciation,
    stockMarketGrowthRate,
    taxBracket,
    saltDeductionLimit
  } = inputs;

  // Basic calculations
  const downPayment = purchasePrice * (downPaymentPercentage / 100);
  const loanAmount = purchasePrice - downPayment;
  const closingCosts = purchasePrice * (closingCostRate / 100);
  
  // Home value with appreciation
  const homeValue = purchasePrice * Math.pow(1 + homePriceAppreciation / 100, year - 1);
  
  // Mortgage calculations for this year
  const mortgageInfo = calculateMortgageForYear(loanAmount, mortgageRate, mortgageTerm, year);
  const monthlyMortgagePayment = mortgageInfo.monthlyPayment;
  
  // Property tax (based on current home value)
  const monthlyPropertyTax = (homeValue * propertyTaxRate / 100) / 12;
  
  // Insurance (annual cost divided by 12)
  const monthlyInsurance = homeInsurance / 12;
  
  // PMI calculation
  const monthlyPMI = calculatePMI(loanAmount, homeValue, mortgageInfo.remainingBalance, pmiRate, downPaymentPercentage);
  
  // HOA fees
  const monthlyHOA = hoaFees;
  
  // Maintenance (percentage of current home value)
  const monthlyMaintenance = (homeValue * maintenanceRate / 100) / 12;
  
  // Utility difference
  const monthlyUtilities = utilityDifference;
  
  // Total monthly cost
  const totalMonthlyCost = monthlyMortgagePayment + monthlyPropertyTax + monthlyInsurance + 
                          monthlyPMI + monthlyHOA + monthlyMaintenance + monthlyUtilities;
  
  // One-time costs (for year 1 only)
  const totalUpfrontCosts = year === 1 ? downPayment + closingCosts + movingCosts : 0;
  
  // Tax savings calculation
  const annualMortgageInterest = mortgageInfo.monthlyInterest * 12;
  const annualPropertyTax = monthlyPropertyTax * 12;
  
  // SALT deduction (State And Local Tax) - limited to $10,000
  const saltDeduction = Math.min(annualPropertyTax, saltDeductionLimit);
  const mortgageInterestDeduction = annualMortgageInterest;
  
  // Total tax deductions
  const totalDeductions = saltDeduction + mortgageInterestDeduction;
  const annualTaxSavings = totalDeductions * (taxBracket / 100);
  
  // Opportunity cost of down payment (what it could have earned in stock market)
  const opportunityCostOfDownPayment = downPayment * Math.pow(1 + stockMarketGrowthRate / 100, year - 1) - downPayment;
  
  // Equity calculation
  const currentEquity = homeValue - mortgageInfo.remainingBalance;
  
  return {
    // Monthly costs
    monthlyMortgagePayment: Math.round(monthlyMortgagePayment * 100) / 100,
    monthlyPropertyTax: Math.round(monthlyPropertyTax * 100) / 100,
    monthlyInsurance: Math.round(monthlyInsurance * 100) / 100,
    monthlyPMI: Math.round(monthlyPMI * 100) / 100,
    monthlyHOA: Math.round(monthlyHOA * 100) / 100,
    monthlyMaintenance: Math.round(monthlyMaintenance * 100) / 100,
    monthlyUtilities: Math.round(monthlyUtilities * 100) / 100,
    totalMonthlyCost: Math.round(totalMonthlyCost * 100) / 100,
    
    // One-time costs
    downPayment: Math.round(downPayment * 100) / 100,
    closingCosts: Math.round(closingCosts * 100) / 100,
    movingCosts: Math.round(movingCosts * 100) / 100,
    totalUpfrontCosts: Math.round(totalUpfrontCosts * 100) / 100,
    
    // Annual calculations
    annualTaxSavings: Math.round(annualTaxSavings * 100) / 100,
    opportunityCostOfDownPayment: Math.round(opportunityCostOfDownPayment * 100) / 100,
    
    // Equity and appreciation
    currentEquity: Math.round(currentEquity * 100) / 100,
    homeValue: Math.round(homeValue * 100) / 100,
    mortgageBalance: Math.round(mortgageInfo.remainingBalance * 100) / 100,
  };
}

/**
 * Calculate total cost of buying over the entire time horizon
 */
export function calculateTotalBuyCost(inputs: CalculatorInputs): number {
  let totalCost = 0;
  
  for (let year = 1; year <= inputs.timeHorizon; year++) {
    const yearResults = calculateBuyScenario(inputs, year);
    
    // Add monthly costs for the year
    totalCost += yearResults.totalMonthlyCost * 12;
    
    // Add upfront costs (only in year 1)
    if (year === 1) {
      totalCost += yearResults.totalUpfrontCosts;
    }
    
    // Subtract tax savings
    totalCost -= yearResults.annualTaxSavings;
    
    // Add opportunity cost of down payment
    totalCost += yearResults.opportunityCostOfDownPayment;
  }
  
  // Subtract final equity (home value minus remaining mortgage)
  const finalYearResults = calculateBuyScenario(inputs, inputs.timeHorizon);
  const finalEquity = finalYearResults.currentEquity;
  totalCost -= finalEquity;
  
  return Math.round(totalCost * 100) / 100;
} 
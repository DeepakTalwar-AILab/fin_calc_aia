import { CalculatorInputs, RentScenarioResults } from '../types/calculator';

/**
 * Calculate all costs and benefits for the rent scenario in a specific year
 */
export function calculateRentScenario(inputs: CalculatorInputs, year: number): RentScenarioResults {
  const {
    purchasePrice,
    downPaymentPercentage,
    monthlyRent,
    stockMarketGrowthRate,
    inflationRate,
    rentGrowthRate,
    movingCosts,
    rentersInsurance,
    utilityDifference
  } = inputs;

  // Calculate down payment that would have been used for buying
  const downPayment = purchasePrice * (downPaymentPercentage / 100);
  
  // Rent with growth over time
  const currentMonthlyRent = monthlyRent * Math.pow(1 + rentGrowthRate / 100, year - 1);
  
  // Renter's insurance (with inflation)
  const currentRentersInsurance = rentersInsurance * Math.pow(1 + inflationRate / 100, year - 1);
  const monthlyRentersInsurance = currentRentersInsurance / 12;
  
  // Utility costs (assuming renting costs less for utilities)
  const monthlyUtilities = utilityDifference < 0 ? Math.abs(utilityDifference) : 0;
  
  // Total monthly cost
  const totalMonthlyCost = currentMonthlyRent + monthlyRentersInsurance + monthlyUtilities;
  
  // Investment calculations
  // Assume down payment was invested in stock market
  const investedDownPayment = downPayment;
  const investmentGrowth = investedDownPayment * (Math.pow(1 + stockMarketGrowthRate / 100, year) - 1);
  const totalInvestmentValue = investedDownPayment + investmentGrowth;
  
  // One-time costs (for year 1 only)
  // Security deposit is typically 1-2 months rent
  const securityDeposit = year === 1 ? monthlyRent * 1.5 : 0;
  const totalMovingCosts = year === 1 ? movingCosts : 0;
  
  return {
    // Monthly costs
    monthlyRent: Math.round(currentMonthlyRent * 100) / 100,
    monthlyRentersInsurance: Math.round(monthlyRentersInsurance * 100) / 100,
    monthlyUtilities: Math.round(monthlyUtilities * 100) / 100,
    totalMonthlyCost: Math.round(totalMonthlyCost * 100) / 100,
    
    // Investment growth
    investedDownPayment: Math.round(investedDownPayment * 100) / 100,
    investmentGrowth: Math.round(investmentGrowth * 100) / 100,
    totalInvestmentValue: Math.round(totalInvestmentValue * 100) / 100,
    
    // One-time costs
    movingCosts: Math.round(totalMovingCosts * 100) / 100,
    securityDeposit: Math.round(securityDeposit * 100) / 100,
  };
}

/**
 * Calculate total cost of renting over the entire time horizon
 */
export function calculateTotalRentCost(inputs: CalculatorInputs): number {
  let totalCost = 0;
  
  for (let year = 1; year <= inputs.timeHorizon; year++) {
    const yearResults = calculateRentScenario(inputs, year);
    
    // Add monthly costs for the year
    totalCost += yearResults.totalMonthlyCost * 12;
    
    // Add one-time costs (only in year 1)
    if (year === 1) {
      totalCost += yearResults.movingCosts + yearResults.securityDeposit;
    }
  }
  
  // Subtract final investment value (down payment growth)
  const finalYearResults = calculateRentScenario(inputs, inputs.timeHorizon);
  totalCost -= finalYearResults.totalInvestmentValue;
  
  return Math.round(totalCost * 100) / 100;
}

/**
 * Calculate net worth for renting scenario
 * Net worth = Investment value - any liabilities
 */
export function calculateRentNetWorth(inputs: CalculatorInputs, year: number): number {
  const rentResults = calculateRentScenario(inputs, year);
  
  // For renting, net worth is primarily the investment value
  // (assuming no other major assets or liabilities)
  return rentResults.totalInvestmentValue;
} 
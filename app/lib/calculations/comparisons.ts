import { CalculatorInputs, ComparisonResults, YearlyBreakdown, CalculatorResults } from '../types/calculator';
import { calculateBuyScenario, calculateTotalBuyCost } from './buyCalculations';
import { calculateRentScenario, calculateTotalRentCost, calculateRentNetWorth } from './rentCalculations';

/**
 * Generate complete calculator results with buy vs rent comparison
 */
export function calculateFullComparison(inputs: CalculatorInputs): CalculatorResults {
  const buyScenario = calculateBuyScenario(inputs, inputs.timeHorizon);
  const rentScenario = calculateRentScenario(inputs, inputs.timeHorizon);
  const comparison = calculateComparison(inputs);
  const yearlyBreakdown = generateYearlyBreakdown(inputs);
  
  return {
    inputs,
    buyScenario,
    rentScenario,
    comparison,
    yearlyBreakdown,
  };
}

/**
 * Calculate detailed comparison between buy and rent scenarios
 */
export function calculateComparison(inputs: CalculatorInputs): ComparisonResults {
  const totalBuyCost = calculateTotalBuyCost(inputs);
  const totalRentCost = calculateTotalRentCost(inputs);
  
  // Calculate monthly differences
  const buyMonthlyFirst = calculateBuyScenario(inputs, 1).totalMonthlyCost;
  const rentMonthlyFirst = calculateRentScenario(inputs, 1).totalMonthlyCost;
  const monthlyDifference = buyMonthlyFirst - rentMonthlyFirst;
  
  // Calculate total cost difference over time horizon
  const totalCostDifference = totalBuyCost - totalRentCost;
  
  // Calculate net worth at the end of time horizon
  const buyNetWorth = calculateBuyNetWorth(inputs, inputs.timeHorizon);
  const rentNetWorth = calculateRentNetWorth(inputs, inputs.timeHorizon);
  const netWorthDifference = buyNetWorth - rentNetWorth;
  
  // Find break-even point
  const breakEvenPoint = findBreakEvenPoint(inputs);
  
  // Generate recommendation
  const recommendation = generateRecommendation(totalCostDifference, netWorthDifference, breakEvenPoint, inputs.timeHorizon);
  const confidenceLevel = calculateConfidenceLevel(inputs, totalCostDifference, netWorthDifference);
  
  // Generate insights
  const keyFactors = generateKeyFactors(inputs, buyMonthlyFirst, rentMonthlyFirst, breakEvenPoint);
  const risks = generateRisks(inputs);
  const assumptions = generateAssumptions(inputs);
  
  return {
    recommendation,
    confidenceLevel,
    monthlyDifference: Math.round(monthlyDifference * 100) / 100,
    totalCostDifference: Math.round(totalCostDifference * 100) / 100,
    breakEvenPoint: Math.round(breakEvenPoint * 100) / 100,
    buyNetWorth: Math.round(buyNetWorth * 100) / 100,
    rentNetWorth: Math.round(rentNetWorth * 100) / 100,
    netWorthDifference: Math.round(netWorthDifference * 100) / 100,
    keyFactors,
    risks,
    assumptions,
  };
}

/**
 * Calculate net worth for buying scenario
 */
function calculateBuyNetWorth(inputs: CalculatorInputs, year: number): number {
  const buyResults = calculateBuyScenario(inputs, year);
  return buyResults.currentEquity; // Home equity is the main asset
}

/**
 * Find the break-even point (in years) where buying becomes financially better than renting
 */
function findBreakEvenPoint(inputs: CalculatorInputs): number {
  for (let year = 1; year <= 30; year++) { // Check up to 30 years
    const buyCostSoFar = calculateCumulativeBuyCost(inputs, year);
    const rentCostSoFar = calculateCumulativeRentCost(inputs, year);
    
    if (buyCostSoFar <= rentCostSoFar) {
      return year;
    }
  }
  return 30; // If no break-even found, return 30 years
}

/**
 * Calculate cumulative cost of buying up to a specific year
 */
function calculateCumulativeBuyCost(inputs: CalculatorInputs, targetYear: number): number {
  let totalCost = 0;
  
  for (let year = 1; year <= targetYear; year++) {
    const yearResults = calculateBuyScenario(inputs, year);
    totalCost += yearResults.totalMonthlyCost * 12;
    
    if (year === 1) {
      totalCost += yearResults.totalUpfrontCosts;
    }
    
    totalCost -= yearResults.annualTaxSavings;
    totalCost += yearResults.opportunityCostOfDownPayment;
  }
  
  // Subtract equity built up to this point
  const finalResults = calculateBuyScenario(inputs, targetYear);
  totalCost -= finalResults.currentEquity;
  
  return totalCost;
}

/**
 * Calculate cumulative cost of renting up to a specific year
 */
function calculateCumulativeRentCost(inputs: CalculatorInputs, targetYear: number): number {
  let totalCost = 0;
  
  for (let year = 1; year <= targetYear; year++) {
    const yearResults = calculateRentScenario(inputs, year);
    totalCost += yearResults.totalMonthlyCost * 12;
    
    if (year === 1) {
      totalCost += yearResults.movingCosts + yearResults.securityDeposit;
    }
  }
  
  // Subtract investment growth
  const finalResults = calculateRentScenario(inputs, targetYear);
  totalCost -= finalResults.totalInvestmentValue;
  
  return totalCost;
}

/**
 * Generate buy vs rent recommendation based on financial analysis
 */
function generateRecommendation(costDifference: number, netWorthDifference: number, breakEvenPoint: number, timeHorizon: number): 'BUY' | 'RENT' | 'NEUTRAL' {
  // If break-even is within time horizon and net worth is significantly better, recommend buying
  if (breakEvenPoint <= timeHorizon && netWorthDifference > 50000) {
    return 'BUY';
  }
  
  // If renting costs significantly less and break-even is far out, recommend renting
  if (costDifference > 100000 && breakEvenPoint > timeHorizon) {
    return 'RENT';
  }
  
  // If net worth difference favors buying significantly
  if (netWorthDifference > 75000) {
    return 'BUY';
  }
  
  // If net worth difference favors renting significantly
  if (netWorthDifference < -50000) {
    return 'RENT';
  }
  
  // If differences are small, neutral
  return 'NEUTRAL';
}

/**
 * Calculate confidence level in the recommendation
 */
function calculateConfidenceLevel(inputs: CalculatorInputs, costDifference: number, netWorthDifference: number): 'HIGH' | 'MEDIUM' | 'LOW' {
  const absoluteCostDiff = Math.abs(costDifference);
  const absoluteNetWorthDiff = Math.abs(netWorthDifference);
  
  // High confidence if large differences and reasonable assumptions
  if (absoluteCostDiff > 100000 || absoluteNetWorthDiff > 100000) {
    return 'HIGH';
  }
  
  // Medium confidence for moderate differences
  if (absoluteCostDiff > 25000 || absoluteNetWorthDiff > 25000) {
    return 'MEDIUM';
  }
  
  // Low confidence for small differences
  return 'LOW';
}

/**
 * Generate yearly breakdown for charts and detailed analysis
 */
function generateYearlyBreakdown(inputs: CalculatorInputs): YearlyBreakdown[] {
  const breakdown: YearlyBreakdown[] = [];
  
  for (let year = 1; year <= inputs.timeHorizon; year++) {
    const buyResults = calculateBuyScenario(inputs, year);
    const rentResults = calculateRentScenario(inputs, year);
    
    const buyTotalCost = calculateCumulativeBuyCost(inputs, year);
    const rentTotalCost = calculateCumulativeRentCost(inputs, year);
    
    breakdown.push({
      year,
      buyTotalCost: Math.round(buyTotalCost * 100) / 100,
      buyMonthlyCosts: buyResults.totalMonthlyCost,
      buyEquity: buyResults.currentEquity,
      buyNetWorth: calculateBuyNetWorth(inputs, year),
      homeValue: buyResults.homeValue,
      rentTotalCost: Math.round(rentTotalCost * 100) / 100,
      rentMonthlyCosts: rentResults.totalMonthlyCost,
      rentInvestmentValue: rentResults.totalInvestmentValue,
      rentNetWorth: calculateRentNetWorth(inputs, year),
      cumulativeDifference: Math.round((buyTotalCost - rentTotalCost) * 100) / 100,
      monthlyDifference: Math.round((buyResults.totalMonthlyCost - rentResults.totalMonthlyCost) * 100) / 100,
    });
  }
  
  return breakdown;
}

/**
 * Generate key factors that influence the decision
 */
function generateKeyFactors(inputs: CalculatorInputs, buyMonthly: number, rentMonthly: number, breakEvenPoint: number): string[] {
  const factors: string[] = [];
  
  if (buyMonthly > rentMonthly * 1.3) {
    factors.push("High monthly cost difference favors renting");
  } else if (rentMonthly > buyMonthly * 1.2) {
    factors.push("Lower monthly costs favor buying");
  }
  
  if (inputs.homePriceAppreciation > 4) {
    factors.push("Strong home appreciation expected");
  } else if (inputs.homePriceAppreciation < 2) {
    factors.push("Low home appreciation expected");
  }
  
  if (inputs.stockMarketGrowthRate > inputs.homePriceAppreciation + 2) {
    factors.push("Stock market returns favor investing down payment");
  }
  
  if (breakEvenPoint <= 5) {
    factors.push("Quick break-even period favors buying");
  } else if (breakEvenPoint > 15) {
    factors.push("Long break-even period favors renting");
  }
  
  if (inputs.downPaymentPercentage < 20) {
    factors.push("PMI increases buying costs");
  }
  
  return factors;
}

/**
 * Generate potential risks to consider
 */
function generateRisks(inputs: CalculatorInputs): string[] {
  const risks: string[] = [];
  
  risks.push("Market volatility could affect home values and investment returns");
  risks.push("Interest rate changes could impact refinancing opportunities");
  
  if (inputs.downPaymentPercentage < 20) {
    risks.push("Low down payment increases financial risk");
  }
  
  if (inputs.timeHorizon < 5) {
    risks.push("Short time horizon limits benefits of homeownership");
  }
  
  risks.push("Job mobility may be reduced by homeownership");
  risks.push("Maintenance costs could exceed estimates");
  
  return risks;
}

/**
 * Generate key assumptions used in calculations
 */
function generateAssumptions(inputs: CalculatorInputs): string[] {
  return [
    `Home appreciates at ${inputs.homePriceAppreciation}% annually`,
    `Stock market returns ${inputs.stockMarketGrowthRate}% annually`,
    `Rent increases at ${inputs.rentGrowthRate}% annually`,
    `Maintenance costs ${inputs.maintenanceRate}% of home value annually`,
    `Tax bracket remains at ${inputs.taxBracket}%`,
    "No major repairs or market disruptions",
  ];
} 
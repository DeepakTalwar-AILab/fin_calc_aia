export interface CalculatorInputs {
  // Property Details
  purchasePrice: number;
  downPaymentPercentage: number;
  monthlyRent: number;

  // Loan & Interest Rates  
  mortgageRate: number; // Annual percentage
  mortgageTerm: number; // Years (15, 20, 30)
  stockMarketGrowthRate: number; // Annual percentage

  // Property Costs
  propertyTaxRate: number; // Annual percentage of home value
  homeInsurance: number; // Annual cost
  hoaFees: number; // Monthly cost
  maintenanceRate: number; // Annual percentage of home value
  pmiRate: number; // Annual percentage of loan amount

  // Economic Factors
  homePriceAppreciation: number; // Annual percentage
  inflationRate: number; // Annual percentage  
  rentGrowthRate: number; // Annual percentage

  // Additional Costs
  closingCostRate: number; // Percentage of purchase price
  movingCosts: number; // One-time cost
  rentersInsurance: number; // Annual cost
  utilityDifference: number; // Monthly difference (positive = owning costs more)

  // Analysis Settings
  timeHorizon: number; // Years to analyze
  taxBracket: number; // Federal marginal tax rate
  saltDeductionLimit: number; // State and local tax deduction limit
}

export interface MortgageCalculation {
  monthlyPayment: number;
  totalInterest: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  remainingBalance: number;
  totalPrincipalPaid: number;
}

export interface BuyScenarioResults {
  // Monthly costs
  monthlyMortgagePayment: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyPMI: number;
  monthlyHOA: number;
  monthlyMaintenance: number;
  monthlyUtilities: number;
  totalMonthlyCost: number;

  // One-time costs
  downPayment: number;
  closingCosts: number;
  movingCosts: number;
  totalUpfrontCosts: number;

  // Annual calculations
  annualTaxSavings: number;
  opportunityCostOfDownPayment: number;

  // Equity and appreciation
  currentEquity: number;
  homeValue: number;
  mortgageBalance: number;
}

export interface RentScenarioResults {
  // Monthly costs
  monthlyRent: number;
  monthlyRentersInsurance: number;
  monthlyUtilities: number;
  totalMonthlyCost: number;

  // Investment growth
  investedDownPayment: number;
  investmentGrowth: number;
  totalInvestmentValue: number;

  // One-time costs
  movingCosts: number;
  securityDeposit: number;
}

export interface ComparisonResults {
  // Recommendations
  recommendation: 'BUY' | 'RENT' | 'NEUTRAL';
  confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  
  // Financial differences
  monthlyDifference: number; // Positive = buying costs more
  totalCostDifference: number; // Over time horizon
  breakEvenPoint: number; // Years
  
  // Net worth comparison
  buyNetWorth: number;
  rentNetWorth: number;
  netWorthDifference: number;

  // Key insights
  keyFactors: string[];
  risks: string[];
  assumptions: string[];
}

export interface CalculatorResults {
  inputs: CalculatorInputs;
  buyScenario: BuyScenarioResults;
  rentScenario: RentScenarioResults;
  comparison: ComparisonResults;
  yearlyBreakdown: YearlyBreakdown[];
}

export interface YearlyBreakdown {
  year: number;
  
  // Buy scenario
  buyTotalCost: number;
  buyMonthlyCosts: number;
  buyEquity: number;
  buyNetWorth: number;
  homeValue: number;
  
  // Rent scenario  
  rentTotalCost: number;
  rentMonthlyCosts: number;
  rentInvestmentValue: number;
  rentNetWorth: number;
  
  // Comparison
  cumulativeDifference: number;
  monthlyDifference: number;
}

// Default values for calculator inputs
export const DEFAULT_INPUTS: CalculatorInputs = {
  purchasePrice: 400000,
  downPaymentPercentage: 20,
  monthlyRent: 2000,
  
  mortgageRate: 7.0,
  mortgageTerm: 30,
  stockMarketGrowthRate: 7.0,
  
  propertyTaxRate: 1.2,
  homeInsurance: 1200,
  hoaFees: 0,
  maintenanceRate: 1.5,
  pmiRate: 0.5,
  
  homePriceAppreciation: 3.0,
  inflationRate: 2.5,
  rentGrowthRate: 3.0,
  
  closingCostRate: 3.0,
  movingCosts: 2000,
  rentersInsurance: 200,
  utilityDifference: 50,
  
  timeHorizon: 10,
  taxBracket: 24,
  saltDeductionLimit: 10000,
}; 
import { MortgageCalculation } from '../types/calculator';

/**
 * Calculate monthly mortgage payment using standard amortization formula
 * P = L[c(1 + c)^n]/[(1 + c)^n - 1]
 */
export function calculateMonthlyMortgagePayment(
  loanAmount: number,
  annualRate: number,
  termYears: number
): number {
  if (loanAmount <= 0 || annualRate <= 0 || termYears <= 0) return 0;
  
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = termYears * 12;
  
  if (monthlyRate === 0) {
    return loanAmount / numPayments;
  }
  
  const monthlyPayment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
    
  return Math.round(monthlyPayment * 100) / 100;
}

/**
 * Calculate remaining mortgage balance after specified number of payments
 */
export function calculateRemainingBalance(
  originalLoanAmount: number,
  annualRate: number,
  termYears: number,
  paymentsMade: number
): number {
  if (paymentsMade <= 0) return originalLoanAmount;
  if (paymentsMade >= termYears * 12) return 0;
  
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = termYears * 12;
  const monthlyPayment = calculateMonthlyMortgagePayment(originalLoanAmount, annualRate, termYears);
  
  if (monthlyRate === 0) {
    return originalLoanAmount - (monthlyPayment * paymentsMade);
  }
  
  const remainingBalance = originalLoanAmount * 
    (Math.pow(1 + monthlyRate, totalPayments) - Math.pow(1 + monthlyRate, paymentsMade)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
  return Math.max(0, Math.round(remainingBalance * 100) / 100);
}

/**
 * Calculate detailed mortgage information for a specific year
 */
export function calculateMortgageForYear(
  loanAmount: number,
  annualRate: number,
  termYears: number,
  year: number
): MortgageCalculation {
  const paymentsMade = (year - 1) * 12;
  const monthlyPayment = calculateMonthlyMortgagePayment(loanAmount, annualRate, termYears);
  const remainingBalance = calculateRemainingBalance(loanAmount, annualRate, termYears, paymentsMade);
  
  // Calculate interest and principal for the current year
  let totalYearInterest = 0;
  let totalYearPrincipal = 0;
  
  for (let month = 1; month <= 12; month++) {
    const currentPayment = paymentsMade + month;
    if (currentPayment > termYears * 12) break;
    
    const monthlyRate = annualRate / 100 / 12;
    const balanceAtStartOfMonth = calculateRemainingBalance(loanAmount, annualRate, termYears, currentPayment - 1);
    const monthlyInterest = balanceAtStartOfMonth * monthlyRate;
    const monthlyPrincipal = monthlyPayment - monthlyInterest;
    
    totalYearInterest += monthlyInterest;
    totalYearPrincipal += monthlyPrincipal;
  }
  
  const totalPrincipalPaid = loanAmount - remainingBalance;
  const totalInterest = (monthlyPayment * Math.min(paymentsMade, termYears * 12)) - totalPrincipalPaid;
  
  return {
    monthlyPayment,
    totalInterest: Math.round(totalInterest * 100) / 100,
    monthlyPrincipal: Math.round(totalYearPrincipal / 12 * 100) / 100,
    monthlyInterest: Math.round(totalYearInterest / 12 * 100) / 100,
    remainingBalance,
    totalPrincipalPaid: Math.round(totalPrincipalPaid * 100) / 100,
  };
}

/**
 * Calculate PMI (Private Mortgage Insurance) amount
 * PMI is typically required when down payment is less than 20%
 * PMI is removed when loan-to-value ratio reaches 78%
 */
export function calculatePMI(
  originalLoanAmount: number,
  currentHomeValue: number,
  currentLoanBalance: number,
  annualPMIRate: number,
  downPaymentPercentage: number
): number {
  // No PMI if down payment was 20% or more
  if (downPaymentPercentage >= 20) return 0;
  
  // Calculate current loan-to-value ratio
  const currentLTV = (currentLoanBalance / currentHomeValue) * 100;
  
  // PMI is removed when LTV reaches 78%
  if (currentLTV <= 78) return 0;
  
  // Calculate monthly PMI
  const annualPMI = originalLoanAmount * (annualPMIRate / 100);
  return Math.round(annualPMI / 12 * 100) / 100;
} 
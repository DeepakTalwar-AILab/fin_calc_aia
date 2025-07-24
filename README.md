# Buy vs Rent Calculator

A modern, responsive financial calculator built with Next.js, React, and Tailwind CSS to help users make informed decisions between buying and renting a home.

## 🏠 Overview

This calculator provides a comprehensive financial analysis comparing the costs and benefits of buying versus renting a property over a specified time period. It considers all major financial factors including opportunity costs, tax benefits, and long-term appreciation.

## ✨ Features

- **Real-time calculations** with instant results as you adjust parameters
- **Interactive charts** showing cost breakdown over time
- **Responsive design** that works on desktop, tablet, and mobile
- **Clean, modern UI** with intuitive parameter inputs
- **Detailed breakdown** of all costs and savings
- **Export results** to PDF or shareable link

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Charts**: Chart.js or Recharts
- **Icons**: Heroicons
- **Deployment**: Vercel

## 📊 Calculator Parameters

### Property Details
- **Purchase Price** - Total cost of the home
- **Down Payment Percentage** - Initial payment (typically 10-20%)
- **Rent of Equivalent Property** - Monthly rent for similar property

### Loan & Interest Rates
- **Mortgage Rate** - Annual interest rate for home loan
- **Mortgage Term** - Loan duration (15, 20, or 30 years)
- **Stock Market Growth Rate** - Expected annual return for invested down payment

### Property Costs
- **Property Tax Rate** - Annual property tax as percentage of home value
- **Home Insurance** - Annual homeowner's insurance premium
- **HOA Fees** - Monthly homeowner association fees
- **Maintenance & Repairs** - Annual cost (typically 1-3% of home value)
- **PMI** - Private Mortgage Insurance (if down payment < 20%)

### Economic Factors
- **Home Price Appreciation** - Expected annual increase in property value
- **Inflation Rate** - General inflation affecting rent increases
- **Rent Growth Rate** - Annual rental cost increases

### Additional Costs
- **Closing Costs** - One-time fees for buying (typically 2-5% of purchase price)
- **Moving Costs** - Relocation expenses
- **Renter's Insurance** - Annual cost for renting
- **Utility Differences** - Cost variations between owning vs renting

### Analysis Settings
- **Time Horizon** - Analysis period (1-30 years)
- **Tax Bracket** - For mortgage interest and property tax deductions
- **State Tax Considerations** - SALT deduction limits

## 🏗 Project Structure

```
buy-vs-rent-calculator/
├── app/
│   ├── components/
│   │   ├── Calculator/
│   │   │   ├── CalculatorForm.tsx
│   │   │   ├── ParameterInput.tsx
│   │   │   └── CalculatorResults.tsx
│   │   ├── Charts/
│   │   │   ├── CostBreakdownChart.tsx
│   │   │   ├── NetWorthChart.tsx
│   │   │   └── PayoffTimelineChart.tsx
│   │   ├── UI/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Slider.tsx
│   │   └── Layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Navigation.tsx
│   ├── lib/
│   │   ├── calculations/
│   │   │   ├── buyCalculations.ts
│   │   │   ├── rentCalculations.ts
│   │   │   ├── taxCalculations.ts
│   │   │   └── comparisons.ts
│   │   ├── utils/
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   └── constants.ts
│   │   └── types/
│   │       └── calculator.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   ├── icons/
│   └── images/
├── tailwind.config.js
├── next.config.js
├── package.json
└── README.md
```

## 🧮 Calculation Logic

### Buy Scenario Costs
- Monthly mortgage payment (principal + interest)
- Property taxes (monthly)
- Home insurance
- PMI (if applicable)
- HOA fees
- Maintenance and repairs
- Closing costs (amortized)
- Opportunity cost of down payment

### Rent Scenario Costs
- Monthly rent payment
- Renter's insurance
- Investment growth of down payment savings

### Break-Even Analysis
- Calculate total cost of ownership vs renting over time
- Factor in tax benefits (mortgage interest deduction, property tax deduction)
- Include home appreciation and equity building
- Show monthly cash flow differences

## 🎨 Design System

### Typography (Clean & Modern)
- **Primary Font**: Inter (Google Fonts)
  - Headings: Inter Bold/Semibold (clean, professional)
  - Body text: Inter Regular (highly readable)
  - Buttons/UI: Inter Medium
- **Monospace**: JetBrains Mono (for calculator displays and numbers)
- **Font weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Secondary**: Green (#10B981) 
- **Accent**: Orange (#F59E0B)
- **Neutral**: Gray scale (#F9FAFB to #111827)
- **Success**: Green (#059669)
- **Warning**: Yellow (#D97706)
- **Error**: Red (#DC2626)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/buy-vs-rent-calculator.git

# Navigate to project directory
cd buy-vs-rent-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📱 Features to Implement

### Phase 1 (MVP)
- [ ] Basic parameter input form
- [ ] Core buy vs rent calculations
- [ ] Simple results display
- [ ] Responsive design

### Phase 2 (Enhanced)
- [ ] Interactive charts and graphs
- [ ] Detailed cost breakdown
- [ ] Tax benefit calculations
- [ ] Print/export functionality

### Phase 3 (Advanced)
- [ ] Scenario comparison
- [ ] Market data integration
- [ ] Advanced tax considerations
- [ ] User accounts and saved calculations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Financial calculation methodologies based on standard real estate practices
- Design inspiration from modern financial tools
- Built with the amazing Next.js and Tailwind CSS communities 
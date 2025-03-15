'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// Define types for the calculator
type EmployerSize = 'startup' | 'small' | 'medium' | 'large' | 'enterprise' | '';
type Country = 'us' | 'ca' | 'uk' | 'au' | 'in' | 'de' | 'fr' | 'sg' | 'jp' | 'br' | 'mx' | 'other' | '';
type EmploymentType = 'full-time' | 'contractor' | 'part-time' | '';
type CoveragePeriod = 'basic' | 'standard' | 'premium' | '';

// Define currency information
interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number; // Exchange rate from USD
}

// Currency information for each country
const countryCurrencies: Record<Country, CurrencyInfo | null> = {
  '': null,
  'us': { code: 'USD', symbol: '$', rate: 1 },
  'ca': { code: 'CAD', symbol: 'C$', rate: 1.35 },
  'uk': { code: 'GBP', symbol: '£', rate: 0.78 },
  'au': { code: 'AUD', symbol: 'A$', rate: 1.49 },
  'in': { code: 'INR', symbol: '₹', rate: 83.15 },
  'de': { code: 'EUR', symbol: '€', rate: 0.92 },
  'fr': { code: 'EUR', symbol: '€', rate: 0.92 },
  'sg': { code: 'SGD', symbol: 'S$', rate: 1.34 },
  'jp': { code: 'JPY', symbol: '¥', rate: 150.28 },
  'br': { code: 'BRL', symbol: 'R$', rate: 5.04 },
  'mx': { code: 'MXN', symbol: 'Mex$', rate: 16.76 },
  'other': { code: 'USD', symbol: '$', rate: 1 }
};

// Country names for display
const countryNames: Record<Country, string> = {
  '': '',
  'us': 'United States',
  'ca': 'Canada',
  'uk': 'United Kingdom',
  'au': 'Australia',
  'in': 'India',
  'de': 'Germany',
  'fr': 'France',
  'sg': 'Singapore',
  'jp': 'Japan',
  'br': 'Brazil',
  'mx': 'Mexico',
  'other': 'Other'
};

interface PremiumDetails {
  monthlyCost: number;
  annualCost: number;
  coverageDetails: {
    period: string;
    percentage: number;
    maxBenefit: number;
    waitingPeriod: number;
    enrollmentPeriod: number;
  };
  currency: CurrencyInfo;
}

export function PremiumCalculator() {
  // Form state
  const [salary, setSalary] = useState<number | ''>('');
  const [employerSize, setEmployerSize] = useState<EmployerSize>('');
  const [yearsWithEmployer, setYearsWithEmployer] = useState<number | ''>('');
  const [yearsExperience, setYearsExperience] = useState<number | ''>('');
  const [country, setCountry] = useState<Country>('');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('');
  const [age, setAge] = useState<number | ''>('');
  const [coveragePeriod, setCoveragePeriod] = useState<CoveragePeriod>('standard');
  const [coveragePercentage, setCoveragePercentage] = useState<number>(60);
  
  // Survey state
  const [interestLevel, setInterestLevel] = useState<number | null>(null);
  const [reasonablePremium, setReasonablePremium] = useState<string>('');
  const [additionalBenefits, setAdditionalBenefits] = useState<string>('');
  const [concernLevel, setConcernLevel] = useState<number | null>(null);
  const [email, setEmail] = useState<string>('');
  
  // Premium calculation state
  const [premiumDetails, setPremiumDetails] = useState<PremiumDetails | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  
  // Effect to calculate premium whenever relevant inputs change
  useEffect(() => {
    if (salary && employerSize && country && employmentType && coveragePeriod && age) {
      calculatePremium();
    }
  }, [salary, employerSize, yearsWithEmployer, yearsExperience, country, employmentType, age, coveragePeriod, coveragePercentage]);
  
  // Helper function to format currency based on country
  const formatCurrency = (amount: number, currencyInfo: CurrencyInfo) => {
    // For JPY, no decimal places
    if (currencyInfo.code === 'JPY') {
      return `${currencyInfo.symbol}${Math.round(amount).toLocaleString()}`;
    }
    
    // For INR, use Indian numbering system
    if (currencyInfo.code === 'INR') {
      return `${currencyInfo.symbol}${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    }
    
    // For others, standard formatting with 2 decimal places if needed
    return `${currencyInfo.symbol}${amount.toLocaleString(undefined, { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })}`;
  };
  
  // Helper function to calculate premium
  const calculatePremium = () => {
    if (typeof salary !== 'number' || !employerSize || !country || !employmentType || !coveragePeriod || typeof age !== 'number') {
      return;
    }
    
    setIsCalculating(true);
    
    // Get currency info for selected country
    const currencyInfo = countryCurrencies[country] || countryCurrencies.us!;
    
    // Mock calculation logic - in a real app, this would be more sophisticated
    // Base monthly premium is roughly 2-5% of monthly salary
    const baseRate = 0.03; // 3% base rate
    
    // Adjustments based on factors
    const ageMultiplier = age < 30 ? 0.9 : age < 40 ? 1.0 : age < 50 ? 1.2 : 1.5;
    
    const employerSizeMultiplier = 
      employerSize === 'startup' ? 1.3 :
      employerSize === 'small' ? 1.2 :
      employerSize === 'medium' ? 1.0 :
      employerSize === 'large' ? 0.9 :
      employerSize === 'enterprise' ? 0.8 : 1.0;
    
    const countryMultiplier = 
      country === 'us' ? 1.0 :
      country === 'ca' ? 0.95 :
      country === 'uk' ? 1.05 :
      country === 'au' ? 0.98 :
      country === 'in' ? 0.7 :
      country === 'de' ? 1.1 :
      country === 'fr' ? 1.08 :
      country === 'sg' ? 0.92 :
      country === 'jp' ? 1.15 :
      country === 'br' ? 0.75 :
      country === 'mx' ? 0.7 :
      1.0;
    
    const employmentTypeMultiplier = 
      employmentType === 'full-time' ? 1.0 :
      employmentType === 'contractor' ? 1.3 :
      employmentType === 'part-time' ? 1.1 : 1.0;
    
    const experienceDiscount = Math.min(0.2, (yearsExperience ? yearsExperience : 0) * 0.01);
    const tenureDiscount = Math.min(0.1, (yearsWithEmployer ? yearsWithEmployer : 0) * 0.02);
    
    const periodMultiplier = 
      coveragePeriod === 'basic' ? 0.8 :
      coveragePeriod === 'premium' ? 1.2 : 1.0;
    
    const percentageMultiplier = coveragePercentage / 60; // Normalized to 60% as baseline
    
    // Calculate final monthly premium (in USD)
    const riskFactor = ageMultiplier * employerSizeMultiplier * countryMultiplier * 
                      employmentTypeMultiplier * periodMultiplier * percentageMultiplier;
    const discountFactor = 1 - (experienceDiscount + tenureDiscount);
    
    // Base calculation in USD
    const monthlyPremiumUSD = Math.round(salary * baseRate * riskFactor * discountFactor);
    const annualPremiumUSD = Math.round(monthlyPremiumUSD * 12 * 0.9); // 10% discount for annual payment
    
    // Convert to local currency if applicable
    const monthlyPremium = monthlyPremiumUSD * currencyInfo.rate;
    const annualPremium = annualPremiumUSD * currencyInfo.rate;
    
    // Get coverage period in months
    const periodMonths = 
      coveragePeriod === 'basic' ? 3 :
      coveragePeriod === 'premium' ? 9 : 6;
    
    // Max monthly benefit - also convert to local currency
    const maxBenefit = Math.round(salary * (coveragePercentage / 100) * currencyInfo.rate);
    
    // Set premium details
    setPremiumDetails({
      monthlyCost: monthlyPremium,
      annualCost: annualPremium,
      coverageDetails: {
        period: `${periodMonths} months`,
        percentage: coveragePercentage,
        maxBenefit: maxBenefit,
        waitingPeriod: 30, // 30 days waiting period
        enrollmentPeriod: 90 // 90 days enrollment period
      },
      currency: currencyInfo
    });
    
    setIsCalculating(false);
  };
  
  // Handle form submission
  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the survey data to a server
    console.log('Survey submitted:', {
      interestLevel,
      reasonablePremium,
      additionalBenefits,
      concernLevel,
      email
    });
    
    // Show confirmation or success message
    alert('Thank you for your feedback!');
  };
  
  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-8">Income Shield Premium Calculator</h1>
      <p className="text-lg text-muted-foreground text-center mb-8">
        Calculate your personalized layoff insurance premium based on your profile.
      </p>
      
      <div className="bg-card rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Information</h2>
        <div className="space-y-6">
          {/* Country - Moving this up since currency affects salary input */}
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <select 
              id="country" 
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={country}
              onChange={(e) => {
                const newCountry = e.target.value as Country;
                setCountry(newCountry);
                // Clear salary when changing country as currency will change
                if (newCountry !== country) {
                  setSalary('');
                }
              }}
              required
            >
              <option value="">Select your country</option>
              <option value="us">United States (USD)</option>
              <option value="ca">Canada (CAD)</option>
              <option value="uk">United Kingdom (GBP)</option>
              <option value="au">Australia (AUD)</option>
              <option value="in">India (INR)</option>
              <option value="de">Germany (EUR)</option>
              <option value="fr">France (EUR)</option>
              <option value="sg">Singapore (SGD)</option>
              <option value="jp">Japan (JPY)</option>
              <option value="br">Brazil (BRL)</option>
              <option value="mx">Mexico (MXN)</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Salary */}
          <div className="space-y-2">
            <Label htmlFor="salary">
              Current Monthly Salary {country && countryCurrencies[country] ? `(${countryCurrencies[country]?.symbol})` : '($)'}
            </Label>
            <Input 
              type="number" 
              id="salary" 
              placeholder={`Enter your monthly salary in ${country && countryCurrencies[country] ? countryCurrencies[country]?.code : 'USD'}`}
              value={salary}
              onChange={(e) => setSalary(e.target.value ? Number(e.target.value) : '')}
              required
            />
          </div>
          
          {/* Employer Size */}
          <div className="space-y-2">
            <Label htmlFor="employer-size">Employer Size</Label>
            <select 
              id="employer-size" 
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={employerSize}
              onChange={(e) => setEmployerSize(e.target.value as EmployerSize)}
              required
            >
              <option value="">Select company size</option>
              <option value="startup">Startup (1-50 employees)</option>
              <option value="small">Small (51-200 employees)</option>
              <option value="medium">Medium (201-1000 employees)</option>
              <option value="large">Large (1001-5000 employees)</option>
              <option value="enterprise">Enterprise (5000+ employees)</option>
            </select>
          </div>
          
          {/* Years with Current Employer */}
          <div className="space-y-2">
            <Label htmlFor="years-employer">Years with Current Employer</Label>
            <Input 
              type="number" 
              id="years-employer" 
              placeholder="Enter number of years" 
              min="0" 
              step="0.5" 
              value={yearsWithEmployer}
              onChange={(e) => setYearsWithEmployer(e.target.value ? Number(e.target.value) : '')}
            />
          </div>
          
          {/* Years of Experience */}
          <div className="space-y-2">
            <Label htmlFor="years-experience">Years of Experience</Label>
            <Input 
              type="number" 
              id="years-experience" 
              placeholder="Enter total years of experience" 
              min="0" 
              step="0.5" 
              value={yearsExperience}
              onChange={(e) => setYearsExperience(e.target.value ? Number(e.target.value) : '')}
            />
          </div>
          
          {/* Employment Type */}
          <div className="space-y-2">
            <Label htmlFor="employment-type">Type of Employment</Label>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="employment-type" 
                  value="full-time" 
                  className="w-4 h-4" 
                  checked={employmentType === 'full-time'}
                  onChange={() => setEmploymentType('full-time')}
                />
                <span>Full-time</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="employment-type" 
                  value="contractor" 
                  className="w-4 h-4" 
                  checked={employmentType === 'contractor'}
                  onChange={() => setEmploymentType('contractor')}
                />
                <span>Contractor</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="employment-type" 
                  value="part-time" 
                  className="w-4 h-4" 
                  checked={employmentType === 'part-time'}
                  onChange={() => setEmploymentType('part-time')}
                />
                <span>Part-time</span>
              </label>
            </div>
          </div>
          
          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input 
              type="number" 
              id="age" 
              placeholder="Enter your age" 
              min="18" 
              max="100" 
              value={age}
              onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
              required
            />
          </div>
        </div>
      </div>
      
      {/* Coverage Options */}
      <div className="bg-card rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Coverage Options</h2>
        <div className="space-y-6">
          {/* Coverage Period */}
          <div className="space-y-2">
            <Label htmlFor="coverage-period">Coverage Period</Label>
            <div className="grid grid-cols-3 gap-4">
              <div 
                className={`border rounded-md p-4 cursor-pointer ${
                  coveragePeriod === 'basic' 
                    ? 'border-primary bg-primary/5' 
                    : 'hover:border-primary hover:bg-primary/5'
                }`}
                onClick={() => setCoveragePeriod('basic')}
              >
                <input 
                  type="radio" 
                  name="coverage-period" 
                  value="basic" 
                  id="basic" 
                  className="sr-only" 
                  checked={coveragePeriod === 'basic'}
                  onChange={() => {}}
                />
                <label htmlFor="basic" className="block cursor-pointer">
                  <div className="font-semibold text-center">Basic</div>
                  <div className="text-center text-sm text-muted-foreground">3 Months</div>
                </label>
              </div>
              <div 
                className={`border rounded-md p-4 cursor-pointer ${
                  coveragePeriod === 'standard' 
                    ? 'border-primary bg-primary/5' 
                    : 'hover:border-primary hover:bg-primary/5'
                }`}
                onClick={() => setCoveragePeriod('standard')}
              >
                <input 
                  type="radio" 
                  name="coverage-period" 
                  value="standard" 
                  id="standard" 
                  className="sr-only" 
                  checked={coveragePeriod === 'standard'}
                  onChange={() => {}}
                />
                <label htmlFor="standard" className="block cursor-pointer">
                  <div className="font-semibold text-center">Standard</div>
                  <div className="text-center text-sm text-muted-foreground">6 Months</div>
                </label>
              </div>
              <div 
                className={`border rounded-md p-4 cursor-pointer ${
                  coveragePeriod === 'premium' 
                    ? 'border-primary bg-primary/5' 
                    : 'hover:border-primary hover:bg-primary/5'
                }`}
                onClick={() => setCoveragePeriod('premium')}
              >
                <input 
                  type="radio" 
                  name="coverage-period" 
                  value="premium" 
                  id="premium" 
                  className="sr-only" 
                  checked={coveragePeriod === 'premium'}
                  onChange={() => {}}
                />
                <label htmlFor="premium" className="block cursor-pointer">
                  <div className="font-semibold text-center">Premium</div>
                  <div className="text-center text-sm text-muted-foreground">9 Months</div>
                </label>
              </div>
            </div>
          </div>
          
          {/* Coverage Percentage */}
          <div className="space-y-2">
            <Label htmlFor="coverage-percentage">Coverage Percentage (% of monthly salary)</Label>
            <div className="space-y-1">
              <input 
                type="range" 
                id="coverage-percentage" 
                min="40" 
                max="80" 
                step="5" 
                value={coveragePercentage}
                onChange={(e) => setCoveragePercentage(Number(e.target.value))}
                className="w-full" 
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>40%</span>
                <span>50%</span>
                <span>60%</span>
                <span>70%</span>
                <span>80%</span>
              </div>
            </div>
            <div className="text-center font-medium text-lg mt-2">
              {coveragePercentage}% Coverage
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium Calculation Results */}
      <div className="bg-card rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Estimated Premium</h2>
        {isCalculating ? (
          <div className="text-center py-8">
            <p>Calculating your premium...</p>
          </div>
        ) : premiumDetails ? (
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {formatCurrency(premiumDetails.monthlyCost, premiumDetails.currency)} / month
            </div>
            <p className="text-muted-foreground mb-4">
              or {formatCurrency(premiumDetails.annualCost, premiumDetails.currency)} billed annually (save 10%)
            </p>
            
            <Separator className="my-4" />
            
            <div className="space-y-2 text-left mb-6">
              <h3 className="font-medium">Coverage Details:</h3>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>{premiumDetails.coverageDetails.percentage}% of your salary covered for {premiumDetails.coverageDetails.period}</li>
                <li>Up to {formatCurrency(premiumDetails.coverageDetails.maxBenefit, premiumDetails.currency)} per month in benefits</li>
                <li>{premiumDetails.coverageDetails.waitingPeriod}-day waiting period before benefits begin</li>
                <li>Coverage begins after {premiumDetails.coverageDetails.enrollmentPeriod} days of continuous enrollment</li>
              </ul>
            </div>
            
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
              <Button size="lg" className="w-full sm:w-auto">Get Coverage</Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">Learn More</Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Fill in your information to see your personalized premium estimate.
            </p>
          </div>
        )}
      </div>
      
      {/* Survey Component */}
      <div className="bg-card rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Help Us Improve</h2>
        <p className="text-muted-foreground mb-4">
          We'd love to hear your thoughts on our coverage options and pricing.
        </p>
        
        <form onSubmit={handleSubmitFeedback} className="space-y-6">
          {/* Interest Level */}
          <div className="space-y-2">
            <Label>How likely are you to purchase this coverage?</Label>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((level) => (
                <label key={level} className="flex flex-col items-center">
                  <input 
                    type="radio" 
                    name="interest" 
                    value={level} 
                    className="mb-1" 
                    checked={interestLevel === level}
                    onChange={() => setInterestLevel(level)}
                  />
                  <span>{level}</span>
                  {level === 1 && <span className="text-xs text-muted-foreground">Not likely</span>}
                  {level === 5 && <span className="text-xs text-muted-foreground">Very likely</span>}
                </label>
              ))}
            </div>
          </div>
          
          {/* Premium Opinion */}
          <div className="space-y-2">
            <Label htmlFor="premium-opinion">
              What premium amount would you consider reasonable
              {country && countryCurrencies[country] ? ` (${countryCurrencies[country]?.code})` : ''}?
            </Label>
            <Input 
              type="text" 
              id="premium-opinion" 
              placeholder="Enter amount" 
              value={reasonablePremium}
              onChange={(e) => setReasonablePremium(e.target.value)}
            />
          </div>
          
          {/* Additional Benefits */}
          <div className="space-y-2">
            <Label htmlFor="additional-benefits">What additional benefits would make this more attractive?</Label>
            <textarea 
              id="additional-benefits" 
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-24"
              placeholder="Please share your thoughts"
              value={additionalBenefits}
              onChange={(e) => setAdditionalBenefits(e.target.value)}
            ></textarea>
          </div>
          
          {/* Concern Level */}
          <div className="space-y-2">
            <Label>How concerned are you about potential layoffs?</Label>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((level) => (
                <label key={level} className="flex flex-col items-center">
                  <input 
                    type="radio" 
                    name="concern" 
                    value={level} 
                    className="mb-1" 
                    checked={concernLevel === level}
                    onChange={() => setConcernLevel(level)}
                  />
                  <span>{level}</span>
                  {level === 1 && <span className="text-xs text-muted-foreground">Not concerned</span>}
                  {level === 5 && <span className="text-xs text-muted-foreground">Very concerned</span>}
                </label>
              ))}
            </div>
          </div>
          
          {/* Email collection */}
          <div className="space-y-2">
            <Label htmlFor="email">Email for follow-up (optional)</Label>
            <Input 
              type="email" 
              id="email" 
              placeholder="your@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              We respect your privacy and will only use your email to follow up about Income Shield.
            </p>
          </div>
          
          <Button type="submit" className="w-full">Submit Feedback</Button>
        </form>
      </div>
    </div>
  );
} 
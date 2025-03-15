'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { submitSurveyResponse } from '@/services/survey';
import { useRouter } from 'next/navigation';

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

// Define plan features based on coverage period
interface PlanFeatures {
  responseTime: number;
  supportType: string;
  careerCounseling: boolean;
  resumeReview: boolean;
  interviewPrep: boolean;
  networkingEvents: boolean;
  jobSearchTools: boolean;
  mentalHealthSupport: boolean;
}

const planFeatures: Record<CoveragePeriod, PlanFeatures> = {
  '': {
    responseTime: 3,
    supportType: 'priority',
    careerCounseling: false,
    resumeReview: false,
    interviewPrep: false,
    networkingEvents: false,
    jobSearchTools: false,
    mentalHealthSupport: false
  },
  'basic': {
    responseTime: 7,
    supportType: 'email',
    careerCounseling: false,
    resumeReview: false,
    interviewPrep: false,
    networkingEvents: false,
    jobSearchTools: false,
    mentalHealthSupport: false
  },
  'standard': {
    responseTime: 3,
    supportType: 'priority',
    careerCounseling: true,
    resumeReview: true,
    interviewPrep: true,
    networkingEvents: false,
    jobSearchTools: false,
    mentalHealthSupport: false
  },
  'premium': {
    responseTime: 1,
    supportType: 'dedicated',
    careerCounseling: true,
    resumeReview: true,
    interviewPrep: true,
    networkingEvents: true,
    jobSearchTools: true,
    mentalHealthSupport: true
  }
};

// Add plan features to premium details interface
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
  planFeatures: PlanFeatures;
}

// Create interface for modal state
interface ModalState {
  isOpen: boolean;
  type: 'interest' | 'objection' | null;
}

export function PremiumCalculator() {
  // Add router for navigation
  const router = useRouter();
  
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
  const [objection, setObjection] = useState<string>('');
  const [showSurvey, setShowSurvey] = useState<boolean>(false);
  
  // Premium calculation state
  const [premiumDetails, setPremiumDetails] = useState<PremiumDetails | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  
  // Modal state
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: null
  });
  
  // Add submission loading state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
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
    
    // Base monthly premium rate - adjusted to 2.5% as baseline
    // Research suggests layoff insurance typically ranges from 1-4% of salary
    const baseRate = 0.025; // 2.5% base rate
    
    // Adjustments based on factors
    
    // Age multipliers - adjusted based on employment statistics
    // Younger workers find new jobs faster but face higher layoff risk
    // Older workers face longer unemployment periods and age discrimination
    const ageMultiplier = 
      age < 25 ? 0.85 :
      age < 30 ? 0.9 : 
      age < 40 ? 1.0 : 
      age < 50 ? 1.2 : 
      age < 60 ? 1.4 : 1.6;
    
    // Employer size multipliers - refined based on layoff patterns
    // Startups have highest failure rates, but large companies often have bigger layoffs
    const employerSizeMultiplier = 
      employerSize === 'startup' ? 1.5 :    // Higher risk for startups
      employerSize === 'small' ? 1.25 :     // Still risky
      employerSize === 'medium' ? 1.0 :     // Baseline
      employerSize === 'large' ? 0.85 :     // Slightly more stable
      employerSize === 'enterprise' ? 0.9 : 1.0; // Adjusted up slightly - big layoffs are common
    
    // Country multipliers - refined based on employment protection laws,
    // unemployment rates, and ease of finding new employment
    const countryMultiplier = 
      country === 'us' ? 1.0 :        // Baseline - at-will employment
      country === 'ca' ? 0.92 :       // Better protections than US
      country === 'uk' ? 0.95 :       // Decent protections
      country === 'au' ? 0.93 :       // Similar to UK
      country === 'in' ? 0.75 :       // Lower costs but growing tech sector
      country === 'de' ? 0.85 :       // Strong employment protection laws
      country === 'fr' ? 0.80 :       // Very strong worker protections
      country === 'sg' ? 0.98 :       // Limited protections but strong job market
      country === 'jp' ? 0.90 :       // Traditional lifetime employment culture shifting
      country === 'br' ? 0.82 :       // Moderate protections
      country === 'mx' ? 0.78 :       // Improving tech market
      1.0;
    
    // Employment type multipliers - contractors face higher instability
    const employmentTypeMultiplier = 
      employmentType === 'full-time' ? 1.0 :     // Baseline
      employmentType === 'contractor' ? 1.4 :    // Higher risk, adjusted up
      employmentType === 'part-time' ? 1.15 : 1.0; // Slight increase
    
    // Experience discount - more experienced workers find jobs faster
    // Cap reduced to 15% to be more realistic
    const experienceDiscount = Math.min(0.15, (yearsExperience ? yearsExperience : 0) * 0.01);
    
    // Tenure discount - longer tenure might indicate better employee but skills may be company-specific
    // Cap stays at 10%
    const tenureDiscount = Math.min(0.1, (yearsWithEmployer ? yearsWithEmployer : 0) * 0.015);
    
    // Period multiplier - proportional to coverage length
    const periodMultiplier = 
      coveragePeriod === 'basic' ? 0.75 :       // 3 months (reduced slightly)
      coveragePeriod === 'premium' ? 1.3 : 1.0; // 9 months (increased slightly) vs 6 months
    
    // Coverage percentage multiplier - higher coverage costs more proportionally
    const percentageMultiplier = coveragePercentage / 60; // Normalized to 60% as baseline
    
    // Calculate final monthly premium directly in local currency
    const riskFactor = ageMultiplier * employerSizeMultiplier * countryMultiplier * 
                      employmentTypeMultiplier * periodMultiplier * percentageMultiplier;
    const discountFactor = 1 - (experienceDiscount + tenureDiscount);
    
    // Calculate premium directly in local currency
    const monthlyPremium = Math.round(salary * baseRate * riskFactor * discountFactor);
    
    // Annual discount increased to 15% to incentivize annual commitments
    const annualPremium = Math.round(monthlyPremium * 12 * 0.85); 
    
    // Get coverage period in months
    const periodMonths = 
      coveragePeriod === 'basic' ? 3 :
      coveragePeriod === 'premium' ? 9 : 6;
    
    // Max monthly benefit also in local currency
    const maxBenefit = Math.round(salary * (coveragePercentage / 100));
    
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
      currency: currencyInfo,
      planFeatures: planFeatures[coveragePeriod]
    });
    
    setIsCalculating(false);
  };
  
  // Function to open modal
  const openModal = (type: 'interest' | 'objection') => {
    setModalState({
      isOpen: true,
      type
    });
  };
  
  // Function to close modal
  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null
    });
  };
  
  // Update to handle interest form submission with Supabase
  const handleInterestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!premiumDetails) return;
    
    // Prepare data for submission
    const surveyData = {
      email: email || undefined,
      submission_type: 'interest' as const,
      interest_level: interestLevel,
      reasonable_premium: reasonablePremium || undefined,
      additional_benefits: additionalBenefits || undefined,
      estimated_premium: premiumDetails.monthlyCost,
      currency_code: premiumDetails.currency.code,
      country,
      employer_size: employerSize,
      employment_type: employmentType,
      coverage_period: coveragePeriod,
      coverage_percentage: coveragePercentage
    };
    
    // Submit to Supabase
    try {
      setIsSubmitting(true);
      await submitSurveyResponse(surveyData);
      alert('Thank you for your interest! We will contact you soon with more details.');
      closeModal();
      
      // Reset form
      setEmail('');
      setShowSurvey(false);
      setInterestLevel(null);
      setReasonablePremium('');
      setAdditionalBenefits('');
      
      // Redirect to homepage after a short delay to ensure alert is seen
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your information. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Update to handle objection form submission with Supabase
  const handleObjectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!premiumDetails) return;
    
    // Prepare data for submission
    const surveyData = {
      email: email || undefined,
      submission_type: 'objection' as const,
      objection_reason: objection || undefined,
      concern_level: concernLevel,
      estimated_premium: premiumDetails.monthlyCost,
      currency_code: premiumDetails.currency.code,
      country,
      employer_size: employerSize,
      employment_type: employmentType,
      coverage_period: coveragePeriod,
      coverage_percentage: coveragePercentage
    };
    
    // Submit to Supabase
    try {
      setIsSubmitting(true);
      await submitSurveyResponse(surveyData);
      alert('Thank you for your feedback! We appreciate your time.');
      closeModal();
      
      // Reset form
      setEmail('');
      setObjection('');
      setConcernLevel(null);
      
      // Redirect to homepage after a short delay to ensure alert is seen
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your feedback. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
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
              or {formatCurrency(premiumDetails.annualCost, premiumDetails.currency)} billed annually (save 15%)
            </p>
            
            <Separator className="my-4" />
            
            <div className="space-y-2 text-left mb-6">
              <h3 className="font-medium mb-2">Coverage Details:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>{premiumDetails.coverageDetails.percentage}% of your salary covered for {premiumDetails.coverageDetails.period}</li>
                <li>{formatCurrency(premiumDetails.coverageDetails.maxBenefit, premiumDetails.currency)} per month Payout</li>
                <li>Coverage begins after {premiumDetails.coverageDetails.enrollmentPeriod} days of continuous enrollment</li>
              </ul>
              
              <h3 className="font-medium mt-4 mb-2">Plan Perks:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>{premiumDetails.planFeatures.responseTime}-Day Claim Processing</li>
                <li>
                  {coveragePeriod === 'basic' && 'Email Support'}
                  {coveragePeriod === 'standard' && 'Priority Support'}
                  {coveragePeriod === 'premium' && 'Dedicated Case Manager'}
                </li>
                {premiumDetails.planFeatures.careerCounseling && (
                  <li>Career Counseling Sessions</li>
                )}
                {premiumDetails.planFeatures.resumeReview && (
                  <li>Resume Review & Optimization</li>
                )}
                {premiumDetails.planFeatures.interviewPrep && (
                  <li>Interview Preparation</li>
                )}
                {premiumDetails.planFeatures.networkingEvents && (
                  <li>Access to Networking Events</li>
                )}
                {premiumDetails.planFeatures.jobSearchTools && (
                  <li>Premium Job Search Tools</li>
                )}
                {premiumDetails.planFeatures.mentalHealthSupport && (
                  <li>Mental Health Support</li>
                )}
              </ul>
            </div>
            
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
              <Button 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={() => openModal('interest')}
              >
                Get Coverage
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={() => openModal('objection')}
              >
                Not Right For Me
              </Button>
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
      
      {/* Interest Modal (Get Coverage) */}
      {modalState.isOpen && modalState.type === 'interest' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Get Started with Income Shield</h2>
            <p className="text-muted-foreground mb-6">
              We're currently building our platform. Leave your email and we'll notify you as soon as we launch in your region to help secure your coverage.
            </p>
            
            <form onSubmit={handleInterestSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="interest-email">Email Address *</Label>
                <Input 
                  id="interest-email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              {!showSurvey ? (
                <div className="pt-2">
                  <Button 
                    type="button" 
                    variant="link" 
                    className="p-0 h-auto text-sm"
                    onClick={() => setShowSurvey(true)}
                  >
                    Help us improve by answering a few questions (optional)
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 pt-4">
                  <Separator />
                  <h3 className="font-medium text-lg">Optional Survey</h3>
                  
                  <div className="space-y-2">
                    <Label>How satisfied are you with our pricing?</Label>
                    <div className="grid grid-cols-5 gap-2 mt-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <label key={level} className="flex flex-col items-center text-center">
                          <input 
                            type="radio" 
                            name="interest-level" 
                            value={level} 
                            className="mb-1 h-4 w-4" 
                            checked={interestLevel === level}
                            onChange={() => setInterestLevel(level)}
                          />
                          <span className="mt-1">{level}</span>
                          {level === 1 && <span className="text-xs text-muted-foreground">Not satisfied</span>}
                          {level === 5 && <span className="text-xs text-muted-foreground">Very satisfied</span>}
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reasonable-premium">
                      What premium amount would you consider ideal
                      {country && countryCurrencies[country] ? ` (${countryCurrencies[country]?.code})` : ''}?
                    </Label>
                    <Input 
                      type="text" 
                      id="reasonable-premium" 
                      placeholder="Enter amount" 
                      value={reasonablePremium}
                      onChange={(e) => setReasonablePremium(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additional-features">What additional features would make this more valuable?</Label>
                    <textarea 
                      id="additional-features" 
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-24"
                      placeholder="Please share your thoughts"
                      value={additionalBenefits}
                      onChange={(e) => setAdditionalBenefits(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full" 
                  onClick={closeModal}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Objection Modal (Not interested) */}
      {modalState.isOpen && modalState.type === 'objection' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Help Us Understand</h2>
            <p className="text-muted-foreground mb-6">
              We'd appreciate your feedback on why our offering isn't right for you. This helps us improve our service.
            </p>
            
            <form onSubmit={handleObjectionSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="objection-reason">What's holding you back? (Optional)</Label>
                <textarea 
                  id="objection-reason" 
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-24"
                  placeholder="e.g., Price too high, Coverage too low, Better alternatives, etc."
                  value={objection}
                  onChange={(e) => setObjection(e.target.value)}
                ></textarea>
              </div>
              
              <div className="space-y-2">
                <Label>How concerned are you about potential layoffs?</Label>
                <div className="grid grid-cols-5 gap-2 mt-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <label key={level} className="flex flex-col items-center text-center">
                      <input 
                        type="radio" 
                        name="concern-level" 
                        value={level} 
                        className="mb-1 h-4 w-4" 
                        checked={concernLevel === level}
                        onChange={() => setConcernLevel(level)}
                      />
                      <span className="mt-1">{level}</span>
                      {level === 1 && <span className="text-xs text-muted-foreground">Not concerned</span>}
                      {level === 5 && <span className="text-xs text-muted-foreground">Very concerned</span>}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="objection-email">Email (Optional)</Label>
                <Input 
                  id="objection-email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  We'll only use this to follow up if we address your concerns.
                </p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full" 
                  onClick={closeModal}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 
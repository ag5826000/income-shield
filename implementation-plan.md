# Income Shield Implementation Plan

## Overview
This document outlines the step-by-step plan to transform the existing SaaS landing page template into a layoff insurance landing page for tech workers called "Income Shield". The implementation will maintain the existing animation/style structure while updating content and adding new features.

## Project Requirements

1. Update content focused on layoff insurance benefits for tech workers
2. Create a new premium estimator calculator page that will be the target for all CTAs
3. Add a survey component to gauge interest in the product based on premium amounts
4. Remove signup functionalities and redirect all CTAs to the calculator page
5. Define 3 coverage packages: 3-month (Basic), 6-month (Standard), and 9-month (Premium)

## Implementation Steps

### 1. Update AppConfig and Localization (DONE)

- Modify `src/utils/AppConfig.ts`:
  - Update app name to "Income Shield"
  - Replace existing plan IDs with "BASIC", "STANDARD", and "PREMIUM"
  - Update pricing plan structure to reflect 3, 6, and 9-month coverage options
  - Add insurance-specific features to pricing plans

- Update localization files in `src/locales`:
  - Create new translations for insurance-related terms
  - Update existing translations in Hero, Pricing, Features, and FAQ sections

### 2. Update Landing Page Components (DONE)

#### Hero Section (`src/templates/Hero.tsx`)
- Update title, description, and call-to-action buttons
- Change social media links to point to Income Shield
- Update button actions to point to the calculator page
- Adjust messaging to focus on layoff insurance for tech workers

#### Features Section (`src/templates/Features.tsx`)
- Update feature cards to highlight layoff insurance benefits
- Replace existing features with tech worker-focused protection
- Add visualizations or stats about tech layoffs
- Include information about coverage terms

#### Pricing Section (`src/templates/Pricing.tsx` & `src/features/billing/PricingInformation.tsx`)
- Update pricing cards to show 3, 6, and 9-month coverage options
- Rename plans to Basic, Standard, and Premium
- Replace existing features with insurance-specific benefits:
  - Basic (3-month): Essential coverage for short-term job transitions
  - Standard (6-month): Extended coverage for medium-term job searches
  - Premium (9-month): Comprehensive coverage for long-term career transitions
- Modify all buttons to redirect to the calculator page

#### FAQ Section (`src/templates/FAQ.tsx`)
- Update frequently asked questions to address insurance-specific concerns
- Add questions about eligibility, claims, coverage terms, etc.
- Remove irrelevant SaaS-related questions

#### CTA Section (`src/templates/CTA.tsx`)
- Update call-to-action to promote the premium calculator
- Modify button to redirect to the calculator page

#### Navbar & Footer (`src/templates/Navbar.tsx` & `src/templates/Footer.tsx`)
- Update navigation links
- Replace login/signup buttons with a calculator button
- Update footer content and links

### 3. Create Premium Calculator Page (DONE)

- Create a new page at `src/app/[locale]/(unauth)/calculator/page.tsx`
- Design a form with the following fields:
  - Current Monthly Salary
  - Employer Size
  - How many Years with Current Employer
  - Years of experience
  - Country
  - Type of Employement (Full time, contracter or part-time)
  - Coverage period selection (3, 6, or 9 months)
  - Coverage percentage slider based on period
  - Age
  
- Implement calculator logic:
  - Calculate premium based on input factors
  - Display monthly and annual premium amounts
  - Show coverage details based on the selected plan
  
- Add clear CTAs:
  - "Get Coverage" button
  - "Learn More" option for more information

### 4. Create Interest Survey Component with Supabase Integration (DONE)

- Set up Supabase project and create the survey_responses table
  - Configure table with appropriate fields for both interest and objection submissions
  - Set up Row Level Security policies for safe data collection

- Implement survey data collection through modal popups:
  - "Get Coverage" popup for interested users
  - "Not Right For Me" popup for collecting objection feedback
  - Both popups feed data into the same Supabase table with appropriate type marking

- Add technical infrastructure:
  - Install and configure Supabase client
  - Create service for submitting survey responses
  - Add loading states and error handling
  - Provide appropriate user feedback during submission

### 5. Remove Authentication/Signup Flows

- Modify route handlers to redirect from auth-related pages to the calculator
- Update `src/app/[locale]/(auth)` layout to redirect to the calculator
- Remove signup buttons and forms, replacing them with calculator links
- Update middleware to handle redirects appropriately

### 6. Testing and Optimization

- Test all page transitions and animations
- Ensure responsive design works on all screen sizes
- Validate form inputs and calculator logic
- Test CTAs and button functionality
- Optimize images and content for performance
- Test Supabase integration for survey submissions
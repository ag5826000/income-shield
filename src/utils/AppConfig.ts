import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/routing/types';

import { BILLING_INTERVAL, type PricingPlan } from '@/types/Subscription';

const localePrefix: LocalePrefix = 'as-needed';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'Income Shield',
  locales: [
    {
      id: 'en',
      name: 'English',
    },
    { id: 'fr', name: 'Français' },
  ],
  defaultLocale: 'en',
  localePrefix,
};

export const AllLocales = AppConfig.locales.map(locale => locale.id);

export const PLAN_ID = {
  BASIC: 'basic',
  STANDARD: 'standard',
  PREMIUM: 'premium',
} as const;

export const PricingPlanList: Record<string, PricingPlan> = {
  [PLAN_ID.BASIC]: {
    id: PLAN_ID.BASIC,
    price: 49,
    interval: BILLING_INTERVAL.MONTH,
    testPriceId: '',
    devPriceId: '',
    prodPriceId: '',
    features: {
      coveragePeriod: 3,
      coveragePercentage: 60,
      responseTime: 7,
      supportType: 'email',
    },
  },
  [PLAN_ID.STANDARD]: {
    id: PLAN_ID.STANDARD,
    price: 89,
    interval: BILLING_INTERVAL.MONTH,
    testPriceId: 'price_standard_test',
    devPriceId: 'price_1PNksvKOp3DEwzQlGOXO7YBK',
    prodPriceId: '',
    features: {
      coveragePeriod: 6,
      coveragePercentage: 70,
      responseTime: 3,
      supportType: 'priority',
    },
  },
  [PLAN_ID.PREMIUM]: {
    id: PLAN_ID.PREMIUM,
    price: 149,
    interval: BILLING_INTERVAL.MONTH,
    testPriceId: 'price_premium_test',
    devPriceId: 'price_1PNksvKOp3DEwzQli9IvXzgb',
    prodPriceId: 'price_123',
    features: {
      coveragePeriod: 9,
      coveragePercentage: 80,
      responseTime: 1,
      supportType: 'dedicated',
    },
  },
};

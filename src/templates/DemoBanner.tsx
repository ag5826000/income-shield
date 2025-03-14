import Link from 'next/link';

import { StickyBanner } from '@/features/landing/StickyBanner';

export const DemoBanner = () => (
  <StickyBanner>
    Tech Layoffs Increasing - Protect Your Income
    {' '}
    <Link href="/calculator">Calculate Your Premium Today</Link>
  </StickyBanner>
);

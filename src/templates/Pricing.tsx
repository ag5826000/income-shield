import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { PricingInformation } from '@/features/billing/PricingInformation';
import { Section } from '@/features/landing/Section';
import { PLAN_ID } from '@/utils/AppConfig';

export const Pricing = () => {
  const t = useTranslations('Pricing');

  return (
    <Section
      subtitle={t('section_subtitle')}
      title={t('section_title')}
      description={t('section_description')}
      id="pricing"
    >
      <PricingInformation
        buttonList={{
          [PLAN_ID.BASIC]: (
            <Link
              className={buttonVariants({
                size: 'sm',
                className: 'mt-5 w-full',
              })}
              href="/calculator"
            >
              {t('button_text')}
            </Link>
          ),
          [PLAN_ID.STANDARD]: (
            <Link
              className={buttonVariants({
                size: 'sm',
                className: 'mt-5 w-full',
              })}
              href="/calculator"
            >
              {t('button_text')}
            </Link>
          ),
          [PLAN_ID.PREMIUM]: (
            <Link
              className={buttonVariants({
                size: 'sm',
                className: 'mt-5 w-full',
              })}
              href="/calculator"
            >
              {t('button_text')}
            </Link>
          ),
        }}
      />
    </Section>
  );
};

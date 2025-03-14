import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { Section } from '@/features/landing/Section';

export const CTA = () => {
  const t = useTranslations('CTA');

  return (
    <Section>
      <div className="flex w-full flex-col items-center">
        <h2 className="text-2xl font-semibold">{t('title')}</h2>
        <p className="mt-3 text-lg text-muted-foreground">
          {t('description')}
        </p>

        <div className="my-6">
          <a
            className={buttonVariants({ size: 'lg' })}
            href="/calculator"
          >
            {t('button_text')}
          </a>
        </div>
      </div>
    </Section>
  );
};

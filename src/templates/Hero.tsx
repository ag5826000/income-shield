import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

import { badgeVariants } from '@/components/ui/badgeVariants';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredHero } from '@/features/landing/CenteredHero';
import { Section } from '@/features/landing/Section';

export const Hero = () => {
  const t = useTranslations('Hero');

  return (
    <Section className="py-36">
      <CenteredHero
        banner={(
          <div className={badgeVariants()}>
            <ShieldCheckIcon className="mr-1 size-5" />
            {' '}
            {t('banner_text')}
          </div>
        )}
        title={t.rich('title', {
          important: chunks => (
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-700 bg-clip-text text-transparent">
              {chunks}
            </span>
          ),
        })}
        description={t('description')}
        buttons={(
          <>
            <a
              className={buttonVariants({ size: 'lg' })}
              href="/calculator"
            >
              {t('calculate_premium')}
            </a>

            <a
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
              href="#benefits"
            >
              {t('learn_more')}
            </a>
          </>
        )}
      />
    </Section>
  );
};

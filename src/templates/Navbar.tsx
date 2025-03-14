import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredMenu } from '@/features/landing/CenteredMenu';
import { Section } from '@/features/landing/Section';

import { Logo } from './Logo';

export const Navbar = () => {
  const t = useTranslations('Navbar');

  return (
    <Section className="px-3 py-6">
      <CenteredMenu
        logo={<Logo />}
        rightMenu={(
          <>
            <li data-fade>
              <LocaleSwitcher />
            </li>
            <li>
              <Link className={buttonVariants()} href="/calculator">
                {t('calculator')}
              </Link>
            </li>
          </>
        )}
      >
        <li>
          <Link href="#pricing">{t('product')}</Link>
        </li>

        <li>
          <Link href="#features">{t('docs')}</Link>
        </li>

        <li>
          <Link href="#">{t('blog')}</Link>
        </li>

        <li>
          <Link href="#">{t('company')}</Link>
        </li>
      </CenteredMenu>
    </Section>
  );
};

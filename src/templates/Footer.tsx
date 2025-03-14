import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Logo } from '@/templates/Logo';

export const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <footer className="border-t py-16">
      <div className="container">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="flex flex-col items-center gap-5 md:items-start">
            <Logo />

            <div className="text-sm text-muted-foreground">
              {t.rich('designed_by')}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t('product')}
              </div>

              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-muted-foreground hover:text-foreground"
                    href="#pricing"
                  >
                    {t('product')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t('docs')}
              </div>

              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-muted-foreground hover:text-foreground"
                    href="#features"
                  >
                    {t('docs')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t('company')}
              </div>

              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-muted-foreground hover:text-foreground"
                    href="#"
                  >
                    {t('company')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t('blog')}
              </div>

              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-muted-foreground hover:text-foreground"
                    href="#"
                  >
                    {t('blog')}
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted-foreground hover:text-foreground"
                    href="#"
                  >
                    {t('terms_of_service')}
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted-foreground hover:text-foreground"
                    href="#"
                  >
                    {t('privacy_policy')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

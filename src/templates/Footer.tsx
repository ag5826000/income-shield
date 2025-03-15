import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { useAppConfig } from '@/hooks/useAppConfig';
import { Logo } from '@/templates/Logo';

export const Footer = () => {
  const t = useTranslations('Footer');
  const AppConfig = useAppConfig();

  return (
    <footer className="border-t py-12 md:py-16">
      <div style={{ maxWidth: "672px" }} className="px-4 mx-auto w-full">
        {/* Footer navigation */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
          {/* Logo column */}
          <div className="flex items-start justify-center sm:justify-start">
            <Logo />
          </div>

          <div className="text-center sm:text-left">
            <div className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t('product')}
            </div>

            <ul className="space-y-3">
              <li>
                <Link
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="#pricing"
                >
                  {t('product')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <div className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t('company')}
            </div>

            <ul className="space-y-3">
              <li>
                <Link
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="#"
                >
                  {t('company')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <div className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t('blog')}
            </div>

            <ul className="space-y-3">
              <li>
                <Link
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="#"
                >
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="#"
                >
                  {t('terms_of_service')}
                </Link>
              </li>
              <li>
                <Link
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="#"
                >
                  {t('privacy_policy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright section - centered on all screen sizes */}
        <div className="mt-10 border-t pt-8 text-center">
          <div className="text-sm text-muted-foreground">
            {t.rich('designed_by')}
          </div>
        </div>
      </div>
    </footer>
  );
};

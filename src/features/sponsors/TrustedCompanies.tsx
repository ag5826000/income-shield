/* eslint-disable react-dom/no-unsafe-target-blank */
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { LogoCloud } from '@/features/landing/LogoCloud';

export const TrustedCompanies = () => {
  const t = useTranslations('Sponsors');
  
  return (
    <LogoCloud text={t('title')}>
      {/* Google */}
      <div>
        <Image
          src="/assets/images/tech-logos/google.svg"
          alt="Google"
          className="dark:hidden"
          width="128"
          height="42"
        />
        <Image
          src="/assets/images/tech-logos/google-white.svg"
          alt="Google"
          className="hidden dark:block"
          width="128"
          height="42"
        />
      </div>

      {/* Microsoft */}
      <div>
        <Image
          src="/assets/images/tech-logos/microsoft.svg"
          alt="Microsoft"
          className="dark:hidden"
          width="128"
          height="38"
        />
        <Image
          src="/assets/images/tech-logos/microsoft-white.svg"
          alt="Microsoft"
          className="hidden dark:block"
          width="128"
          height="38"
        />
      </div>

      {/* Amazon */}
      <div>
        <Image
          src="/assets/images/tech-logos/amazon.svg"
          alt="Amazon"
          className="dark:hidden"
          width="128"
          height="38"
        />
        <Image
          src="/assets/images/tech-logos/amazon-white.svg"
          alt="Amazon"
          className="hidden dark:block"
          width="128"
          height="38"
        />
      </div>

      {/* Meta */}
      <div>
        <Image
          src="/assets/images/tech-logos/meta.svg"
          alt="Meta"
          className="dark:hidden"
          width="128"
          height="38"
        />
        <Image
          src="/assets/images/tech-logos/meta-white.svg"
          alt="Meta"
          className="hidden dark:block"
          width="128"
          height="38"
        />
      </div>

      {/* Apple */}
      <div>
        <Image
          src="/assets/images/tech-logos/apple.svg"
          alt="Apple"
          className="dark:hidden"
          width="35"
          height="42"
        />
        <Image
          src="/assets/images/tech-logos/apple-white.svg"
          alt="Apple"
          className="hidden dark:block"
          width="35"
          height="42"
        />
      </div>
    </LogoCloud>
  );
}; 
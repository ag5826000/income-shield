import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import { PremiumCalculator } from './components/PremiumCalculator';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: `Premium Calculator - ${t('meta_title')}`,
    description: t('meta_description'),
  };
}

const CalculatorPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      <Navbar />
      <PremiumCalculator />
      <Footer />
    </>
  );
};

export default CalculatorPage; 
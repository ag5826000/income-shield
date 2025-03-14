import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';

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
      <div className="container mx-auto py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold">Premium Calculator</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          This premium calculator will be implemented in Phase 2 of our development plan.
        </p>
        <div className="mb-8 rounded-lg bg-gray-100 p-8">
          <p className="text-lg">
            Coming soon: Calculate your coverage premium based on your salary, role, and location.
          </p>
        </div>
        <a
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          Back to Home
        </a>
      </div>
      <Footer />
    </>
  );
};

export default CalculatorPage; 
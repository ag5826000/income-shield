import { useTranslations } from 'next-intl';

import { PricingCard } from '@/features/billing/PricingCard';
import { PricingFeature } from '@/features/billing/PricingFeature';
import { PricingPlanList } from '@/utils/AppConfig';

export const PricingInformation = (props: {
  buttonList: Record<string, React.ReactNode>;
}) => {
  const t = useTranslations('PricingPlan');

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3">
      {Object.values(PricingPlanList).map(plan => (
        <PricingCard
          key={plan.id}
          planId={plan.id}
          price={plan.price}
          interval={plan.interval}
          button={props.buttonList[plan.id]}
          showCalculateInstead={true}
        >
          <PricingFeature>
            {t('feature_coverage_period', {
              number: plan.features.coveragePeriod,
            })}
          </PricingFeature>

          {/* <PricingFeature>
            {t('feature_coverage_percentage', {
              number: plan.features.coveragePercentage,
            })}
          </PricingFeature> */}

          <PricingFeature>
            {t('feature_response_time', {
              number: plan.features.responseTime,
            })}
          </PricingFeature>

          <PricingFeature>
            {plan.id === 'basic' && t('feature_support_email')}
            {plan.id === 'standard' && t('feature_support_priority')}
            {plan.id === 'premium' && t('feature_support_dedicated')}
          </PricingFeature>

          {plan.features.careerCounseling && (
            <PricingFeature>{t('feature_career_counseling')}</PricingFeature>
          )}

          {plan.features.resumeReview && (
            <PricingFeature>{t('feature_resume_review')}</PricingFeature>
          )}

          {plan.features.interviewPrep && (
            <PricingFeature>{t('feature_interview_prep')}</PricingFeature>
          )}

          {plan.features.networkingEvents && (
            <PricingFeature>{t('feature_networking_events')}</PricingFeature>
          )}

          {plan.features.jobSearchTools && (
            <PricingFeature>{t('feature_job_search_tools')}</PricingFeature>
          )}

          {plan.features.mentalHealthSupport && (
            <PricingFeature>{t('feature_mental_health_support')}</PricingFeature>
          )}
        </PricingCard>
      ))}
    </div>
  );
};

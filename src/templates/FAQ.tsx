import { useTranslations } from 'next-intl';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Section } from '@/features/landing/Section';

export const FAQ = () => {
  const t = useTranslations('FAQ');

  return (
    <Section
      subtitle="FAQ"
      title="Frequently Asked Questions"
      className="text-left"
      id="faq"
    >
      <Accordion
        type="single"
        collapsible
        defaultValue="question1"
        className="w-full"
      >
        <AccordionItem value="question1">
          <AccordionTrigger>{t('question1')}</AccordionTrigger>
          <AccordionContent>{t('answer1')}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="question2">
          <AccordionTrigger>{t('question2')}</AccordionTrigger>
          <AccordionContent>{t('answer2')}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="question3">
          <AccordionTrigger>{t('question3')}</AccordionTrigger>
          <AccordionContent>{t('answer3')}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="question4">
          <AccordionTrigger>{t('question4')}</AccordionTrigger>
          <AccordionContent>{t('answer4')}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="question5">
          <AccordionTrigger>{t('question5')}</AccordionTrigger>
          <AccordionContent>{t('answer5')}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Section>
  );
};

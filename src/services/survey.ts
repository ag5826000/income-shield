import { supabase } from '@/lib/supabase';

export interface SurveyResponse {
  email?: string;
  submission_type: 'interest' | 'objection';
  interest_level?: number | null;
  reasonable_premium?: string;
  additional_benefits?: string;
  objection_reason?: string;
  concern_level?: number | null;
  estimated_premium: number;
  currency_code: string;
  country: string;
  employer_size: string;
  employment_type: string;
  coverage_period: string;
  coverage_percentage: number;
}

export const submitSurveyResponse = async (data: SurveyResponse) => {
  try {
    const { data: result, error } = await supabase
      .from('survey_responses')
      .insert([data]);
      
    if (error) {
      console.error('Error submitting survey response:', error);
      throw error;
    }
    
    return result;
  } catch (error) {
    console.error('Failed to submit survey data:', error);
    throw error;
  }
}; 
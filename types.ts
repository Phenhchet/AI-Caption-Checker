export type Platform = 'Instagram' | 'Facebook' | 'LinkedIn' | 'X';

export interface Feedback {
  overallScore: number;
  suggestions: {
    tone: string;
    clarity: string;
    engagement: string;
    hashtags: string;
    platformFit: string;
    impact: string;
  };
  revisedCaption: string;
}

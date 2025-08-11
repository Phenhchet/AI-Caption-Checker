import React from 'react';
import type { Feedback } from '../types';
import { CheckCircleIcon, LightBulbIcon, PencilIcon, FireIcon } from './icons/MiscIcons';

interface FeedbackDisplayProps {
  feedback: Feedback;
}

const ScoreDonut: React.FC<{ score: number }> = ({ score }) => {
    const circumference = 2 * Math.PI * 45; // 2 * pi * r
    const offset = circumference - (score / 100) * circumference;
    let strokeColor = 'stroke-red-500';
    if (score >= 85) strokeColor = 'stroke-green-400';
    else if (score >= 60) strokeColor = 'stroke-yellow-400';
    
    return (
        <div className="relative flex items-center justify-center">
            <svg className="w-28 h-28 transform -rotate-90">
                <circle cx="56" cy="56" r="45" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-700" />
                <circle cx="56" cy="56" r="45" stroke="currentColor" strokeWidth="10" fill="transparent" strokeLinecap="round"
                    className={strokeColor}
                    style={{ strokeDasharray: circumference, strokeDashoffset: offset, transition: 'stroke-dashoffset 0.5s ease-out' }} />
            </svg>
            <span className="absolute text-3xl font-bold text-white">{score}</span>
        </div>
    );
};

const FeedbackCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-gray-800/60 rounded-lg p-5">
    <div className="flex items-center gap-3 mb-3">
      <div className="text-purple-400">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
    </div>
    <p className="text-gray-400 text-sm leading-relaxed">{children}</p>
  </div>
);

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback }) => {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-700 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
              <ScoreDonut score={feedback.overallScore} />
              <p className="text-center font-semibold mt-2 text-gray-300">Overall Score</p>
          </div>
          <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-4 text-white">Revised Caption</h2>
              <div className="bg-gray-900/70 p-4 rounded-lg border border-gray-600">
                  <p className="text-gray-200 italic font-medium leading-relaxed">{feedback.revisedCaption}</p>
              </div>
          </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold text-center mb-6 text-gray-300">Detailed Suggestions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeedbackCard title="Impact" icon={<FireIcon />}>{feedback.suggestions.impact}</FeedbackCard>
            <FeedbackCard title="Engagement" icon={<LightBulbIcon />}>{feedback.suggestions.engagement}</FeedbackCard>
            <FeedbackCard title="Tone" icon={<PencilIcon />}>{feedback.suggestions.tone}</FeedbackCard>
            <FeedbackCard title="Clarity" icon={<CheckCircleIcon />}>{feedback.suggestions.clarity}</FeedbackCard>
            <FeedbackCard title="Hashtags" icon={<PencilIcon />}>{feedback.suggestions.hashtags}</FeedbackCard>
            <FeedbackCard title="Platform Fit" icon={<CheckCircleIcon />}>{feedback.suggestions.platformFit}</FeedbackCard>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDisplay;

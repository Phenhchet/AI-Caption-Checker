
import React, { useState, useCallback } from 'react';
import type { Platform, Feedback } from './types';
import { PLATFORMS } from './constants';
import { getCaptionFeedback } from './services/geminiService';
import PlatformSelector from './components/PlatformSelector';
import CaptionInput from './components/CaptionInput';
import FeedbackDisplay from './components/FeedbackDisplay';
import { SparklesIcon, ExclamationTriangleIcon } from './components/icons/MiscIcons';

const App: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>('Instagram');
  const [caption, setCaption] = useState<string>('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckCaption = useCallback(async () => {
    if (!caption.trim()) {
      setError('Please enter a caption to check.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setFeedback(null);

    try {
      const result = await getCaptionFeedback(caption, platform);
      setFeedback(result);
    } catch (err) {
      console.error(err);
      setError('Sorry, something went wrong while analyzing the caption. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [caption, platform]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            AI Caption Checker
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Optimize your social media posts with AI-powered feedback.
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-700">
            <div className="space-y-6">
              <PlatformSelector
                platforms={PLATFORMS}
                selectedPlatform={platform}
                onSelectPlatform={setPlatform}
              />
              <CaptionInput caption={caption} onCaptionChange={setCaption} />
              
              <div className="pt-2">
                <button
                  onClick={handleCheckCaption}
                  disabled={isLoading || !caption.trim()}
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <SparklesIcon />
                      Check Caption
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-10">
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg flex items-center gap-3">
                <ExclamationTriangleIcon />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {feedback && !isLoading && !error && (
              <FeedbackDisplay feedback={feedback} />
            )}
          </div>
        </main>
         <footer className="text-center mt-16 text-gray-500 text-sm">
            <p>Powered by Google Gemini. Built with React & Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;

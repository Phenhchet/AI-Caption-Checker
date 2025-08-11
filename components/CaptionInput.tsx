
import React from 'react';

interface CaptionInputProps {
  caption: string;
  onCaptionChange: (caption: string) => void;
}

const CaptionInput: React.FC<CaptionInputProps> = ({ caption, onCaptionChange }) => {
  return (
    <div>
      <label htmlFor="caption-input" className="block text-sm font-medium text-gray-400 mb-2">
        Your Caption
      </label>
      <textarea
        id="caption-input"
        value={caption}
        onChange={(e) => onCaptionChange(e.target.value)}
        placeholder="Write your caption here... what's on your mind?"
        rows={6}
        className="w-full p-4 bg-gray-900/70 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 resize-none"
      />
    </div>
  );
};

export default CaptionInput;

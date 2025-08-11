
import React from 'react';
import type { Platform } from '../types';

interface PlatformDetails {
  name: Platform;
  icon: React.ReactNode;
  color: string;
  activeColor: string;
}

interface PlatformSelectorProps {
  platforms: PlatformDetails[];
  selectedPlatform: Platform;
  onSelectPlatform: (platform: Platform) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ platforms, selectedPlatform, onSelectPlatform }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">Select Platform</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {platforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => onSelectPlatform(platform.name)}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg text-white font-semibold transition-all duration-300 border-2 ${
              selectedPlatform === platform.name
                ? `${platform.activeColor} border-transparent scale-105`
                : `bg-gray-700 border-gray-600 ${platform.color} hover:border-transparent`
            }`}
          >
            {platform.icon}
            <span>{platform.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlatformSelector;


import React from 'react';
import type { Platform } from './types';
import { InstagramIcon, FacebookIcon, LinkedInIcon, XIcon } from './components/icons/SocialIcons';

interface PlatformDetails {
  name: Platform;
  icon: React.ReactNode;
  color: string;
  activeColor: string;
}

export const PLATFORMS: PlatformDetails[] = [
  {
    name: 'Instagram',
    icon: <InstagramIcon />,
    color: 'hover:bg-pink-500',
    activeColor: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
  },
  {
    name: 'Facebook',
    icon: <FacebookIcon />,
    color: 'hover:bg-blue-600',
    activeColor: 'bg-blue-600',
  },
  {
    name: 'LinkedIn',
    icon: <LinkedInIcon />,
    color: 'hover:bg-sky-700',
    activeColor: 'bg-sky-700',
  },
  {
    name: 'X',
    icon: <XIcon />,
    color: 'hover:bg-gray-600',
    activeColor: 'bg-black',
  },
];

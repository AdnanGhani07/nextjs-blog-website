'use client';

import { UserProfile } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function DashProfile() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === 'dark' || resolvedTheme === 'dark');

  if (!mounted) {
    return (
      <div className="flex justify-center items-center w-full py-16">
        <div className="animate-spin h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full py-8 px-4">
      <UserProfile
        key={isDarkMode ? 'dark-profile' : 'light-profile'}
        appearance={{
          baseTheme: isDarkMode ? dark : undefined,
          variables: {
            colorPrimary: '#9f1239',
            colorBackground: isDarkMode ? '#141417' : '#ffffff',
            colorText: isDarkMode ? '#f4f4f5' : '#18181b',
            colorTextSecondary: isDarkMode ? '#a1a1aa' : '#71717a',
            colorInputBackground: isDarkMode ? '#0a0a0c' : '#ffffff',
            colorInputText: isDarkMode ? '#f4f4f5' : '#18181b',
            borderRadius: '0.75rem',
          },
          elements: {
            rootBox: 'w-full max-w-4xl shadow-2xl rounded-3xl overflow-hidden',
            card: isDarkMode
              ? '!bg-[#141417] !text-[#f4f4f5] border border-white/10 rounded-3xl overflow-hidden'
              : '!bg-white !text-[#18181b] border border-black/10 rounded-3xl overflow-hidden',
            navbar: isDarkMode
              ? '!bg-[#0e0e11] !border-r !border-white/10'
              : '!bg-[#faf8f5] !border-r !border-black/5',
            navbarContainer: isDarkMode ? '!bg-[#0e0e11]' : '!bg-[#faf8f5]',
            navbarTitle: isDarkMode ? '!text-[#f4f4f5] font-cinzel font-bold text-xl' : '!text-[#18181b] font-cinzel font-bold text-xl',
            navbarSubtitle: isDarkMode ? '!text-[#a1a1aa] font-serif text-xs' : '!text-[#71717a] font-serif text-xs',
            navbarButton: isDarkMode
              ? '!text-[#f4f4f5] hover:!bg-white/10 rounded-xl'
              : '!text-[#18181b] hover:!bg-black/5 rounded-xl',
            navbarButtonIcon: isDarkMode ? '!text-[#f4f4f5]' : '!text-[#18181b]',
            navbarButtonText: isDarkMode ? '!text-[#f4f4f5]' : '!text-[#18181b]',
            pageScrollBox: isDarkMode ? '!bg-[#141417] !text-[#f4f4f5]' : '!bg-white !text-[#18181b]',
            profileSection: isDarkMode ? '!border-white/10' : '!border-black/5',
            profileSectionTitleText: isDarkMode ? '!text-[#f4f4f5] font-cinzel font-bold text-lg' : '!text-[#18181b] font-cinzel font-bold text-lg',
            profileSectionContent: isDarkMode ? '!text-[#f4f4f5]' : '!text-[#18181b]',
            profileSectionPrimaryDescription: isDarkMode ? '!text-[#f4f4f5]' : '!text-[#18181b]',
            profileSectionPrimaryButton: isDarkMode ? '!text-primary hover:underline font-semibold' : '!text-primary hover:underline font-semibold',
            headerTitle: isDarkMode ? '!text-[#f4f4f5] font-cinzel tracking-tight font-bold text-2xl' : '!text-[#18181b] font-cinzel tracking-tight font-bold text-2xl',
            headerSubtitle: isDarkMode ? '!text-[#a1a1aa] font-serif' : '!text-[#71717a] font-serif',
            formButtonPrimary:
              'font-cinzel text-xs font-bold uppercase tracking-wider rounded-full bg-primary hover:opacity-90',
            breadcrumbsItem: isDarkMode ? '!text-[#a1a1aa]' : '!text-[#71717a]',
            userPreviewMainIdentifier: isDarkMode ? '!text-[#f4f4f5] font-bold' : '!text-[#18181b] font-bold',
            userPreviewSecondaryIdentifier: isDarkMode ? '!text-[#a1a1aa]' : '!text-[#71717a]',
          },
        }}
        routing="hash"
      />
    </div>
  );
}
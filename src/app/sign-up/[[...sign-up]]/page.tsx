'use client';

import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function SignUpPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex justify-center items-center py-20 px-4 min-h-[calc(100vh-160px)]">
      <SignUp
        appearance={{
          baseTheme: mounted && resolvedTheme === 'dark' ? dark : undefined,
          variables: {
            colorPrimary: '#9f1239',
            colorTextOnPrimaryBackground: '#ffffff',
            borderRadius: '0.75rem',
          },
          elements: {
            card: 'border border-border/70 shadow-2xl rounded-3xl bg-card backdrop-blur-md overflow-hidden',
            headerTitle: 'font-cinzel tracking-tight text-foreground',
            headerSubtitle: 'font-serif text-muted-foreground',
            formButtonPrimary: 'font-cinzel text-xs font-bold uppercase tracking-wider rounded-full bg-primary hover:opacity-90',
            socialButtonsBlockButton: 'border border-border/80 rounded-xl hover:bg-muted',
            formFieldInput: 'rounded-xl border border-border/80 bg-background/80 font-serif',
            footer: 'bg-transparent border-t border-border/40',
            footerActionLink: 'text-primary hover:underline font-bold',
          },
        }}
      />
    </div>
  );
}
'use client';

import {
  FiUser,
  FiLogOut,
  FiFileText,
  FiUsers,
  FiGrid,
} from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SignOutButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function DashSidebar() {
  const [tab, setTab] = useState('');
  const searchParams = useSearchParams();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const tabFromUrl = urlParams.get('tab');
    setTab(tabFromUrl ?? '');
  }, [searchParams]);

  if (!isSignedIn) {
    return null;
  }

  const menuItems = [
    {
      name: 'Overview',
      icon: FiGrid,
      href: '/dashboard?tab=dash',
      id: 'dash',
      show: user?.publicMetadata?.isAdmin,
    },
    {
      name: 'Profile',
      icon: FiUser,
      href: '/dashboard?tab=profile',
      id: 'profile',
      show: true,
      label: user?.publicMetadata?.isAdmin ? 'Admin' : 'Writer',
    },
    {
      name: 'Articles',
      icon: FiFileText,
      href: '/dashboard?tab=posts',
      id: 'posts',
      show: user?.publicMetadata?.isAdmin,
    },
    {
      name: 'Authors',
      icon: FiUsers,
      href: '/dashboard?tab=users',
      id: 'users',
      show: user?.publicMetadata?.isAdmin,
    },
  ];

  return (
    <aside className="w-full md:w-64 border-r border-border/60 bg-card/30 backdrop-blur-sm min-h-[calc(100vh-80px)] p-4 flex flex-col gap-2">
      <div className="flex flex-col gap-1.5 flex-1">
        {menuItems
          .filter((item) => item.show)
          .map((item) => {
            const isSelected = tab === item.id || (!tab && item.id === 'dash' && item.show);
            return (
              <Link key={item.id} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start gap-3 px-4 py-5 text-sm font-cinzel tracking-wider rounded-xl transition-all',
                    isSelected
                      ? 'bg-primary text-primary-foreground font-bold shadow-sm hover:bg-primary/90'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                  {item.label && (
                    <span
                      className={cn(
                        'ml-auto text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-tight',
                        isSelected
                          ? 'bg-primary-foreground/20 text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                </Button>
              </Link>
            );
          })}
      </div>

      <div className="mt-auto border-t border-border/50 pt-4">
        <SignOutButton>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-4 py-5 text-sm font-cinzel text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl"
          >
            <FiLogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </SignOutButton>
      </div>
    </aside>
  );
}
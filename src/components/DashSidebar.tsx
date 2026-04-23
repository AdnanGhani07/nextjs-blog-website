'use client';

import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiChartPie,
} from 'react-icons/hi';
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
      name: 'Dashboard',
      icon: HiChartPie,
      href: '/dashboard?tab=dash',
      id: 'dash',
      show: user?.publicMetadata?.isAdmin,
    },
    {
      name: 'Profile',
      icon: HiUser,
      href: '/dashboard?tab=profile',
      id: 'profile',
      show: true,
      label: user?.publicMetadata?.isAdmin ? 'Admin' : 'User',
    },
    {
      name: 'Posts',
      icon: HiDocumentText,
      href: '/dashboard?tab=posts',
      id: 'posts',
      show: user?.publicMetadata?.isAdmin,
    },
    {
      name: 'Users',
      icon: HiOutlineUserGroup,
      href: '/dashboard?tab=users',
      id: 'users',
      show: user?.publicMetadata?.isAdmin,
    },
  ];

  return (
    <div className='w-full md:w-64 border-r bg-background min-h-[calc(100vh-64px)] p-4 flex flex-col gap-2'>
      <div className='flex flex-col gap-1 flex-1'>
        {menuItems
          .filter((item) => item.show)
          .map((item) => (
            <Link key={item.id} href={item.href}>
              <Button
                variant={tab === item.id || (!tab && item.id === 'dash' && item.show) ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3 px-4 py-6 text-base font-medium',
                  (tab === item.id || (!tab && item.id === 'dash' && item.show)) && 'bg-secondary'
                )}
              >
                <item.icon className='h-5 w-5' />
                {item.name}
                {item.label && (
                  <span className='ml-auto text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full uppercase tracking-tighter font-bold'>
                    {item.label}
                  </span>
                )}
              </Button>
            </Link>
          ))}
      </div>

      <div className='mt-auto border-t pt-4'>
        <SignOutButton>
          <Button variant='ghost' className='w-full justify-start gap-3 px-4 py-6 text-base text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30'>
            <HiArrowSmRight className='h-5 w-5' />
            Sign Out
          </Button>
        </SignOutButton>
      </div>
    </div>
  );
}
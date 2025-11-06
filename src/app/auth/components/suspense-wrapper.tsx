'use client';

import { Suspense, type ReactNode } from 'react';

interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function SuspenseWrapper({
  children,
  fallback = (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='text-gray-600'>Loading...</div>
    </div>
  ),
}: SuspenseWrapperProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

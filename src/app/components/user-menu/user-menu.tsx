'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/auth/user');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/sign-out', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/auth/login');
        router.refresh();
      }
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  if (isLoading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <div className='flex items-center gap-4'>
      <span className='text-sm text-gray-700'>{user.email}</span>
      <button
        onClick={handleSignOut}
        className='px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
      >
        Sign Out
      </button>
    </div>
  );
}

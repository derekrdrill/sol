'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SignInForm } from '../components/sign-in-form';
import { SignUpForm } from '../components/sign-up-form';
import { GoogleAuthButton } from '../components/google-auth-button';
import { AuthTabs } from '../components/auth-tabs';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  const handleSuccess = () => {
    const redirectedFrom = searchParams.get('redirectedFrom') || '/';
    router.push(redirectedFrom);
    router.refresh();
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg'>
        <div>
          <h2 className='text-center text-3xl font-bold text-gray-900'>
            {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            {activeTab === 'signin'
              ? 'Sign in to access Solace Advocates'
              : 'Create an account to access Solace Advocates'}
          </p>
        </div>

        <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'signin' ? (
          <SignInForm onSuccess={handleSuccess} />
        ) : (
          <SignUpForm onSuccess={handleSuccess} />
        )}

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-white text-gray-500'>
              Or continue with
            </span>
          </div>
        </div>

        <GoogleAuthButton />
      </div>
    </div>
  );
}

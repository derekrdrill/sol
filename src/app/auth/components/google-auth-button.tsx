'use client';

import { useState } from 'react';
import classNames from 'classnames';
import { FcGoogle } from 'react-icons/fc';

export function GoogleAuthButton() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const buttonText = isLoading ? 'Connecting...' : 'Sign in with Google';

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/google');

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to initiate Google sign-in');
        setIsLoading(false);
        return;
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        setError('Failed to get Google sign-in URL');
        setIsLoading(false);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      console.error('Google sign-in error:', err);
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded'>
          {error}
        </div>
      )}
      <button
        type='button'
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className={classNames(
          'w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
          {
            'bg-gray-100 cursor-not-allowed': isLoading,
          }
        )}
      >
        <FcGoogle className='w-5 h-5' />
        {buttonText}
      </button>
    </>
  );
}

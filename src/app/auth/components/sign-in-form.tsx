'use client';

import { useState } from 'react';
import classNames from 'classnames';
import { FormInput } from './form-input';

interface SignInFormProps {
  onSuccess: () => void;
}

export function SignInForm({ onSuccess }: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const buttonText = isLoading ? 'Signing in...' : 'Sign In';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    // Client-side validation
    const newFieldErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newFieldErrors.email = 'Email is required';
    }

    if (!password.trim()) {
      newFieldErrors.password = 'Password is required';
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          action: 'signin',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error || 'Sign in failed';

        // Try to parse field-specific errors
        if (errorMessage.toLowerCase().includes('email')) {
          setFieldErrors({ email: errorMessage });
        } else if (errorMessage.toLowerCase().includes('password')) {
          setFieldErrors({ password: errorMessage });
        } else {
          setError(errorMessage);
        }

        setIsLoading(false);
        return;
      }

      onSuccess();
    } catch (err) {
      setError('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <form className='mt-6 space-y-4' onSubmit={handleSubmit}>
      {error && (
        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded'>
          {error}
        </div>
      )}

      <FormInput
        id='email'
        label='Email'
        type='email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email}
      />

      <FormInput
        id='password'
        label='Password'
        type='password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password}
      />

      <div>
        <button
          type='submit'
          disabled={isLoading}
          className={classNames(
            'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
            {
              'bg-gray-400 cursor-not-allowed': isLoading,
            }
          )}
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}

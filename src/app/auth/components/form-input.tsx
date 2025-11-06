'use client';

import { forwardRef, useState } from 'react';
import classNames from 'classnames';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
  required?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, id, className = '', required, type, ...props }, ref) => {
    const hasError = !!error;
    const isPassword = type === 'password';
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const inputType = isPassword && isPasswordVisible ? 'text' : type;
    const togglePasswordVisibility = () =>
      setIsPasswordVisible(!isPasswordVisible);
    const PasswordIcon = isPasswordVisible
      ? AiOutlineEyeInvisible
      : AiOutlineEye;
    const passwordIconLabel = isPasswordVisible
      ? 'Hide password'
      : 'Show password';

    return (
      <div>
        <div className='flex items-start justify-between mb-1'>
          <label
            htmlFor={id}
            className='block text-sm font-medium text-gray-700'
          >
            {label}
            {required && <span className='text-red-600 ml-1'>*</span>}
          </label>
          {hasError && (
            <span className='text-sm text-red-600 ml-2'>{error}</span>
          )}
        </div>
        <div className='relative'>
          <input
            {...props}
            ref={ref}
            id={id}
            type={inputType}
            required={required}
            className={classNames(
              'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0',
              {
                'border-red-300 focus:ring-red-500 focus:border-red-500':
                  hasError,
                'border-gray-300 focus:ring-blue-500 focus:border-blue-500':
                  !hasError,
                'pr-10': isPassword,
              },
              className
            )}
          />
          {isPassword && (
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none'
              aria-label={passwordIconLabel}
            >
              <PasswordIcon className='w-5 h-5' />
            </button>
          )}
        </div>
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

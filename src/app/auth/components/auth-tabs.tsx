'use client';
import classNames from 'classnames';

interface AuthTabsProps {
  activeTab: 'signin' | 'signup';
  onTabChange: (tab: 'signin' | 'signup') => void;
}

export function AuthTabs({ activeTab, onTabChange }: AuthTabsProps) {
  const isSignIn = activeTab === 'signin';
  return (
    <div className='border-b border-gray-200'>
      <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
        <button
          onClick={() => onTabChange('signin')}
          className={classNames(
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
            {
              'border-blue-500 text-blue-600': isSignIn,
              'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300':
                !isSignIn,
            }
          )}
        >
          Sign In
        </button>
        <button
          onClick={() => onTabChange('signup')}
          className={`
            whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
            ${
              activeTab === 'signup'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }
          `}
        >
          Sign Up
        </button>
      </nav>
    </div>
  );
}

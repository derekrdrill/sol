'use client';

import { SuspenseWrapper } from '../components/suspense-wrapper';
import { LoginForm } from './login-form';

export function LoginRoot() {
  return (
    <SuspenseWrapper>
      <LoginForm />
    </SuspenseWrapper>
  );
}

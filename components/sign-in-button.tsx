import { signIn } from '@/auth';
import { ReactNode } from 'react';

export default function SignInButton({
  className,
  provider,
  children,
}: {
  className?: string;
  provider: string;
  children: ReactNode;
}) {
  return (
    <form
      className={'w-full'}
      action={async () => {
        'use server';
        await signIn(provider, { redirectTo: '/' });
      }}
    >
      <button type="submit" className={className}>
        {children}
      </button>
    </form>
  );
}

'use client';

import NextLink from 'next/link';
import { useConvexAuth } from 'convex/react';
import styles from './Heading.module.css';
import { ArrowRight } from 'lucide-react';
import { SignInButton } from '@clerk/clerk-react';
import { Button, Spinner } from '@/shared/components';

function Heading(): JSX.Element {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <header className={styles.heading}>
      <h1 className={styles.heading__title}>
        Your ideas, documents, & plans. Unified. Welcome to <span>Jotion</span>
      </h1>
      <h3 className={styles.heading__subtitle}>
        Jotion is the connected workspace where <br /> better, faster work happens.
      </h3>
      {isLoading && (
        <div className='w-full flex items-center justify-center'>
          <Spinner size='lg' />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <NextLink href='/documents'>
            Enter Jotion <ArrowRight className='h-4 w-4 ml-2' />
          </NextLink>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode='modal'>
          <Button type='button' size='sm'>
            Enter Jotion
          </Button>
        </SignInButton>
      )}
    </header>
  );
}
export default Heading;

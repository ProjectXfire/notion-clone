'use client';

import NextLink from 'next/link';
import { useConvexAuth } from 'convex/react';
import styles from './Navbar.module.css';
import { useScrollTop } from '@/shared/hooks';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import { Button, Logo, ModeToggle, Spinner } from '@/shared/components';

function Navbar(): JSX.Element {
  const scrolled = useScrollTop();
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <nav
      className={`${styles.navbar} ${
        scrolled && styles['navbar--scrolled']
      } dark:bg-[var(--bg-color)]`}
    >
      <Logo />
      <div className={styles.navbar__content}>
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode='modal'>
              <Button type='button' variant='ghost' size='sm'>
                Log In
              </Button>
            </SignInButton>
            <SignInButton mode='modal'>
              <Button type='button' size='sm'>
                Get Jotion Free
              </Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button type='button' variant='ghost' asChild>
              <NextLink href='/documents'>Enter Jotion</NextLink>
            </Button>
            <UserButton afterSignOutUrl='/' />
          </>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
}
export default Navbar;

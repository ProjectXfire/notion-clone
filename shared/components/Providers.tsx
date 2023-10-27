'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import { EdgeStoreProvider } from '../lib/edgeStore';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? '');
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '';

function Providers({ children, ...props }: ThemeProviderProps): JSX.Element {
  return (
    <NextThemesProvider {...props}>
      <ClerkProvider publishableKey={publishableKey}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </NextThemesProvider>
  );
}
export default Providers;

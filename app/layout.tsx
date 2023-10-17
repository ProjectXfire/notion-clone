import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { Providers } from '@/shared/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jotion',
  description: 'Best workspace',
  icons: {
    icon: [
      { media: '(prefers-color-scheme: light)', url: '/images/logo.svg', href: '/images/logo.svg' },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/logo-dark.svg',
        href: '/images/logo-dark.svg'
      }
    ]
  }
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props): JSX.Element {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <Toaster position='bottom-center' />
          {children}
        </Providers>
      </body>
    </html>
  );
}

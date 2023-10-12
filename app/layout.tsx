import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/shared/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Notion',
  description: 'Notion clone'
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props): JSX.Element {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          {children}
        </Providers>
      </body>
    </html>
  );
}

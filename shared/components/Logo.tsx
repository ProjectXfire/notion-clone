import NextImage from 'next/image';
import { Poppins } from 'next/font/google';
import { cn } from '@/shared/lib/utils';

const font = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

function Logo(): JSX.Element {
  return (
    <div className='hidden items-center gap-x-2 md:flex'>
      <NextImage className='dark:hidden' src='/images/logo.svg' height={40} width={40} alt='logo' />
      <NextImage
        className='hidden dark:block'
        src='/images/logo-dark.svg'
        height={40}
        width={40}
        alt='logo'
      />
      <p className={cn('font-semibold', font.className)}>Jotion</p>
    </div>
  );
}
export default Logo;

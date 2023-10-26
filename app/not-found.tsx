import NextLink from 'next/link';
import NextImage from 'next/image';
import { Button } from '@/shared/components';

function NotFoundPage(): JSX.Element {
  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <NextImage
        src='/images/error.png'
        className='dar:hidden'
        height={300}
        width={300}
        alt='error'
      />
      <NextImage
        src='/images/error-dark.png'
        className='hidden dark:block'
        height={300}
        width={300}
        alt='error'
      />
      <h2 className='text-xl font-medium'>Page not found!</h2>
      <Button asChild>
        <NextLink href='/'>Go back</NextLink>
      </Button>
    </div>
  );
}
export default NotFoundPage;

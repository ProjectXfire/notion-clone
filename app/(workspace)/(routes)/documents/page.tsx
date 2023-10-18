import { redirect } from 'next/navigation';
import NextImage from 'next/image';
import { currentUser } from '@clerk/nextjs';
import { CreateButton } from '../../_components';

async function DocumentsPage(): Promise<JSX.Element> {
  const user = await currentUser();

  if (user === null) redirect('/');

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <NextImage
        className='dark:hidden'
        src='/images/empty.png'
        height={300}
        width={300}
        alt='empty'
      />
      <NextImage
        className='hidden dark:block'
        src='/images/empty-dark.png'
        height={300}
        width={300}
        alt='empty'
      />
      <h2>Welcome to {user.firstName}&apos;s Jotion</h2>
      <CreateButton />
    </div>
  );
}
export default DocumentsPage;

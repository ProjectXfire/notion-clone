import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import { Navigation, SearchCommand } from './_components';

interface Props {
  children: React.ReactNode;
}

async function WorkspaceLayout({ children }: Props): Promise<JSX.Element> {
  const user = await currentUser();

  if (user === null) redirect('/');

  return (
    <div className='h-full flex dark:bg-[#1F1F1F]'>
      <Navigation />
      <SearchCommand />
      <main className='flex-1 h-full overflow-y-auto'>{children}</main>
    </div>
  );
}
export default WorkspaceLayout;

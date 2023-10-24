'use client';

import { redirect, useParams } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { type Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { Banner, Menu, Title } from '..';

interface Props {
  menuButton?: React.ReactNode;
}

function Navbar({ menuButton }: Props): JSX.Element {
  const { user } = useUser();
  const params = useParams();
  const res = useQuery(api.documents.getById, {
    userId: user?.id ?? '',
    documentId: params.id as Id<'documents'>
  });

  if (res === undefined)
    return (
      <nav className='bg-background dark:bg-[#1F1F1F] px-3 py-2 gap-x-2 h-full w-full flex items-center justify-between'>
        <Title.Skeleton />
        <Menu.Skeleton />
      </nav>
    );
  if (res.data === null) redirect('/documents');

  return (
    <>
      <nav className='bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4'>
        {menuButton !== undefined && menuButton}
        <div className='flex items-center justify-between w-full'>
          <Title initialData={res.data} />
          <div className='flex items-center gap-x-2'>
            <Menu documentId={res.data._id} />
          </div>
        </div>
      </nav>
      {res.data.isArchive && <Banner documentId={res.data._id} />}
    </>
  );
}
export default Navbar;

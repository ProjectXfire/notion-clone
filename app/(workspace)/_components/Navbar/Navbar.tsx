'use client';

import { useParams } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { type Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { Title } from '..';

interface Props {
  isCollapsed: boolean;
  onResetWidth: () => void;
  menuButton?: React.ReactNode;
}

function Navbar({ isCollapsed, onResetWidth, menuButton }: Props): JSX.Element {
  const { user } = useUser();
  const params = useParams();
  const response = useQuery(api.documents.getById, {
    userId: user?.id ?? '',
    documentId: params.id as Id<'documents'>
  });

  if (response === undefined)
    return (
      <nav className='bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center'>
        <Title.Skeleton />
      </nav>
    );
  if (response.data === null) return <></>;

  return (
    <nav className='bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4'>
      {menuButton !== undefined && menuButton}
      <div className='flex items-center justify-between w-full'>
        <Title initialData={response.data} />
      </div>
    </nav>
  );
}
export default Navbar;

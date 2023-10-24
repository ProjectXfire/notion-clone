'use client';

import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import { type Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Skeleton
} from '@/shared/components';
import { MoreHorizontal, Trash } from 'lucide-react';

interface Props {
  documentId: Id<'documents'>;
}

function Menu({ documentId }: Props): JSX.Element {
  const { user } = useUser();

  const archive = useMutation(api.documents.archive);

  const onSoftDelete = (): void => {
    const promise = archive({ id: documentId });
    toast.promise(promise, {
      loading: 'Deleting...',
      error: 'Failed to delete note',
      success: 'Note deleted'
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div role='button' className='dark:hover:bg-neutral-600 rounded-sm'>
          <MoreHorizontal className='h-6 w-6 text-muted-foreground' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-60' align='start' side='right' forceMount>
        <DropdownMenuItem onClick={onSoftDelete}>
          <Trash className='h-4 w-4 mr-2' />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className='text-xs text-muted-foreground p-2'>Last edited by: {user?.fullName}</div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className='h-6 w-6' />;
};

export default Menu;

'use client';

import { toast } from 'sonner';
import { type Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button, ConfirmModal } from '@/shared/components';
import { Trash, Undo } from 'lucide-react';

interface Props {
  documentId: Id<'documents'>;
}

function Banner({ documentId }: Props): JSX.Element {
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restoreArchive);

  const onRemove = (): void => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: 'removing...',
      error: 'Failed to delete note',
      success: 'Note deleted'
    });
  };

  const onRestore = (): void => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: 'restoring...',
      error: 'Failed to restore note',
      success: 'Note restored'
    });
  };

  return (
    <div className='w-full bg-rose-500 text-center text-[13px] p-2 text-white flex items-center gap-x-2 justify-center rounded-xl'>
      <p>This page is in the trash</p>
      <Button
        className='border-white text-[13px] bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal'
        variant='outline'
        size='sm'
        type='button'
        onClick={onRestore}
      >
        <Undo className='w-5 h-5' />
      </Button>

      <ConfirmModal onConfirm={onRemove}>
        <Button
          className='border-white text-[13px] bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal'
          variant='outline'
          size='sm'
          type='button'
        >
          <Trash className='w-5 h-5' />
        </Button>
      </ConfirmModal>
    </div>
  );
}
export default Banner;

'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useUser } from '@clerk/clerk-react';
import { type Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Search, Trash, Undo } from 'lucide-react';
import { Input, Spinner, ConfirmModal } from '@/shared/components';

function TrashBox(): JSX.Element {
  const router = useRouter();
  const params = useParams();
  const { user } = useUser();
  const documents = useQuery(api.documents.getTrash, { userId: user?.id ?? '' });
  const restore = useMutation(api.documents.restoreArchive);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState('');

  const filteredDocuments = documents?.filter((doc) => {
    return doc.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string): void => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<'documents'>
  ): void => {
    e.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: 'Restoring note...',
      error: 'Failed to restore note.',
      success: 'Note restored!'
    });
  };

  const onRemove = (documentId: Id<'documents'>): void => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: 'Deleting note...',
      error: 'Failed to delte note.',
      success: 'Note deleted!'
    });
    if (params.documentId === documentId) {
      router.push('/documents');
    }
  };

  if (documents === undefined) {
    return (
      <div className='h-full flex items-center justify-center p-4'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <div className='text-sm'>
      <div className='flex items-center gap-x-2 p-2'>
        <Search className='h-4 w-4' />
        <Input
          className='h-7 px-2 focus-visible:ring-transparent bg-secondary'
          placeholder='Filter by page title...'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className='mt-2 px-1 pb-1'>
        <p className='hidden last:block text-xs text-center text-muted-foreground pb-1'>
          No documents found
        </p>
        {filteredDocuments?.map((doc) => (
          <div
            className='text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between'
            key={doc._id}
            role='button'
            onClick={() => {
              onClick(doc._id);
            }}
          >
            <span className='truncate pl-2'>{doc.title}</span>
            <div className='flex items-center'>
              <div
                className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                role='button'
                onClick={(e) => {
                  onRestore(e, doc._id);
                }}
              >
                <Undo className='h-4 w-4 text-muted-foreground' />
              </div>
              <ConfirmModal
                onConfirm={() => {
                  onRemove(doc._id);
                }}
              >
                <div
                  className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                  role='button'
                >
                  <Trash className='h-4 w-4 text-muted-foreground' />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default TrashBox;

'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { toast } from 'sonner';
import { useMutation, useQuery } from 'convex/react';
import { type Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { Cover, Toolbar } from '..';
import { Skeleton } from '@/shared/components';

interface Props {
  documentId: Id<'documents'>;
}

function Note({ documentId }: Props): JSX.Element {
  const Editor = useMemo(
    () =>
      dynamic(
        async () => {
          return await import('../Editor/Editor');
        },
        { ssr: false }
      ),
    []
  );

  const res = useQuery(api.documents.getById, { documentId });
  const update = useMutation(api.documents.update);

  const updateContent = async (value: string): Promise<void> => {
    const { error } = await update({ id: documentId, content: value });
    if (error !== null) toast.error('Something went wrong!');
  };

  if (res === undefined)
    return (
      <div>
        <Cover.Skeleton />
        <div className='md:max-w-3xl lg:max-w-4xl mx-auto mt-10'>
          <div className='space-y-4 pl-8 pt-4'>
            <Skeleton className='h-14 w-[50%]' />
            <Skeleton className='h-4 w-[80%]' />
            <Skeleton className='h-4 w-[40%]' />
            <Skeleton className='h-4 w-[60%]' />
          </div>
        </div>
      </div>
    );

  if (res.data === null) return <div>Not found</div>;

  return (
    <>
      <Cover coverImageUrl={res.data.coverImage} />
      <article className='md:max-w-3xl lg:max-w-4xl mx-auto'>
        <Toolbar document={res.data} />
        <Editor
          text={res.data.content}
          onChange={(value) => {
            void updateContent(value);
          }}
        />
      </article>
    </>
  );
}
export default Note;

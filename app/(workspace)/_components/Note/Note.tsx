'use client';

import { useQuery } from 'convex/react';
import { type Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { Toolbar } from '..';

interface Props {
  documentId: Id<'documents'>;
}

function Note({ documentId }: Props): JSX.Element {
  const res = useQuery(api.documents.getById, { documentId });

  if (res === undefined) return <div>loading...</div>;

  if (res.data === null) return <div>Not found</div>;

  return (
    <article className='md:max-w-3xl lg:max-w-4xl mx-auto pt-60'>
      <Toolbar document={res.data} />
    </article>
  );
}
export default Note;

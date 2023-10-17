'use client';

import { toast } from 'sonner';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/shared/components';

function CreateButton(): JSX.Element {
  const create = useMutation(api.documents.create);

  const onCreate = (): void => {
    const promise = create({ title: 'Untitle' });
    toast.promise(promise, {
      loading: 'Creatin new note',
      success: 'New note created!',
      error: 'Failed to create a new note'
    });
  };

  return (
    <Button type='button' onClick={onCreate}>
      <PlusCircle className='h-4 w-4 mr-2' /> Create a note
    </Button>
  );
}
export default CreateButton;

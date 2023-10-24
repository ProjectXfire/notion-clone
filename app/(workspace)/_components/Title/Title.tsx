'use client';

import { useRef, useState } from 'react';
import { useMutation } from 'convex/react';
import { type Doc } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { Button, Input, Skeleton } from '@/shared/components';
import { toast } from 'sonner';

interface Props {
  initialData: Doc<'documents'>;
}

function Title({ initialData }: Props): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title);

  const update = useMutation(api.documents.update);

  const enableInput = (): void => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = (): void => {
    setIsEditing(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
    update({
      id: initialData._id,
      title: e.target.value.length === 0 ? 'Untitled' : e.target.value
    }).catch((e) => {
      toast.error('Something went wrong');
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') disableInput();
  };

  return (
    <div className='flex items-center gap-x-1'>
      {initialData.icon !== undefined && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          className='h-7 px-2 focus-visible:ring-transparent'
          value={title}
          onChange={handleInput}
          onKeyDown={onKeyDown}
          onBlur={disableInput}
        />
      ) : (
        <Button
          className='font-normal h-auto p-1'
          variant='ghost'
          type='button'
          onClick={enableInput}
        >
          <span className='truncate'>{initialData.title}</span>
        </Button>
      )}
    </div>
  );
}

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className='h-6 w-full rounded-md' />;
};

export default Title;

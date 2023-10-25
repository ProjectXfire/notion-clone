'use client';

import { type ElementRef, useRef, useState } from 'react';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import { api } from '@/convex/_generated/api';
import { type Doc } from '@/convex/_generated/dataModel';
import TextAreaAutosize from 'react-textarea-autosize';
import { useDialog } from '@/shared/states';
import { ImageIcon, Smile, X } from 'lucide-react';
import { Button, IconPicker } from '@/shared/components';
import { CoverImageDialog } from '..';

interface Props {
  document: Doc<'documents'>;
  preview?: boolean;
}

function Toolbar({ document, preview = false }: Props): JSX.Element {
  const inputRef = useRef<ElementRef<'textarea'>>(null);
  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);
  const openCoverModal = useDialog((s) => s.onOpen);
  const setComponent = useDialog((s) => s.setComponent);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(document.title);

  const changeIcon = (icon: string): void => {
    const promise = update({ id: document._id, icon });
    toast.promise(promise, {
      loading: 'Saving icon...',
      error: 'Failed to update icon',
      success: 'Icon updated'
    });
  };
  const onRemoveIcon = (): void => {
    const promise = removeIcon({ id: document._id });
    toast.promise(promise, {
      loading: 'Deleting icon...',
      error: 'Failed to delete icon',
      success: 'Icon deleted'
    });
  };
  const enableInput = (): void => {
    if (preview) return;
    setIsEditing(true);
    setTimeout(() => {
      setValue(document.title);
      inputRef.current?.focus();
    }, 0);
  };
  const disableInput = (): void => {
    setIsEditing(false);
  };
  const updateTitle = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    setValue(value);
    update({ id: document._id, title: value.length === 0 ? 'Untitled' : value }).catch(() => {
      toast.error('Failed to update note');
    });
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      disableInput();
    }
  };
  const onOpenCoverModal = (): void => {
    setComponent(<CoverImageDialog />);
    openCoverModal();
  };

  return (
    <div className='pl-[54px] group relative cursor-default'>
      {document.icon !== undefined && !preview && (
        <div className='flex items-center gap-x-2 group/icon pt-6'>
          <IconPicker onChange={changeIcon}>
            <p className='text-6xl hover:opacity-75 transition'>{document.icon}</p>
          </IconPicker>
          <Button
            className='rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs'
            variant='outline'
            type='button'
            size='icon'
            onClick={onRemoveIcon}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
      )}
      {document.icon !== undefined && preview && <p className='text-6xl pt-6'>{document.icon}</p>}
      <div className='opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4'>
        {document.icon === undefined && !preview && (
          <IconPicker asChild onChange={changeIcon}>
            <Button className='text-muted-foreground text-xs' variant='outline' size='sm'>
              <Smile className='h-4 w-4 mr-2' /> Add icon
            </Button>
          </IconPicker>
        )}
        {document.coverImage === undefined && !preview && (
          <Button
            className='text-muted-foreground text-xs'
            variant='outline'
            size='sm'
            type='button'
            onClick={onOpenCoverModal}
          >
            <ImageIcon className='w-4 h-4 mr-2' /> Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextAreaAutosize
          className='text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none'
          ref={inputRef}
          value={value}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          onChange={updateTitle}
        />
      ) : (
        <div
          className='pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]'
          onClick={enableInput}
        >
          {document.title}
        </div>
      )}
    </div>
  );
}
export default Toolbar;

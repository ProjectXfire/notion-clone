'use client';

import NextImage from 'next/image';
import { useParams } from 'next/navigation';
import { ImageIcon, X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { type Id } from '@/convex/_generated/dataModel';
import { useEdgeStore } from '@/shared/lib/edgeStore';
import { useDialog } from '@/shared/states';
import { Button } from '@/shared/components';
import { CoverImageDialog } from '..';
import { toast } from 'sonner';

interface Props {
  coverImageUrl?: string;
  preview?: boolean;
}

function Cover({ coverImageUrl, preview = false }: Props): JSX.Element {
  const update = useMutation(api.documents.removeCover);
  const { edgestore } = useEdgeStore();
  const params = useParams();

  const openCoverModal = useDialog((s) => s.onOpen);
  const setComponent = useDialog((s) => s.setComponent);

  const onOpenCoverModal = (): void => {
    setComponent(<CoverImageDialog oldCoverImageUrl={coverImageUrl} />);
    openCoverModal();
  };

  const onRemoveCover = async (): Promise<void> => {
    if (coverImageUrl === undefined) return;
    try {
      await Promise.all([
        update({ id: params.id as Id<'documents'> }),
        edgestore.publicFiles.delete({ url: coverImageUrl })
      ]);
      toast.success('Cover deleted');
    } catch (error) {
      toast.success('Failed to delete cover');
    }
  };

  return (
    <div
      className={cn(
        'relative w-full h-[35vh] group',
        coverImageUrl === undefined && 'h-[4vh]',
        coverImageUrl !== undefined && 'bg-muted'
      )}
    >
      {coverImageUrl !== undefined && (
        <NextImage className='object-contain' src={coverImageUrl} fill alt='cover' />
      )}
      {coverImageUrl !== undefined && !preview && (
        <div className='opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2'>
          <Button
            className='text-muted-foreground text-xs'
            variant='outline'
            size='sm'
            type='button'
            onClick={onOpenCoverModal}
          >
            <ImageIcon className='h-4 w-4 mr-2' /> Change cover
          </Button>
          <Button
            className='text-muted-foreground text-xs'
            variant='outline'
            size='sm'
            type='button'
            onClick={() => {
              void onRemoveCover();
            }}
          >
            <X className='h-4 w-4 mr-2' /> Remove
          </Button>
        </div>
      )}
    </div>
  );
}
export default Cover;

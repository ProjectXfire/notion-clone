'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { type Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useEdgeStore } from '@/shared/lib/edgeStore';
import { DialogHeader, SingleImageDropzone } from '@/shared/components';
import { useDialog } from '@/shared/states';

interface Props {
  oldCoverImageUrl?: string;
}

function CoverImageDialog({ oldCoverImageUrl }: Props): JSX.Element {
  const params = useParams();
  const { edgestore } = useEdgeStore();
  const update = useMutation(api.documents.update);
  const close = useDialog((s) => s.onClose);

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = async (file?: File): Promise<void> => {
    if (file !== undefined) {
      setIsSubmitting(true);
      setFile(file);
      const res = await edgestore.publicFiles.upload({
        file,
        options: { replaceTargetUrl: oldCoverImageUrl }
      });
      const updatedRes = await update({ id: params.id as Id<'documents'>, coverImage: res.url });
      if (updatedRes.error !== null) {
        toast.error('Failed to update cover');
      } else {
        toast.success('Cover updated');
      }
      onClose();
    }
  };

  const onClose = (): void => {
    setFile(undefined);
    setIsSubmitting(false);
    close();
  };

  return (
    <>
      <DialogHeader>
        <h2 className='text-center text-lg font-semibold'>Cover Image</h2>
      </DialogHeader>
      <SingleImageDropzone
        className='w-full outline-none'
        disabled={isSubmitting}
        value={file}
        onChange={onChange}
      />
    </>
  );
}
export default CoverImageDialog;

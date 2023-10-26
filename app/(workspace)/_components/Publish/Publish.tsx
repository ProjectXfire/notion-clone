'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { type Doc } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useOrigin } from '@/shared/hooks';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/components';
import { Check, Copy, Globe } from 'lucide-react';

interface Props {
  data: Doc<'documents'>;
}

function Publish({ data }: Props): JSX.Element {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${data._id}`;

  const onPublish = async (): Promise<void> => {
    setIsSubmitting(true);
    const res = await update({ id: data._id, isPublished: true });
    if (res.error !== null) {
      toast.error('Failed to publish');
    } else {
      toast.success('Published');
    }
    setIsSubmitting(false);
  };

  const onUnpublish = async (): Promise<void> => {
    setIsSubmitting(true);
    const res = await update({ id: data._id, isPublished: false });
    if (res.error !== null) {
      toast.error('Failed to unpublish');
    } else {
      toast.success('Unpublished');
    }
    setIsSubmitting(false);
  };

  const onCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Url copied');
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type='button' variant='ghost'>
          Publish {data.isPublished && <Globe className='text-sky-500 w-4 h-4 ml-2' />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-72' align='end' alignOffset={8} forceMount>
        {data.isPublished ? (
          <div className='space-y-4'>
            <div className='flex items-center gap-x-2'>
              <Globe className='text-sky-500 animate-pulse h-4 w-4' />
              <p className='text-xs font-medium text-sky-500'>This note is live on web</p>
            </div>
            <div className='flex items-center'>
              <input
                className='flex-1 px-2 text-xs border rounded-l-md h-8 bg-mute truncate'
                type='text'
                disabled
                value={url}
              />
              <Button
                className='h-8 rounded-l-none'
                type='button'
                disabled={copied}
                onClick={() => {
                  void onCopy();
                }}
              >
                {copied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
              </Button>
            </div>
            <Button
              className='w-full text-xs'
              size='sm'
              type='button'
              disabled={isSubmitting}
              onClick={() => {
                void onUnpublish();
              }}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <Globe className='h-8w-8 text-muted-foreground mb-2' />
            <p className='text-sm font-medium mb-2'>Publish this note</p>
            <span className='text-xs text-muted-foreground mb-4'>Shared with others</span>
            <Button
              className='w-full text-xs'
              size='sm'
              type='button'
              disabled={isSubmitting}
              onClick={() => {
                void onPublish();
              }}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
export default Publish;

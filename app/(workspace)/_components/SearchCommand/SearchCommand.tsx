'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { File } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useSearch } from '../../states';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/shared/components';

function SearchCommand(): JSX.Element {
  const router = useRouter();
  const { user } = useUser();
  const isOpen = useSearch((s) => s.isOpen);
  const toggle = useSearch((s) => s.toggle);
  const onClose = useSearch((s) => s.onClose);

  const [isMounted, setIsMounted] = useState(false);

  const res = useQuery(api.documents.getSearch, { userId: user?.id ?? '' });

  const onSelect = (id: string): void => {
    router.push(`/documents/${id}`);
    onClose();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent): void => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener('keydown', down);
    return () => {
      document.removeEventListener('keydown', down);
    };
  }, [toggle]);

  if (!isMounted) return <></>;

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.fullName}'s Jotion...`} />
      <CommandList>
        <CommandEmpty>No results found</CommandEmpty>
        <CommandGroup heading='Documents'>
          {res?.data.map((doc) => (
            <CommandItem
              key={doc._id}
              value={`${doc._id}-${doc.title}`}
              title={doc.title}
              onSelect={() => {
                onSelect(doc._id);
              }}
            >
              {doc.icon !== undefined ? (
                <p className='mr-2 text-[18px]'>{doc.icon}</p>
              ) : (
                <File className='mr-2 h-4 w-4' />
              )}
              <span>{doc.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
export default SearchCommand;

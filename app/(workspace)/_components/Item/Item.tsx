'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/clerk-react';
import { type Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import styles from './Item.module.css';
import { toast } from 'sonner';
import {
  ChevronDown,
  ChevronRight,
  Plus,
  type LucideIcon,
  MoreHorizontal,
  Trash
} from 'lucide-react';
import {
  Skeleton,
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/shared/components';

interface Props {
  id?: Id<'documents'>;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

function Item({
  label,
  icon: Icon,
  onClick,
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level,
  onExpand
}: Props): JSX.Element {
  const router = useRouter();

  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);

  const ChevronIcon = expanded !== undefined && expanded ? ChevronDown : ChevronRight;

  const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.stopPropagation();
    if (onExpand !== undefined) onExpand();
  };

  const onCreate = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>): Promise<void> => {
    e.stopPropagation();
    if (id === undefined) return;
    try {
      const documentId = await create({ title: 'Untitled', parentDocument: id });
      if (expanded !== undefined && expanded) {
        onExpand?.();
      }
      toast.success('New note created!');
      router.push(`/documents/${documentId}`);
    } catch (error) {
      toast.error('Failed to create a new note.');
    }
  };

  const onArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.stopPropagation();
    if (id === undefined) return;
    const promise = archive({ id });
    toast.promise(promise, {
      loading: 'Deleting note...',
      error: 'Failed to delete note',
      success: 'Note deleted'
    });
  };

  return (
    <div
      role='button'
      style={{ paddingLeft: typeof level === 'number' ? `${level * 12 + 12}px` : '12px' }}
      className={`${styles.item} ${Boolean(active) && styles['item--active']}`}
      onClick={onClick}
    >
      {Boolean(id) && (
        <div
          role='button'
          className={`dark:bg-neutral-600 mr-1 ${styles.item__expand}`}
          onClick={handleExpand}
        >
          <ChevronIcon className='h-4 w-4 shrink-0 text-muted-foreground/50' />
        </div>
      )}
      {documentIcon !== undefined ? (
        <div className='shrink-0 mr-2 text-[18px]'>{documentIcon}</div>
      ) : (
        <Icon className='h-[18px] mr-2 text-muted-foreground shrink-0' />
      )}
      <span className='truncate'>{label}</span>
      {isSearch !== undefined && isSearch && (
        <kbd className={styles.item__kbd}>
          <span className='text-xs'>⌘</span>K
        </kbd>
      )}
      {Boolean(id) && (
        <div className='ml-auto flex items-center gap-x-2'>
          <DropdownMenu>
            <DropdownMenuTrigger
              onClick={(e) => {
                e.stopPropagation();
              }}
              asChild
            >
              <div role='button' className={`dark:hover:bg-neutral-600 ${styles.item__options}`}>
                <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-60' align='start' side='right' forceMount>
              <DropdownMenuItem onClick={onArchive}>
                <Trash className='h-4 w-4 mr-2' />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className='text-xs text-muted-foreground p-2'>
                Last edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role='button'
            className={`dark:hover:bg-neutral-600 ${styles.item__add} `}
            onClick={(e) => {
              void onCreate(e);
            }}
          >
            <Plus className='h-4 w-4 text-muted-foreground' />
          </div>
        </div>
      )}
    </div>
  );
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: typeof level === 'number' ? `${level * 12 + 25}px` : '12px' }}
      className='flex gap-x-2 py-[3px]'
    >
      <Skeleton className='h-4 w-4' />
      <Skeleton className='h-4 w-[30%]' />
    </div>
  );
};

export default Item;

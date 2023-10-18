import { type Id } from '@/convex/_generated/dataModel';
import styles from './Item.module.css';
import { ChevronDown, ChevronRight, type LucideIcon } from 'lucide-react';

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
  onClick: () => void;
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
  const ChevronIcon = expanded !== undefined && expanded ? ChevronDown : ChevronRight;

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
          onClick={() => {}}
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
    </div>
  );
}
export default Item;

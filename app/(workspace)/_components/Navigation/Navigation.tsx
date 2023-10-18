'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useNavigation } from './useNavigation';
import styles from './Navigation.module.css';
import { ChevronsLeft, MenuIcon, PlusCircle, Search, Settings } from 'lucide-react';
import { Item, UserItem } from '..';
import { toast } from 'sonner';

function Navigation(): JSX.Element {
  const documents = useQuery(api.documents.get);
  const create = useMutation(api.documents.create);

  const [isMounted, setIsMounted] = useState(false);

  const {
    isMobile,
    isResetting,
    isCollapsed,
    sidebarRef,
    navbarRef,
    handleMouseDown,
    resetWidth,
    collapse
  } = useNavigation();

  const onCreate = (): void => {
    const promise = create({ title: 'Untitled' });
    toast.promise(promise, {
      loading: 'Creatin new note',
      success: 'New note created!',
      error: 'Failed to create a new note'
    });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <></>;

  return (
    <>
      <aside
        className={`${styles.navigation} ${isMobile && styles['navigation--mobile']} ${
          isResetting && styles['navigation--reseting']
        }`}
        ref={sidebarRef}
      >
        <div
          role='button'
          className={`dark:hover:bg-neutral-600 ${styles.navigation__close} ${
            isMobile && styles['navigation__close--mobile']
          }`}
          onClick={collapse}
        >
          <ChevronsLeft className='w-6 h-6' />
        </div>
        <div>
          <UserItem />
          <Item label='Search' icon={Search} isSearch onClick={() => {}} />
          <Item label='Settings' icon={Settings} onClick={() => {}} />
          <Item label='New page' icon={PlusCircle} onClick={onCreate} />
        </div>
        <div className='mt-4'>
          {documents?.map((doc) => (
            <p key={doc._id}>{doc.title}</p>
          ))}
        </div>
        <div
          className={styles.navigation__resize}
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
        />
      </aside>
      <div
        className={`${styles.navbar} ${isMobile && styles['navbar--mobile']} ${
          isResetting && styles['navbar--reseting']
        }`}
        ref={navbarRef}
      >
        <nav className={styles.navbar__content}>
          {isCollapsed && (
            <MenuIcon className={`${styles['navbar__content-open']}`} onClick={resetWidth} />
          )}
        </nav>
      </div>
    </>
  );
}
export default Navigation;

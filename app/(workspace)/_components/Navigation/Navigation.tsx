'use client';

import { useEffect, useState } from 'react';
import { ChevronsLeft, MenuIcon } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import styles from './Navigation.module.css';
import { useNavigation } from './useNavigation';
import { UserItem } from '..';

function Navigation(): JSX.Element {
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

  const [isMounted, setIsMounted] = useState(false);
  const documents = useQuery(api.documents.get);

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

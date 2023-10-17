'use client';

import { ChevronsLeft, MenuIcon } from 'lucide-react';
import styles from './Navigation.module.css';
import { useNavigation } from './useNavigation';
import { useEffect, useState } from 'react';

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
          <p>Action items</p>
        </div>
        <div className='mt-4'>
          <p>Documents</p>
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
          contenido
        </nav>
      </div>
    </>
  );
}
export default Navigation;
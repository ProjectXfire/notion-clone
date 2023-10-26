'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import { api } from '@/convex/_generated/api';
import { useNavigation } from './useNavigation';
import { useSearch } from '../../states';
import styles from './Navigation.module.css';
import { ChevronsLeft, MenuIcon, PlusCircle, Search, Settings, Trash } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/components';
import { DocumentsList, Item, Navbar, SettingsModal, TrashBox, UserItem } from '..';
import { useDialog } from '@/shared/states';

function Navigation(): JSX.Element {
  const create = useMutation(api.documents.create);
  const onOpen = useSearch((s) => s.onOpen);
  const openSetting = useDialog((s) => s.onOpen);
  const setComponent = useDialog((s) => s.setComponent);
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  const {
    params,
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
    const promise = create({ title: 'Untitled' }).then((res) => {
      router.push(`/documents/${res.data}`);
    });
    toast.promise(promise, {
      loading: 'Creatin new note',
      success: 'New note created!',
      error: 'Failed to create a new note'
    });
  };

  const onOpenSettings = (): void => {
    setComponent(<SettingsModal />);
    openSetting();
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
          <Item label='Search' icon={Search} isSearch onClick={onOpen} />
          <Item label='Settings' icon={Settings} onClick={onOpenSettings} />
          <Item label='New page' icon={PlusCircle} onClick={onCreate} />
        </div>
        <div className='mt-4'>
          <DocumentsList />
          <Popover>
            <PopoverTrigger className='w-full mt-4'>
              <Item label='Trash' icon={Trash} />
            </PopoverTrigger>
            <PopoverContent className='p-0 w-72' side={isMobile ? 'bottom' : 'right'}>
              <TrashBox />
            </PopoverContent>
          </Popover>
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
        {params.id !== undefined ? (
          <Navbar
            menuButton={
              isCollapsed && (
                <MenuIcon className={`${styles['navbar__content-open']}`} onClick={resetWidth} />
              )
            }
          />
        ) : (
          <nav className={styles.navbar__content}>
            {isCollapsed && (
              <MenuIcon className={`${styles['navbar__content-open']}`} onClick={resetWidth} />
            )}
          </nav>
        )}
      </div>
    </>
  );
}
export default Navigation;

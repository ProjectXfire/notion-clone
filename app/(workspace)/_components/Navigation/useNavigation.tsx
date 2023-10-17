import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';

interface INavigationReturn {
  isResizingRef: React.MutableRefObject<boolean>;
  sidebarRef: React.RefObject<HTMLElement>;
  navbarRef: React.RefObject<HTMLDivElement>;
  pathname: string;
  isResetting: boolean;
  isCollapsed: boolean;
  isMobile: boolean;
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  resetWidth: () => void;
  collapse: () => void;
}

export function useNavigation(): INavigationReturn {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const pathname = usePathname();

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<React.ElementRef<'aside'>>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const handleMouseMove = (e: MouseEvent): void => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX;
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;
    if (sidebarRef.current !== null && navbarRef.current !== null) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty('left', `${newWidth}px`);
      navbarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = (): void => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseUp', handleMouseUp);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.preventDefault();
    e.stopPropagation();
    isResizingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const resetWidth = (): void => {
    if (sidebarRef.current !== null && navbarRef.current !== null) {
      setIsCollapsed(false);
      setIsResetting(true);
      sidebarRef.current.style.width = isMobile ? '100%' : '240px';
      navbarRef.current.style.setProperty('width', isMobile ? '0' : 'calc(100% - 240px)');
      navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px');
      navbarRef.current.style.padding = isMobile && isCollapsed ? '0' : '1rem 0.5rem';
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const collapse = (): void => {
    if (sidebarRef.current !== null && navbarRef.current !== null) {
      setIsCollapsed(true);
      setIsResetting(true);
      sidebarRef.current.style.width = '0px';
      navbarRef.current.style.width = '100%';
      navbarRef.current.style.left = '0';
      navbarRef.current.style.padding = '1rem 0.5rem';
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [isMobile, pathname]);

  return {
    // Constants
    isResizingRef,
    sidebarRef,
    navbarRef,
    // States
    isMobile,
    pathname,
    isResetting,
    isCollapsed,
    // Actions
    handleMouseDown,
    resetWidth,
    collapse
  };
}

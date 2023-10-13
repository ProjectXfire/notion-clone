'use client';

import styles from './Navbar.module.css';
import { useScrollTop } from '@/shared/hooks';
import { Logo, ModeToggle } from '@/shared/components';

function Navbar(): JSX.Element {
  const scrolled = useScrollTop();

  return (
    <nav
      className={`${styles.navbar} ${
        scrolled && styles['navbar--scrolled']
      } dark:bg-[var(--bg-color)]`}
    >
      <Logo />
      <div className={styles.navbar__content}>
        <ModeToggle />
      </div>
    </nav>
  );
}
export default Navbar;

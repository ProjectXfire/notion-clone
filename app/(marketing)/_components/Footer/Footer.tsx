'use client';

import styles from './Footer.module.css';
import { Button, Logo } from '@/shared/components';

function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <Logo />
      <div className={styles.footer__actions}>
        <Button className='h-12 sm:h-10' variant='ghost' size='sm'>
          Privacy Policy
        </Button>
        <Button className='h-12 sm:h-10' variant='ghost' size='sm'>
          Terms & Conditions
        </Button>
      </div>
    </footer>
  );
}
export default Footer;

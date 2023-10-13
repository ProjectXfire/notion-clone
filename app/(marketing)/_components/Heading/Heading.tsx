'use client';

import styles from './Heading.module.css';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/shared/components';

function Heading(): JSX.Element {
  return (
    <header className={styles.heading}>
      <h1 className={styles.heading__title}>
        Your ideas, documents, & plans. Unified. Welcome to <span>Jotion</span>
      </h1>
      <h3 className={styles.heading__subtitle}>
        Jotion is the connectd workspace where <br /> better, faster work happens.
      </h3>
      <Button>
        Enter Jotion <ArrowRight className='h-4 w-4 ml-2' />
      </Button>
    </header>
  );
}
export default Heading;

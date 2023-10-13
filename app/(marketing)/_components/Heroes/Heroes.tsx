import NextImage from 'next/image';
import styles from './Heroes.module.css';

function Heroes(): JSX.Element {
  return (
    <div className={styles['heroes-container']}>
      <div className={styles.heroes}>
        <div className={`${styles.heroes__image} ${styles['heroes__image--left']}`}>
          <NextImage
            className='object-contain dark:hidden'
            src='/images/documents.png'
            fill
            alt='heroes'
          />
          <NextImage
            className='object-contain hidden dark:block'
            src='/images/documents-dark.png'
            fill
            alt='heroes'
          />
        </div>
        <div className={`${styles.heroes__image} ${styles['heroes__image--right']}`}>
          <NextImage
            className='object-contain dark:hidden'
            src='/images/reading.png'
            fill
            alt='heroes'
          />
          <NextImage
            className='object-contain hidden dark:block'
            src='/images/reading-dark.png'
            fill
            alt='heroes'
          />
        </div>
      </div>
    </div>
  );
}
export default Heroes;

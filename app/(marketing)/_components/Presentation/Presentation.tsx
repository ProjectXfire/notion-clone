import styles from './Presentation.module.css';

interface Props {
  children: React.ReactNode;
}

function Presentation({ children }: Props): JSX.Element {
  return <div className={styles.presentation}>{children}</div>;
}
export default Presentation;

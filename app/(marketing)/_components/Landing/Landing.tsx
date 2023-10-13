import styles from './Landing.module.css';

interface Props {
  children: React.ReactNode;
}

function Landing({ children }: Props): JSX.Element {
  return <div className={styles.landing}>{children}</div>;
}
export default Landing;

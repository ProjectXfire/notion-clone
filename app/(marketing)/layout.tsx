import { Navbar } from './_components';

interface Props {
  children: React.ReactNode;
}

function MarketingLayout({ children }: Props): JSX.Element {
  return (
    <main className='h-full dark:bg-[var(--bg-color)]'>
      <Navbar />
      <main className='h-full pt-20'>{children}</main>
    </main>
  );
}
export default MarketingLayout;

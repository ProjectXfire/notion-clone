import { Navigation } from './_components';

interface Props {
  children: React.ReactNode;
}

function WorkspaceLayout({ children }: Props): JSX.Element {
  return (
    <div className='h-full flex dark:bg-[#1F1F1F]'>
      <Navigation />
      <main className='flex-1 h-full overflow-y-auto'>{children}</main>
    </div>
  );
}
export default WorkspaceLayout;

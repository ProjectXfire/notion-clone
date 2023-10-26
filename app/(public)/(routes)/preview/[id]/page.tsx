import { type Id } from '@/convex/_generated/dataModel';
import { Note } from '@/app/(workspace)/_components';

interface IParams {
  id: Id<'documents'>;
}

interface Props {
  params: IParams;
}

function PublicNotePage({ params }: Props): JSX.Element {
  return (
    <section className='mt-14'>
      <Note documentId={params.id} editable={false} preview />
    </section>
  );
}
export default PublicNotePage;

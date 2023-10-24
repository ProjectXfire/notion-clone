import { Note } from '@/app/(workspace)/_components';
import { type Id } from '@/convex/_generated/dataModel';

interface IParams {
  id: Id<'documents'>;
}

interface Props {
  params: IParams;
}

function DocumentPage({ params }: Props): JSX.Element {
  return (
    <section className='mt-28'>
      <Note documentId={params.id} />
    </section>
  );
}
export default DocumentPage;

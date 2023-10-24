'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { type Doc, type Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { FileIcon } from 'lucide-react';
import { Item } from '..';
import { cn } from '@/shared/lib/utils';

interface Props {
  parentDocumentId?: Id<'documents'>;
  level?: number;
  data?: Array<Doc<'documents'>>;
}

function DocumentsList({ data, level = 0, parentDocumentId }: Props): JSX.Element {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();

  const res = useQuery(api.documents.getSidebar, {
    userId: user?.id ?? '',
    parentDocument: parentDocumentId
  });

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string): void => {
    setExpanded((pv) => ({ ...pv, [documentId]: !pv[documentId] }));
  };

  const onRedirect = (documentId: string): void => {
    router.push(`/documents/${documentId}`);
  };

  if (res === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        className={cn(
          'hidden text-sm font-medium text-muted-foreground/80',
          typeof expanded === 'object' && 'last:block',
          level === 0 && 'hidden'
        )}
        style={{ paddingLeft: typeof level === 'number' ? `${level * 12 + 25}px` : undefined }}
      >
        No pages inside
      </p>
      {res.data.map((doc) => (
        <div key={doc._id}>
          <Item
            id={doc._id}
            label={doc.title}
            icon={FileIcon}
            documentIcon={doc.icon}
            active={params.documentId === doc._id}
            level={level}
            onClick={() => {
              onRedirect(doc._id);
            }}
            onExpand={() => {
              onExpand(doc._id);
            }}
            expanded={expanded[doc._id]}
          />
          {expanded[doc._id] && <DocumentsList parentDocumentId={doc._id} level={level + 1} />}
        </div>
      ))}
    </>
  );
}
export default DocumentsList;

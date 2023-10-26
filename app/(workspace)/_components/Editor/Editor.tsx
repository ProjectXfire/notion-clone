'use client';

import '@blocknote/core/style.css';
import { useTheme } from 'next-themes';
import { useEdgeStore } from '@/shared/lib/edgeStore';
import { type BlockNoteEditor, type PartialBlock } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';

interface Props {
  onChange: (value: string) => void;
  text?: string;
  editable?: boolean;
}

function Editor({ onChange, text, editable }: Props): JSX.Element {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File): Promise<string> => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: text !== undefined ? (JSON.parse(text) as PartialBlock[]) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload
  });

  return (
    <div>
      <BlockNoteView editor={editor} theme={resolvedTheme === 'dark' ? 'dark' : 'light'} />
    </div>
  );
}
export default Editor;

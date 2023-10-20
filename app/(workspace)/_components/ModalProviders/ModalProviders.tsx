'use client';

import { useEffect, useState } from 'react';
import { SettingsModal } from '..';

function ModalProviders(): JSX.Element {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <></>;

  return (
    <>
      <SettingsModal />
    </>
  );
}
export default ModalProviders;

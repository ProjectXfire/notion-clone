'use client';

import { useEffect, useState } from 'react';
import { CustomDialog } from '@/shared/components';

function ModalProviders(): JSX.Element {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <></>;

  return <CustomDialog />;
}
export default ModalProviders;

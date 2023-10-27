'use client';

import { useDialog } from '../states';
import { Dialog, DialogContent } from '.';

function CustomDialog(): JSX.Element {
  const isOpen = useDialog((s) => s.isOpen);
  const onClose = useDialog((s) => s.onClose);
  const component = useDialog((s) => s.component);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>{component}</DialogContent>
    </Dialog>
  );
}
export default CustomDialog;

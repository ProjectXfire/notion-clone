'use client';

import { DialogHeader, Label, ModeToggle } from '@/shared/components';

function SettingsModal(): JSX.Element {
  return (
    <>
      <DialogHeader className='border-b pb-3'>
        <h2 className='text-lg font-medium'>My Settings</h2>
      </DialogHeader>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-1'>
          <Label>Appearance</Label>
          <span className='text-[0.8rem] text-muted-foreground'>
            Customize how Jotion looks on your device
          </span>
        </div>
        <ModeToggle />
      </div>
    </>
  );
}
export default SettingsModal;

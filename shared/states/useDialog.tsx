import { create } from 'zustand';

interface IDialogState {
  isOpen: boolean;
  component: React.ReactNode;
  onOpen: () => void;
  onClose: () => void;
  setComponent: (component: React.ReactNode) => void;
}

export const useDialog = create<IDialogState>((set) => ({
  isOpen: false,
  component: <></>,
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  },
  setComponent: (component) => {
    set({ component });
  }
}));

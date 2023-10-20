import { create } from 'zustand';

interface ISettingsState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSettings = create<ISettingsState>((set, get) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  }
}));

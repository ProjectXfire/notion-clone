import { create } from 'zustand';

interface ISearchState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
}

export const useSearch = create<ISearchState>((set, get) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  },
  toggle: () => {
    set({ isOpen: !get().isOpen });
  }
}));

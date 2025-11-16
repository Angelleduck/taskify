import { create } from "zustand";

interface useCardModalProps {
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  id?: string;
}

export const useCardModal = create<useCardModalProps>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false }),
}));

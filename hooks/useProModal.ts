import { create } from "zustand";

interface useProModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProdModal = create<useProModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

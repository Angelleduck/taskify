import { create } from "zustand";

type workspaces = {
  id: string;
  name: string;
}[];

interface UseWorkspaceIdProps {
  workspaces: workspaces;
  onUpdate: (workspaces: workspaces) => void;
}
const useStore = create<UseWorkspaceIdProps>((set) => ({
  workspaces: [],
  onUpdate: (value) => set({ workspaces: value }),
}));

export { useStore };

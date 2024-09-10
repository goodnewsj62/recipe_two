import { createStore } from "zustand/vanilla";

export type SidebarState = {
  isOpen: boolean;
};

export type SidebarActions = {
  toggle: (value?: boolean) => void;
};

export type SidebarStore = SidebarState & SidebarActions;

export const initSidebarStore = (): SidebarState => {
  return { isOpen: false };
};

export const defaultInitState: SidebarState = {
  isOpen: false,
};

export const createSidebarStore = (
  initState: SidebarState = defaultInitState
) => {
  return createStore<SidebarStore>()((set) => ({
    ...initState,
    toggle: (value) => {
      value === undefined
        ? set((state) => ({ isOpen: !state.isOpen }))
        : set({ isOpen: value });
    },
  }));
};

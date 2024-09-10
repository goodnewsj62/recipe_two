// src/providers/Sidebar-store-provider.tsx
"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

import {
  type SidebarStore,
  createSidebarStore,
  initSidebarStore,
} from "@/store/sidebarStore";

export type SidebarStoreApi = ReturnType<typeof createSidebarStore>;

export const SidebarStoreContext = createContext<SidebarStoreApi | undefined>(
  undefined
);

export interface SidebarStoreProviderProps {
  children: ReactNode;
}

export const SidebarStoreProvider = ({
  children,
}: SidebarStoreProviderProps) => {
  const storeRef = useRef<SidebarStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createSidebarStore(initSidebarStore());
  }

  return (
    <SidebarStoreContext.Provider value={storeRef.current}>
      {children}
    </SidebarStoreContext.Provider>
  );
};

export const useSidebarStore = <T,>(
  selector: (store: SidebarStore) => T
): T => {
  const sidebarStoreContext = useContext(SidebarStoreContext);

  if (!sidebarStoreContext) {
    throw new Error(`useSidebarStore must be used within SidebarStoreProvider`);
  }

  return useStore(sidebarStoreContext, selector);
};

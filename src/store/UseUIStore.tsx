
import { create } from "zustand";

// interface UIStore {
//   lastTabPaths: Record<string, string>;
//   setLastTabPath: (tab: string, path: string) => void;
// }

// export const useUIStore = create<UIStore>((set) => ({
//   lastTabPaths: {},
//   setLastTabPath: (tab, path) =>
//     set((state) => ({
//       lastTabPaths: { ...state.lastTabPaths, [tab]: path },
//     })),
// }));

interface UIStore {
    lastTabPaths: Record<string, string>;
    setLastTabPath: (tab: string, path: string) => void;
    assistantActiveTab: string;
    setAssistantActiveTab: (tab: string) => void;
  }
  
  export const useUIStore = create<UIStore>((set) => ({
    lastTabPaths: {},
    setLastTabPath: (tab, path) =>
      set((state) => ({
        lastTabPaths: { ...state.lastTabPaths, [tab]: path },
      })),
    assistantActiveTab: "assistants",
    setAssistantActiveTab: (tab) => set({ assistantActiveTab: tab }),
  }));
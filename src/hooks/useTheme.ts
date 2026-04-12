import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggle: () => void;
  initTheme: () => void;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: true,
      toggle: () => {
        const isDark = !get().isDark;
        if (isDark) {
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.add('light');
        }
        set({ isDark });
      },
      initTheme: () => {
        const isDark = get().isDark;
        if (isDark) {
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.add('light');
        }
      }
    }),
    {
      name: 'theme-storage',
    }
  )
);

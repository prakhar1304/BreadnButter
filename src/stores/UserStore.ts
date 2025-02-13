// store/useStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface UserState {
  user: {
    userId: string;
    email: string;
    phoneNumber: string;
    role: string;
    createdAt: string;
  } | null;
  setUser: (user: UserState['user']) => void;
  clearUser: () => void;
}

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
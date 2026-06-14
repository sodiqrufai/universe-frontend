import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'BUYER' | 'SELLER' | 'UNIVERSAL' | 'ADMIN';
}

interface AuthStore {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  loadFromStorage: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,

  setAuth: (user, token) => {
    localStorage.setItem('universe_token', token);
    localStorage.setItem('universe_user', JSON.stringify(user));
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem('universe_token');
    localStorage.removeItem('universe_user');
    set({ user: null, token: null });
  },

  loadFromStorage: () => {
    const token = localStorage.getItem('universe_token');
    const user = localStorage.getItem('universe_user');
    if (token && user) {
      set({ token, user: JSON.parse(user) });
    }
  },
}));
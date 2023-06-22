import { produce } from 'immer';
import create from 'zustand';

export interface UserType {
  username: string;
  nickname: string;
  password: string;
  phone: string;
  profile: string;
  account: string;
  watchlist: string[];
  id: number;
  accessKey: string;
}

type UserStore = {
  setUser(data: any): unknown;
  accessKey: UserType['accessKey'];
  username: UserType['username'];
  nickname: UserType['nickname'];
  profile: UserType['profile'];
  account: UserType['account'];
  watchlist: UserType['watchlist'];
  isAuthenticated: boolean;
  user: UserType | undefined; // 추가
  login: (username: string, accessKey: string) => void;
  logout: () => void;
};

const initialState: UserStore = {
  isAuthenticated: false,
  accessKey: '',
  username: '',
  nickname: '',
  profile: '',
  account: '',
  watchlist: [],
  user: undefined,
  login: (username: string, accessKey: string) => {},
  logout: () => {},
  setUser: (user: UserType[]) => {}
};

export const useUserStore = create<UserStore>(
  produce((set) => {
    // Load user state from localStorage if available
    const storedUser = localStorage.getItem('user');
    const initialUser = storedUser ? JSON.parse(storedUser) : initialState;

    return {
      ...initialUser,
      user: undefined, // 초기값 설정
      login: (username: string, accessKey: string) =>
        set((state: any) => {
          const updatedState = {
            ...state,
            isAuthenticated: true,
            username,
            accessKey
          };
          localStorage.setItem('user', JSON.stringify(updatedState));
          return updatedState;
        }),
      logout: () =>
        set((state: any) => {
          const updatedState = {
            ...state,
            isAuthenticated: false,
            username: '',
            accessKey: ''
          };
          localStorage.removeItem('user');
          return updatedState;
        }),
      setUser: (user: UserType[]) =>
        set((state: any) => ({
          ...state,
          user
        }))
    };
  })
);

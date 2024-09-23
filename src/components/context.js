'use client'
import { createContext, useContext } from 'react';

const UserContext = createContext(null);

export function UserProvider({ user, children }) {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const user = {
    ...useContext(UserContext),
    logout() {},
    login(email, password) {},
    register(email, password) {},
    get isAuthenticated() {},
    get isAdmin() {
      return this.user?.roles?.includes('development');
    }
  };
  return user;
}

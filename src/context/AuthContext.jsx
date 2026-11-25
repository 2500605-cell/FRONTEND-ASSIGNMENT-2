
// Name: Adeena Akram
// Registration No: 2500605

import { createContext, useState } from "react";

export const AuthContext = createContext();

const users = [
  {
    username: "admin",
    password: "admin123",
    role: "admin"
  },
  {
    username: "student1",
    password: "student123",
    role: "student"
  },
  {
    username: "student2",
    password: "student123",
    role: "student"
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (username, password) => {
    const foundUser = users.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    if (foundUser) {
      const userData = {
        username: foundUser.username,
        role: foundUser.role
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, role: user?.role, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

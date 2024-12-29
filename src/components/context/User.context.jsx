import React, { createContext, useState } from "react";
export const UserContext = createContext(null);
export default function Userprovider({ children }) {
  const [Token, setToken] = useState(localStorage.getItem("token"));
  function logout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <UserContext.Provider value={{ Token, setToken, logout }}>
      {children}
    </UserContext.Provider>
  );
}

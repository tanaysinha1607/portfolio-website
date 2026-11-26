// src/context/ProfileContext.jsx
import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [activeProfile, setActiveProfile] = useState(null);
  return (
    <ProfileContext.Provider value={{ activeProfile, setActiveProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}

// UserContext.js
import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [topSpeed, setTopSpeed] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [snowboarding, setSnowboarding] = useState(false);
  const [skiing, setSkiing] = useState(false);
  const [darkMode, setDarkmode] = useState(false);

  console.log("UserEmail:", userEmail);

  return (
    <UserContext.Provider
      value={{
        userEmail,
        setUserEmail,
        topSpeed,
        setTopSpeed,
        totalDistance,
        setTotalDistance,
        snowboarding,
        setSnowboarding,
        skiing,
        setSkiing,
        darkMode,
        setDarkmode,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return React.useContext(UserContext);
};

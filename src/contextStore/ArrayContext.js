import React, { createContext, useState } from "react";

const ArrayContext = createContext();

const ArrayProvider = ({ children }) => {
  const [profileArray, setProfileArray] = useState([]);

  const addProfile = (profileData) => {
    setProfileArray([...profileArray, profileData]);
  };

  const removeProfile = () => {
    setProfileArray([]);
  };

  return (
    <ArrayContext.Provider value={{ profileArray, addProfile, removeProfile }}>
      {children}
    </ArrayContext.Provider>
  );
};

export { ArrayContext, ArrayProvider };

import React, { useState } from 'react';

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [searchUser, setSearchCountry] = useState('');
  const [userData, setUserData] = useState([]);
  const [filteredData, setFiltered] = useState([]);
  const [cardData, setCardData] = useState({});

  const updateUserData = (data) => {
    setUserData(data);
  };

  return (
    <UserContext.Provider
      value={{
        searchUser,
        setSearchCountry,
        userData,
        updateUserData,
        filteredData,
        setFiltered,
        cardData,
        setCardData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };

import DataContext from ".";

import { useState, useEffect } from "react";

import dataInLocalStorage from "../../LocalStorage/";

const DATA = dataInLocalStorage("data");

export default function DataContextProvider({ children }) {
    const [ contacts, setContacts ] = useState(DATA ? DATA.contacts : []);
    const [ id, setId ] = useState(DATA ? DATA.id : 0);
    const [ editingData, setEditingData ] = useState({
        id: null,
        name: null,
        email: null,
        active: false
    });
  
    useEffect(() => {
      localStorage.setItem("data", JSON.stringify({contacts, id}));
    }, [ contacts, id ]);

    return (
        <DataContext.Provider value={{
            contacts,
            setContacts,
            id,
            setId,
            editingData,
            setEditingData
        }}>
            {children}
        </DataContext.Provider>
    );
};

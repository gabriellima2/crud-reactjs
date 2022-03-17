import { createContext } from "react";

const DataContext = createContext({
    contacts: null,
    setContacts: null,
    id: null,
    setId: null,
    editingData: null,
    setEditingData: null
});

export default DataContext;

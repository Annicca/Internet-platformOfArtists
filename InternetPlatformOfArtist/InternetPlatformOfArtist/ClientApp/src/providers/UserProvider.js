import { createContext, useMemo } from "react";
import React, { useState } from "react";

export const UserContext = createContext({user: {}});

export const UserProvider = ({children}) =>{
    const [user, setUser] = useState({});
    const value = useMemo(()=> ({user, setUser}), [user])

    return <UserContext.Provider value = {value}>
        {children}
    </UserContext.Provider>
}

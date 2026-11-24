import { createContext, useContext, useState } from "react";

export const UserContext = createContext({
    user:{},
    setUser: () => {},
})

export const useUser = () => {
    return useContext(UserContext)
}

export const UserContextProvider = UserContext.Provider
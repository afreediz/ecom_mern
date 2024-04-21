import { createContext, useContext, useState } from 'react'

export const userContext = createContext()

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState()
    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}

export const useAuth = () => useContext(userContext)

export default UserContextProvider
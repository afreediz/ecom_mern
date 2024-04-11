import { createContext, useState } from 'react'

export const userContext = createContext()

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({
        user:null,
    })
    return (
        <userContext.Provider value={{}}>
            {children}
        </userContext.Provider>
    )
}

export default UserContextProvider
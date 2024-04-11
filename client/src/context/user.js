import { createContext, useState } from 'react'

export const userContext = createContext()

export const userContextProvider = ({childrens}) => {
    const [user, setUser] = useState({
        user:null,
    })
    return (
        <userContext.Provider>
            {childrens}
        </userContext.Provider>
    )
}

export default userContextProvider
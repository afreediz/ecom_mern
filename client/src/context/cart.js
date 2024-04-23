import { createContext, useContext, useState } from "react";


export const cartContext = createContext()

export const CartContextProvider = ({children}) => {
    const [cart, setCart] = useState([])

    return (<cartContext.Provider value={{cart, setCart}}>
        {children}
    </cartContext.Provider>)
}

export const useCart = () => useContext(cartContext)

export default CartContextProvider
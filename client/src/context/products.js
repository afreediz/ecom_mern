import { createContext, useState } from "react";


export const productContext = createContext()

export const ProductContextProvider = ({children}) => {
    const [products, setProducts] = useState()

    return (<productContext.Provider value={{}}>
        {children}
    </productContext.Provider>)
}

export default ProductContextProvider
import { createContext, useContext, useEffect, useState } from "react";


export const cartContext = createContext()

export const CartContextProvider = ({children}) => {
    const [cart, setCart] = useState([])

    useEffect(()=>{
        console.log(localStorage.getItem("cart"));
        setCart(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])
    },[])
    
    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cart))
    },[cart])

    return (<cartContext.Provider value={{cart, setCart}}>
        {children}
    </cartContext.Provider>)
}

export const useCart = () => useContext(cartContext)

export const cartOperations = {
    addToCart: (data, context) => {
        context.setCart((old_cart)=>{
            const product_exist = old_cart.filter(p=>p._id==data._id).length == 0 ? false : true
            if(!product_exist){
              return [
              ...old_cart,
              {
                cart_quantity:1,
                ...data
              }]
            }else{
              return old_cart.map((p)=>{
                if(p._id===data._id){
                  p.cart_quantity = p.cart_quantity+1
                }
                return p
              })
            }
        })
    },
    removeCart: (data, context) => {
        if(data.cart_quantity == 1){
            return context.setCart((old_cart)=>{
                return old_cart.filter(p=>p._id!=data._id)
            })
        }
        context.setCart((old_cart)=>{
          return old_cart.map((p)=>{
            if(p._id==data._id){
                p.cart_quantity = p.cart_quantity-1
            }
            return p
        })
        })  
    }
}

export default CartContextProvider
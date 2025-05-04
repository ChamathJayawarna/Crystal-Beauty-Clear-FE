import { FaRegTrashCan } from "react-icons/fa6"
import getCart, { adddToCart, removeFromCart } from "../utils/cart"
import { useEffect, useState } from "react"

export default function CartPage(){
    const [cartLoaded,setCartLoaded] = useState(false)
    const [cart,setCart] = useState([])
    useEffect(
        ()=>{
            if(cartLoaded == false){
                const cart = getCart()
                setCart(cart)
                setCartLoaded(true)
            }
        },[cartLoaded]
    )

    return(
        <div className="w-full min-h-screen flex justify-center bg-red-200 p-[30px]">
            <div className="w-[900px] ">
                {
                    cart.map((item,index)=>{
                        return(
                            <div key={index} className="w-[900px] h-[100px] flex justify-between mb-[20px] bg-white border-2 rounded-lg relative">
                                <button className="w-[50px] h-[50px] rounded-full bg-white text-2xl absolute right-[-100px] top-[25px] 
                                flex justify-center items-center hover: cursor-pointer hover:text-red-500" onClick={
                                    ()=>{
                                        removeFromCart(item.productId)
                                        setCartLoaded(false)
                                    }
                                }><FaRegTrashCan/>
                                    
                                </button>
                                    <img src={item.image}  className="h-full aspect-square"/>
                                    <div className="h-full max-w-[300px] w-[300px] overflow-hidden ">
                                        <h1 className="text-xl font-bold">{item.productName}</h1>
                                        <h2 className="text-sm font-bold text-gray-500">{item.altNames.join(" | ")}</h2>
                                        <h2 className="text-lg font-bold">LKR {item.price.toFixed(2)}</h2>
                                    </div>
                                    <div className="w-[150px] h-full flex items-center justify-between ">
                                        <button className="w-[40px] h-[40px] rounded-full border-3 border-red-900 text-2xl font-bold mr-5 
                                        bg-red-900 text-white hover: cursor-pointer hover:bg-white hover:text-red-900" onClick={
                                            ()=>{
                                                adddToCart(item,+1)
                                                setCartLoaded(false)
                                            }
                                        }>+</button>
                                        <h1 className="text-xl font-bold">{item.quantity}</h1>
                                        <button className="w-[40px] h-[40px] rounded-full border-3 border-red-900 text-2xl font-bold ml-5
                                        bg-red-900 text-white hover: cursor-pointer hover:bg-white hover:text-red-900" onClick={
                                            ()=>{
                                                adddToCart(item,-1)
                                                setCartLoaded(false)
                                            }
                                        }>-</button>
                                    </div>
                                    <div className="w-[150px] h-full flex items-center justify-center">
                                        <h1 className="text-xl font-bold">LKR {(item.price * item.quantity).toFixed(2)}</h1>
                                         
                                    </div>
                                    
                                    
                                
                            </div>
                        )
                    })
                }

            </div>
            
        </div>
    )
}
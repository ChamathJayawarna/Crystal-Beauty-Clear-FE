import { FaRegTrashCan } from "react-icons/fa6"
import {useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

export default function CartPage() {
    const location = useLocation()
    const [cart, setCart] = useState(location.state.items)
    const [cartRefresh,setCartRefresh] = useState(false)
    const [name,setName] = useState("")
    const [address,setAddress] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
    const navigate = useNavigate()

    function placeOrder(){ 
        const orderData = {
            name: name,
            address: address,
            phoneNumber: phoneNumber,
            billItems: []
        }
        for(let i = 0; i < cart.length; i++){
            orderData.billItems[i] = {
                productId: cart[i].productId,
                quantity: cart[i].quantity
            }
        }
        const token = localStorage.getItem("token")
        axios.post(import.meta.env.VITE_BACKEND_URL+"api/order", orderData, {
            headers: {
                Authorization: "Bearer "+ token,
                
            },
        }).then(
            ()=>{
                toast.success("Order placed successfully")
                navigate("/")
            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error("Order placement failed")
            }
        )
       
        
    }

    function getNetTotal(){
        let netTotal = 0
        cart.forEach((item) => {
            netTotal += item.price * item.quantity         
        })
        return netTotal
    }
    function getSubTotal(){
        let subTotal = 0
        cart.forEach((item) => {
            subTotal += item.labeledPrice * item.quantity         
        })
        return subTotal
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-red-200 p-[30px]">

            <div className="w-[900px] h-[300px] flex flex-col items-center mb-[20px]">
                <h1 className="text-2xl font-bold p-3">Update Your Info</h1>
                <input type="text" className=" w-[500px] h-[50px] bg-white text-center font-bold border-2 rounded-lg " placeholder="Name"
                value={name} onChange={(e)=>setName(e.target.value)}/>

                <input type="text" className=" w-[500px] h-[50px] bg-white text-center font-bold border-2 rounded-lg mt-5" placeholder="Address"
                value={address} onChange={(e)=>setAddress(e.target.value)}/>

                <input type="text" className=" w-[500px] h-[50px] bg-white text-center font-bold border-2 rounded-lg mt-5" placeholder="Phone Number"
                value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>

            </div>


            <div className="w-[900px] flex-col justify-end ">
                {
                    cart.map((item, index) => {
                        return (
                            
                            <div key={index} className="w-[900px] h-[100px] flex justify-between mb-[20px] bg-white border-2 rounded-lg relative">
                               
                                <button className="w-[50px] h-[50px] rounded-full bg-white text-2xl absolute right-[-100px] top-[25px] 
                                flex justify-center items-center hover: cursor-pointer hover:text-red-500" onClick={
                                        () => {
                                            const newCart = cart.filter((product)=>product.productId !== item.productId)
                                            setCart(newCart)                                         
                                        }
                                    }><FaRegTrashCan />

                                </button>
                                <img src={item.image} className="h-full aspect-square rounded-lg" />
                                <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
                                    <h1 className="text-xl font-bold">{item.productName}</h1>
                                    <h2 className="text-sm font-bold text-gray-500 ">{item.altNames.join(" | ")}</h2>
                                    <h2 className="text-lg font-bold">LKR {item.price.toFixed(2)}</h2>
                                </div>
                                <div className="w-[150px] h-full flex items-center justify-between ">
                                    <button className="w-[40px] h-[40px] rounded-full border-3 border-red-900 text-2xl font-bold mr-5 
                                        bg-red-900 text-white hover: cursor-pointer hover:bg-white hover:text-red-900" onClick={
                                            () => {                                              
                                                const newCart = cart
                                                newCart[index].quantity += 1
                                                setCart(newCart)
                                                setCartRefresh(!cartRefresh)
                                            }
                                        }>+</button>
                                    <h1 className="text-xl font-bold">{item.quantity}</h1>
                                    <button className="w-[40px] h-[40px] rounded-full border-3 border-red-900 text-2xl font-bold ml-5
                                        bg-red-900 text-white hover: cursor-pointer hover:bg-white hover:text-red-900" onClick={
                                            () => {
                                                const newCart = cart
                                                newCart[index].quantity -= 1
                                                if(newCart[index].quantity <= 0) newCart[index].quantity = 1
                                                setCart(newCart)         
                                                setCartRefresh(!cartRefresh)                             
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
                <div className="w-[700px] h-[120px] bg-white rounded-lg border-[2px] flex flex-col justify-end p-5">
                    <div className="flex justify-between text-xl font-bold border-b border-black ">
                        <span>Sub Total</span>
                        <span>LKR {getSubTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold border-b border-black">
                        <span>Discount</span>
                        <span>LKR {(getSubTotal() - getNetTotal()).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-red-900 text-xl font-bold border-b-4 border-double border-black">
                        <span>Net Total</span>
                        <span>LKR {getNetTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                </div>
                <div className="w-[200px] h-[100px] ml-[700px] mt-[-110px] flex items-center justify-center">
                    <button className="w-[150px] h-[50px] bg-green-600 rounded-lg border-3 border-green-600 text-white font-bold hover:cursor-pointer hover:bg-white hover:text-green-600" 
                    onClick={placeOrder}>Place Order
                    </button>
                </div>

            </div>

        </div>
    )
}
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../components/loader"
import ImageSlider from "../components/imageSlider"
import getCart, { adddToCart } from "../utils/cart"

export default function ProductOverviewPage(){
    const params = useParams()
    const navigate = useNavigate()
    const [product,setProduct] = useState(null)
    const [status,setStatus] = useState("lLading") // there are 3 status (loading/loaded/error) therefore boolean cannot use 

    if(params.id == null){
        navigate("/products")
    }

    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"api/product/"+params.id).then(
                (res)=>{
                   setProduct(res.data.product)
                   setStatus("loaded")
                }
            ).catch(
                ()=>{
                    toast.error("Product not available")
                    setStatus("error")
                    
                }
            )
        },[status]
    )

    return(
        <div className="w-full h-full">
            {
                status == "loading" && 
                <Loader/>
            } 
            {
                status == "loaded" &&
                <div className="w-full h-full flex">
                    <div className="w-[50%] h-full flex justify-center items-center">
                        <ImageSlider images={product.images}/>
                        
                    </div>
                    <div className="w-[50%] h-full bg-pink-200 p-[40px]">
                        <h1 className="text-3xl font-bold text-center mb-5"><span className="text-2xl font-bold text-red-500">{product.productId}</span>{"    "}{product.productName}</h1>
                        <h2 className="text-2xl font-bold text-gray-500 text-center mb-2">{product.altNames.join(" | ")}</h2>
                        <div className="w-full flex justify-center m-[20px]">
                            {
                                product.labeledPrice > product.price ? (
                                    <>
                                       <h1 className="text-2xl font-bold text-gray-500 line-through mr-5">LKR {product.labeledPrice.toFixed(2)}</h1>
                                       <h1 className="text-2xl font-bold ">LKR {product.price.toFixed(2)}</h1>
                                    </>
                                ):
                                (
                                    <h1 className="text-2xl font-bold ">LKR {product.price.toFixed(2)}</h1>
                                )
                            }

                        </div>
                        <p className="text-xl font-semibold text-gray-500 text-center mb-5">{product.description}</p>

                        <div className="w-full flex justify-center p-20">
                        <button className="w-[150px] h-[50px] rounded-lg bg-red-500 text-white mr-[60px] cursor-pointer hover:bg-red-900" onClick={
                            ()=>{
                                adddToCart(product,1)
                                toast.success("Product added to cart")
                                console.log(getCart())
                            }
                        }>Add to Cart</button>
                        <button className="w-[150px] h-[50px] rounded-lg bg-red-500 text-white cursor-pointer hover:bg-red-900">Buy Now</button>

                        </div>

                    </div>
                    
                </div>
            }
            {
                status == "error" &&
                <div>
                    Error
                </div>
            }

        </div>
    )
}
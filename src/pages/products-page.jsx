import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import Loader from "../components/loader"
import ProductCard from "../components/product-card"

export default function ProductsPage(){
    const [productList,setProductList] = useState([])
    const [productLoaded,setProductLoaded] = useState(false)

    useEffect(
        ()=>{
            if(!productLoaded){
                axios.get(import.meta.env.VITE_BACKEND_URL+"api/product").then(
                    (res)=>{
                        console.log(res.data)
                        setProductList(res.data)
                        setProductLoaded(true)   
                    }
                )
            }        
        },[productLoaded]
    )

    return(
        <div className="w-full h-full">
            {
                productLoaded?
                <div className="w-full h-full flex flex-wrap justify-center">
                    {
                        productList.map(
                            (prdct,index)=>{
                                return(
                                 <ProductCard key={prdct.productId} productt={prdct}/>
                                )
                            }
                        )
                    }

                </div>
                :
                <Loader/>
            }

        </div>
    )
}
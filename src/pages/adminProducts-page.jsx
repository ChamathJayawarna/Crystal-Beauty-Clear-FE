import axios from "axios"
import { useEffect, useState } from "react"
import { MdAdd } from "react-icons/md"
import { Link } from "react-router-dom"

export default function AdminProductsPage(){
    const [products,setProducts] = useState([])
    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"api/product").then(
                (response)=>{
                    console.log(response.data)
                    setProducts(response.data)
                }
            )
        },[]
    )

    return(
        <div className="w-full h-full rounded-lg relative p-3">
            <Link to={"/admin/addProducts"} className="text-3xl text-color-black bg-red-300 rounded-full p-3 hover:bg-red-400 hover:text-white cursor-pointer absolute right-5 bottom-5">
            <MdAdd />
            </Link>
            <div className="max-h-[80vh] overflow-y-auto rounded-lg border border-gray-300">
            <table className="w-full">
                <thead className="bg-gray-300 sticky top-0 z-10"> 
                    <tr>
                    <th className="p-2">Product Id</th> 
                    <th className="p-2">Product Name</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Labeled Price</th>
                    <th className="p-2">Stock</th>
                    </tr>                 
                </thead>
                <tbody>
                 {
                   products.map(
                     (prdct,index)=>{
                        return(
                            <tr key={index} className="border b-2 border-gray-500 text-center hover:bg-red-400 hover:text-white">
                               <td className="p-2">{prdct.productId}</td>
                               <td className="p-2">{prdct.productName}</td>
                               <td className="p-2">{prdct.price}</td>
                               <td className="p-2">{prdct.labeledPrice}</td>
                               <td className="p-2">{prdct.stock}</td>
                            </tr>
                        )
                      } 
                    )
                 }          
                </tbody>
            </table>
            </div>           
            
        </div>
    )
}
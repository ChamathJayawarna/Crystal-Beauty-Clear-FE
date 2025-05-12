import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaRegTrashCan } from "react-icons/fa6"
import { MdAdd } from "react-icons/md"
import { TfiPencilAlt } from "react-icons/tfi"
import { Link, useNavigate } from "react-router-dom"
import Loader from "../components/loader"

export default function AdminProductsPage(){
    const [products,setProducts] = useState([])
    const [loaded,setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(
        ()=>{
            if(!loaded){
                axios.get(import.meta.env.VITE_BACKEND_URL+"api/product").then(
                    (response)=>{
                        console.log(response.data)
                        setProducts(response.data)
                        setLoaded(true)
                    }
                )
            }         
        },[loaded]
    )

    async function deleteProduct(productId) {

        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("You must be logged as admin first")
            return
        }
        const confirmed = confirm("Are you sure you want to delete this product?")
        if (!confirmed) {
            toast("Deletion cancelled");
            return
        }

        try{
            await axios.delete(import.meta.env.VITE_BACKEND_URL+"api/product/"+productId,{
                headers:{
                    Authorization: "Bearer "+token
                }
            })
            setLoaded(false)
            toast.success("Product deleted successfully")
        }catch(error){
            toast.error("error deleting product")
            return
        }
               
    }

    return(
        <div className="w-full h-full rounded-lg relative p-1">
            <Link to={"/admin/addProducts"} className="text-3xl text-color-black bg-red-300 rounded-full p-3 hover:bg-red-400 hover:text-white cursor-pointer absolute right-5 bottom-5">
            <MdAdd />
            </Link>

            {loaded&& <div className="max-h-[80vh] overflow-y-auto rounded-lg border border-gray-300">
            <table className="w-full">
                <thead className="bg-gray-300 sticky top-0 z-10"> 
                    <tr className="border b-2">
                    <th className="p-2">Product Id</th> 
                    <th className="p-2">Product Name</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Labeled Price</th>
                    <th className="p-2">Stock</th>
                    <th className="p-2">Actions</th>
                    </tr>                 
                </thead>
                <tbody>
                 {
                   products.map(
                     (prdct,index)=>{
                        return(
                            <tr key={index} className="border b-2 border-gray-500 text-center hover:bg-red-300 hover:text-white">
                               <td className="p-2">{prdct.productId}</td>
                               <td className="p-2">{prdct.productName}</td>
                               <td className="p-2">{prdct.price}</td>
                               <td className="p-2">{prdct.labeledPrice}</td>
                               <td className="p-2">{prdct.stock}</td>
                               <td className="p-2">
                                <div className="w-full h-full flex justify-center">
                                <FaRegTrashCan onClick={()=>{deleteProduct(prdct.productId)}} className="text-[25px] m-[7px] hover:text-red-900 hover:cursor-pointer"/>
                                <TfiPencilAlt onClick={()=>{navigate("/admin/editProducts",{state:prdct})}} className="text-[25px] m-[7px] hover:text-blue-900 hover:cursor-pointer"/> 
                                </div>                               
                               </td>
                            </tr>
                        )
                      } 
                    )
                 }          
                </tbody>
            </table>
            </div>} 
            {
                !loaded&& 
                <Loader/>
            }          
            
        </div>
    )
}
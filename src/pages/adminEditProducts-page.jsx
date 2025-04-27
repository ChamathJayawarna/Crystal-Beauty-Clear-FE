import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../utils/mediaUpload";

export default function AdminEditProducts(){
    const locationData = useLocation()
    const navigate = useNavigate()
    if(locationData.state == null){
        window.location.href = "/admin/products"
    }

    const [productId,setProductId] = useState(locationData.state.productId)
    const [productName,setProductName] = useState(locationData.state.productName)
    const [altNames,setAltNames] = useState(locationData.state.altNames.join(","))
    const [price,setPrice] = useState(locationData.state.price)
    const [labeledPrice,setLabeledPrice] = useState(locationData.state.labeledPrice)
    const [description,setDescription] = useState(locationData.state.description)
    const [stock,setStock] = useState(locationData.state.stock)
    const [images,setImages] = useState([])
    

    async function handleSubmit(){
        const promisesArray = []
        for(let i=0; i<images.length; i++){
            const promise = mediaUpload(images[i])
            promisesArray[i] = promise
        }
        try{
        let result = await Promise.all(promisesArray)
        if(images.length == 0){
            result = locationData.state.images
        }

        const altNamesArray = altNames.split(",")
        const product = {
            productName : productName,
            altNames : altNamesArray,
            price : price,
            labeledPrice : labeledPrice,
            description : description,
            stock : stock,
            images : result
        }
        const token = localStorage.getItem("token")
        await axios.put(import.meta.env.VITE_BACKEND_URL+"api/product/"+productId,product,{
            headers:{
                "Authorization": "Bearer "+token
            }
        })
        toast.success("Product updated successfully")
        navigate("/admin/products")

    }catch(error){       
        toast.error("Product updating failed")
    }       
    }

    return(
        <div className="w-full h-full rounded-lg flex justify-center items-center">
            <div className="bg-white w-[500px] h-[600px] rounded-lg shadow-2xl flex flex-col items-center">
                <h1 className="text-3xl font-bold p-3">Edit Products</h1>

                <input disabled value={productId} onChange={(e)=>{setProductId(e.target.value)}} className="w-[400px] h-[50px] text-center rounded-xl m-2 border border-gray-500" placeholder="Product Id">
                </input>

                <input value={productName} onChange={(e)=>{setProductName(e.target.value)}} className="w-[400px] h-[50px] text-center rounded-xl m-2 border border-gray-500" placeholder="Product Name">
                </input>

                <input value={altNames} onChange={(e)=>{setAltNames(e.target.value)}} className="w-[400px] h-[50px] text-center rounded-xl m-2 border border-gray-500" placeholder="Alternative Names">
                </input>

                <input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}} className="w-[400px] h-[50px] text-center rounded-xl m-2 border border-gray-500" placeholder="Price">
                </input>

                <input type="number" value={labeledPrice} onChange={(e)=>{setLabeledPrice(e.target.value)}} className="w-[400px] h-[50px] text-center rounded-xl m-2 border border-gray-500" placeholder="Labeled Price">
                </input>

                <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} className="w-[400px] h-[50px] text-center rounded-xl m-2 border border-gray-500" placeholder="Description">
                </textarea> 

                <input type="file" onChange={(e)=>{setImages(e.target.files)}} multiple className="w-[400px] h-[50px] text-center rounded-xl m-2 border border-gray-500">
                </input>

                <input type="number" value={stock} onChange={(e)=>{setStock(e.target.value)}} className="w-[400px] h-[50px] text-center rounded-xl m-2 border border-gray-500" placeholder="Stock">
                </input>

                <div className="w-[400px] h-[100px] flex items-center justify-between">
                    <button onClick={(handleSubmit)} className="w-[180px] h-[50px] bg-blue-600 text-center rounded-lg cursor-pointer hover:bg-blue-800 hover:text-white">Edit</button> 
                    <Link to={"/admin/products"} className="w-[180px] h-[50px] bg-red-500 text-center flex items-center justify-center rounded-lg cursor-pointer hover:bg-red-700 hover:text-white">Cancel</Link>        
                </div>

            </div>   
        </div>
    )
}

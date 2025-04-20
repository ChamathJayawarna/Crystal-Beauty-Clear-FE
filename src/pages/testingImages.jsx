
import { useState } from "react"
import toast from "react-hot-toast"
import mediaUpload from "../utils/mediaUpload"

export default function TestingImages(){
    const [file,setFile] = useState(null)

    function handleUpload(){
        mediaUpload(file).then(
            (url)=>{
                console.log(url)
                toast.success("File uploaded successfully")
            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error("File uploading failed")
            }
        )              
    }
    return(
        <div className="w-full h-screen bg-green-400 ">
            <input type="file" className="bg-orange-100 rounded-sm ml-10 mt-10 text-center 
            cursor-pointer hover:bg-orange-300 hover:text-white" onChange={(e)=>{setFile(e.target.files[0])}} />
            <button onClick={handleUpload} className="p-2 bg-gray-200 font-bold cursor-pointer hover:bg-gray-500 hover:text-white m-5 rounded-lg">upload</button>
        </div>
    )
}
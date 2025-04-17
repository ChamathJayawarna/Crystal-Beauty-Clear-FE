import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function LoginPage(){
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handleLogin(){
        console.log("Email: ",email)
        console.log("Password: ",password)

        axios.post(import.meta.env.VITE_BACKEND_URL+"api/user/login",{
            email: email,
            password: password
        }).then(
            (response)=>{
                console.log("Logged in successfully", response.data)
                toast.success("Logged in successfully")
                localStorage.setItem("token",response.data.token)
                const user = response.data.user

                if(user.role === "admin"){
                    navigate("/admin")
                }else{
                    navigate("/")
                }
            }
        ).catch(
            (error)=>{
                console.log("Login failed", error.response.data)
                toast.error(error.response.data.message || "Login Failed")
            }
        )
        
        console.log("Button clicked")

    }
    return(
        <div className="w-full h-screen bg-[url(/login-page.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full ">
            </div>
            <div className="w-[50%] h-full flex justify-center items-center">
            <div className="w-[600px] h-[600px] flex flex-col justify-center items-center backdrop-blur-lg shadow-2xl rounded-[25px]">
                <input onChange={(e)=>{
                    setEmail(e.target.value)
                }} type="email" className="w-[500px] h-[60px] border-white border-[2px] text-white text-center rounded-[10px] m-2" placeholder="Email" />
                <input onChange={(e)=>{
                    setPassword(e.target.value)
                }} type="password" className="w-[500px] h-[60px] border-white border-[2px] text-white text-center rounded-[10px] m-4" placeholder="Password" />
                <button onClick={handleLogin} className="w-[500px] h-[60px] bg-red-300 text-white rounded-[20px] cursor-pointer active:scale-95 transition-transform duration-150">Login</button>
            </div>
            </div>
        </div>
    )
}
    
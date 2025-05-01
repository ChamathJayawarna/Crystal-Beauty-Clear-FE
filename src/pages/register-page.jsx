import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()

  function handleRegister() {
    if (!email || !firstName || !lastName || !phoneNumber || !password || !confirmPassword) {
        toast.error("Please fill all fields")
        return
      }
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        toast.error("Invalid email address")
        return
      }

      const phoneRegex = /^[0-9]{8,15}$/ // basic: numbers only, min 8 digits
      if (!phoneRegex.test(phoneNumber)) {
        toast.error("Invalid phone number")
        return
      }
    
      if (password.length < 3) {
        toast.error("Password must be at least 3 characters long")
        return
      }
    
      if (password !== confirmPassword) {
        toast.error("Passwords do not match")
        return
      }

    axios.post(import.meta.env.VITE_BACKEND_URL + "api/user/", {
      email,
      firstName,
      lastName,
      phoneNumber,
      password
    })
    .then((response) => {
      console.log("Registered successfully", response.data)
      toast.success("Registered successfully")
      navigate("/login")
    })
    .catch((error) => {
      console.log("Registration failed", error.response?.data)
      toast.error(error.response?.data?.message || "Registration Failed")
    })
  }

  return (
    <div className="w-full h-screen bg-[url(/register-page.jpg)] bg-cover bg-center flex">
      <div className="w-[50%] h-full "></div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[600px] h-[700px] flex flex-col justify-center items-center backdrop-blur-lg shadow-2xl rounded-[25px]">
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-[500px] h-[60px] border-white border-[2px] text-white text-center rounded-[10px] m-2" />
          <input onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" className="w-[500px] h-[60px] border-white border-[2px] text-white text-center rounded-[10px] m-2" />
          <input onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" className="w-[500px] h-[60px] border-white border-[2px] text-white text-center rounded-[10px] m-2" />
          <input onChange={(e) => setPhoneNumber(e.target.value)} type="text" placeholder="Phone Number" className="w-[500px] h-[60px] border-white border-[2px] text-white text-center rounded-[10px] m-2" />
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-[500px] h-[60px] border-white border-[2px] text-white text-center rounded-[10px] m-2" />
          <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" className="w-[500px] h-[60px] border-white border-[2px] text-white text-center rounded-[10px] m-2" />
          <button onClick={handleRegister} className="w-[500px] h-[60px] bg-red-300 text-white rounded-[10px] hover:bg-red-400 cursor-pointer active:scale-95 transition-transform duration-150 mt-4">
            Register
          </button>
          <p className="text-red-100 m-[10px]">
            Already have an account?
            &nbsp;
            <span className="text-yellow-200 hover:text-red-600 hover:cursor-pointer">
              <Link to={"/login"}>Login Now</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

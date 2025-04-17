import { useState } from "react"

export default function TestingPage(){

    const [number,setNumber] = useState(0)
    function increment(){
        const newNumber = number+1
        setNumber(newNumber)
    }
    function decrement(){
        const newNumber = number-1
        setNumber(newNumber)
    }

    const [state,setState]= useState("Pending")
    function pass(){
        const newState = "Passed"
        setState(newState)
    }
    function fail(){
        const newState = "Failed"
        setState(newState)
    }

    return(
        
    <div className="w-full h-screen bg-red-300 ">
    <span className="text-3xl flex justify-center items-center">{number}</span>
    <div className="flex justify-center items-center">
        <button onClick={increment} className="w-[100px] h-[50px] bg-blue-200 rounded text-3xl m-2 cursor-pointer">+</button>
        <button onClick={decrement} className="w-[100px] h-[50px] bg-blue-200 rounded text-3xl cursor-pointer">-</button>
    </div>

    <span className="text-3xl flex justify-center items-center">{state}</span>
    <div className="flex justify-center items-center">
        <button onClick={pass} className="w-[100px] h-[50px] bg-blue-200 rounded text-3xl m-2 cursor-pointer">Pass</button>
        <button onClick={()=>{setState(fail)}} className="w-[100px] h-[50px] bg-blue-200 rounded text-3xl cursor-pointer">Fail</button>
    </div>
    </div>

    
    )
}
    
import { Link, Route, Routes } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa6";
import { GiPresent } from "react-icons/gi";

export default function AdminPage(){
   return(
     <div className="w-full h-screen bg-red-300 flex p-3">
        <div className="w-[15vw] h-full">
            <Link to="/admin/users" className="block p-2 flex justify-center items-center m-3"><FaUsers className="mr-2"/>Users</Link>
            <Link to="/admin/products" className="block p-2 flex justify-center items-center m-3"><GiPresent className="mr-2"/>Products</Link>
            <Link to="/admin/orders" className="block p-2 flex justify-center items-center m-3"><FaFileInvoice className="mr-2"/>Orders</Link>
        </div>

        <div className="w-[calc(100vw-15vw)] h-full bg-red-100 rounded-xl">
            <Routes>
                <Route path="/users" element={<h1>Users</h1>}/>
                <Route path="/products" element={<h1>Products</h1>}/>
                <Route path="/orders" element={<h1>Orders</h1>}/>
            </Routes>
 
        </div>

     </div>
   )
}
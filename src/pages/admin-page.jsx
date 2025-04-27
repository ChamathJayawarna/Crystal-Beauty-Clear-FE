import { Link, Route, Routes } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa6";
import { GiPresent } from "react-icons/gi";
import AdminProductsPage from "./adminProducts-page";
import AdminAddProducts from "./adminAddProducts-page";
import AdminEditProducts from "./adminEditProducts-page";

export default function AdminPage(){
   return(
     <div className="w-full h-screen bg-red-300 flex p-3">
        <div className="w-[15vw] h-full">
            <Link to="/admin/users" className="block p-2 flex items-center m-3 hover:bg-red-400 hover:text-white cursor-pointer rounded-lg"><FaUsers className="mr-2 ml-2"/>Users</Link>
            <Link to="/admin/products" className="block p-2 flex items-center m-3 hover:bg-red-400 hover:text-white cursor-pointer rounded-lg"><GiPresent className="mr-2 ml-2"/>Products</Link>
            <Link to="/admin/orders" className="block p-2 flex items-center m-3 hover:bg-red-400 hover:text-white cursor-pointer rounded-lg"><FaFileInvoice className="mr-2 ml-2"/>Orders</Link>
        </div>

        <div className="w-[calc(100vw-15vw)] h-full bg-red-100 rounded-xl">
            <Routes>
                <Route path="/users" element={<h1>Users</h1>}/>
                <Route path="/products" element={<AdminProductsPage/>}/>
                <Route path="/orders" element={<h1>Orders</h1>}/>
                <Route path="/addProducts" element={<AdminAddProducts/>}/>
                <Route path="/editProducts" element={<AdminEditProducts/>}/>
            </Routes>
 
        </div>

     </div>
   )
}
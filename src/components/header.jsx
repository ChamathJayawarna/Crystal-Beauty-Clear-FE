import { TfiShoppingCartFull } from "react-icons/tfi";
import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="w-full h-[70px] bg-black flex justify-center items-center " >
            <div className="w-[900px] h-full flex items-center justify-evenly text-xl text-white font-bold " >
             <Link to="/" >Home</Link>
             <Link to="/products" >Products</Link>
             <Link to="/contact" >Contact Us</Link>
             <Link to="/reviews" >Reviews</Link>
             <Link to="/cart" className="absolute right-[100px]"><TfiShoppingCartFull className="text-3xl "/></Link>

            </div>

        </header>
        
        
        
    )
}
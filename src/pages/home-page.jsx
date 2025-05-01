import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./products-page";
import ProductOverviewPage from "./productOverview-page";

export default function HomePage(){

    return(
        <div className="w-full h-full bg-pink-400">
            <Header/>
            <div className="w-full min-h-[calc(100vh-70px)]">
                <Routes path="/*">
                  <Route path="/" element={<h1>Home Page</h1>} />
                  <Route path="/products" element={<ProductsPage/>} />
                  <Route path="/overview:id" element={<ProductOverviewPage/>} />
                  <Route path="/*" element={<h1>404 Not Found</h1>} />
                    
                </Routes>
                
            </div>

        </div>
    )
}
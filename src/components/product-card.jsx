import { Link } from "react-router-dom"

export default function ProductCard(props){
    const product = props.productt

    return(
        <Link to={"/overview/"+product.productId} className="w-[250px] h-[350px] border-[3px] m-4 shadow-2xl">
            <img className="w-full h-[230px] object-fill " src={product.images[0]}/>
            <div className="w-full h-[120px] flex flex-col justify-center px-4">
                <p className="text-gray-500 font-bold">{product.productId}</p>
                <p className="text-lg font-bold">{product.productName}</p>
                <p className="text-lg font-bold">LKR {product.price.toFixed(2)} <span className="line-through text-gray-500">{product.price<product.labeledPrice && product.labeledPrice}</span> </p>
            </div>
            
        </Link>
    )
}
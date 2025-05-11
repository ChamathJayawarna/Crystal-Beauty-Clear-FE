import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../components/loader"
import ImageSlider from "../components/imageSlider"
import getCart, { adddToCart } from "../utils/cart"

export default function ProductOverviewPage() {
    const params = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [status, setStatus] = useState("lLading") // there are 3 status (loading/loaded/error) therefore boolean cannot use 

    if (params.id == null) {
        navigate("/products")
    }

    useEffect(
        () => {
            axios.get(import.meta.env.VITE_BACKEND_URL + "api/product/" + params.id).then(
                (res) => {
                    setProduct(res.data.product)
                    setStatus("loaded")
                }
            ).catch(
                () => {
                    toast.error("Product not available")
                    setStatus("error")

                }
            )
        }, [status]
    )

    return (
        <div className="w-full h-full">
            {
                status == "loading" &&
                <Loader />
            }
            {status === "loaded" && (
                <div className="w-full h-full flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Left Side - Image Slider */}
                    <div className="lg:w-1/2 w-full flex justify-center items-center bg-gray-100 p-6">
                        <ImageSlider images={product.images} />
                    </div>

                    {/* Right Side - Product Info */}
                    <div className="lg:w-1/2 w-full bg-red-200 p-10 flex flex-col justify-between">
                        {/* Product Title */}
                        <div className="text-center">
                            <h1 className="text-3xl font-bold mb-2">
                                <span className="text-red-500 text-xl mr-2">{product.productId}</span>
                                {product.productName}
                            </h1>
                            <h2 className="text-xl font-medium text-gray-600">{product.altNames.join(" | ")}</h2>
                        </div>

                        {/* Price Section */}
                        <div className="flex justify-center items-center gap-6 my-6">
                            {product.labeledPrice > product.price ? (
                                <>
                                    <span className="text-2xl font-semibold text-gray-500 line-through">
                                        LKR {product.labeledPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </span>
                                    <span className="text-2xl font-bold text-red-700">
                                        LKR {product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </span>
                                </>
                            ) : (
                                <span className="text-2xl font-bold text-red-700">
                                    LKR {product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-lg text-gray-700 text-center mb-6 leading-relaxed">{product.description}</p>

                        {/* Buttons */}
                        <div className="flex justify-center gap-8 mt-4">
                            <button
                                className="w-[150px] h-[50px] rounded-xl bg-red-600 text-white font-medium transition hover:bg-red-800"
                                onClick={() => {
                                    adddToCart(product, 1);
                                    toast.success("Product added to cart");
                                    console.log(getCart());
                                }}
                            >
                                Add to Cart
                            </button>
                            <button className="w-[150px] h-[50px] rounded-xl bg-green-600 text-white font-medium transition hover:bg-green-800"
                                onClick={() => {
                                    navigate("/checkout",
                                        {
                                            state: {
                                                items: [
                                                    {
                                                        productId: product.productId,
                                                        productName: product.productName,
                                                        altNames: product.altNames,
                                                        price: product.price,
                                                        labeledPrice: product.labeledPrice,
                                                        image: product.images[0],
                                                        quantity: 1
                                                    }
                                                ]
                                            }
                                        }
                                    )
                                }}>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {
                status == "error" &&
                <div>
                    Error
                </div>
            }

        </div>
    )
}
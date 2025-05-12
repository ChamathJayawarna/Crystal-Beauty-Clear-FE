import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../components/loader"
import { SlClose } from "react-icons/sl"
import { VscOutput } from "react-icons/vsc"
import toast from "react-hot-toast"

export default function AdminOrders() {
    const [orders, setOrders] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [modelDisplay, setModelDisplay] = useState(false)
    const [orderDisplay, setOrderDisplay] = useState(null)

    useEffect(
        () => {
            if (!loaded) {
                const token = localStorage.getItem("token")
                axios.get(import.meta.env.VITE_BACKEND_URL + "api/order", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }).then(
                    (response) => {
                        setOrders(response.data)
                        setLoaded(true)
                    }
                )
            }
        }, [loaded]
    )

    function changeOrderStatus(orderId, status) {
        const token = localStorage.getItem("token")
        axios.put(import.meta.env.VITE_BACKEND_URL + "api/order/" + orderId, { status: status }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(
            () => {
                toast.success("Order status changed successfully")
                setLoaded(false)
            }
        )
    }

    return (
        <div className="w-full h-full rounded-lg relative p-1">
            {loaded ?
                <div className="max-h-[80vh] overflow-y-auto rounded-lg border border-gray-300">
                    <table className="w-full ">
                        <thead className="bg-gray-300 sticky top-0 z-10">
                            <tr className="border b-2">
                                <th className="p-2">Order Id</th>
                                <th className="p-2">Customer Email</th>
                                <th className="p-2">Customer Name</th>
                                <th className="p-2">Address</th>
                                <th className="p-2">Phone Number</th>
                                <th className="p-2">status</th>
                                <th className="p-2">Total</th>
                                <th className="p-2">Date</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(
                                    (order) => {
                                        return (
                                            <tr key={order.orderId} className="border b-2 border-gray-500 text-center hover:bg-red-300 hover:text-white">
                                                <td className="p-2">{order.orderId}</td>
                                                <td className="p-2">{order.email}</td>
                                                <td className="p-2">{order.name}</td>
                                                <td className="p-2">{order.address}</td>
                                                <td className="p-2">{order.phoneNumber}</td>
                                                <td className="p-2">
                                                    <select value={order.status}
                                                        className={`z-[60px] font-bold p-1 rounded ${order.status === "Pending"
                                                                ? "text-yellow-600"
                                                                : order.status === "Processing"
                                                                    ? "text-blue-600"
                                                                    : order.status === "Delivered"
                                                                        ? "text-green-600"
                                                                        : order.status === "Rejected"
                                                                            ? "text-red-600"
                                                                            : "text-black"
                                                            }`}
                                                        onChange={(e) => {
                                                            changeOrderStatus(order.orderId, e.target.value);
                                                        }}>
                                                        <option value={"Pending"}>Pending</option>
                                                        <option value={"Processing"}>Processing</option>
                                                        <option value={"Delivered"}>Delivered</option>
                                                        <option value={"Rejected"}>Rejected</option>

                                                    </select>
                                                </td>
                                                <td className="p-2">{order.netTotal.toFixed(2)}</td>
                                                <td className="p-2">{new Date(order.date).toDateString()}</td>
                                                <td className="p-2">
                                                    <button className="text-2xl hover: cursor-pointer hover:bg-red-300 hover:text-white"
                                                        onClick={() => { setModelDisplay(true), setOrderDisplay(order) }}><VscOutput /></button>
                                                </td>

                                            </tr>
                                        )
                                    }
                                )
                            }
                        </tbody>
                    </table>
                    {
                        modelDisplay &&
                        <div className="fixed w-full h-full bg-[#00000090] top-0 left-0 z-20 flex justify-center items-center">
                            <div className="w-[600px] h-[600px] max-h-[600px] bg-white relative rounded-lg">
                                <div className="w-full h-[150px] bg-red-300 p-3 rounded-lg">
                                    <h1 className="text-md font-bold"> Order ID : {orderDisplay.orderId}</h1>
                                    <h1 className="text-md font-bold"> Customer Name : {orderDisplay.name}</h1>
                                    <h1 className="text-md font-bold">Date : {new Date(orderDisplay.date).toDateString()}</h1>
                                    <h1 className="text-md font-bold">Order Status : {orderDisplay.status}</h1>
                                    <h1 className="text-md font-bold">Net Total : {orderDisplay.netTotal.toFixed(2)}</h1>

                                </div>
                                <div className="w-full h-[450px] overflow-y-scroll rounded-lg">
                                    {
                                        orderDisplay.billItems.map(
                                            (item, index) => {
                                                return (
                                                    <div className="w-full h-[100px] bg-white my-[5px] p-2 flex justify-between items-center relative">
                                                        <img src={item.image} className="h-full aspect-square object-cover" />
                                                        <div className="h-full max-w-[300px] w-[300px] overflow-hidden p-2">
                                                            <h1 className="text-lg font-bold">{item.productName}</h1>
                                                            <h1 className="text-md font-bold text-gray-500">LKR {item.price.toFixed(2)}</h1>
                                                            <h1 className="text-md font-bold text-gray-500">Quantity {item.quantity}</h1>

                                                        </div>

                                                    </div>
                                                )
                                            }
                                        )

                                    }
                                </div>
                                <button onClick={() => { setModelDisplay(false) }}>
                                    <SlClose className="text-4xl hover: cursor-pointer hover:bg-red-900 hover:text-white absolute top-[-25px] right-[-25px] bg-white rounded-full" />
                                </button>

                            </div>

                        </div>
                    }

                </div>
                :
                (
                    <Loader />
                )
            }

        </div>
    )
}
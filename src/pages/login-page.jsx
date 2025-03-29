export default function LoginPage(){
    return(
        <div className="w-full h-screen bg-[url(/login-page.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full ">
            </div>
            <div className="w-[50%] h-full flex justify-center items-center">
            <div className="w-[600px] h-[600px] flex flex-col justify-center items-center backdrop-blur-lg shadow-2xl rounded-[25px]">
                <input type="email" className="w-[500px] h-[60px] border-white border-[2px] text-white text-center rounded-[10px] m-2" placeholder="Email" />
                <input type="password" className="w-[500px] h-[60px] border-white border-[2px] text-white text-center rounded-[10px] m-4" placeholder="Password" />
                <button className="w-[500px] h-[60px] bg-red-300 text-white rounded-[20px] cursor-pointer active:scale-95 transition-transform duration-150">Login</button>
            </div>
            </div>
        </div>
    )
}
    
import { useNavigate, useParams } from "react-router-dom"

export default function ProductOverviewPage(){
    const params = useParams()
    const navigate = useNavigate()

    if(params.id == null){
        navigate("/products")
    }

    return(
        <div>

        </div>
    )
}
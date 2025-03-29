export default function ProductCard(props){
    console.log(props)
    return(
        <div className="bg-yellow-200 text-2xl text-center">
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <p>{props.price}</p>
            <button>Add to Cart</button>
        </div>
    )
}
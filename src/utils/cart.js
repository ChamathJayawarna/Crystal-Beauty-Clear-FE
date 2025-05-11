export default function getCart(){

    let cart = localStorage.getItem("cart")

    if(cart == null){
        cart = []
        localStorage.setItem("cart",JSON.stringify(cart))
        return []
    }

    cart = JSON.parse(cart)
    return cart
}

export function adddToCart(product,qty){
    let cart = getCart()
    const productIndex = cart.findIndex((productt) => productt.productId === product.productId)
    if(productIndex == -1){
        cart.push(
            {
                productId: product.productId,
                productName: product.productName,
                altNames: product.altNames,
                price: product.price,
                labeledPrice: product.labeledPrice,
                image: product.images[0],
                quantity: qty
            }
        )
    }else{
        cart[productIndex].quantity += qty
        if(cart[productIndex].quantity <= 0){
            cart = cart.filter((productt) => productt.productId !== product.productId)

        }
    }

    localStorage.setItem("cart",JSON.stringify(cart))
    return cart
}

export function removeFromCart(productId){
    let cart = getCart()
    cart = cart.filter((product) => product.productId !== productId)
    localStorage.setItem("cart",JSON.stringify(cart))
    return cart

}

export function getSubTotal(){
    let cart = getCart()
    let subTotal = 0
    cart.forEach(
        (product)=>{
            subTotal += product.labeledPrice * product.quantity

        }
    )
    return subTotal
}

export function getNetTotal(){
    let cart = getCart()
    let netTotal = 0
    cart.forEach(
        (product)=>{
            netTotal += product.price * product.quantity

        }
    )
    return netTotal
}

export function getDiscountTotal(){
    let cart = getCart()
    let discountTotal = 0
    cart.forEach(
        (product)=>{
            discountTotal += (product.labeledPrice * product.quantity) - (product.price * product.quantity)

        }
    )
    return discountTotal
}
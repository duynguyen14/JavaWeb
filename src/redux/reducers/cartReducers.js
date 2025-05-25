import Type from "../types"

const initalState ={
    products:[],
}
const CartReducers=(state=initalState, action)=>{
    switch(action.type){
        case Type.cart.getProductInCart:
            return {
                ...state, 
                products : action.payload,
            }
        case Type.cart.updateProductInCart:
            return {
                ...state, 
                products: state.products.map(product=>
                    product.productSizeId ==action.payload.productSizeId ? 
                    {...product, quantity: action.payload.quantity}:
                    product
                )
            }
        case Type.cart.removeProductInCart:
            return {
                ...state,
                products : state.products.filter(product=> product.productSizeId !== action.payload)
            }
        default :
            return state
    }
}
export default CartReducers
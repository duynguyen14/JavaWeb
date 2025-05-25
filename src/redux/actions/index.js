import Type from "../types"

const showLoading=()=>{
    return{
        type: Type.loading.show,
        payload :true
    }
}
const hideLoading=()=>{
    return{
        type: Type.loading.hide,
        payload :false
    }
}

const getProductFromCart=(products)=>{
    return{
        type: Type.cart.getProductInCart,
        payload: products
    }
}
const updateProductFromCart=(productSizeId, quantity)=>{
    return{
        type :Type.cart.updateProductInCart,
        payload :{productSizeId, quantity}
    }
}
const removeProductFromCart=(productSizeId)=>{
    return{
        type :Type.cart.removeProductInCart,
        payload :productSizeId
    }
}
export {showLoading, hideLoading,getProductFromCart,updateProductFromCart,removeProductFromCart}
import Type from "../types"

const initalState = {
    products: [],
}
const CartReducers = (state = initalState, action) => {
    switch (action.type) {
        case Type.cart.addProductToCart:
            const productExist = state.products.find(
                product => product.productSizeId === action.payload.productSizeId
            );

            if (productExist) {
                // Nếu đã có, cập nhật quantity (ví dụ cộng dồn)
                return {
                    ...state,
                    products: state.products.map(product =>
                        product.productSizeId === action.payload.productSizeId
                            ? { ...product, quantity: product.quantity + action.payload.quantity }
                            : product
                    ),
                };
            } else {
                // Nếu chưa có, thêm sản phẩm mới vào mảng products
                return {
                    ...state,
                    products: [...state.products, action.payload],
                };

            }

        case Type.cart.getProductInCart:
            return {
                ...state,
                products: action.payload,
            }
        case Type.cart.updateProductInCart:
            return {
                ...state,
                products: state.products.map(product =>
                    product.productSizeId == action.payload.productSizeId ?
                        { ...product, quantity: action.payload.quantity } :
                        product
                )
            }
        case Type.cart.removeProductInCart:
            return {
                ...state,
                products: state.products.filter(product => product.productSizeId !== action.payload)
            }
        default:
            return state
    }
}
export default CartReducers
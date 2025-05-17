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
export {showLoading, hideLoading}
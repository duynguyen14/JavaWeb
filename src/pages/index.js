import UserLayout from "../components/Layout/DefautLayout/UserLayout";
import OtherLayout from "../components/Layout/OtherLayout";
// login
import Login from "./Login";

// user
import Home from "./User/Home";
import Profile from "./User/Profile";
import Register from "./User/Register";
import Product from "./User/Product";
import CartShopping from "./User/CartShopping";

// admin
import HomeAdmin from "./Admin/Home";
import ProfileAdmin from "./Admin/Profile";
import AdminLayout from "../components/Layout/DefautLayout/AdminLayout";


const PublicPage=[
    {path :"/",component: Home, layout: UserLayout },
    {path :"/profile",component: Profile, layout: OtherLayout },

    {path :"/category/:id",component: Profile, layout: UserLayout },
    {path :"/product/:id",component: Product, layout: UserLayout },
    
    {path :"/cartShopping",component: CartShopping, layout: UserLayout },


    {path :"/register",component: Register, layout: UserLayout },
    {path :"/login",component: Login, layout: UserLayout },


    {path :"/admin",component: HomeAdmin, layout: AdminLayout },
    {path :"/admin/profile",component: ProfileAdmin, layout: AdminLayout },

]

const PrivatePage=[

]

export {PublicPage,PrivatePage}
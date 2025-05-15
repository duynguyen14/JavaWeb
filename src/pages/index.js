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
import DashboardAdmin from "./Admin/Dashboard";
import ProfileAdmin from "./Admin/Profile";
import AdminLayout from "../components/Layout/DefautLayout/AdminLayout";
import Users from "./Admin/Users";
import Order from "./User/Order";
import OrderManagement from "./User/OrderManagement";
// import Catalogs from "./Admin/Catalogs";
// import Categories from "./Admin/Categories";
// import Employees from "./Admin/Employees";
// import Messages from "./Admin/Messages";
// import Orders from "./Admin/Orders";
// import Products from "./Admin/Products";
// import Revenues from "./Admin/Revenues";
// import Settings from "./Admin/Settings";





const PublicPage=[
    {path :"/",component: Home, layout: UserLayout },
    {path :"/profile",component: Profile, layout: OtherLayout },
    {path :"/ordermanagement",component: OrderManagement, layout: OtherLayout },

    {path :"/category/:id",component: Profile, layout: UserLayout },
    {path :"/product/:id",component: Product, layout: UserLayout },
    
    {path :"/cartShopping",component: CartShopping, layout: UserLayout },
    {path :"/order",component: Order, layout: UserLayout },

    
    {path :"/register",component: Register, layout: UserLayout },
    {path :"/login",component: Login, layout: UserLayout },


    {path :"/admin",component: DashboardAdmin, layout: AdminLayout },
    {path :"/admin/profile",component: ProfileAdmin, layout: AdminLayout },
    {path :"/admin/users",component: Users, layout: AdminLayout },
    // { path: "/admin/catalogs", component: Catalogs, layout: AdminLayout },
    // { path: "/admin/categories", component: Categories, layout: AdminLayout },
    // { path: "/admin/employees", component: Employees, layout: AdminLayout },
    // { path: "/admin/messages", component: Messages, layout: AdminLayout },
    // { path: "/admin/orders", component: Orders, layout: AdminLayout },
    // { path: "/admin/products", component: Products, layout: AdminLayout },
    // { path: "/admin/revenues", component: Revenues, layout: AdminLayout },
    // { path: "/admin/settings", component: Settings, layout: AdminLayout },
    

]

const PrivatePage=[

]

export {PublicPage,PrivatePage}
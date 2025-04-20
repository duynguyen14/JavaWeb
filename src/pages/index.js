import UserLayout from "../components/Layout/DefautLayout/UserLayout";
// login
import Login from "./Login";

// user
import Home from "./User/Home";
import Profile from "./User/Profile";
import Register from "./User/Register";



// admin
import HomeAdmin from "./Admin/Home";
import ProfileAdmin from "./Admin/Profile";
import AdminLayout from "../components/Layout/DefautLayout/AdminLayout";


const PublicPage=[
    {path :"/",component: Home, layout: UserLayout },
    {path :"/profile",component: Profile, layout: UserLayout },



    {path :"/register",component: Register, layout: null },
    {path :"/login",component: Login, layout: null },


    {path :"/admin",component: HomeAdmin, layout: AdminLayout },
    {path :"/admin/profile",component: ProfileAdmin, layout: AdminLayout },

]

const PrivatePage=[

]


export {PublicPage,PrivatePage}
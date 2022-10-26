import SignUp from "../pages/SignUp"
import SignIn from './../pages/SignIn';
import Home from "../pages/Home";

export const publicRoutes = [
    { path : '/', component: Home},
    { path : '/signup', component: SignUp},
    { path : '/signin', component: SignIn}
]

export const privateRoutes = [

]
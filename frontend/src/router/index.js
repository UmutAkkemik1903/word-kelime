//user
import UserLayout from '../layout/UserLayout';
import Word from '../pages/user/game/word';

//admin
import AdminLayout from '../layout/AdminLayout';
import Dash from '../pages/admin/dashboard';
import AdminWord from '../pages/admin/wordFind/Word';
const routes = [
    {
        path:'/',
        element:<UserLayout/>,
        children:[
            {
                index:true,
                element:<Word />
            },
        ]
    },
    {
        path:'/admin',
        element:<AdminLayout/>,
        children:[
            {
                index:true,
                element:<Dash />
            },
            {
                path:'words',
                element:<AdminWord />
            },
        ]
    },
]

export default routes;
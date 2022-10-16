import Admin from '../AdminPage/Home';
import VatPham from '../AdminPage/VatPham';
import KhachHang from '../AdminPage/KhachHang';
import CuaHang from '../AdminPage/CuaHang';
import DonMua from '../AdminPage/DonMua';
import User from '../components/Layout/UserLayout';
import Login from '../components/Layout/Login';
import Home from '../UserPage/Main/index';
import Details from '../UserPage/Details/index';
import Cart from '../UserPage/Cart/index';
import LoginForm from '../UserPage/Login/index';

const publicRoutes = [
    { path: '/', component: Home, layout: User },
    { path: '/:id', component: Home, layout: User },
    { path: '/login', component: LoginForm, layout: Login },
    { path: '/details/:idItem', component: Details, layout: User },
    { path: '/details/:id/:idItem', component: Details, layout: User },
    { path: '/cart/:id', component: Cart, layout: User },
    { path: '/admin', component: Admin },
    { path: '/admin/VatPham', component: VatPham },
    { path: '/admin/KhachHang', component: KhachHang },
    { path: '/admin/CuaHang', component: CuaHang },
    { path: '/admin/DonMua', component: DonMua },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };

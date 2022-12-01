import Admin from '../AdminPage/Home';
import VatPham from '../AdminPage/VatPham';
import KhachHang from '../AdminPage/KhachHang';
import CuaHang from '../AdminPage/CuaHang';
import DonMua from '../AdminPage/DonMua';
import MaGiamGia from '../AdminPage/MaGiamGia';
import ThongKe from '../AdminPage/ThongKe';
import User from '../components/Layout/UserLayout';
import Login from '../components/Layout/Login';
import Home from '../UserPage/Main/index';
import Details from '../UserPage/Details/index';
import Cart from '../UserPage/Cart/index';
import LoginForm from '../UserPage/Login/index';
import Information from '../components/Layout/InforLayout/index';
import Infor from '../UserPage/Information/index';
import ChangPass from '../UserPage/Information/ChangePass';
import Purchase from '../UserPage/Information/Purchase';

const publicRoutes = [
    { path: '/', component: Home, layout: User },
    { path: '/login', component: LoginForm, layout: Login },
    { path: '/details/:idItem', component: Details, layout: User },
    { path: '/cart', component: Cart, layout: User },
    { path: '/user', component: Infor, layout: Information },
    { path: '/user/pass', component: ChangPass, layout: Information },
    { path: '/user/purchase', component: Purchase, layout: Information },
    { path: '/admin', component: Admin },
    { path: '/admin/VatPham', component: VatPham },
    { path: '/admin/KhachHang', component: KhachHang },
    { path: '/admin/CuaHang', component: CuaHang },
    { path: '/admin/DonMua', component: DonMua },
    { path: '/admin/magiamgia', component: MaGiamGia },
    { path: '/admin/thongke', component: ThongKe },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };

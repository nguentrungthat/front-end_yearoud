import User from '../components/Layout/UserLayout';
import Login from '../components/Layout/Login';
import Owner from '../components/Layout/OwnerLayout';
import Admin from '../AdminPage/Home';
import VatPham from '../AdminPage/VatPham';
import KhachHang from '../AdminPage/KhachHang';
import CuaHang from '../AdminPage/CuaHang';
import MaGiamGia from '../AdminPage/MaGiamGia';
import ThongKe from '../AdminPage/ThongKe';
import OwnerAdmin from '../OwnerPage/Home';
import OwnerVatPham from '../OwnerPage/VatPham';
import OwnerThongKe from '../OwnerPage/ThongKe';
import Home from '../UserPage/Main/index';
import Details from '../UserPage/Details/index';
import Cart from '../UserPage/Cart/index';
import LoginForm from '../UserPage/Login/index';
import SignUpForm from '../UserPage/SignUp/index';
import Information from '../components/Layout/InforLayout/index';
import Infor from '../UserPage/Information/index';
import ChangPass from '../UserPage/Information/ChangePass';
import Purchase from '../UserPage/Information/Purchase';
import SignUpStore from '../UserPage/Information/SignUpStore';

const publicRoutes = [
    { path: '/', component: Home, layout: User },
    { path: '/:search', component: Home, layout: User },
    { path: '/login', component: LoginForm, layout: Login },
    { path: '/signup', component: SignUpForm, layout: Login },
    { path: '/details/:idItem', component: Details, layout: User },
    { path: '/cart', component: Cart, layout: User },
    { path: '/user', component: Infor, layout: Information },
    { path: '/user/pass', component: ChangPass, layout: Information },
    { path: '/user/purchase', component: Purchase, layout: Information },
    { path: '/user/signupstore', component: SignUpStore, layout: Information },
    { path: '/admin', component: Admin },
    { path: '/admin/VatPham', component: VatPham },
    { path: '/admin/KhachHang', component: KhachHang },
    { path: '/admin/CuaHang', component: CuaHang },
    { path: '/admin/magiamgia', component: MaGiamGia },
    { path: '/admin/thongke', component: ThongKe },
    { path: '/admin/:id', component: OwnerAdmin, layout: Owner },
    { path: '/admin/:id/VatPham', component: OwnerVatPham, layout: Owner },
    { path: '/admin/:id/thongke', component: OwnerThongKe, layout: Owner },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };

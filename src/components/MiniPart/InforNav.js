import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../UserPage/Information/Information.module.scss';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PasswordIcon from '@mui/icons-material/Password';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import Avatar from '@mui/material/Avatar';
const KH = require('../../Controller/KhachHangController');

export default function Nav() {
    const [account, setAcount] = useState([]);

    const id = localStorage.getItem('id');

    useEffect(() => {
        async function Get() {
            return setAcount(await KH.GET_ACCOUNT(id));
        }
        Get();
    }, [id]);

    const styleIcon = {
        mr: '0.6rem',
        width: '2rem',
        height: '2rem',
        color: '#0145ad',
    };

    return (
        <div className={clsx(styles.nav)}>
            <div className={clsx(styles.avatar)}>
                <Avatar />
                {account[0]?.TAIKHOAN}
            </div>
            <ul className={clsx(styles.ul)}>
                <Link className={clsx(styles.link)} to={'/user'}>
                    <li className={clsx(styles.li)}>
                        <AccountBoxIcon sx={styleIcon} />
                        <span>Tài khoản của tôi</span>
                    </li>
                </Link>
                <Link className={clsx(styles.link)} to={'/user/purchase'}>
                    <li className={clsx(styles.li)}>
                        <AssignmentIcon sx={styleIcon} />
                        <span>Đơn mua</span>
                    </li>
                </Link>
                <Link className={clsx(styles.link)} to={'/user/pass'}>
                    <li className={clsx(styles.li)}>
                        <PasswordIcon sx={styleIcon} />
                        <span>Đổi mật khẩu</span>
                    </li>
                </Link>
                <Link className={clsx(styles.link)} to={'/user/signupstore'}>
                    <li className={clsx(styles.li)}>
                        <AddBusinessIcon sx={styleIcon} />
                        <span>Đăng ký bán hàng</span>
                    </li>
                </Link>
            </ul>
        </div>
    );
}

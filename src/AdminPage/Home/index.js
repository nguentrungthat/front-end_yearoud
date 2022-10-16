import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import cx from 'clsx';
import styles from './Home.module.scss';
const Dashboard = require('../../Controller/DashboardController');

function Home() {
    const [dashboards, setDashboards] = useState([]);
    useEffect(() => {
        async function Get() {
            setDashboards(await Dashboard.GET());
        }
        Get();
    }, []);
    console.log(dashboards);
    const cards = [
        {
            name: 'Tổng vật phẩm',
            quantity: dashboards[0]?.VATPHAM,
            color: '#3b76ef',
            link: 'VatPham',
        },
        {
            name: 'Tổng khách hàng',
            quantity: dashboards[1]?.KHACHHANG,
            color: '#63c7ff',
            link: 'KhachHang',
        },
        {
            name: 'Tổng cửa hàng',
            quantity: dashboards[2]?.CUAHANG,
            color: '#a66dd4',
            link: 'CuaHang',
        },
        {
            name: 'Tổng đơn mua',
            quantity: dashboards[3]?.DONMUA,
            color: '#6dd4b1',
            link: 'DonMua',
        },
    ];
    const arr = cards.map((card, index) => (
        <Link className={cx(styles.link)} key={index} to={`/admin/${card.link}`}>
            <Card
                className={cx(styles.cards)}
                key={index}
                sx={{
                    bgcolor: card.color,
                    mt: '7.6rem',
                    display: 'inline-flex',
                    width: 265,
                    height: 186,
                    borderRadius: 7,
                }}
            >
                <div>
                    <CardContent>
                        <Typography sx={{ ml: '2rem', fontSize: '2.4rem', width: '20rem' }}>{card?.name}</Typography>
                        <Typography sx={{ ml: '2rem', fontSize: '6rem', width: '15rem' }}>{card?.quantity}</Typography>
                        <Typography sx={{ ml: '2rem', fontSize: '1.4rem' }} color="text.secondary">
                            <i>Cập nhật gần đây</i>
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        </Link>
    ));
    return <div className={cx(styles.dashboard)}>{arr}</div>;
}

export default Home;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import cx from 'clsx';
import styles from './Home.module.scss';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
const Dashboard = require('../../Controller/DashboardController');

function Home() {
    const [topDonMua, setTopDonMua] = useState([]);
    const [topVatPham, setTopVatPham] = useState([]);
    const [doanhthu, setDoanhThu] = useState([]);
    const [donmua, setDonMua] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        async function Get() {
            setTopDonMua(await Dashboard.GET_TOP_DONMUA(id));
            setTopVatPham(await Dashboard.GET_TOP_VATPHAM(id));
            setDoanhThu(await Dashboard.GET_DOANHTHU(id));
            setDonMua(await Dashboard.GET_DONMUA(id));
        }
        Get();
    }, [id]);

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
            },
        },
    };

    const labels = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ];

    const dataDoanhThu = {
        labels,
        datasets: [
            {
                label: 'Doanh thu theo tháng',
                data: doanhthu,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const dataKH_DM = {
        labels,
        datasets: [
            {
                label: 'Đơn mua theo tháng',
                data: donmua,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div className={cx(styles.dashboard_container)}>
            <div className={cx(styles.breadcrumbs)}>
                <Breadcrumbs sx={{ fontSize: '1.4rem' }}>
                    <Link underline="hover" color="inherit" href="/admin">
                        Dashboard
                    </Link>
                    <Typography></Typography>
                </Breadcrumbs>
            </div>
            <div className={cx(styles.inline)}>
                <div className={cx(styles.chart)}>
                    <Line options={options} data={dataKH_DM} />
                </div>
                <div className={cx(styles.chart)}>
                    <Bar options={options} data={dataDoanhThu} />
                </div>
            </div>
            <div className={cx(styles.inline)}>
                <div className={cx(styles.chart)}>
                    <div className={cx(styles.title)}>Top 5 Đơn Hàng Nổi Bật Trong Tháng</div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontSize: 16 }}>STT</TableCell>
                                    <TableCell sx={{ fontSize: 16 }}>Tên Khách Hàng</TableCell>
                                    <TableCell sx={{ fontSize: 16 }}>Số Tiền</TableCell>
                                    <TableCell sx={{ fontSize: 16 }}>Ngày Đặt Hàng</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {topDonMua.map((top, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell sx={{ fontSize: 16 }} align="center">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: 16 }} align="left">
                                            {top.TEN_KHACHHANG}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: 16 }} align="center">
                                            {top.TONGTIEN.toLocaleString('en-US')}đ
                                        </TableCell>
                                        <TableCell sx={{ fontSize: 16 }} align="center">
                                            {new Date(top.NGAYTHANG)
                                                .toLocaleString('en-GB', { timeZone: 'UTC' })
                                                .slice(0, 10)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className={cx(styles.chart)}>
                    <div className={cx(styles.title)}>Top 5 Sản Phảm Bán Chạy Trong Tháng</div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontSize: 16 }}>STT</TableCell>
                                    <TableCell sx={{ fontSize: 16 }}>Tên Sản Phẩm</TableCell>
                                    <TableCell sx={{ fontSize: 16 }}>Cửa Hàng</TableCell>
                                    <TableCell sx={{ fontSize: 16 }}>Số Lượng Đã Bán</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {topVatPham.map((top, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell sx={{ fontSize: 16 }} align="center">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: 16 }} align="left">
                                            {top.TEN_VATPHAM}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: 16 }} align="left">
                                            {top.TEN_STORE}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: 16 }} align="center">
                                            {top.SOLUONG}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}

export default Home;

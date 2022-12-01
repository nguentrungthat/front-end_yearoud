import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import styles from './KhachHang.module.scss';

const Khachhangs = require('../../Controller/KhachHangController');

function KhachHang() {
    const [khachhangs, setKhachhangs] = useState([]);
    const [disXoa, setDisXoa] = useState(true);
    const [disLuu, setDisLuu] = useState(true);
    useEffect(() => {
        async function Get() {
            setKhachhangs(await Khachhangs.GET());
            setDisXoa(true);
            setDisLuu(true);
        }
        Get();
    }, []);
    var rows = [];
    for (const khachhang of khachhangs) {
        var gioitinh = '';
        if (khachhang.GIOITINH === 1) {
            gioitinh = 'Nam';
        } else if (khachhang.GIOITINH === 2) {
            gioitinh = 'Nữ';
        } else {
            gioitinh = 'Không rõ';
        }
        var row = {
            id: khachhang.ID_KHACHHANG,
            col1: khachhang.TEN_KHACHHANG,
            col2: gioitinh,
            col3: khachhang.SDT,
            col4: khachhang.DIACHI,
            col5: khachhang.EMAIL,
        };
        rows.push(row);
    }
    var columns = [
        { field: 'col1', headerName: 'Tên Khách Hàng', width: 300 },
        { field: 'col2', headerName: 'Giới Tính', width: 150 },
        { field: 'col3', headerName: 'Số Điện Thoại', width: 200 },
        { field: 'col4', headerName: 'Địa Chỉ', width: 250 },
        { field: 'col5', headerName: 'E-mail', width: 250 },
    ];
    return (
        <div className={clsx(styles.table_container)}>
            <div className={clsx(styles.breadcrumbs)}>
                <Breadcrumbs sx={{ fontSize: '1.4rem' }}>
                    <Link underline="hover" color="inherit" href="/admin">
                        Dashboard
                    </Link>
                    <Typography sx={{ fontSize: '1.4rem' }} color="text.primary">
                        Khách Hàng
                    </Typography>
                </Breadcrumbs>
            </div>
            <div className={clsx(styles.title)}>
                <p>Danh Sách Khách Hàng</p>
            </div>
            <div className={clsx(styles.actions)}>
                <Button disabled={disLuu} className={clsx(styles.btn_action)} variant="contained">
                    <SaveIcon sx={{ mr: '1rem', fontSize: '1.6rem' }} />
                    Lưu
                </Button>
                <Button
                    disabled={disXoa}
                    className={clsx(styles.btn_action)}
                    variant="contained"
                    sx={{ mr: '1rem', bgcolor: '#d12525' }}
                >
                    <DeleteForeverIcon sx={{ mr: '1rem', fontSize: '1.6rem' }} />
                    Xóa
                </Button>
                <Button className={clsx(styles.btn_action)} variant="contained" sx={{ mr: '1rem', bgcolor: '#5ab249' }}>
                    <AddIcon sx={{ mr: '1rem', fontSize: '1.6rem' }} />
                    Thêm
                </Button>
            </div>
            <DataGrid
                sx={{ fontSize: '1.6rem' }}
                rows={rows}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                checkboxSelection
            />
        </div>
    );
}

export default KhachHang;

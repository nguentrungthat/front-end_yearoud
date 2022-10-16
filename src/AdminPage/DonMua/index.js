import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import styles from './DonMua.module.scss';

const Donmuas = require('../../Controller/DonMuaController');

function KhachHang() {
    const [donmuas, setDonmuas] = useState([]);
    useEffect(() => {
        async function Get() {
            setDonmuas(await Donmuas.GET());
        }
        Get();
    }, []);
    var rows = [];
    for (const donmua of donmuas) {
        var row = {
            id: donmua.ID_DONMUACT,
            col1: donmua.TEN_KHACHHANG,
            col2: donmua.TEN_VATPHAM,
            col3: donmua.TEN_STORE,
            col4: donmua.SOLUONGVP,
            col5: donmua.DONGIAVP,
            col6: new Date(donmua.NGAYTHANG).toLocaleString('en-GB', { timeZone: 'UTC' }),
        };
        rows.push(row);
    }
    var columns = [
        { field: 'col1', headerName: 'Tên Khách Hàng', width: 200 },
        { field: 'col2', headerName: 'Tên Vật Phẩm', width: 200 },
        { field: 'col3', headerName: 'Tên Cửa Hàng', width: 200 },
        { field: 'col4', headerName: 'Số Lượng', width: 100 },
        { field: 'col5', headerName: 'Đơn Giá', width: 150 },
        { field: 'col6', headerName: 'Ngày Tháng', width: 250 },
    ];
    return (
        <div className={clsx(styles.table_container)}>
            <div className={clsx(styles.title)}>
                <p>Danh Sách Đơn Mua</p>
            </div>
            <div className={clsx(styles.actions)}>
                <Button className={clsx(styles.btn_action)} variant="contained">
                    <SaveIcon sx={{ mr: '1rem', fontSize: '1.6rem' }} />
                    Lưu
                </Button>
                <Button className={clsx(styles.btn_action)} variant="contained" sx={{ mr: '1rem', bgcolor: '#d12525' }}>
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

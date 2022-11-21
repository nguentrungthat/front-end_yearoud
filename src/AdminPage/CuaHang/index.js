import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import styles from './CuaHang.module.scss';

const Cuahhangs = require('../../Controller/CuaHangController');

function CuaHang() {
    const [cuahangs, setCuahhangs] = useState([]);
    useEffect(() => {
        async function Get() {
            setCuahhangs(await Cuahhangs.GET());
        }
        Get();
    }, []);
    var rows = [];
    for (const cuahang of cuahangs) {
        var row = {
            id: cuahang.ID_STORE,
            col1: cuahang.TEN_STORE,
            col2: cuahang.SDT,
            col3: cuahang.ADDRESS,
            col4: cuahang.WARD,
            col5: cuahang.DISTRICT,
            col6: cuahang.PROVINCE,
        };
        rows.push(row);
    }
    var columns = [
        { field: 'col1', headerName: 'Tên Cửa Hàng', width: 220 },
        { field: 'col2', headerName: 'Số điện thoại', width: 150 },
        { field: 'col3', headerName: 'Địa chỉ', width: 200 },
        { field: 'col4', headerName: 'Phường/Xã', width: 200 },
        { field: 'col5', headerName: 'Quận/Huyện', width: 200 },
        { field: 'col6', headerName: 'Tỉnh/TP', width: 200 },
    ];
    return (
        <div className={clsx(styles.table_container)}>
            <div className={clsx(styles.title)}>
                <p>Danh Sách Cửa Hàng</p>
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

export default CuaHang;

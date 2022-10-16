import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from './VatPham.module.scss';

const Items = require('../../Controller/ItemsController');

function VatPham() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        async function Get() {
            setItems(await Items.GET());
        }
        Get();
    }, []);
    var rows = [];
    for (const item of items) {
        var row = {
            id: item.ID_VATPHAM,
            col1: item.TEN_VATPHAM,
            col2: item.GIABAN,
            col3: item.SOLUONG_TONKHO,
            col4: item.SOLUONG_DABAN,
            col5: item.TEN_STORE,
            col6: item.LOAI,
            col7: item.MOTA_VATPHAM,
        };
        rows.push(row);
    }
    var columns = [
        { field: 'col1', headerName: 'Tên Vật Phẩm', width: 350, editable: true },
        { field: 'col2', headerName: 'Giá Bán', width: 130, editable: true },
        { field: 'col3', headerName: 'SL Tồn Kho', width: 100, editable: true },
        { field: 'col4', headerName: 'SL Đã Bán', width: 100, editable: true },
        { field: 'col5', headerName: 'Tên Cửa Hàng', width: 200 },
        { field: 'col6', headerName: 'Loại', width: 100 },
        { field: 'col7', headerName: 'Mô tả', width: 150, editable: true },
    ];
    return (
        <div className={clsx(styles.table_container)}>
            <div className={clsx(styles.title)}>
                <p>Danh Sách Vật Phẩm</p>
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

export default VatPham;

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useEffect } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import styles from './ThongKe.module.scss';

function CuaHang() {
    useEffect(() => {
        async function Get() {}
        Get();
    }, []);
    var rows = [];
    // for (const cuahang of cuahangs) {
    //     var row = {
    //         id: cuahang.ID_STORE,
    //         col1: cuahang.TEN_STORE,
    //         col2: cuahang.SDT,
    //         col3: cuahang.ADDRESS,
    //         col4: cuahang.WARD,
    //         col5: cuahang.DISTRICT,
    //         col6: cuahang.PROVINCE,
    //     };
    //     rows.push(row);
    // }
    var columns = [
        { field: 'col1', headerName: 'Tên Khách Hàng', width: 200 },
        { field: 'col2', headerName: 'Tên Vật Phẩm', width: 200 },
        { field: 'col3', headerName: 'Tên Cửa Hàng', width: 200 },
        { field: 'col4', headerName: 'Số Lượng', width: 100 },
        { field: 'col5', headerName: 'Tổng tiền', width: 150 },
        { field: 'col6', headerName: 'Ngày Đặt', width: 170 },
        { field: 'col7', headerName: 'Ngày Giao', width: 170 },
    ];
    return (
        <div className={clsx(styles.table_container)}>
            <div className={clsx(styles.breadcrumbs)}>
                <Breadcrumbs sx={{ fontSize: '1.4rem' }}>
                    <Link underline="hover" color="inherit" href="/admin">
                        Dashboard
                    </Link>
                    <Typography sx={{ fontSize: '1.4rem' }} color="text.primary">
                        Thống Kê
                    </Typography>
                </Breadcrumbs>
            </div>
            <div className={clsx(styles.title)}>
                <p>Danh Sách Thống Kê</p>
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

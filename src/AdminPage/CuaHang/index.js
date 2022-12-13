import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useEffect, useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import styles from './CuaHang.module.scss';
import CustomToolbar from '../../components/MiniPart/CustomToolBar';
const Cuahhangs = require('../../Controller/CuaHangController');

function CuaHang() {
    const [rows, setRows] = useState([]);
    const [disLuu, setDisLuu] = useState(true);
    const [disXoa, setDisXoa] = useState(true);
    const [disXetDuyet, setDisXetDuyet] = useState(true);
    const [xetDuyet, setXetDuyet] = useState([]);
    const [deletion, setDeletion] = useState([]);
    const [update, setUpdate] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);

    useEffect(() => {
        async function Get() {
            setRows(await Cuahhangs.GET());
        }
        Get();
    }, []);

    const handleOpenAlert = () => setOpenAlert(true);
    const handleCloseAlert = () => setOpenAlert(false);
    const handleDelete = () => {
        const table = [...rows];
        setDeletion(selectionModel);
        for (const ID of selectionModel) {
            for (var i = 0; i < table.length; i++) {
                if (table[i].id === ID) table.splice(i, 1);
            }
        }
        setRows(table);
        setDisLuu(false);
    };
    const handleXetDuyet = () => {
        const table = [...rows];
        setXetDuyet(selectionModel);
        for (const ID of selectionModel) {
            for (let i = 0; i < table.length; i++) {
                if (table[i].id === ID) table[i].col7 = 'Đã xét duyệt';
            }
        }
        setRows(table);
        setDisLuu(false);
        setDisXetDuyet(true);
    };

    const columns = [
        { field: 'id' },
        { field: 'col7', headerName: 'Trạng thái', width: 200 },
        { field: 'col1', headerName: 'Tên Cửa Hàng', width: 200 },
        { field: 'col2', headerName: 'Số điện thoại', width: 130 },
        { field: 'col3', headerName: 'Địa chỉ', width: 200 },
        { field: 'col4', headerName: 'Phường/Xã', width: 200 },
        { field: 'col5', headerName: 'Quận/Huyện', width: 150 },
        { field: 'col6', headerName: 'Tỉnh/TP', width: 200 },
    ];

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const alert = (
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity="success" sx={{ fontSize: '1.4rem', width: '100%' }}>
                Thay đổi thành công!
            </Alert>
        </Snackbar>
    );

    return (
        <div className={clsx(styles.table_container)}>
            <div className={clsx(styles.breadcrumbs)}>
                <Breadcrumbs sx={{ fontSize: '1.4rem' }}>
                    <Link underline="hover" color="inherit" href="/admin">
                        Dashboard
                    </Link>
                    <Typography sx={{ fontSize: '1.4rem' }} color="text.primary">
                        Cửa Hàng
                    </Typography>
                </Breadcrumbs>
            </div>
            <div className={clsx(styles.title)}>
                <p>Danh Sách Cửa Hàng</p>
            </div>
            <div className={clsx(styles.actions)}>
                <Button
                    onClick={async () => {
                        if (xetDuyet.length > 0) {
                            await Cuahhangs.XET_DUYET(xetDuyet);
                            setXetDuyet([]);
                        }
                        if (deletion.length > 0) {
                            await Cuahhangs.DELETE(deletion);
                            setDeletion([]);
                        }
                        if (update.length > 0) {
                            await Cuahhangs.UPDATE(update);
                            setUpdate([]);
                        }
                        setDisLuu(true);
                        handleOpenAlert();
                    }}
                    disabled={disLuu}
                    className={clsx(styles.btn_action)}
                    variant="contained"
                >
                    <SaveIcon sx={{ mr: '1rem', fontSize: '1.6rem' }} />
                    Lưu
                </Button>
                <Button
                    onClick={handleDelete}
                    disabled={disXoa}
                    className={clsx(styles.btn_action)}
                    variant="contained"
                    sx={{ mr: '1rem', bgcolor: '#d12525' }}
                >
                    <DeleteForeverIcon sx={{ mr: '1rem', fontSize: '1.6rem' }} />
                    Xóa
                </Button>
                <Button
                    onClick={handleXetDuyet}
                    disabled={disXetDuyet}
                    className={clsx(styles.btn_action)}
                    variant="contained"
                    sx={{ mr: '1rem', bgcolor: '#5ab249' }}
                >
                    <PriceCheckIcon sx={{ mr: '1rem', fontSize: '1.6rem' }} />
                    Duyệt
                </Button>
            </div>
            <DataGrid
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'id', sort: 'desc' }],
                    },
                }}
                columnVisibilityModel={{
                    id: false,
                }}
                sx={{ fontSize: '1.6rem' }}
                rows={rows}
                columns={columns}
                components={{ Toolbar: CustomToolbar }}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={async (newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                    if (newSelectionModel.length > 0) {
                        setDisXoa(false);
                        setDisXetDuyet(false);
                    } else {
                        setDisXoa(true);
                        setDisXetDuyet(true);
                    }
                }}
                selectionModel={selectionModel}
                onCellEditCommit={(value) => {
                    setDisLuu(false);
                    setUpdate(update.concat([value]));
                }}
            />
            {alert}
        </div>
    );
}

export default CuaHang;

import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useEffect, useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import styles from './VatPham.module.scss';
import SelectBox from '../../components/MiniPart/SelectBox';
import CustomToolbar from '../../components/MiniPart/CustomToolBar';
const Items = require('../../Controller/ItemsController');
const STORE = require('../../Controller/CuaHangController');

function VatPham() {
    const [disLuu, setDisLuu] = useState(true);
    const [disXoa, setDisXoa] = useState(true);
    const [disXetDuyet, setDisXetDuyet] = useState(true);
    const [stores, setStores] = useState([]);
    const [loais, setLoais] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [rows, setRows] = useState([]);
    const [xetDuyet, setXetDuyet] = useState([]);
    const [deletion, setDeletion] = useState([]);
    const [update, setUpdate] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);

    useEffect(() => {
        async function Get() {
            setRows(await Items.GET_ROWS_ITEM());
            setStores(await STORE.GET());
            setLoais(await Items.GET_LOAI());
            return;
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
                if (table[i].id === ID) table[i].col11 = '???? x??t duy???t';
            }
        }
        setRows(table);
        setDisLuu(false);
    };

    var columns = [
        { field: 'id' },
        { field: 'col11', headerName: 'Trang th??i', width: 150 },
        { field: 'col1', headerName: 'T??n V???t Ph???m', width: 200, editable: true },
        { field: 'col2', headerName: 'Gi?? B??n', width: 100, editable: true, align: 'right', headerAlign: 'right' },
        { field: 'col3', headerName: 'SL T???n Kho', width: 100, editable: true, align: 'right' },
        { field: 'col4', headerName: 'SL ???? B??n', width: 100, editable: true, align: 'right' },
        { field: 'col5', headerName: 'T??n C???a H??ng', width: 170 },
        { field: 'col6', headerName: 'Lo???i', width: 100 },
        { field: 'col7', headerName: 'K??ch th?????c', width: 150, editable: true },
        { field: 'col8', headerName: 'M??a s???c', width: 150, editable: true },
        { field: 'col9', headerName: 'Xu???t x???', width: 150, editable: true },
        { field: 'col10', headerName: 'M?? t???', width: 150, editable: true },
    ];

    var arrStore = [];
    for (const value of stores) {
        arrStore.push({ ID: value?.ID_STORE, VALUE: value?.TEN_STORE });
    }
    var arrLoai = [];
    for (const value of loais) {
        arrLoai.push({ ID: value?.LOAI_VATPHAM, VALUE: value?.TEN_LOAI });
    }

    const store = SelectBox('C???a H??ng', arrStore);
    const loai = SelectBox('Lo???i V???t Ph???m', arrLoai);
    if (!store || !loai) {
        return;
    }

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const alert = (
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity="success" sx={{ fontSize: '1.4rem', width: '100%' }}>
                Thay ?????i th??nh c??ng!
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
                        V???t ph???m
                    </Typography>
                </Breadcrumbs>
            </div>
            <div className={clsx(styles.title)}>
                <p>Danh S??ch V???t Ph???m</p>
            </div>
            <div className={clsx(styles.actions)}>
                {alert}
                <Button
                    onClick={async () => {
                        if (xetDuyet.length > 0) {
                            await Items.XET_DUYET(xetDuyet);
                            setXetDuyet([]);
                        }
                        if (deletion.length > 0) {
                            await Items.DELETE_ITEM(deletion);
                            setDeletion([]);
                        }
                        if (update.length > 0) {
                            await Items.UPDATE_ITEM(update);
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
                    L??u
                </Button>
                <Button
                    disabled={disXoa}
                    onClick={handleDelete}
                    className={clsx(styles.btn_action)}
                    variant="contained"
                    sx={{ mr: '1rem', bgcolor: '#d12525' }}
                >
                    <DeleteForeverIcon sx={{ mr: '1rem', fontSize: '1.6rem' }} />
                    X??a
                </Button>
                <Button
                    disabled={disXetDuyet}
                    onClick={handleXetDuyet}
                    className={clsx(styles.btn_action)}
                    variant="contained"
                    sx={{ width: '10rem', mr: '1rem', bgcolor: '#5ab249' }}
                >
                    <PriceCheckIcon sx={{ mr: '1rem', fontSize: '1.6rem' }} />
                    Duy???t
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
        </div>
    );
}

export default VatPham;

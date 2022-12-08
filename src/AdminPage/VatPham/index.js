import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useEffect, useState, forwardRef, useRef } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
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
    const [stores, setStores] = useState([]);
    const [loais, setLoais] = useState([]);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [tenvp, setTenvp] = useState('');
    const [giaban, setGiaban] = useState(0);
    const [soluong, setSoluong] = useState(0);
    const [mota, setMota] = useState('');
    const [newsize, setNewSize] = useState('');
    const [newcolor, setNewColor] = useState('');
    const [xuatxu, setXuatXu] = useState('');
    const [rows, setRows] = useState([]);
    const [creation, setCreation] = useState([]);
    const [deletion, setDeletion] = useState([]);
    const [update, setUpdate] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);
    const [file, setFile] = useState({});

    useEffect(() => {
        async function Get() {
            setRows(await Items.GET_ROWS_ITEM());
            setStores(await STORE.GET());
            setLoais(await Items.GET_LOAI());
            return;
        }
        Get();
    }, []);

    const fileInput = useRef(null);

    const handleOpenModalAdd = () => setOpenModalAdd(true);
    const handleCloseModalAdd = () => setOpenModalAdd(false);
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
    const handleChangeFile = (event) => {
        const url = event.target.files[0];
        url.review = URL.createObjectURL(url);
        setFile(url);
    };

    var columns = [
        { field: 'id' },
        { field: 'col1', headerName: 'Tên Vật Phẩm', width: 200, editable: true },
        { field: 'col2', headerName: 'Giá Bán', width: 100, editable: true, align: 'right', headerAlign: 'right' },
        { field: 'col3', headerName: 'SL Tồn Kho', width: 100, editable: true, align: 'right' },
        { field: 'col4', headerName: 'SL Đã Bán', width: 100, editable: true, align: 'right' },
        { field: 'col5', headerName: 'Tên Cửa Hàng', width: 170 },
        { field: 'col6', headerName: 'Loại', width: 100 },
        { field: 'col7', headerName: 'Kích thước', width: 150, editable: true },
        { field: 'col8', headerName: 'Mùa sắc', width: 150, editable: true },
        { field: 'col9', headerName: 'Xuất xứ', width: 150, editable: true },
        { field: 'col10', headerName: 'Mô tả', width: 150, editable: true },
    ];

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '60rem',
        height: '60rem',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    };
    var arrStore = [];
    for (const value of stores) {
        arrStore.push({ ID: value?.ID_STORE, VALUE: value?.TEN_STORE });
    }
    var arrLoai = [];
    for (const value of loais) {
        arrLoai.push({ ID: value?.LOAI_VATPHAM, VALUE: value?.TEN_LOAI });
    }

    const store = SelectBox('Cửa Hàng', arrStore);
    const loai = SelectBox('Loại Vật Phẩm', arrLoai);
    if (!store || !loai) {
        return;
    }

    const modal = (
        <Modal open={openModalAdd} onClose={handleCloseModalAdd}>
            <Box sx={styleModal}>
                <span className={clsx(styles.title_modal)}>Thêm Vật Phẩm</span>
                <div className={clsx(styles.flex_inline)}>
                    <div>
                        <span className={clsx(styles.label)}>Tên vật phẩm</span>
                        <br />
                        <TextField
                            sx={{ width: '35rem' }}
                            onChange={(e) => setTenvp(e.target.value)}
                            label="Tên vật phẩm"
                            variant="outlined"
                            spellCheck={false}
                        />
                    </div>
                    <div>
                        <span className={clsx(styles.label)}>Giá bán</span>
                        <br />
                        <TextField
                            sx={{ width: '15rem' }}
                            onChange={(e) => setGiaban(e.target.value)}
                            label="Giá bán (VNĐ)"
                            variant="outlined"
                        />
                    </div>
                </div>
                <div className={clsx(styles.flex_inline)}>
                    <div>
                        <span className={clsx(styles.label)}>Kích Thước</span>
                        <br />
                        <TextField
                            onChange={(e) => setNewSize(e.target.value)}
                            sx={{ width: '25rem' }}
                            label="Kích thước"
                            variant="outlined"
                            placeholder="S, M, L,..."
                            spellCheck={false}
                        />
                    </div>
                    <div>
                        <span className={clsx(styles.label)}>Màu Sắc</span>
                        <br />
                        <TextField
                            onChange={(e) => setNewColor(e.target.value)}
                            multiline
                            sx={{ width: '25rem' }}
                            maxRows={10}
                            label="Màu sắc"
                            variant="outlined"
                            placeholder="Trắng, Đen,..."
                            spellCheck={false}
                        />
                    </div>
                </div>
                <div className={clsx(styles.flex_inline)}>
                    <div>
                        <span className={clsx(styles.label)}>Thuộc cửa hàng</span>
                        <br />
                        {store}
                    </div>
                    <div>
                        <span className={clsx(styles.label)}>Thuộc loại</span>
                        <br />
                        {loai}
                    </div>
                </div>
                <div className={clsx(styles.flex_inline)}>
                    <div>
                        <span className={clsx(styles.label)}>Số lượng trong kho</span>
                        <br />
                        <TextField
                            onChange={(e) => setSoluong(e.target.value)}
                            sx={{ width: '25rem' }}
                            label="Số lượng trong kho"
                            spellCheck={false}
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <span className={clsx(styles.label)}>Mô tả</span>
                        <br />
                        <TextField
                            onChange={(e) => setMota(e.target.value)}
                            multiline
                            sx={{ width: '25rem' }}
                            maxRows={10}
                            spellCheck={false}
                            label="Mô tả"
                            variant="outlined"
                        />
                    </div>
                </div>
                <div className={clsx(styles.flex_inline)}>
                    <div>
                        <span className={clsx(styles.label)}>Xuất Xứ</span>
                        <br />
                        <TextField
                            onChange={(e) => setXuatXu(e.target.value)}
                            sx={{ width: '25rem' }}
                            label="Xuất xứ"
                            spellCheck={false}
                            variant="outlined"
                        />
                    </div>
                    <div style={{ width: '25rem' }}>
                        <span className={clsx(styles.label)}>Hình ảnh sản phẩm</span>
                        <br />
                        <input style={{ display: 'none' }} type="file" onChange={handleChangeFile} ref={fileInput} />
                        <Button
                            onClick={() => fileInput.current.click()}
                            sx={{ width: '10rem', height: '4rem', fontSize: '1.4rem', textTransform: 'capitalize' }}
                            variant="outlined"
                        >
                            Chọn ảnh
                        </Button>
                        <span className={clsx(styles.text_format)}>{file.name}</span>
                    </div>
                </div>
                <div className={clsx(styles.action_add, styles.flex_inline)}>
                    <Button
                        onClick={() => {
                            const add = {
                                id: rows[rows.length - 1].id + 1,
                                col1: tenvp,
                                col2: giaban,
                                col3: soluong,
                                col4: 0,
                                col5: store.props.children[1].props.value,
                                col6: loai.props.children[1].props.id,
                                col7: newsize,
                                col8: newcolor,
                                col9: xuatxu,
                                col10: mota,
                            };
                            const create = {
                                TEN_VATPHAM: tenvp,
                                GIABAN: Number(giaban),
                                SOLUONG_TONKHO: Number(soluong),
                                CUAHANG: Number(store.props.children[1].props.id),
                                MOTA_VATPHAM: mota,
                                LOAI: loai.props.children[1].props.id,
                                XUATXU: xuatxu,
                                COLOR: newcolor,
                                SIZE: newsize,
                            };
                            setRows(rows.concat([add]));
                            setCreation(creation.concat([create]));
                            setDisLuu(false);
                            handleCloseModalAdd();
                        }}
                        className={clsx(styles.btn_action)}
                        variant="contained"
                    >
                        <SaveIcon sx={{ mr: '1rem', fontSize: '1.6rem' }} />
                        Thêm
                    </Button>
                    <Button
                        onClick={handleCloseModalAdd}
                        className={clsx(styles.btn_action)}
                        sx={{ mr: '1rem', bgcolor: '#d12525' }}
                        variant="contained"
                    >
                        <CloseIcon sx={{ mr: '1rem', fontSize: '1.6rem' }} />
                        Hủy
                    </Button>
                </div>
            </Box>
        </Modal>
    );

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
                        Vật phẩm
                    </Typography>
                </Breadcrumbs>
            </div>
            <div className={clsx(styles.title)}>
                <p>Danh Sách Vật Phẩm</p>
            </div>
            <div className={clsx(styles.actions)}>
                {modal}
                {alert}
                <Button
                    onClick={async () => {
                        if (creation.length > 0) {
                            await Items.CREATE_ITEM(creation);
                            setCreation([]);
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
                    Lưu
                </Button>
                <Button
                    disabled={disXoa}
                    onClick={handleDelete}
                    className={clsx(styles.btn_action)}
                    variant="contained"
                    sx={{ mr: '1rem', bgcolor: '#d12525' }}
                >
                    <DeleteForeverIcon sx={{ mr: '1rem', fontSize: '1.6rem' }} />
                    Xóa
                </Button>
                <Button
                    onClick={handleOpenModalAdd}
                    className={clsx(styles.btn_action)}
                    variant="contained"
                    sx={{ mr: '1rem', bgcolor: '#5ab249' }}
                >
                    <AddIcon sx={{ mr: '1rem', fontSize: '1.6rem' }} />
                    Thêm
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
                    } else {
                        setDisXoa(true);
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

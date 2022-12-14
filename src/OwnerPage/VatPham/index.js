import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useEffect, useState, forwardRef, useRef } from 'react';
import { useParams } from 'react-router-dom';
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
    const [file, setFile] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        async function Get() {
            setRows(await Items.GET_ROWS_ITEM(id));
            setLoais(await Items.GET_LOAI());
            return;
        }
        Get();
    }, [id]);

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
        const arrFile = file;
        arrFile.push(url);
        setFile([...arrFile]);
    };

    var columns = [
        { field: 'id' },
        { field: 'col10', headerName: 'Tr???ng th??i', width: 120 },
        { field: 'col1', headerName: 'T??n V???t Ph???m', width: 200, editable: true },
        { field: 'col2', headerName: 'Gi?? B??n', width: 100, editable: true, align: 'right', headerAlign: 'right' },
        { field: 'col3', headerName: 'SL T???n Kho', width: 100, editable: true, align: 'right' },
        { field: 'col4', headerName: 'SL ???? B??n', width: 100, align: 'right' },
        { field: 'col5', headerName: 'Lo???i', width: 70 },
        { field: 'col6', headerName: 'K??ch th?????c', width: 150, editable: true },
        { field: 'col7', headerName: 'M??a s???c', width: 150, editable: true },
        { field: 'col8', headerName: 'Xu???t x???', width: 150, editable: true },
        { field: 'col9', headerName: 'M?? t???', width: 150, editable: true },
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
    var arrLoai = [];
    for (const value of loais) {
        arrLoai.push({ ID: value?.LOAI_VATPHAM, VALUE: value?.TEN_LOAI });
    }

    const loai = SelectBox('Lo???i V???t Ph???m', arrLoai);
    if (!loai) {
        return;
    }

    let filename = '';
    for (const value of file) {
        filename += value.name + ' ';
    }

    const modal = (
        <Modal open={openModalAdd} onClose={handleCloseModalAdd}>
            <Box sx={styleModal}>
                <span className={clsx(styles.title_modal)}>Th??m V???t Ph???m</span>
                <div className={clsx(styles.flex_inline)}>
                    <div>
                        <span className={clsx(styles.label)}>
                            T??n v???t ph???m<span className={clsx(styles.required)}>*</span>
                        </span>
                        <br />
                        <TextField
                            sx={{ width: '35rem' }}
                            onChange={(e) => setTenvp(e.target.value)}
                            label="T??n v???t ph???m"
                            variant="outlined"
                            spellCheck={false}
                        />
                    </div>
                    <div>
                        <span className={clsx(styles.label)}>
                            Gi?? b??n<span className={clsx(styles.required)}>*</span>
                        </span>
                        <br />
                        <TextField
                            sx={{ width: '15rem' }}
                            onChange={(e) => setGiaban(e.target.value)}
                            label="Gi?? b??n (VN??)"
                            variant="outlined"
                        />
                    </div>
                </div>
                <div className={clsx(styles.flex_inline)}>
                    <div>
                        <span className={clsx(styles.label)}>
                            K??ch Th?????c<span className={clsx(styles.required)}>*</span>
                        </span>
                        <br />
                        <TextField
                            onChange={(e) => setNewSize(e.target.value)}
                            sx={{ width: '25rem' }}
                            label="K??ch th?????c"
                            variant="outlined"
                            placeholder="S, M, L,..."
                            spellCheck={false}
                        />
                    </div>
                    <div>
                        <span className={clsx(styles.label)}>
                            M??u S???c<span className={clsx(styles.required)}>*</span>
                        </span>
                        <br />
                        <TextField
                            onChange={(e) => setNewColor(e.target.value)}
                            multiline
                            sx={{ width: '25rem' }}
                            maxRows={10}
                            label="M??u s???c"
                            variant="outlined"
                            placeholder="Tr???ng, ??en,..."
                            spellCheck={false}
                        />
                    </div>
                </div>
                <div className={clsx(styles.flex_inline)}>
                    <div>
                        <span className={clsx(styles.label)}>
                            Thu???c lo???i<span className={clsx(styles.required)}>*</span>
                        </span>
                        <br />
                        {loai}
                    </div>
                    <div>
                        <span className={clsx(styles.label)}>
                            S??? l?????ng trong kho<span className={clsx(styles.required)}>*</span>
                        </span>
                        <br />
                        <TextField
                            onChange={(e) => setSoluong(e.target.value)}
                            sx={{ width: '25rem' }}
                            label="S??? l?????ng trong kho"
                            spellCheck={false}
                            variant="outlined"
                        />
                    </div>
                </div>
                <div className={clsx(styles.flex_inline)}>
                    <div>
                        <span className={clsx(styles.label)}>M?? t???</span>
                        <br />
                        <TextField
                            onChange={(e) => setMota(e.target.value)}
                            multiline
                            sx={{ width: '25rem' }}
                            maxRows={10}
                            spellCheck={false}
                            label="M?? t???"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <span className={clsx(styles.label)}>Xu???t X???</span>
                        <br />
                        <TextField
                            onChange={(e) => setXuatXu(e.target.value)}
                            sx={{ width: '25rem' }}
                            label="Xu???t x???"
                            spellCheck={false}
                            variant="outlined"
                        />
                    </div>
                </div>

                <div style={{ width: '100%' }}>
                    <span className={clsx(styles.label)}>H??nh ???nh s???n ph???m</span>
                    <br />
                    <input
                        style={{ display: 'none' }}
                        name="file"
                        type="file"
                        onChange={handleChangeFile}
                        ref={fileInput}
                    />
                    <Button
                        onClick={() => fileInput.current.click()}
                        sx={{ width: '10rem', height: '4rem', fontSize: '1.4rem', textTransform: 'capitalize' }}
                        variant="outlined"
                    >
                        Ch???n ???nh
                    </Button>
                    <span className={clsx(styles.text_format)}>{filename}</span>
                </div>
                <div className={clsx(styles.action_add, styles.flex_inline)}>
                    <Button
                        onClick={async () => {
                            const add = {
                                id: rows[rows.length - 1].id + 1,
                                col1: tenvp,
                                col2: Number(giaban).toLocaleString('en-US'),
                                col3: soluong,
                                col4: 0,
                                col5: loai.props.children[1].props.id,
                                col6: newsize,
                                col7: newcolor,
                                col8: xuatxu,
                                col9: mota,
                                col10: 'Ch??? x??t duy???t',
                            };
                            let TEN_Hinhanh = [];
                            for (let value of file) {
                                TEN_Hinhanh.push(value.name);
                            }
                            const create = {
                                TEN_VATPHAM: tenvp,
                                GIABAN: Number(giaban),
                                SOLUONG_TONKHO: Number(soluong),
                                CUAHANG: (await STORE.GET_IDKH(id)).ID_STORE,
                                MOTA_VATPHAM: mota,
                                LOAI: loai.props.children[1].props.id,
                                XUATXU: xuatxu,
                                COLOR: newcolor,
                                SIZE: newsize,
                                TEN_HINHANH: TEN_Hinhanh,
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
                        Th??m
                    </Button>
                    <Button
                        onClick={handleCloseModalAdd}
                        className={clsx(styles.btn_action)}
                        sx={{ mr: '1rem', bgcolor: '#d12525' }}
                        variant="contained"
                    >
                        <CloseIcon sx={{ mr: '1rem', fontSize: '1.6rem' }} />
                        H???y
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
                {modal}
                {alert}
                <Button
                    onClick={async () => {
                        if (creation.length > 0) {
                            console.log(creation);
                            await Items.CREATE_ITEM(creation);
                            for (let value of file) {
                                let formData = new FormData();
                                formData.append('file', value);
                                await Items.ADD_FILE(formData);
                            }
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
                    onClick={handleOpenModalAdd}
                    className={clsx(styles.btn_action)}
                    variant="contained"
                    sx={{ mr: '1rem', bgcolor: '#5ab249' }}
                >
                    <AddIcon sx={{ mr: '1rem', fontSize: '1.6rem' }} />
                    Th??m
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

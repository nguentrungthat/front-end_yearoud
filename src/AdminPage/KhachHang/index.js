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
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from './KhachHang.module.scss';

const Khachhangs = require('../../Controller/KhachHangController');

function KhachHang() {
    const [disXoa, setDisXoa] = useState(true);
    const [disLuu, setDisLuu] = useState(true);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [date, setDate] = useState(new Date());
    const [checkRadio, setCheckRadio] = useState(1);
    const [ten, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [diachi, setDiachi] = useState('');
    const [sdt, setSDT] = useState('');
    const [rows, setRows] = useState([]);
    const [creation, setCreation] = useState([]);
    const [deletion, setDeletion] = useState([]);
    const [update, setUpdate] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);

    useEffect(() => {
        async function Get() {
            setRows(await Khachhangs.GET_ROWS());
        }
        Get();
    }, []);

    const handleChangeRadio = (event) => {
        setCheckRadio(event.target.value);
    };
    const handleOpenModalAdd = () => setOpenModalAdd(true);
    const handleCloseModalAdd = () => setOpenModalAdd(false);
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
        padding: '3rem 5rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    };

    var columns = [
        { field: 'id' },
        { field: 'col1', headerName: 'Tên Khách Hàng', width: 250, editable: true },
        { field: 'col2', headerName: 'Ngày Sinh', width: 150, editable: true },
        { field: 'col3', headerName: 'Giới Tính', width: 100, editable: true },
        { field: 'col4', headerName: 'Số Điện Thoại', width: 150, editable: true },
        { field: 'col5', headerName: 'Địa Chỉ', width: 200, editable: true },
        { field: 'col6', headerName: 'E-mail', width: 200, editable: true },
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
                <Button
                    onClick={async () => {
                        if (creation.length > 0) {
                            await Khachhangs.CREATE(creation);
                            setCreation([]);
                        }
                        if (update.length > 0) {
                            await Khachhangs.UPDATE(update);
                            setUpdate([]);
                        }
                        if (deletion.length > 0) {
                            await Khachhangs.DELETE(deletion);
                            setDeletion([]);
                        }
                        setDisLuu(true);
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
                sx={{ fontSize: '1.6rem' }}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'id', sort: 'desc' }],
                    },
                }}
                columnVisibilityModel={{
                    id: false,
                }}
                rows={rows}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
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
            <Modal open={openModalAdd} onClose={handleCloseModalAdd}>
                <Box sx={styleModal}>
                    <span className={clsx(styles.title_modal)}>Thêm Khách Hàng</span>
                    <span className={clsx(styles.label)}>Tên Khách Hàng</span>
                    <TextField onChange={(e) => setTen(e.target.value)} label="Tên khách hàng" variant="outlined" />
                    <div className={clsx(styles.flex_inline)}>
                        <div>
                            <span className={clsx(styles.label)}>Email</span>
                            <br />
                            <TextField
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ width: '25rem' }}
                                label="Email"
                                variant="outlined"
                            />
                        </div>
                        <div style={{ marginLeft: '1.5rem' }}>
                            <FormControl>
                                <FormLabel>Giới tính</FormLabel>
                                <RadioGroup row value={checkRadio} onChange={handleChangeRadio}>
                                    <FormControlLabel
                                        sx={{
                                            '& .MuiFormControlLabel-label': {
                                                fontSize: 16,
                                            },
                                        }}
                                        value={1}
                                        control={
                                            <Radio
                                                sx={{
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 22,
                                                    },
                                                }}
                                            />
                                        }
                                        label="Nam"
                                    />
                                    <FormControlLabel
                                        sx={{
                                            '& .MuiFormControlLabel-label': {
                                                fontSize: 16,
                                            },
                                        }}
                                        value={2}
                                        control={
                                            <Radio
                                                sx={{
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 22,
                                                    },
                                                }}
                                            />
                                        }
                                        label="Nữ"
                                    />
                                    <FormControlLabel
                                        sx={{
                                            '& .MuiFormControlLabel-label': {
                                                fontSize: 16,
                                            },
                                        }}
                                        value={3}
                                        control={
                                            <Radio
                                                sx={{
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 22,
                                                    },
                                                }}
                                            />
                                        }
                                        label="Khác"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                    <span className={clsx(styles.label)}>Địa Chỉ</span>
                    <TextField onChange={(e) => setDiachi(e.target.value)} label="Địa chỉ" variant="outlined" />
                    <div className={clsx(styles.flex_inline)}>
                        <div>
                            <span className={clsx(styles.label)}>Số Điện Thoại</span>
                            <TextField
                                onChange={(e) => setSDT(e.target.value)}
                                sx={{ width: '25rem' }}
                                label="Số điện thoại"
                                variant="outlined"
                            />
                        </div>
                        <div className={clsx(styles.date)}>
                            <span className={clsx(styles.label)}>Ngày Sinh</span>
                            <LocalizationProvider sx={{ width: '100%' }} dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    inputProps={{ style: { fontSize: '1.2rem' } }}
                                    value={date}
                                    inputFormat="DD/MM/YYYY"
                                    onChange={(newValue) => {
                                        setDate(`${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className={clsx(styles.action_add, styles.flex_inline)}>
                        <Button
                            onClick={async () => {
                                var gioitinh = '';
                                if (checkRadio === 1) {
                                    gioitinh = 'Nam';
                                } else if (checkRadio === 2) {
                                    gioitinh = 'Nữ';
                                } else {
                                    gioitinh = 'Không rõ';
                                }
                                const row = {
                                    id: rows[rows.length - 1].id + 1,
                                    col1: ten,
                                    col2: new Date(date).toLocaleString('en-GB', { timeZone: 'UTC' }).slice(0, 10),
                                    col3: gioitinh,
                                    col4: sdt,
                                    col5: diachi,
                                    col6: email,
                                };
                                const kh = {
                                    TEN_KHACHHANG: ten,
                                    EMAIL: email,
                                    SDT: sdt,
                                    DIACHI: diachi,
                                    GIOITINH: checkRadio,
                                    NGAYSINH: new Date(date).toISOString().slice(0, 10),
                                    NGAYTAO: new Date().toISOString().slice(0, 10),
                                };
                                setRows(rows.concat([row]));
                                setCreation(creation.concat([kh]));
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
        </div>
    );
}

export default KhachHang;

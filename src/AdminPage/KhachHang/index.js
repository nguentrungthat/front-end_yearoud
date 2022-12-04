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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from './KhachHang.module.scss';

const Khachhangs = require('../../Controller/KhachHangController');

function KhachHang() {
    const [khachhangs, setKhachhangs] = useState([]);
    const [disXoa, setDisXoa] = useState(true);
    const [disLuu, setDisLuu] = useState(true);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        async function Get() {
            setKhachhangs(await Khachhangs.GET());
            setDisXoa(true);
            setDisLuu(true);
        }
        Get();
    }, []);

    const handleOpenModalAdd = () => setOpenModalAdd(true);
    const handleCloseModalAdd = () => setOpenModalAdd(false);

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
                rows={rows}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                checkboxSelection
                disableSelectionOnClick
            />
            <Modal open={openModalAdd} onClose={handleCloseModalAdd}>
                <Box sx={styleModal}>
                    <span className={clsx(styles.title_modal)}>Thêm Khách Hàng</span>
                    <span className={clsx(styles.label)}>Tên Khách Hàng</span>
                    <TextField label="Tên khách hàng" variant="outlined" />
                    <span className={clsx(styles.label)}>Email</span>
                    <TextField label="Email" variant="outlined" />
                    <span className={clsx(styles.label)}>Địa Chỉ</span>
                    <TextField label="Địa chỉ" variant="outlined" />
                    <div className={clsx(styles.flex_inline)}>
                        <div>
                            <span className={clsx(styles.label)}>Số Điện Thoại</span>
                            <TextField sx={{ width: '25rem' }} label="Số điện thoại" variant="outlined" />
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
                        <Button className={clsx(styles.btn_action)} variant="contained">
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

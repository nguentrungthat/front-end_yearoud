import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import styles from './CuaHang.module.scss';
import { SelectProvince, SelectDistrict, SelectCommune } from 'vn-ad';

const Cuahhangs = require('../../Controller/CuaHangController');

function CuaHang() {
    const [cuahangs, setCuahhangs] = useState([]);
    const [disXoa, setDisXoa] = useState(true);
    const [disLuu, setDisLuu] = useState(true);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [tinh, setTinh] = useState('');
    const [huyen, setHuyen] = useState('');
    const [xa, setXa] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        async function Get() {
            setCuahhangs(await Cuahhangs.GET());
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
        width: '90rem',
        height: '50rem',
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
            />
            <Modal open={openModalAdd} onClose={handleCloseModalAdd}>
                <Box sx={styleModal}>
                    <span className={clsx(styles.title_modal)}>Thêm Cửa Hàng</span>
                    <div className={clsx(styles.flex_inline)}>
                        <div className={clsx(styles.flex_column)}>
                            <span className={clsx(styles.label)}>Tên Cửa Hàng</span>
                            <TextField label="Tên cửa hàng" variant="outlined" />
                            <span className={clsx(styles.label)}>Số Điện Thoại</span>
                            <TextField label="Số điện thoại" variant="outlined" />
                            <span className={clsx(styles.label)}>Email</span>
                            <TextField label="Email" variant="outlined" />
                        </div>
                        <div className={clsx(styles.flex_column)}>
                            <SelectProvince className={clsx(styles.selectbox)} value={tinh} onChange={setTinh} />
                            <SelectDistrict
                                className={clsx(styles.selectbox)}
                                value={huyen}
                                province={tinh}
                                onChange={setHuyen}
                            />
                            <SelectCommune
                                className={clsx(styles.selectbox)}
                                value={xa}
                                district={huyen}
                                onChange={setXa}
                            />
                            <TextField
                                className={clsx(styles.textfield)}
                                label="Địa chỉ cụ thể"
                                rows={3}
                                multiline
                                variant="filled"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                inputProps={{ style: { width: '23rem', fontSize: '1.6rem', paddingTop: '1rem' } }}
                                InputLabelProps={{ style: { fontSize: '1.6rem' } }}
                                spellCheck={false}
                            />
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

export default CuaHang;

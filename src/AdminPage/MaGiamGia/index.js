import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useEffect, useState, useMemo, forwardRef } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import Switch from '@mui/material/Switch';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import styles from './MaGiamGia.module.scss';
import CustomToolbar from '../../components/MiniPart/CustomToolBar';

const MGG = require('../../Controller/MaGiamGiaController');

function MaGiamGia() {
    const [mgg, setMGG] = useState([]);
    const [checked, setChecked] = useState([]);
    const [disXoa, setDisXoa] = useState(true);
    const [disLuu, setDisLuu] = useState(true);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [newMgg, setNewMgg] = useState('');
    const [giatrigiam, setGiatrigiam] = useState('');
    const [active, setActive] = useState(true);
    const [batdau, setBatDau] = useState(new Date());
    const [ketthuc, setKetThuc] = useState(new Date());
    const [creation, setCreation] = useState([]);
    const [deletion, setDeletion] = useState([]);
    const [update, setUpdate] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);

    useEffect(() => {
        async function Get() {
            setMGG((await MGG.GET())[0]);
        }
        Get();
    }, []);

    useMemo(() => {
        async function Get() {
            setChecked((await MGG.GET())[1]);
        }
        Get();
    }, []);

    const handleOpenAlert = () => setOpenAlert(true);
    const handleCloseAlert = () => setOpenAlert(false);
    const handleOpenModalAdd = () => setOpenModalAdd(true);
    const handleCloseModalAdd = () => setOpenModalAdd(false);
    const handleDelete = () => {
        const table = [...mgg];
        setDeletion(selectionModel);
        for (const ID of selectionModel) {
            for (var i = 0; i < table.length; i++) {
                if (table[i].id === ID) table.splice(i, 1);
            }
        }
        setMGG(table);
        setDisLuu(false);
    };

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '50rem',
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

    var columns = [
        { field: 'id' },
        { field: 'col1', headerName: 'M?? Gi???m Gi??', width: 200, editable: true },
        { field: 'col2', headerName: 'Th???i Gian B???t ?????u', width: 200, editable: true },
        { field: 'col3', headerName: 'Th???i Gian K???t Th??c', width: 200, editable: true },
        { field: 'col4', headerName: 'Gi?? Tr??? Gi???m', width: 150, editable: true },
        {
            field: 'col5',
            headerName: 'K??ch Ho???t',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Switch
                            checked={checked[params.row.index]}
                            onChange={() => {
                                const index = params.row.index;
                                let arrCheck = checked;
                                arrCheck[index] = !checked[index];
                                let isExist = 0;
                                let isActive = 1;
                                if (!arrCheck[index]) isActive = 0;
                                for (let i = 0; i < update.length; i++) {
                                    if (update[i].id === params.row.id) {
                                        let updated = update;
                                        updated[i].value = isActive;
                                        setUpdate([...updated]);
                                        isExist = 1;
                                    }
                                }
                                if (isExist === 0) {
                                    const value = {
                                        id: params.row.id,
                                        field: 'col5',
                                        value: isActive,
                                    };
                                    setUpdate(update.concat([value]));
                                }
                                setChecked([...arrCheck]);
                                setDisLuu(false);
                            }}
                        />
                    </>
                );
            },
        },
    ];

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
                        M?? Gi???m Gi??
                    </Typography>
                </Breadcrumbs>
            </div>
            <div className={clsx(styles.title)}>
                <p>Danh S??ch M?? Gi???m Gi??</p>
            </div>
            <div className={clsx(styles.actions)}>
                <Button
                    onClick={async () => {
                        if (creation.length > 0) {
                            console.log(creation);
                            await MGG.CREATE(creation);
                            setCreation([]);
                        }
                        if (update.length > 0) {
                            console.log(update);
                            await MGG.UPDATE(update);
                            setUpdate([]);
                        }
                        if (deletion.length > 0) {
                            console.log(deletion);
                            await MGG.DELETE(deletion);
                            setDeletion([]);
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
                    onClick={handleDelete}
                    disabled={disXoa}
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
                sx={{ fontSize: '1.6rem' }}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'id', sort: 'desc' }],
                    },
                }}
                columnVisibilityModel={{
                    id: false,
                }}
                rows={mgg}
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
            <Modal open={openModalAdd} onClose={handleCloseModalAdd}>
                <Box sx={styleModal}>
                    <span className={clsx(styles.title_modal)}>Th??m M?? Gi???m gi??</span>
                    <span className={clsx(styles.label)}>M?? Gi???m Gi??</span>
                    <TextField onChange={(e) => setNewMgg(e.target.value)} label="M?? gi???m gi??" variant="outlined" />
                    <div className={clsx(styles.flex_inline)}>
                        <div>
                            <span className={clsx(styles.label)}>Gi?? Tr??? Gi???m (%)</span>
                            <TextField
                                onChange={(e) => setGiatrigiam(e.target.value)}
                                sx={{ width: '80%' }}
                                label="Gi?? tr??? gi???m"
                                variant="outlined"
                            />
                        </div>
                        <div>
                            <span className={clsx(styles.label)}>K??ch ho???t</span>
                            <Switch checked={active} onChange={() => setActive(!active)} />
                        </div>
                    </div>
                    <div className={clsx(styles.flex_inline)}>
                        <div className={clsx(styles.date)}>
                            <span className={clsx(styles.label)}>Ng??y B???t ?????u</span>
                            <LocalizationProvider sx={{ width: '100%' }} dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    inputProps={{ style: { fontSize: '1.2rem' } }}
                                    value={batdau}
                                    inputFormat="DD/MM/YYYY"
                                    onChange={(newValue) => {
                                        setBatDau(`${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className={clsx(styles.date)}>
                            <span className={clsx(styles.label)}>Ng??y K???t Th??c</span>
                            <LocalizationProvider sx={{ width: '100%' }} dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    inputProps={{ style: { fontSize: '1.2rem' } }}
                                    value={ketthuc}
                                    inputFormat="DD/MM/YYYY"
                                    onChange={(newValue) => {
                                        setKetThuc(`${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className={clsx(styles.action_add, styles.flex_inline)}>
                        <Button
                            onClick={() => {
                                const data = {
                                    id: mgg[mgg.length - 1].id + 1,
                                    col1: newMgg,
                                    col2: new Date(batdau).toLocaleString('en-GB').slice(0, 10),
                                    col3: new Date(ketthuc).toLocaleString('en-GB').slice(0, 10),
                                    col4: giatrigiam + '%',
                                    col5: active,
                                    index: mgg[mgg.length - 1].index + 1,
                                };
                                let isActive = 1;
                                if (!active) isActive = 0;
                                const ma = {
                                    MAGIAMGIA: newMgg,
                                    TG_BATDAU: batdau,
                                    TG_KETTHUC: ketthuc,
                                    GIATRI_GIAM: giatrigiam / 100,
                                    ACTIVE: isActive,
                                };
                                setChecked(checked.concat(active));
                                setCreation(creation.concat([ma]));
                                setMGG(mgg.concat(data));
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
            {alert}
        </div>
    );
}

export default MaGiamGia;

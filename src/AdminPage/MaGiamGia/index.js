import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useEffect, useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import Switch from '@mui/material/Switch';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import styles from './MaGiamGia.module.scss';

const MGG = require('../../Controller/MaGiamGiaController');

function MaGiamGia() {
    const [mgg, setMGG] = useState([]);
    const [checked, setChecked] = useState([]);
    const [disXoa, setDisXoa] = useState(true);
    const [disLuu, setDisLuu] = useState(true);

    useEffect(() => {
        async function Get() {
            setMGG(await MGG.GET());
            setDisXoa(true);
            setDisLuu(true);
        }
        Get();
    }, []);

    useMemo(() => {
        let arrCheck = [];
        let index = 0;
        for (const code of mgg) {
            let check = true;
            if (code.ACTIVE === 0) check = false;
            arrCheck.push(check);
            code.index = index;
            index++;
        }
        setChecked(arrCheck);
    }, [mgg]);

    var rows = [];
    for (const code of mgg) {
        var row = {
            id: code.ID_MGG,
            col1: code.MAGIAMGIA,
            col2: new Date(code.TG_BATDAU).toLocaleString('en-GB', { timeZone: 'UTC' }).slice(0, 10),
            col3: new Date(code.TG_KETTHUC).toLocaleString('en-GB', { timeZone: 'UTC' }).slice(0, 10),
            col4: code.GIATRI_GIAM * 100 + '%',
            col5: code,
        };
        rows.push(row);
    }
    var columns = [
        { field: 'col1', headerName: 'Mã Giảm Giá', width: 200 },
        { field: 'col2', headerName: 'Thời Gian Bắt Đầu', width: 200 },
        { field: 'col3', headerName: 'Thời Gian Kết Thúc', width: 200 },
        { field: 'col4', headerName: 'Giá Trị Giảm', width: 150 },
        {
            field: 'col5',
            headerName: 'Kích Hoạt',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Switch
                            checked={checked[params.formattedValue.index]}
                            onChange={() => {
                                const code = params.formattedValue;
                                let arrCheck = checked;
                                arrCheck[code.index] = !checked[code.index];
                                setChecked([...arrCheck]);
                            }}
                        />
                    </>
                );
            },
        },
    ];
    return (
        <div className={clsx(styles.table_container)}>
            <div className={clsx(styles.breadcrumbs)}>
                <Breadcrumbs sx={{ fontSize: '1.4rem' }}>
                    <Link underline="hover" color="inherit" href="/admin">
                        Dashboard
                    </Link>
                    <Typography sx={{ fontSize: '1.4rem' }} color="text.primary">
                        Mã Giảm Giá
                    </Typography>
                </Breadcrumbs>
            </div>
            <div className={clsx(styles.title)}>
                <p>Danh Sách Mã Giảm Giá</p>
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
                disableSelectionOnClick
            />
        </div>
    );
}

export default MaGiamGia;

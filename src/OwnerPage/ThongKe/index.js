import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import styles from './ThongKe.module.scss';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
const TK = require('../../Controller/ThongKeController');

function ThongKe() {
    const [thongke, setThongke] = useState([]);
    const [thongkeVP, setThongkeVP] = useState([]);
    const [checkRadio, setCheckRadio] = useState('dm');
    const [dateStart, setDateStart] = useState('2022-11-01');
    const [dateEnd, setDateEnd] = useState('2022-11-30');
    const [value, setValue] = useState('');
    const [idLoai, setIDLoai] = useState('');

    const { id } = useParams();

    useEffect(() => {
        async function Get() {
            setThongke(await TK.GET({ FROM: dateStart, TO: dateEnd, LOAI: idLoai, ID_KHACHHANG: id }));
            setThongkeVP(await TK.GET_VP({ FROM: dateStart, TO: dateEnd, LOAI: idLoai, ID_KHACHHANG: id }));
            return;
        }
        Get();
    }, [dateStart, dateEnd, idLoai, id]);

    const handleChangeRadio = (event) => {
        setCheckRadio(event.target.value);
    };
    const handleChangeSelect = (event, name) => {
        setValue(event.target.value);
        setIDLoai(name.props.id);
    };

    const elm = [
        { ID: 'LA', VALUE: 'Loại Áo' },
        { ID: 'LQ', VALUE: 'Loại Quần' },
        { ID: 'LG', VALUE: 'Loại Giày' },
        { ID: 'LPK', VALUE: 'Loại Phụ Kiện' },
    ];

    const select = elm.map((value, index) => (
        <MenuItem id={value.ID} sx={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} key={index} value={value.VALUE}>
            {value.VALUE}
        </MenuItem>
    ));

    let rows = [];
    let columns = [];
    let index = 0;
    if (checkRadio === 'dm') {
        for (const value of thongke) {
            let row = {
                id: value.ID_DONMUACT,
                col1: value.TEN_KHACHHANG,
                col2: value.TEN_VATPHAM,
                col3: value.TEN_STORE,
                col4: Number(value.SOLUONGVP),
                col5: Number(value.TONGTIEN),
                col6: new Date(value.NGAYTHANG).toLocaleString('en-GB', { timeZone: 'UTC' }).slice(0, 10),
                col7: new Date(value.NGAYGIAO).toLocaleString('en-GB', { timeZone: 'UTC' }).slice(0, 10),
            };
            rows.push(row);
        }
        columns = [
            { field: 'col1', headerName: 'Tên Khách Hàng', width: 200 },
            { field: 'col2', headerName: 'Tên Vật Phẩm', width: 200 },
            { field: 'col3', headerName: 'Tên Cửa Hàng', width: 150, align: 'left' },
            { field: 'col4', headerName: 'Số Lượng', type: 'number', width: 100, align: 'right', headerAlign: 'right' },
            {
                field: 'col5',
                headerName: 'Tổng tiền',
                type: 'number',
                width: 150,
                align: 'right',
                headerAlign: 'right',
            },
            { field: 'col6', headerName: 'Ngày Đặt', width: 170, align: 'right', headerAlign: 'right' },
            { field: 'col7', headerName: 'Ngày Giao', width: 170, align: 'right', headerAlign: 'right' },
        ];
    } else {
        for (const value of thongkeVP) {
            let row = {
                id: index,
                col1: value.TEN_VATPHAM,
                col2: value.TEN_STORE,
                col3: value.SOLUONG,
            };
            rows.push(row);
            index++;
        }
        columns = [
            { field: 'col1', headerName: 'Tên Vật Phẩm', width: 250 },
            { field: 'col2', headerName: 'Tên Cửa Hàng', width: 200 },
            { field: 'col3', headerName: 'Số Lượng', type: 'number', width: 150, align: 'right', headerAlign: 'right' },
        ];
    }

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
            <div className={clsx(styles.actions)}>
                <FormControl>
                    <FormLabel>Loại thống kê</FormLabel>
                    <RadioGroup row value={checkRadio} onChange={handleChangeRadio}>
                        <FormControlLabel
                            sx={{
                                '& .MuiFormControlLabel-label': {
                                    fontSize: 16,
                                },
                            }}
                            value="dm"
                            control={
                                <Radio
                                    sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 22,
                                        },
                                    }}
                                />
                            }
                            label="Đơn mua"
                        />
                        <FormControlLabel
                            sx={{
                                '& .MuiFormControlLabel-label': {
                                    fontSize: 16,
                                },
                            }}
                            value="vp"
                            control={
                                <Radio
                                    sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 22,
                                        },
                                    }}
                                />
                            }
                            label="Vật phẩm"
                        />
                    </RadioGroup>
                </FormControl>
                <div className={clsx(styles.date)}>
                    <LocalizationProvider sx={{ width: '100%' }} dateAdapter={AdapterDayjs}>
                        <DatePicker
                            inputProps={{ style: { fontSize: '1.2rem' } }}
                            label="Từ ngày"
                            value={dateStart}
                            inputFormat="DD/MM/YYYY"
                            onChange={(newValue) => {
                                setDateStart(`${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <div className={clsx(styles.date)}>
                    <LocalizationProvider sx={{ width: '100%' }} dateAdapter={AdapterDayjs}>
                        <DatePicker
                            inputProps={{ style: { fontSize: '1.2rem' } }}
                            label="Đến ngày"
                            value={dateEnd}
                            inputFormat="DD/MM/YYYY"
                            onChange={(newValue) => {
                                setDateEnd(`${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <FormControl sx={{ width: 250 }}>
                    <InputLabel sx={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}>Chọn Loại Vật Phẩm *</InputLabel>
                    <Select id={`${id}`} value={value} label={'Loại Vật Phẩm'} onChange={handleChangeSelect}>
                        <MenuItem sx={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} value="">
                            <em>None</em>
                        </MenuItem>
                        {select}
                    </Select>
                </FormControl>
            </div>
            <div className={clsx(styles.table)}>
                <DataGrid
                    sx={{ paddingLeft: '1rem', paddingRight: '1rem', fontSize: '1.6rem' }}
                    rows={rows}
                    columns={columns}
                />
            </div>
        </div>
    );
}

export default ThongKe;

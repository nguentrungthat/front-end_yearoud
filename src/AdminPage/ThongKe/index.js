import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
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
import SelectBox from '../../components/MiniPart/SelectBox';
const TK = require('../../Controller/ThongKeController');

function ThongKe() {
    const [thongke, setThongke] = useState([]);
    const [loaivp, setLoaiVP] = useState([]);
    const [checkRadio, setCheckRadio] = useState('dm');
    const [dateStart, setDateStart] = useState('2022-11-01');
    const [dateEnd, setDateEnd] = useState('2022-11-30');

    useEffect(() => {
        async function Get() {
            setThongke(await TK.GET());
            setLoaiVP(await TK.GET_LOAIVP());
        }
        Get();
    }, []);

    const handleChangeRadio = (event) => {
        setCheckRadio(event.target.value);
    };

    var rows = [];
    for (const value of thongke) {
        var row = {
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
    var columns = [
        { field: 'col1', headerName: 'Tên Khách Hàng', width: 200 },
        { field: 'col2', headerName: 'Tên Vật Phẩm', width: 200 },
        { field: 'col3', headerName: 'Tên Cửa Hàng', width: 150 },
        { field: 'col4', headerName: 'Số Lượng', type: 'number', width: 100, align: 'right', headerAlign: 'right' },
        { field: 'col5', headerName: 'Tổng tiền', type: 'number', width: 150, align: 'right', headerAlign: 'right' },
        { field: 'col6', headerName: 'Ngày Đặt', width: 170, align: 'right', headerAlign: 'right' },
        { field: 'col7', headerName: 'Ngày Giao', width: 170, align: 'right', headerAlign: 'right' },
    ];

    let arrLoai = [];
    for (let value of loaivp) {
        arrLoai.push({ ID: value.LOAI_VATPHAM, VALUE: `${value.TEN_LOAI}` });
    }
    const loai = SelectBox('Loại Vật Phẩm', arrLoai);

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
                {loai}
            </div>
            <div className={clsx(styles.table)}>
                <DataGrid
                    sx={{ fontSize: '1.6rem' }}
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </div>
    );
}

export default ThongKe;

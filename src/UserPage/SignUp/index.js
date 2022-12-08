import { useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import cx from 'clsx';
import styles from './SignUp.module.scss';
const KH = require('../../Controller/KhachHangController');

export default function SignUp() {
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [ten, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [diachi, setDiaChi] = useState('');
    const [sdt, setSdt] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [gioitinh, setGioitinh] = useState(1);
    const [openAlert, setOpenAlert] = useState(false);
    const [message, setMessage] = useState('Tạo tài khoản thành công');
    const [status, setStatus] = useState('success');

    const handleChangeRadio = (event) => {
        setGioitinh(event.target.value);
    };
    const handleOpenAlert = () => setOpenAlert(true);
    const handleCloseAlert = () => setOpenAlert(false);

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const alert = (
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity={status} sx={{ fontSize: '1.4rem', width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );

    return (
        <div className={cx(styles.login)}>
            <div className={cx(styles.login_form)}>
                <span className={cx(styles.login_title)}>Đăng Ký</span>
                <Box
                    className={cx(styles.info_signup)}
                    component="form"
                    sx={{
                        '& .MuiInputBase-root': {
                            fontSize: '16px',
                            bgcolor: '#f7f7f7',
                        },
                        '& .MuiFormLabel-root': {
                            fontSize: '16px',
                        },
                    }}
                >
                    <span className={cx(styles.label)}>Họ và tên</span>
                    <TextField
                        onChange={(event) => setTen(event.target.value)}
                        placeholder="Họ và tên"
                        variant="outlined"
                    />
                    <div className={cx(styles.flex_inline)}>
                        <div style={{ width: '29rem' }}>
                            <span className={cx(styles.label)}>Email</span>
                            <br />
                            <TextField
                                sx={{ width: '25rem' }}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="Email"
                                variant="outlined"
                                type="email"
                            />
                        </div>

                        <div>
                            <FormControl>
                                <FormLabel>Giới tính</FormLabel>
                                <RadioGroup row value={gioitinh} onChange={handleChangeRadio}>
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
                    <span className={cx(styles.label)}>Địa chỉ</span>
                    <TextField
                        onChange={(event) => setDiaChi(event.target.value)}
                        placeholder="Địa chỉ"
                        variant="outlined"
                    />
                    <div className={cx(styles.flex_inline)}>
                        <div style={{ width: '29rem' }}>
                            <span className={cx(styles.label)}>Số điện thoại</span>
                            <TextField
                                sx={{ width: '25rem' }}
                                onChange={(event) => setSdt(event.target.value)}
                                placeholder="Số điện thoại"
                                variant="outlined"
                            />
                        </div>
                        <div style={{ width: '25rem' }}>
                            <span className={cx(styles.label)}>Ngày Sinh</span>
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
                    <div className={cx(styles.flex_inline)}>
                        <div style={{ width: '29rem' }}>
                            <span className={cx(styles.label)}>Mật khẩu</span>
                            <TextField
                                sx={{ width: '25rem' }}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Mật khẩu"
                                variant="outlined"
                                type="password"
                            />
                        </div>
                        <div style={{ width: '25rem' }}>
                            <span className={cx(styles.label)}>Nhập lại mật khẩu</span>
                            <TextField
                                sx={{ width: '25rem' }}
                                onChange={(event) => setRePassword(event.target.value)}
                                placeholder="Nhập lại mật khẩu"
                                variant="outlined"
                                type="password"
                            />
                        </div>
                    </div>
                    <Button
                        onClick={async () => {
                            if (password !== repassword) {
                                setStatus('error');
                                setMessage('Nhập lại mật khẩu không đúng');
                                handleOpenAlert();
                            } else {
                                setStatus('success');
                                setMessage('Tạo tài khoản thành công');
                                const khachhang = {
                                    TEN_KHACHHANG: ten,
                                    EMAIL: email,
                                    SDT: sdt,
                                    NGAYSINH: date,
                                    NGAYTAO: new Date(),
                                    DIACHI: diachi,
                                    GIOITINH: gioitinh,
                                };
                                const account = {
                                    TAIKHOAN: email,
                                    MATKHAU: password,
                                };
                                console.log(account);
                                await KH.CREATE([khachhang]);
                                await KH.CREATE_ACCOUNT(account);
                                handleOpenAlert();
                                setTimeout(() => {
                                    window.location.replace(`http://localhost:3000/login`);
                                }, 5000);
                            }
                        }}
                        className={cx(styles.btn_sign_up)}
                        variant="contained"
                        sx={{ width: '100%', bgcolor: '#333', color: '#fff', mt: '8px' }}
                    >
                        Đăng ký
                    </Button>
                </Box>
                <span className={cx(styles.or)}>Hoặc</span>
                <div className={cx(styles.sign_in_media)}>
                    <Button className={cx(styles.btn_sign_in)} variant="contained">
                        <FacebookIcon sx={{ fontSize: '15px' }} />
                    </Button>
                    <Button
                        className={cx(styles.btn_sign_in)}
                        variant="contained"
                        sx={{ bgcolor: '#fff', color: '#555' }}
                    >
                        <GoogleIcon sx={{ fontSize: '15px' }} />
                    </Button>
                </div>
                <div className={cx(styles.sign_up)}>
                    <span className={cx(styles.sign_up_lable)}>Bạn đã có tài khoản</span>
                    <a href="/login" className={cx(styles.change_page)}>
                        Đăng nhập ngay!
                    </a>
                </div>
            </div>
            {alert}
        </div>
    );
}

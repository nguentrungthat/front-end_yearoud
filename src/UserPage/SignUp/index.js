import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import cx from 'clsx';
import styles from './SignUp.module.scss';
// const LoginController = require('../../Controller/LoginController');

export default function SignUp() {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [date, setDate] = useState(new Date());

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
                        onChange={(event) => setAccount(event.target.value)}
                        placeholder="Username"
                        variant="outlined"
                    />
                    <span className={cx(styles.label)}>Email</span>
                    <TextField
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Email"
                        variant="outlined"
                        type="email"
                    />
                    <span className={cx(styles.label)}>Địa chỉ</span>
                    <TextField
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Địa chỉ"
                        variant="outlined"
                    />
                    <div className={cx(styles.flex_inline)}>
                        <div>
                            <span className={cx(styles.label)}>Số điện thoại</span>
                            <TextField
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Số điện thoại"
                                variant="outlined"
                            />
                        </div>
                        <div>
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
                        <div>
                            <span className={cx(styles.label)}>Mật khẩu</span>
                            <TextField
                                sx={{ width: '21rem' }}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Mật khẩu"
                                variant="outlined"
                                type="password"
                            />
                        </div>
                        <div style={{ width: '50%' }}>
                            <span className={cx(styles.label)}>Nhập lại mật khẩu</span>
                            <TextField
                                sx={{ width: '21rem' }}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Nhập lại mật khẩu"
                                variant="outlined"
                                type="password"
                            />
                        </div>
                    </div>
                    <Button
                        onClick={() => {
                            // LoginController.Login(account, password);
                            console.log(account, password);
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
        </div>
    );
}

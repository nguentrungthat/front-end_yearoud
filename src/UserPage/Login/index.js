import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TextField from '@mui/material/TextField';
import cx from 'clsx';
import styles from './Login.module.scss';
const LoginController = require('../../Controller/LoginController');

export default function Login() {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={cx(styles.login)}>
            <div className={cx(styles.login_form)}>
                <span className={cx(styles.login_title)}>Đăng Nhập</span>
                <div className={cx(styles.sign_in_media)}>
                    <Button className={cx(styles.btn_sign_in)} variant="contained">
                        <FacebookIcon sx={{ fontSize: '30px', mr: '8px' }} />
                        Facebook
                    </Button>
                    <Button
                        className={cx(styles.btn_sign_in)}
                        variant="contained"
                        sx={{ bgcolor: '#fff', color: '#555' }}
                    >
                        <GoogleIcon sx={{ fontSize: '30px', mr: '8px' }} />
                        Google
                    </Button>
                </div>
                <Box
                    className={cx(styles.info_login)}
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {
                            width: '45.8rem',
                            height: '6rem',
                            fontSize: '30px',
                        },
                        '& .MuiInputBase-root': {
                            fontSize: '20px',
                            bgcolor: '#f7f7f7',
                        },
                        '& .MuiFormLabel-root': {
                            fontSize: '20px',
                        },
                    }}
                >
                    <span className={cx(styles.account)}>Tài khoản</span>
                    <TextField
                        onChange={(event) => setAccount(event.target.value)}
                        placeholder="Email"
                        variant="outlined"
                    />
                    <div>
                        <span className={cx(styles.password)}>Mật khẩu</span>
                        <a href=" " className={cx(styles.forgot_pass)}>
                            Quên mật khẩu?
                        </a>
                    </div>
                    <TextField
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password"
                        variant="outlined"
                        type="password"
                    />
                    <Button
                        onClick={() => {
                            LoginController.Login(account, password);
                        }}
                        className={cx(styles.btn_sign_in)}
                        variant="contained"
                        sx={{ width: '100%', bgcolor: '#333', color: '#fff', mt: '8px' }}
                    >
                        Đăng nhập
                    </Button>
                </Box>
                <div className={cx(styles.sign_up)}>
                    <span className={cx(styles.sign_up_lable)}>Bạn chưa có tài khoản</span>
                    <a href="/signup" className={cx(styles.forgot_pass)}>
                        Đăng ký ngay!
                    </a>
                </div>
            </div>
        </div>
    );
}

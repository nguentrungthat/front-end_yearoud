import clsx from 'clsx';
import { useState } from 'react';
import styles from './Information.module.scss';
import Button from '@mui/material/Button';
const KH = require('../../Controller/KhachHangController');

export default function ChangePass() {
    const [pass, setPass] = useState('');
    const [newpass, setNewPass] = useState('');
    const [confirm, setConfirm] = useState('');

    const id = localStorage.getItem('id');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const bol = await KH.PASS({ ID_KHACHHANG: id, PASS: pass });
        if (bol && newpass === confirm) await KH.CHANGE_PASS({ ID_KHACHHANG: id, PASS: newpass });
    };
    return (
        <div className={clsx(styles.main)}>
            <div className={clsx(styles.head)}>
                <div className={clsx(styles.h1)}>Đổi mật khẩu</div>
                <div>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</div>
            </div>
            <div className={clsx(styles.inline_flex)}>
                <form onSubmit={handleSubmit} className={clsx(styles.changepass)}>
                    <div className={clsx(styles.inline_flex)}>
                        <div className={clsx(styles.left)}>Mật khẩu cũ</div>
                        <div className={clsx(styles.right)}>
                            <input
                                className={clsx(styles.input)}
                                type="password"
                                value={pass}
                                onChange={(event) => setPass(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className={clsx(styles.inline_flex)}>
                        <div className={clsx(styles.left)}>Mật khẩu mới</div>
                        <div className={clsx(styles.right)}>
                            <input
                                className={clsx(styles.input)}
                                type="password"
                                value={newpass}
                                onChange={(event) => setNewPass(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className={clsx(styles.inline_flex)}>
                        <div className={clsx(styles.left)}>Xác nhận mật khẩu mới</div>
                        <div className={clsx(styles.right)}>
                            <input
                                className={clsx(styles.input)}
                                type="password"
                                value={confirm}
                                onChange={(event) => setConfirm(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className={clsx(styles.inline_flex)}>
                        <div className={clsx(styles.left)}></div>
                        <div className={clsx(styles.right)}>
                            <Button
                                type="submit"
                                sx={{
                                    width: '7rem',
                                    height: '4rem',
                                    fontSize: '1.4rem',
                                    textTransform: 'capitalize',
                                }}
                                variant="contained"
                            >
                                Lưu
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

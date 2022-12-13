import clsx from 'clsx';
import { useState, useEffect } from 'react';
import styles from './Information.module.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
    SelectProvince,
    SelectDistrict,
    SelectCommune,
    getCommuneNameWithType,
    getDistrictNameWithType,
    getProvinceNameWithType,
} from 'vn-ad';
const STORE = require('../../Controller/CuaHangController');

export default function SignUpStore() {
    const [tinh, setTinh] = useState('');
    const [huyen, setHuyen] = useState('');
    const [xa, setXa] = useState('');
    const [address, setAddress] = useState('');
    const [sdt, setSDT] = useState('');
    const [tenStore, setTenStore] = useState('');
    const [isStore, setIsStore] = useState({});

    const id = localStorage.getItem('id');

    useEffect(() => {
        async function GET() {
            setIsStore(await STORE.GET_IDKH(id));
        }
        GET();
    }, [id]);

    const handleSubmit = async (event) => {
        const st = {
            PROVINCE: getProvinceNameWithType(tinh),
            DISTRICT: getDistrictNameWithType(huyen),
            WARD: getCommuneNameWithType(xa),
            ADDRESS: address,
            SDT: sdt,
            TEN_STORE: tenStore,
            ID_KHACHHANG: Number(id),
        };
        await STORE.CREATE([st]);
    };

    let form = null;
    if (isStore) {
        if (isStore.STATUS === 1) {
            form = (
                <div style={{ marginTop: '3rem' }} className={clsx(styles.inline_flex)}>
                    <div className={clsx(styles.left)}>Đã được duyệt</div>
                    <a href={`/admin/${id}`} className={clsx(styles.right, styles.quanly)}>
                        Quản lý của hàng của bạn
                    </a>
                </div>
            );
        } else
            form = (
                <div style={{ marginTop: '3rem', color: '#989898' }} className={clsx(styles.inline_flex)}>
                    <span>Đang chờ được xét duyệt...</span>
                </div>
            );
    } else {
        form = (
            <div className={clsx(styles.inline_flex)}>
                <form onSubmit={handleSubmit} className={clsx(styles.signup)}>
                    <div className={clsx(styles.inline_flex)}>
                        <div className={clsx(styles.left)}>Tên Cửa Hàng</div>
                        <div className={clsx(styles.right)}>
                            <TextField
                                sx={{ width: '25rem' }}
                                onChange={(e) => setTenStore(e.target.value)}
                                label="Tên cửa hàng"
                                variant="outlined"
                            />
                        </div>
                    </div>
                    <div className={clsx(styles.inline_flex)}>
                        <div className={clsx(styles.left)}>Số Điện Thoại</div>
                        <div className={clsx(styles.right)}>
                            <TextField
                                sx={{ width: '25rem' }}
                                onChange={(e) => setSDT(e.target.value)}
                                label="Số điện thoại"
                                variant="outlined"
                            />
                        </div>
                    </div>
                    <div className={clsx(styles.inline_flex)}>
                        <div className={clsx(styles.left)}>Chọn Tỉnh/TP</div>
                        <div className={clsx(styles.right)}>
                            <SelectProvince className={clsx(styles.selectbox)} value={tinh} onChange={setTinh} />
                        </div>
                    </div>
                    <div className={clsx(styles.inline_flex)}>
                        <div className={clsx(styles.left)}>Chọn Huyện/Quận</div>
                        <div className={clsx(styles.right)}>
                            <SelectDistrict
                                className={clsx(styles.selectbox)}
                                value={huyen}
                                province={tinh}
                                onChange={setHuyen}
                            />
                        </div>
                    </div>

                    <div className={clsx(styles.inline_flex)}>
                        <div className={clsx(styles.left)}>Chọn Xã/Phường </div>
                        <div className={clsx(styles.right)}>
                            <SelectCommune
                                className={clsx(styles.selectbox)}
                                value={xa}
                                district={huyen}
                                onChange={setXa}
                            />
                        </div>
                    </div>
                    <div className={clsx(styles.inline_flex)}>
                        <div className={clsx(styles.left)}>Địa chỉ cụ thể</div>
                        <div className={clsx(styles.right)}>
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

                    <div className={clsx(styles.inline_flex)}>
                        <div className={clsx(styles.left)}></div>
                        <div className={clsx(styles.right)}>
                            <Button
                                type="submit"
                                sx={{
                                    width: '9rem',
                                    height: '4rem',
                                    fontSize: '1.4rem',
                                    textTransform: 'capitalize',
                                }}
                                variant="contained"
                            >
                                Đăng ký
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className={clsx(styles.main)}>
            <div className={clsx(styles.head)}>
                <div className={clsx(styles.h1)}>Đăng ký bán hàng</div>
                <div>Để đăng ký dịch vụ bán hàng, vui lòng điền thông tin và chờ xét duyệt</div>
            </div>
            {form}
        </div>
    );
}

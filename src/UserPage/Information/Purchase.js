import clsx from 'clsx';
import { useState, useEffect } from 'react';
import styles from './Information.module.scss';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import CardMedia from '@mui/material/CardMedia';
import TabPanel from '@mui/lab/TabPanel';
const url = 'http://localhost:8081';
const DONMUA = require('../../Controller/DonMuaController');

export default function Purchase() {
    const [value, setValue] = useState('1');
    const [donmua, setDonmua] = useState([]);

    const id = localStorage.getItem('id');

    useEffect(() => {
        async function Get() {
            return setDonmua(await DONMUA.GET_BYID(id));
        }
        Get();
    }, [id]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleGiao = (value) => {
        if (new Date().valueOf() < new Date(value[0]?.NGAYGIAO).valueOf()) {
            return <span className={clsx(styles.status)}>Đang giao</span>;
        } else return <span className={clsx(styles.status)}>Đã giao</span>;
    };

    const purchases = donmua.map((value, index) => (
        <div key={index} className={clsx(styles.purchase)}>
            <div className={clsx(styles.purchase_header)}>
                <div>
                    <span className={clsx(styles.status_label)}>Cửa hàng</span>{' '}
                    <span className={clsx(styles.status)}>{value[0].TEN_STORE}</span>
                </div>

                <div>
                    <span className={clsx(styles.status_label)}>Trạng thái đơn hàng</span>
                    <span className={clsx(styles.status)}>{handleGiao(value)}</span>
                </div>
            </div>
            {value.map((data, index) => (
                <div key={index} className={clsx(styles.purchase_infor)}>
                    <div className={clsx(styles.item_infor)}>
                        <CardMedia
                            sx={{ width: 80, height: 80, mr: '1.2rem' }}
                            component="img"
                            image={url + '/images/' + data.IMG}
                            alt="Yearoud"
                        />
                        <div className={clsx(styles.flex_column)}>
                            <span className={clsx(styles.item_name)}>{data.TEN_VATPHAM}</span>
                            <span className={clsx(styles.item_note)}>{data.GHICHU}</span>
                            <span>x{data.SOLUONGVP}</span>
                        </div>
                    </div>
                    <div className={clsx(styles.item_price)}>₫{data.DONGIAVP}</div>
                </div>
            ))}
            <div className={clsx(styles.purchase_total)}>
                <div>
                    <span className={clsx(styles.fee_label)}>Phí vận chuyển: </span>
                    <span className={clsx(styles.fee_price)}>₫{value[0].FEE}</span>
                </div>
                <div>
                    <span className={clsx(styles.total_label)}>Tổng số tiền: </span>
                    <span className={clsx(styles.total_price)}>₫{value[0].TONGTIEN + value[0].FEE}</span>
                </div>
            </div>
            <div className={clsx(styles.purchase_confirm)}>
                <div className={clsx(styles.date)}>
                    <span>
                        Ngày đặt hàng{' '}
                        <u>{new Date(value[0]?.NGAYTHANG).toLocaleString('en-GB', { timeZone: 'UTC' }).slice(0, 10)}</u>
                    </span>
                    <span>
                        Ngày giao hàng{' '}
                        <u>{new Date(value[0]?.NGAYGIAO).toLocaleString('en-GB', { timeZone: 'UTC' }).slice(0, 10)}</u>
                    </span>
                </div>
                <div className={clsx(styles.btn_action)}>
                    <Button
                        disabled
                        sx={{ minWidth: '15rem', minHeight: '4rem', fontSize: '1.6rem' }}
                        variant="outlined"
                    >
                        Đã nhận hàng
                    </Button>
                    <Button
                        disabled
                        sx={{ minWidth: '15rem', minHeight: '4rem', fontSize: '1.6rem' }}
                        variant="outlined"
                    >
                        Đánh giá
                    </Button>
                </div>
            </div>
        </div>
    ));

    return (
        <div className={clsx(styles.main)}>
            <div className={clsx(styles.purchase_container)}>
                <Box>
                    <TabContext value={value}>
                        <Box>
                            <TabList onChange={handleChange}>
                                <Tab sx={{ fontSize: '1.5rem' }} value="1" label="Tất cả" />
                                <Tab sx={{ fontSize: '1.5rem' }} value="2" label="Chưa giao" />
                                <Tab sx={{ fontSize: '1.5rem' }} value="3" label="Đã giao" />
                            </TabList>
                        </Box>
                        <TabPanel sx={{ fontFamily: 'Poppins-Regular' }} value="1">
                            {purchases}
                        </TabPanel>
                        <TabPanel sx={{ fontFamily: 'Poppins-Regular' }} value="2">
                            {purchases}
                        </TabPanel>
                        <TabPanel sx={{ fontFamily: 'Poppins-Regular' }} value="3">
                            {purchases}
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    );
}
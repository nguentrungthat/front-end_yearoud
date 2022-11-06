import cx from 'clsx';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CardMedia from '@mui/material/CardMedia';
import styles from './Cart.module.scss';
import { useEffect, useState, useMemo } from 'react';
import SelectBox from '../../components/MiniPart/SelectBox';
import { useParams } from 'react-router-dom';
const url = 'http://localhost:8081';
const ShopCart = require('../../Controller/CartController');

function Cart() {
    const [items, setItems] = useState([]);
    const [count, setCount] = useState([]);
    const [price, setPrice] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        async function Get() {
            return setItems(await ShopCart.GET_CART(id));
        }
        Get();
    }, [id]);

    useMemo(() => {
        let i = 0;
        let totalPrice = [];
        let countSOLUONG = [];
        for (const item of items) {
            countSOLUONG[i] = item.SOLUONG;
            totalPrice[i] = item.SOLUONG * item.GIABAN;
            i++;
        }
        setCount(countSOLUONG);
        setPrice(totalPrice);
    }, [items]);

    const city = SelectBox('Tỉnh/Thành Phố', [
        { ID: 1, VALUE: 'TP.Cần Thơ' },
        { ID: 1, VALUE: 'TP.Hồ Chí Minh' },
        { ID: 1, VALUE: 'Hà Nội' },
    ]);
    if (!city) {
        return;
    }

    const tongtien = price.reduce((result, prod) => {
        return result + prod;
    }, 0);

    return (
        <div className={cx(styles.cart_container)}>
            <div className={cx(styles.cart_details)}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: 16 }}></TableCell>
                                <TableCell sx={{ fontSize: 16 }} align="left">
                                    SẢN PHẨM
                                </TableCell>
                                <TableCell sx={{ fontSize: 16 }} align="right">
                                    GIÁ
                                </TableCell>
                                <TableCell sx={{ fontSize: 16 }} align="center">
                                    SỐ LƯỢNG
                                </TableCell>
                                <TableCell sx={{ fontSize: 16 }} align="right">
                                    THÀNH TIỀN
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow
                                    key={item.ID_VATPHAM}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell
                                        className={cx(styles.img_name_item)}
                                        sx={{ fontSize: 14 }}
                                        component="th"
                                        scope="row"
                                    >
                                        <CardMedia
                                            sx={{ width: 80, height: 80 }}
                                            component="img"
                                            image={url + '/images/' + item.IMG}
                                            alt="Yearoud"
                                        />
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 16 }} align="left">
                                        {item.TEN_VATPHAM}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 16 }} align="right">
                                        {item.GIABAN}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={() => {
                                                if (count[index] > 1) {
                                                    let arr = count;
                                                    let gia = price;
                                                    arr[index] = count[index] - 1;
                                                    gia[index] = arr[index] * item.GIABAN;
                                                    setCount([...arr]);
                                                    setPrice([...gia]);
                                                }
                                            }}
                                        >
                                            <RemoveIcon sx={{ width: '3rem', height: '3rem' }} />
                                        </IconButton>
                                        <input
                                            className={cx(styles.input_quality)}
                                            type="number"
                                            readOnly
                                            value={count[index]}
                                        ></input>
                                        <IconButton
                                            onClick={() => {
                                                let arr = count;
                                                let gia = price;
                                                arr[index] = count[index] + 1;
                                                gia[index] = arr[index] * item.GIABAN;
                                                setCount([...arr]);
                                                setPrice([...gia]);
                                            }}
                                        >
                                            <AddIcon sx={{ width: '3rem', height: '3rem' }} />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 16 }} align="right">
                                        {price[index]}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={cx(styles.cart_coupon)}>
                    <TextField
                        sx={{ width: 220, fontSize: 16, borderRadius: 23 }}
                        label="Mã giảm giá"
                        variant="outlined"
                    />
                    <Button sx={{ fontSize: 16, borderRadius: 23 }} variant="contained">
                        Thêm mã giảm giá
                    </Button>
                    <Button sx={{ fontSize: 16, borderRadius: 23 }} variant="contained">
                        Cập nhật giỏ hàng
                    </Button>
                </div>
            </div>
            <div className={cx(styles.cart_payment)}>
                <h4 className={cx(styles.h4_payment)}>Tổng đơn hàng</h4>
                <div className={cx(styles.subtotal_payment)}>
                    <span className={cx(styles.label)}>Tạm tính:</span>
                    <span className={cx(styles.label)}> {tongtien} đ</span>
                </div>
                <span className={cx(styles.label)}>Vận chuyển:</span>
                <div className={cx(styles.shipping_payment)}>
                    {city}
                    <TextField
                        sx={{ width: 250, fontSize: 16, borderRadius: 23 }}
                        label="Quận/Huyện"
                        variant="outlined"
                    />
                    <TextField
                        sx={{ width: 250, fontSize: 16, borderRadius: 23 }}
                        label="Xã/Phường"
                        variant="outlined"
                    />
                    <TextField sx={{ width: 250, fontSize: 16, borderRadius: 23 }} label="Đường" variant="outlined" />
                    <button className={cx(styles.update_shipping)}>Cập nhật</button>
                </div>
                <div className={cx(styles.total)}>
                    <span className={cx(styles.label)}>Tổng tiền:</span>
                    <span className={cx(styles.total_value)}> {tongtien} đ</span>
                </div>
            </div>
        </div>
    );
}

export default Cart;

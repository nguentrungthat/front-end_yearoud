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
import { useEffect, useState } from 'react';
import SelectBox from '../../components/MiniPart/SelectBox';
const url = 'http://localhost:8081';
const ShopCart = require('../../Controller/CartController');

function Cart() {
    const [items, setItems] = useState([]);
    const [imgItem, setImgItem] = useState([]);

    useEffect(() => {
        const id = [1, 2];
        async function Get() {
            setItems(await ShopCart.POST_ITEM(id));
        }
        async function GetImg() {
            return setImgItem(await ShopCart.Images(id));
        }
        Get();
        GetImg();
    }, []);

    let price = [];
    let count = [];
    let i = 0;
    count[0] = useState(1);
    price[0] = useState(99000);
    count[1] = useState(1);
    price[1] = useState(65000);

    let totalprice = [];
    let settotalprice = [];
    let countItem = [];
    let setcountItem = [];

    for (const item of items) {
        item.index = i;
        countItem[i] = count[i][0];
        setcountItem[i] = count[i][1];
        totalprice[i] = price[i][0];
        settotalprice[i] = price[i][1];
        item.IMG = imgItem[i]?.TEN_HINHANH ? imgItem[i]?.TEN_HINHANH : 'logo2.png';
        i++;
    }

    const city = SelectBox('Tỉnh/Thành Phố', ['TP.Cần Thơ', 'TP.Hồ Chí Minh', 'Hà Nội']);
    if (!city) {
        return;
    }

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
                            {items.map((item) => (
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
                                                if (countItem[item.index] > 1) {
                                                    setcountItem[item.index](countItem[item.index] - 1);
                                                    settotalprice[item.index](
                                                        item.GIABAN * (countItem[item.index] - 1),
                                                    );
                                                }
                                            }}
                                        >
                                            <RemoveIcon sx={{ width: '3rem', height: '3rem' }} />
                                        </IconButton>
                                        <input
                                            className={cx(styles.input_quality)}
                                            type="number"
                                            readOnly
                                            value={countItem[item.index]}
                                        ></input>
                                        <IconButton
                                            onClick={() => {
                                                setcountItem[item.index](countItem[item.index] + 1);
                                                settotalprice[item.index](item.GIABAN * (countItem[item.index] + 1));
                                            }}
                                        >
                                            <AddIcon sx={{ width: '3rem', height: '3rem' }} />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 16 }} align="right">
                                        {totalprice[item.index]}
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
                    <span className={cx(styles.subtotal)}>0</span>
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
                    <span className={cx(styles.total_value)}>0</span>
                </div>
            </div>
        </div>
    );
}

export default Cart;

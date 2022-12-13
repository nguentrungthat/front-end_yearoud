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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Checkbox from '@mui/material/Checkbox';
import CardMedia from '@mui/material/CardMedia';
import styles from './Cart.module.scss';
import { useEffect, useState, useMemo, forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {
    SelectProvince,
    SelectDistrict,
    SelectCommune,
    getCommuneNameWithType,
    getDistrictNameWithType,
    getProvinceNameWithType,
    getCommunePathWithType,
} from 'vn-ad';
const url = 'http://localhost:8081';
const ShopCart = require('../../Controller/CartController');
const Khachhangs = require('../../Controller/KhachHangController');
const Cuahhangs = require('../../Controller/CuaHangController');
const MGG = require('../../Controller/MaGiamGiaController');

function Cart() {
    const [items, setItems] = useState([]);
    const [khachhangs, setKhachhangs] = useState([]);
    const [cuahangs, setCuahhangs] = useState([]);
    const [count, setCount] = useState([]);
    const [price, setPrice] = useState([]);
    const [check, setCheck] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const [update, setUpdate] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [openRemove, setOpenRemove] = useState(false);
    const [openPurchase, setOpenPurchase] = useState(false);
    const [delID, setDelID] = useState(0);
    const [tinh, setTinh] = useState('');
    const [huyen, setHuyen] = useState('');
    const [xa, setXa] = useState('');
    const [address, setAddress] = useState('');
    const [diachi, setDiachi] = useState({});
    const [tongtien, setTongtien] = useState(0);
    const [fee, setFee] = useState(0);
    const [deliveryTime, setDeliveryTime] = useState(new Date().toISOString());
    const [mgg, setMGG] = useState('');
    const [coupon, setCoupon] = useState({ GIATRI_GIAM: 0 });

    const id = localStorage.getItem('id');

    useEffect(() => {
        async function Get() {
            setKhachhangs(await Khachhangs.GET_KH(id));
            setCuahhangs(await Cuahhangs.GET());
            setItems(await ShopCart.GET_CART(id));
            return;
        }
        Get();
    }, [id]);

    useMemo(() => {
        let i = 0;
        let totalPrice = [];
        let countSOLUONG = [];
        let checkbox = [];
        for (const item of items) {
            countSOLUONG[i] = item.SOLUONG;
            totalPrice[i] = item.SOLUONG * item.GIABAN;
            checkbox[i] = false;
            item.index = i;
            i++;
        }
        setCount(countSOLUONG);
        setPrice(totalPrice);
        setCheck(checkbox);
    }, [items]);

    const handleCloseRemove = () => setOpenRemove(false);
    const handleShowRemove = () => setOpenRemove(true);
    const handleClosePurchase = () => setOpenPurchase(false);
    const handleShowPurchase = () => setOpenPurchase(true);
    const handleOpenAlert = () => setOpenAlert(true);
    const handleCloseAlert = () => setOpenAlert(false);
    const handleAddress = async () => {
        const ADDRESS = {
            ADDRESS: address,
            XA: getCommuneNameWithType(xa),
            HUYEN: getDistrictNameWithType(huyen),
            TINH: getProvinceNameWithType(tinh),
            TOTAL: tien_tamtinh,
        };
        setDiachi(ADDRESS);
        const body = await ShopCart.PRE_PURCHASE(khachhangs[0], cuahangs[0], arrItems, ADDRESS);
        console.log(body);
        setFee(body.data.total_fee);
        setDeliveryTime(body.data.expected_delivery_time);
        setTongtien(tien_tamtinh + body.data.total_fee - coupon?.GIATRI_GIAM * tien_tamtinh);
    };
    const handleAddPurchase = async () => {
        const ADDRESS = {
            ADDRESS: address,
            XA: getCommuneNameWithType(xa),
            HUYEN: getDistrictNameWithType(huyen),
            TINH: getProvinceNameWithType(tinh),
            TOTAL: tien_tamtinh,
        };
        setDiachi(ADDRESS);
        const data = await ShopCart.PURCHASE(khachhangs[0], cuahangs[0], arrItems, ADDRESS);
        console.log(data);
        const body = {
            DCNHAN: address + ', ' + getCommunePathWithType(xa),
            ID_KHACHHANG: Number(id),
            FEE: Number(data.data.total_fee),
            TONGTIEN: Number(tien_tamtinh),
            NGAYGIAO: data.data.expected_delivery_time.slice(0, 10),
            VATPHAM: arrItems,
            ORDER_CODE: data.data.order_code,
            GIAMGIA: Number(-coupon.GIATRI_GIAM * tongtien),
        };
        await ShopCart.ADD(body);
        setFee(0);
        setTongtien(0);
        handleClosePurchase();
        for (let idcart of arrItems) {
            ShopCart.DELETE_CART(idcart.ID_CART);
            let newItems = items;
            newItems.splice(delID, 1);
            setItems([...newItems]);
        }
    };

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const alert = (
        <Snackbar sx={{ width: '30rem' }} open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert
                onClose={handleCloseAlert}
                severity="success"
                sx={{ width: '100%', height: '5rem', fontSize: '1.4rem' }}
            >
                Cập Nhật Giỏ Hàng Thành Công
            </Alert>
        </Snackbar>
    );

    let tien_tamtinh = 0;
    let arrItems = [];
    for (let i = 0; i < items.length; i++) {
        if (check[i]) {
            tien_tamtinh += price[i];
            arrItems.push(items[i]);
        }
    }

    return (
        <div className={cx(styles.cart_container)}>
            <div className={cx(styles.cart_details)}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: 16 }}>
                                    <Checkbox
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }}
                                        checked={checkAll}
                                        onChange={() => {
                                            let checkbox = check;
                                            setCheckAll(!checkAll);
                                            for (let i = 0; i < items.length; i++) {
                                                checkbox[i] = !checkAll;
                                            }
                                            setCheck([...checkbox]);
                                        }}
                                    />{' '}
                                    Tất cả
                                </TableCell>
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
                                <TableCell sx={{ fontSize: 16 }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow key={item.ID_CART} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell sx={{ fontSize: 16 }} align="left">
                                        <Checkbox
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }}
                                            checked={check[index]}
                                            onChange={() => {
                                                let checkbox = check;
                                                checkbox[index] = !check[index];
                                                setCheck([...checkbox]);
                                                let bol = true;
                                                for (let i = 0; i < items.length; i++) {
                                                    if (!check[i]) bol = false;
                                                }
                                                setCheckAll(bol);
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        className={cx(styles.img_name_item)}
                                        sx={{ fontSize: 14 }}
                                        component="th"
                                        scope="row"
                                        align="left"
                                    >
                                        <CardMedia
                                            sx={{ width: 80, height: 80 }}
                                            component="img"
                                            image={url + '/images/' + item.IMG}
                                            alt="Yearoud"
                                        />
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 16 }} align="left">
                                        <span>{item.TEN_VATPHAM}</span> <br />{' '}
                                        <span className={cx(styles.item_note)}>{item.GHICHU}</span>
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
                                                    let flag = 0;
                                                    for (let i = 0; i < update.length; i++) {
                                                        if (update[i].ID_CART === item.ID_CART) {
                                                            let newUpdate = update;
                                                            newUpdate[i].SOLUONG = count[index];
                                                            setUpdate([...newUpdate]);
                                                            flag = 1;
                                                        }
                                                    }
                                                    if (flag === 0) {
                                                        let newUpdate = {
                                                            ID_CART: item.ID_CART,
                                                            SOLUONG: count[index],
                                                        };
                                                        setUpdate(update.concat([newUpdate]));
                                                    }
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
                                                let flag = 0;
                                                for (let i = 0; i < update.length; i++) {
                                                    if (update[i].ID_CART === item.ID_CART) {
                                                        let newUpdate = update;
                                                        newUpdate[i].SOLUONG = count[index];
                                                        setUpdate([...newUpdate]);
                                                        flag = 1;
                                                    }
                                                }
                                                if (flag === 0) {
                                                    let newUpdate = {
                                                        ID_CART: item.ID_CART,
                                                        SOLUONG: count[index],
                                                    };
                                                    setUpdate(update.concat([newUpdate]));
                                                }
                                            }}
                                        >
                                            <AddIcon sx={{ width: '3rem', height: '3rem' }} />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 16 }} align="right">
                                        {price[index]}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 16 }} align="right">
                                        <IconButton
                                            onClick={() => {
                                                setDelID(index);
                                                handleShowRemove();
                                            }}
                                        >
                                            <DeleteForeverIcon sx={{ width: '2.5rem', height: '2.5rem' }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={cx(styles.cart_coupon)}>
                    <TextField
                        onChange={(e) => setMGG(e.target.value)}
                        sx={{ width: 220, fontSize: 16, borderRadius: 23 }}
                        label="Mã giảm giá"
                        variant="outlined"
                        inputProps={{ style: { fontSize: '1.6rem' } }}
                    />
                    <Button
                        onClick={async () => {
                            const code = await MGG.GET_MGG({ MGG: mgg });
                            console.log(code);
                            const today = new Date().toISOString();
                            if (today > code[0].TG_BATDAU && today < code[0].TG_KETTHUC && code[0].ACTIVE === 1)
                                setCoupon(code[0]);
                            setTongtien(tien_tamtinh + fee - code[0]?.GIATRI_GIAM * tien_tamtinh);
                        }}
                        sx={{ fontSize: 16, borderRadius: 23 }}
                        variant="contained"
                    >
                        Thêm mã giảm giá
                    </Button>
                    <Button
                        onClick={() => {
                            ShopCart.UPDATE_CART(update);
                            handleOpenAlert();
                        }}
                        sx={{ fontSize: 16, borderRadius: 23 }}
                        variant="contained"
                    >
                        Cập nhật giỏ hàng
                    </Button>
                </div>
            </div>
            <div className={cx(styles.cart_payment)}>
                <h4 className={cx(styles.h4_payment)}>Tổng đơn hàng</h4>

                <span className={cx(styles.label)}>Vận chuyển:</span>
                <div className={cx(styles.shipping_payment)}>
                    <SelectProvince className={cx(styles.selectbox)} value={tinh} onChange={setTinh} />
                    <SelectDistrict
                        className={cx(styles.selectbox)}
                        value={huyen}
                        province={tinh}
                        onChange={setHuyen}
                    />
                    <SelectCommune className={cx(styles.selectbox)} value={xa} district={huyen} onChange={setXa} />
                    <TextField
                        className={cx(styles.textfield)}
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
                    <button onClick={handleAddress} className={cx(styles.update_shipping)}>
                        Cập nhật
                    </button>
                </div>
                <div className={cx(styles.total)}>
                    <div className={cx(styles.subtotal_payment)}>
                        <div className={cx(styles.flex_inline)}>
                            <span className={cx(styles.label)}>Tạm tính:</span>
                            <span className={cx(styles.price)}> {tien_tamtinh} đ</span>
                        </div>
                        <div className={cx(styles.flex_inline)}>
                            <span className={cx(styles.label)}>Phí vận chuyển:</span>
                            <span className={cx(styles.price)}> {fee} đ</span>
                        </div>
                        <div className={cx(styles.flex_inline)}>
                            <span className={cx(styles.label)}>Áp dụng mã giảm:</span>
                            <span className={cx(styles.price)}> - {coupon?.GIATRI_GIAM * tien_tamtinh} đ</span>
                        </div>
                    </div>
                    <div className={cx(styles.flex_inline)}>
                        <span className={cx(styles.label)}>Tổng tiền:</span>
                        <span className={cx(styles.total_value)}> {tongtien} đ</span>
                    </div>
                </div>
                <div className={cx(styles.thanhtoan)}>
                    <Button onClick={handleShowPurchase} sx={{ fontSize: 16, borderRadius: 23 }} variant="contained">
                        Thanh toán
                    </Button>
                </div>
            </div>
            {alert}
            <Modal open={openRemove} onClose={handleCloseRemove}>
                <Box className={cx(styles.flex)} sx={{ ...styleModal, width: 478 }}>
                    <p>Xóa vật phẩm khỏi giỏ hàng:</p>
                    <h2 className={cx(styles.flex_inline)}>{items[delID]?.TEN_VATPHAM}</h2>
                    <div className={cx(styles.flex_inline)}>
                        <Button onClick={handleCloseRemove} sx={{ fontSize: 16, borderRadius: 23 }} variant="outlined">
                            Close
                        </Button>
                        <Button
                            onClick={() => {
                                ShopCart.DELETE_CART(items[delID]?.ID_CART);
                                let newItems = items;
                                newItems.splice(delID, 1);
                                setItems([...newItems]);
                                handleCloseRemove();
                                // window.location.replace(`http://localhost:3000/cart`);
                            }}
                            sx={{ fontSize: 16, borderRadius: 23 }}
                            variant="outlined"
                        >
                            Xác nhận
                        </Button>
                    </div>
                </Box>
            </Modal>
            <Modal open={openPurchase} onClose={handleClosePurchase}>
                <Box className={cx(styles.flex)} sx={{ ...styleModal, width: '50%' }}>
                    <span className={cx(styles.label_purchase)}>Chi tiết đơn hàng</span>
                    <span className={cx(styles.label)}>Thông tin đơn hàng: </span>
                    <span className={cx(styles.details_purchase)}>- Họ tên: {khachhangs[0]?.TEN_KHACHHANG}</span>
                    <span className={cx(styles.details_purchase)}>- Số điện thoại: {khachhangs[0]?.SDT}</span>
                    <span className={cx(styles.details_purchase)}>- Email: {khachhangs[0]?.EMAIL}</span>
                    <span className={cx(styles.details_purchase)}>
                        - Địa chỉ giao hàng:{' '}
                        <span className={cx(styles.weight_500)}>
                            {diachi?.ADDRESS}, {diachi?.XA}, {diachi?.HUYEN}, {diachi?.TINH}
                        </span>
                    </span>
                    <span className={cx(styles.details_purchase)}>
                        - Thời gian giao hàng dự kiến:{' '}
                        <span className={cx(styles.weight_500)}>
                            {new Date(deliveryTime).toLocaleString('en-GB').slice(0, 10)}
                        </span>
                    </span>
                    <span className={cx(styles.label)}>Danh sách vật phẩm:</span>
                    <TableContainer component={Paper}>
                        <Table size="small" sx={{ minWidth: 650, border: '1px solid #ccc' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontSize: 18, borderRight: '1px solid #ccc' }} align="left">
                                        Tên sản phẩm
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 18, borderRight: '1px solid #ccc' }} align="right">
                                        Giá
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 18, borderRight: '1px solid #ccc' }} align="right">
                                        Số lượng
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 18 }} align="right">
                                        Thành tiền
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {arrItems.map((item) => (
                                    <TableRow
                                        key={item.ID_CART}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell sx={{ fontSize: 16, borderRight: '1px solid #ccc' }} align="left">
                                            {item.TEN_VATPHAM}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: 16, borderRight: '1px solid #ccc' }} align="right">
                                            {item.GIABAN}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: 16, borderRight: '1px solid #ccc' }} align="right">
                                            {count[item.index]}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: 16 }} align="right">
                                            {count[item.index] * item.GIABAN}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell sx={{ fontSize: 12 }} align="left">
                                        Tổng
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 12 }} align="right" />
                                    <TableCell sx={{ fontSize: 12 }} align="right" />
                                    <TableCell sx={{ fontSize: 16, fontWeight: 500 }} align="right">
                                        {tien_tamtinh}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontSize: 12 }} align="left">
                                        Phí vận chuyển
                                    </TableCell>

                                    <TableCell sx={{ fontSize: 12 }} align="right" />
                                    <TableCell sx={{ fontSize: 12 }} align="right" />
                                    <TableCell sx={{ fontSize: 16, fontWeight: 500 }} align="right">
                                        {fee}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontSize: 12 }} align="left">
                                        Coupon
                                    </TableCell>

                                    <TableCell sx={{ fontSize: 12 }} align="right" />
                                    <TableCell sx={{ fontSize: 12 }} align="right" />
                                    <TableCell sx={{ fontSize: 16, fontWeight: 500 }} align="right">
                                        - {coupon?.GIATRI_GIAM * tien_tamtinh}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontSize: 18, fontWeight: 500 }} align="left">
                                        Thành tiền
                                    </TableCell>

                                    <TableCell sx={{ fontSize: 16 }} align="right" />
                                    <TableCell sx={{ fontSize: 16 }} align="right" />
                                    <TableCell sx={{ fontSize: 18, fontWeight: 500 }} align="right">
                                        {tien_tamtinh + fee - coupon?.GIATRI_GIAM * tien_tamtinh}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className={cx(styles.btn_purchase)}>
                        <Button onClick={handleAddPurchase} sx={{ fontSize: 16 }} variant="contained">
                            Xác nhận
                        </Button>
                        <Button onClick={handleClosePurchase} sx={{ fontSize: 16, ml: '2rem' }} variant="outlined">
                            Close
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Cart;

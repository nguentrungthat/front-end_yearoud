import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import Modal from '@mui/material/Modal';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { CardActionArea } from '@mui/material';
import styles from './Details.module.scss';
import cx from 'clsx';
import SelectBox from '../../components/MiniPart/SelectBox';
const Details = require('../../Controller/DetailsController');
const Items = require('../../Controller/ItemsController');
const Cart = require('../../Controller/CartController');
const url = 'http://localhost:8081';

function ItemDetails() {
    const [value, setValue] = useState('1');
    const [imgItem, setImgItem] = useState([]);
    const [item, setItem] = useState([]);
    const [imgRelateItem, setRelateItem] = useState([]);
    const [indexImg, setIndexImg] = useState(0);
    const [count, setCount] = useState(1);
    const [open, setOpen] = useState(false);
    const [dis, setDis] = useState(false);
    const [rating, setRating] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [listRatings, setListRatings] = useState([]);
    const [listItemLoai, setListItemLoai] = useState([]);
    const [cart, setCart] = useState(0);
    const [indexLoai, setIndexLoai] = useState(0);
    const [indexRelate, setIndexRelate] = useState(0);

    const id = localStorage.getItem('id');
    const { idItem } = useParams();

    useEffect(() => {
        async function Get() {
            setItem(await Details.Load(idItem));
            setImgItem(await Details.Images(idItem));
            if (await Items.RATED(id)) setRelateItem(await Items.OnLoad(id));
            else setRelateItem(await Items.OnLoad());
            setRating(await Details.RATING(idItem));
            setRatings(await Details.RATING());
            setListRatings(await Details.LIST_RATING(idItem));
            setCart(await Cart.COUNT_CART(id));
            setListItemLoai(await Details.ITEM_BYLOAI(idItem));
            return;
        }
        Get();
    }, [id, idItem]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleAddToCart = async () => {
        if (id) {
            setOpen(true);
            const body = {
                ID_VATPHAM: Number(idItem),
                SOLUONG: count,
                ID_KHACHHANG: Number(id),
                GHICHU: `Phân loại hàng: ${size.props.children[1].props.id}, ${color.props.children[1].props.id}`,
            };
            await Cart.ADD_TO_CART(body);
            window.localStorage.setItem('quantityCart', cart[0]?.QUANTITY + 1);
        } else window.location.replace('http://localhost:3000/login');
    };
    const handleClose = () => setOpen(false);
    const handleCountAdd = () => {
        setCount(count + 1);
        if (count >= 0) setDis(false);
        if (count > item[0]?.SOLUONG_TONKHO - 1) setDis(true);
    };
    const handleCountSub = () => {
        if (count > 0) setCount(count - 1);
        if (count < 2) setDis(true);
        if (count <= item[0]?.SOLUONG_TONKHO + 1) setDis(false);
    };
    const handleChangeQuantity = (event) => {
        const quality = Number(event.target.value);
        setCount(quality);
        if (quality > item[0]?.SOLUONG_TONKHO || quality === 0) setDis(true);
        else setDis(false);
    };
    const handleRightLoai = () => {
        if (indexLoai <= listItemLoai.length - 7) return setIndexLoai(indexLoai + 6);
        return setIndexLoai(0);
    };
    const handleLeftLoai = () => {
        if (indexLoai > 5) return setIndexLoai(indexLoai - 6);
        return setIndexLoai(listItemLoai.length - 7);
    };
    const handleRightRelate = () => {
        if (indexRelate <= imgRelateItem.length - 7) return setIndexRelate(indexRelate + 6);
        return setIndexRelate(0);
    };
    const handleLeftRelate = () => {
        if (indexRelate > 5) return setIndexRelate(indexRelate - 6);
        return setIndexRelate(imgRelateItem.length - 7);
    };

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 478,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        textAlign: 'center',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    let arrSize = [];
    let arrColor = [];
    if (item[0]?.SIZE.length > 0 && item[0]?.COLOR.length > 0) {
        for (let size of item[0].SIZE.split(', ')) {
            arrSize.push({ ID: size, VALUE: `Size ${size}` });
        }
        for (let color of item[0].COLOR.split(', ')) {
            arrColor.push({ ID: color, VALUE: `Màu ${color}` });
        }
    }
    const size = SelectBox('Size', arrSize);
    const color = SelectBox('Color', arrColor);
    if (!size) {
        return;
    }
    if (!color) {
        return;
    }

    var imgMain = imgItem[indexImg]?.TEN_HINHANH ? imgItem[indexImg]?.TEN_HINHANH : 'logo2.png';

    const imgs = imgItem?.map((img, index) => (
        <Card className={cx(styles.card)} key={index} sx={{ mb: '1.6rem', maxWidth: '7rem' }}>
            <CardActionArea>
                <CardMedia
                    onClick={() => setIndexImg(index)}
                    height="84"
                    key={index}
                    component="img"
                    image={url + '/images/' + img?.TEN_HINHANH}
                    alt="Yearoud"
                />
            </CardActionArea>
        </Card>
    ));
    //Đánh giá của vật phẩm
    const list = listRatings?.map((rate) => (
        <div className={cx(styles.list_rating)} key={rate.ID_RATING}>
            {rate.TEN_KHACHHANG}
            <br />
            <Rating size="large" key={rate.ID_RATING} value={rate?.RATING} readOnly />
            <br />
            <div className={cx(styles.nhanxet)}>
                <i>{rate.NHANXET}</i>
            </div>
        </div>
    ));

    for (var relative of imgRelateItem) {
        var valueRating = 0;
        var quantityRating = 0;
        for (var rate of ratings) {
            if (rate.ID_VATPHAM === relative.ID_VATPHAM) {
                valueRating = rate.RATING;
                quantityRating = rate.QUANTITY;
            }
        }
        relative.RATING = valueRating;
        relative.QUANTITYRATING = quantityRating;
    }

    var arrItems = imgRelateItem.map((item, index) => (
        <Link className={cx(styles.link)} key={index} to={`/details/${item.ID_VATPHAM}`}>
            <Card onClick={() => window.scrollTo(0, 0)} className={cx(styles.card)} key={index} sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia component="img" height="250" image={url + '/images/' + item.HINHANH} alt="Yearoud" />
                    <CardContent sx={{ height: 118 }}>
                        <Typography sx={{ color: 'black', fontSize: 16 }}>{item.TEN_VATPHAM}</Typography>
                        <Typography sx={{ color: '#ff1800', fontSize: 20 }}>{item.GIABAN}đ</Typography>
                        <div className={cx(styles.rating)}>
                            <Rating
                                key={`${index} - ${item.ID_VATPHAM}`}
                                value={item.RATING}
                                precision={0.1}
                                readOnly
                            />
                            ({item.RATING})
                        </div>
                        <i>{item.QUANTITYRATING} lượt đánh giá</i>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    ));

    const arrItemLoai = listItemLoai.map((item, index) => (
        <Link className={cx(styles.link)} key={index} to={`/details/${item.ID_VATPHAM}`}>
            <Card onClick={() => window.scrollTo(0, 0)} className={cx(styles.card)} key={index} sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia component="img" height="250" image={url + '/images/' + item.HINHANH} alt="Yearoud" />
                    <CardContent sx={{ height: 118 }}>
                        <Typography sx={{ color: 'black', fontSize: 16 }}>{item.TEN_VATPHAM}</Typography>
                        <Typography sx={{ color: '#ff1800', fontSize: 20 }}>{item.GIABAN}đ</Typography>
                        <div className={cx(styles.rating)}>
                            <Rating
                                key={`${index} - ${item.ID_VATPHAM}`}
                                value={item.RATING}
                                precision={0.1}
                                readOnly
                            />
                            ({item.RATING})
                        </div>
                        <i>{item.QUANTITYRATING} lượt đánh giá</i>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    ));

    const arrLoai = [
        arrItemLoai[indexLoai],
        arrItemLoai[indexLoai + 1],
        arrItemLoai[indexLoai + 2],
        arrItemLoai[indexLoai + 3],
        arrItemLoai[indexLoai + 4],
        arrItemLoai[indexLoai + 5],
    ];
    var arr = [
        arrItems[indexRelate],
        arrItems[indexRelate + 1],
        arrItems[indexRelate + 2],
        arrItems[indexRelate + 3],
        arrItems[indexRelate + 4],
        arrItems[indexRelate + 5],
    ];

    return (
        <div className={cx(styles.itemDetails)}>
            <div className={cx(styles.imgDetails)}>
                <div className={cx(styles.wrap_img_item)}>
                    <div className={cx(styles.img_item)}>
                        <div className={cx(styles.imgs)}>{imgs}</div>
                        <div className={cx(styles.img_main)}>
                            <CardMedia height="634" component="img" image={url + '/images/' + imgMain} alt="Yearoud" />
                        </div>
                    </div>
                </div>
                <div className={cx(styles.add_cart_item)}>
                    <div className={cx(styles.name_item)}>{item[0]?.TEN_VATPHAM}</div>
                    <div className={cx(styles.price_item)}>{item[0]?.GIABAN}đ</div>
                    <div className={cx(styles.rating)}>
                        <Rating key={rating.ID_VATPHAM} size="large" value={rating?.RATING} precision={0.1} readOnly />(
                        {rating.RATING ? rating.RATING : 0})
                    </div>
                    <i>{rating.QUANTITY} lượt đánh giá</i>
                    <div className={cx(styles.script_item)}>
                        Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare
                        feugiat.
                    </div>
                    <div className={cx(styles.flex)}>
                        <div className={cx(styles.lable_size)}>Size</div>
                        <div className={cx(styles.select_box)}>{size}</div>
                    </div>
                    <div className={cx(styles.flex)}>
                        <div className={cx(styles.lable_color)}>Color</div>
                        <div className={cx(styles.select_box)}>{color}</div>
                    </div>
                    <div className={cx(styles.quantity_option)}>
                        <IconButton onClick={handleCountSub}>
                            <RemoveIcon sx={{ width: '3rem', height: '3rem' }} />
                        </IconButton>
                        <input
                            className={cx(styles.input_quality)}
                            onChange={handleChangeQuantity}
                            value={count}
                        ></input>
                        <IconButton onClick={handleCountAdd}>
                            <AddIcon sx={{ width: '3rem', height: '3rem' }} />
                        </IconButton>
                        <i>{item[0]?.SOLUONG_TONKHO} sản phẩm có sẵn</i>
                    </div>
                    <div className={cx(styles.flex)}>
                        <Modal open={open} onClose={handleClose}>
                            <Box sx={{ ...styleModal, width: 478 }}>
                                <TaskAltIcon sx={{ fontSize: 80 }} color="success" />
                                <h2>{item[0]?.TEN_VATPHAM}</h2>
                                <p>
                                    Phân loại hàng: {size.props.children[1].props.id},{' '}
                                    {color.props.children[1].props.id}
                                </p>
                                <p>Đã được thêm vào giỏ hàng.</p>
                                <Button
                                    onClick={() => {
                                        handleClose();
                                        window.location.replace(`http://localhost:3000/details/${idItem}`);
                                    }}
                                    sx={{ fontSize: 16, borderRadius: 23 }}
                                    variant="outlined"
                                >
                                    Close
                                </Button>
                            </Box>
                        </Modal>
                        <Button
                            disabled={dis}
                            onClick={handleAddToCart}
                            sx={{ fontSize: 16, borderRadius: 23 }}
                            variant="contained"
                        >
                            ADD TO CART
                        </Button>
                    </div>
                    <div className={cx(styles.flex_center)}>
                        <Stack direction="row" spacing={1}>
                            <IconButton>
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton color="success">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton color="success">
                                <GoogleIcon />
                            </IconButton>
                            <IconButton color="success">
                                <TwitterIcon />
                            </IconButton>
                        </Stack>
                    </div>
                </div>
            </div>
            <div className={cx(styles.details_item)}>
                <Box sx={{ border: 1, borderColor: 'divider', width: '100%' }}>
                    <TabContext value={value}>
                        <Box>
                            <TabList onChange={handleChange} centered>
                                <Tab
                                    sx={{ fontSize: '1.5rem', fontFamily: 'Poppins-Regular' }}
                                    value="1"
                                    label="Thông tin sản phẩm"
                                />
                                <Tab
                                    sx={{ fontSize: '1.5rem', fontFamily: 'Poppins-Regular' }}
                                    value="2"
                                    label="Mô tả"
                                />
                                <Tab
                                    sx={{ fontSize: '1.5rem', fontFamily: 'Poppins-Regular' }}
                                    value="3"
                                    label={`Đánh giá(${rating.QUANTITY})`}
                                />
                            </TabList>
                        </Box>
                        <TabPanel sx={{ fontFamily: 'Poppins-Regular' }} value="2">
                            - Size vật phẩm:<span className={cx(styles.weight_600)}> {item[0]?.SIZE}</span> <br />- Màu
                            sắc vật phẩm: <span className={cx(styles.weight_600)}> {item[0]?.COLOR}</span> <br />- Xuất
                            xứ vật phẩm: <span className={cx(styles.weight_600)}> {item[0]?.XUATXU}</span>
                        </TabPanel>
                        <TabPanel sx={{ fontFamily: 'Poppins-Regular' }} value="1">
                            - Size vật phẩm:<span className={cx(styles.weight_600)}> {item[0]?.SIZE}</span> <br />- Màu
                            sắc vật phẩm: <span className={cx(styles.weight_600)}> {item[0]?.COLOR}</span> <br />- Xuất
                            xứ vật phẩm: <span className={cx(styles.weight_600)}> {item[0]?.XUATXU}</span>
                        </TabPanel>
                        <TabPanel value="3">
                            <div className={cx(styles.list_ratings)}>{list}</div>
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
            <div className={cx(styles.related)}>
                <h3 className={styles.h3_related}>Sản phẩm tương tự</h3>
                <div className={cx(styles.related_item)}>
                    <IconButton sx={{ mr: '-2rem' }} onClick={handleLeftLoai}>
                        <ArrowCircleLeftIcon sx={{ width: '4rem', height: '4rem' }} />
                    </IconButton>
                    {arrLoai}
                    <IconButton sx={{ ml: '-2rem' }} onClick={handleRightLoai}>
                        <ArrowCircleRightIcon sx={{ width: '4rem', height: '4rem' }} />
                    </IconButton>
                </div>
            </div>
            <div className={cx(styles.related)}>
                <h3 className={styles.h3_related}>Có thể bạn sẽ thích</h3>
                <div className={cx(styles.related_item)}>
                    <IconButton sx={{ mr: '-2rem' }} onClick={handleLeftRelate}>
                        <ArrowCircleLeftIcon sx={{ width: '4rem', height: '4rem' }} />
                    </IconButton>
                    {arr}
                    <IconButton sx={{ ml: '-2rem' }} onClick={handleRightRelate}>
                        <ArrowCircleRightIcon sx={{ width: '4rem', height: '4rem' }} />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default ItemDetails;

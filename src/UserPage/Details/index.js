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

    const { id, idItem } = useParams();

    useEffect(() => {
        async function Get() {
            return setItem(await Details.Load(idItem));
        }
        async function GetImg() {
            return setImgItem(await Details.Images(idItem));
        }
        async function GetItem() {
            return setRelateItem(await Items.OnLoad(id));
        }
        async function GetRating() {
            return setRating(await Details.RATING(idItem));
        }
        async function GetRatings() {
            return setRatings(await Details.RATING());
        }
        async function GetListRating() {
            return setListRatings(await Details.LIST_RATING(idItem));
        }
        Get();
        GetImg();
        GetItem();
        GetRating();
        GetRatings();
        GetListRating();
    }, [id, idItem]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCountAdd = () => {
        setCount(count + 1);
        if (count >= 0) setDis(false);
    };
    const handleCountSub = () => {
        if (count > 0) setCount(count - 1);
        if (count < 2) setDis(true);
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

    const size = SelectBox('Size', [
        { ID: 'S', VALUE: 'Size S' },
        { ID: 'M', VALUE: 'Size M' },
        { ID: 'L', VALUE: 'Size L' },
        { ID: 'XL', VALUE: 'Size XL' },
        { ID: 'XXL', VALUE: 'Size XXL' },
    ]);
    const color = SelectBox('Color', [
        { ID: '1', VALUE: 'Trắng' },
        { ID: '2', VALUE: 'Đen' },
        { ID: '3', VALUE: 'Xám' },
    ]);
    if (!size) {
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

    const list = listRatings?.map((rate) => (
        <div className={cx(styles.list_rating)} key={rate.ID_RATING}>
            {rate.TEN_KHACHHANG}
            <br />
            <Rating size="large" key={rate.ID_RATING} defaultValue={rate?.RATING} readOnly />
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

    var arrItems = [];
    if (id) {
        arrItems = imgRelateItem.map((item, index) => (
            <Link className={cx(styles.link)} key={index} to={`/details/${id}/${item.ID_VATPHAM}`}>
                <Card
                    onClick={() => window.scrollTo(0, 0)}
                    className={cx(styles.card)}
                    key={index}
                    sx={{ maxWidth: 345 }}
                >
                    <CardActionArea>
                        <CardMedia component="img" height="250" image={url + '/images/' + item.HINHANH} alt="Yearoud" />
                        <CardContent sx={{ height: 118 }}>
                            <Typography sx={{ color: 'black', fontSize: 16 }}>{item.TEN_VATPHAM}</Typography>
                            <Typography sx={{ color: '#ff1800', fontSize: 20 }}>{item.GIABAN}đ</Typography>
                            <div className={cx(styles.rating)}>
                                <Rating defaultValue={item.RATING} precision={0.1} readOnly />({item.RATING})
                            </div>
                            <i>{item.QUANTITYRATING} lượt đánh giá</i>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        ));
    } else {
        arrItems = imgRelateItem.map((item, index) => (
            <Link className={cx(styles.link)} key={index} to={`/details/${item.ID_VATPHAM}`}>
                <Card
                    onClick={() => window.scrollTo(0, 0)}
                    className={cx(styles.card)}
                    key={index}
                    sx={{ maxWidth: 345 }}
                >
                    <CardActionArea>
                        <CardMedia component="img" height="250" image={url + '/images/' + item.HINHANH} alt="Yearoud" />
                        <CardContent sx={{ height: 118 }}>
                            <Typography sx={{ color: 'black', fontSize: 16 }}>{item.TEN_VATPHAM}</Typography>
                            <Typography sx={{ color: '#ff1800', fontSize: 20 }}>{item.GIABAN}đ</Typography>
                            <div className={cx(styles.rating)}>
                                <Rating defaultValue={item.RATING} precision={0.1} readOnly />({item.RATING})
                            </div>
                            <i>{item.QUANTITYRATING} lượt đánh giá</i>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        ));
    }

    var arr = [arrItems[0], arrItems[1], arrItems[2], arrItems[3], arrItems[4], arrItems[5]];

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
                        <Rating
                            key={rating.ID_VATPHAM}
                            size="large"
                            defaultValue={rating?.RATING}
                            precision={0.1}
                            readOnly
                        />
                        ({rating.RATING})
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
                    <div className={cx(styles.flex_center)}>
                        <IconButton onClick={handleCountSub}>
                            <RemoveIcon sx={{ width: '3rem', height: '3rem' }} />
                        </IconButton>
                        <input className={cx(styles.input_quality)} type="number" readOnly value={count}></input>
                        <IconButton onClick={handleCountAdd}>
                            <AddIcon sx={{ width: '3rem', height: '3rem' }} />
                        </IconButton>
                    </div>
                    <div className={cx(styles.flex)}>
                        <Modal open={open} onClose={handleClose}>
                            <Box sx={{ ...styleModal, width: 478 }}>
                                <TaskAltIcon sx={{ fontSize: 80 }} color="success" />
                                <h2>{item[0]?.TEN_VATPHAM}</h2>
                                <p>is added to cart.</p>
                                <Button
                                    onClick={handleClose}
                                    sx={{ fontSize: 16, borderRadius: 23 }}
                                    variant="outlined"
                                >
                                    Close
                                </Button>
                            </Box>
                        </Modal>
                        <Button
                            disabled={dis}
                            onClick={handleOpen}
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
                                    label="Mô tả"
                                />
                                <Tab
                                    sx={{ fontSize: '1.5rem', fontFamily: 'Poppins-Regular' }}
                                    value="2"
                                    label="Thông tin sản phẩm"
                                />
                                <Tab
                                    sx={{ fontSize: '1.5rem', fontFamily: 'Poppins-Regular' }}
                                    value="3"
                                    label={`Đánh giá(${rating.QUANTITY})`}
                                />
                            </TabList>
                        </Box>
                        <TabPanel sx={{ fontFamily: 'Poppins-Regular' }} value="1">
                            Mô tả sản phẩm
                        </TabPanel>
                        <TabPanel sx={{ fontFamily: 'Poppins-Regular' }} value="2">
                            Thông tin sản phẩm
                        </TabPanel>
                        <TabPanel value="3">
                            <div className={cx(styles.list_ratings)}>{list}</div>
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
            <div className={cx(styles.related)}>
                <h3 className={styles.h3_related}>Sản phẩm liên quan</h3>
                <div className={cx(styles.related_item)}>{arr}</div>
            </div>
        </div>
    );
}

export default ItemDetails;

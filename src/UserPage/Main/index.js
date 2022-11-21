import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import cx from 'clsx';
// import images from '../../assets/images';
import styles from './Main.module.scss';
const Items = require('../../Controller/ItemsController');
const url = 'http://localhost:8081';

function Main() {
    const [items, setItems] = useState([]);
    const [checked, setChecked] = useState([true, true, true, true]);
    const id = localStorage.getItem('id');

    useEffect(() => {
        async function Get() {
            if (id) setItems(await Items.OnLoad(id));
            else setItems(await Items.OnLoad());
        }
        Get();
    }, [id]);

    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked, event.target.checked, event.target.checked]);
    };
    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1], checked[2], checked[3]]);
    };
    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked, checked[2], checked[3]]);
    };
    const handleChange4 = (event) => {
        setChecked([checked[0], checked[1], event.target.checked, checked[3]]);
    };
    const handleChange5 = (event) => {
        setChecked([checked[0], checked[1], checked[2], event.target.checked]);
    };

    var arr = items.map((item, index) => (
        <Link className={cx(styles.link)} key={index} to={`/details/${item.ID_VATPHAM}`}>
            <Card onClick={() => window.scrollTo(0, 0)} className={cx(styles.card)} key={index} sx={{ maxWidth: 400 }}>
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

    return (
        <div className={cx(styles.container)}>
            <div className={cx(styles.nav_filter)}>
                <FormGroup>
                    <FormControlLabel
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: 16 } }}
                        control={
                            <Checkbox
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }}
                                checked={checked[0] && checked[1] && checked[2] && checked[3]}
                                onChange={handleChange1}
                            />
                        }
                        label="Tất cả"
                    />
                    <FormControlLabel
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: 16 } }}
                        control={
                            <Checkbox
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }}
                                checked={checked[0]}
                                onChange={handleChange2}
                            />
                        }
                        label="Áo"
                    />
                    <FormControlLabel
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: 16 } }}
                        control={
                            <Checkbox
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }}
                                checked={checked[1]}
                                onChange={handleChange3}
                            />
                        }
                        label="Quần"
                    />
                    <FormControlLabel
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: 16 } }}
                        control={
                            <Checkbox
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }}
                                checked={checked[2]}
                                onChange={handleChange4}
                            />
                        }
                        label="Giày"
                    />
                    <FormControlLabel
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: 16 } }}
                        control={
                            <Checkbox
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }}
                                checked={checked[3]}
                                onChange={handleChange5}
                            />
                        }
                        label="Đồng hồ"
                    />
                </FormGroup>
            </div>
            <div className={cx(styles.items_grid)}>
                {arr}
                <div className={cx(styles.bottom_content)}>
                    <button className={cx(styles.load_btn)}>Load More</button>
                </div>
            </div>
        </div>
    );
}

export default Main;

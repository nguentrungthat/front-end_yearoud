import { useState } from 'react';
import cx from 'clsx';
import TableRow from '@mui/material/TableRow';
import CardMedia from '@mui/material/CardMedia';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styles from '../../UserPage/Cart/Cart.module.scss';
const url = 'http://localhost:8081';

export default function ROWS(items) {
    const [count, setCount] = useState([]);
    const [price, setPrice] = useState([]);

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

    var rows = items.map((item, index) => (
        <TableRow key={item.ID_VATPHAM} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell className={cx(styles.img_name_item)} sx={{ fontSize: 14 }} component="th" scope="row">
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
                            setCount(count[index] - 1);
                            setPrice(item.GIABAN * (count[index] - 1));
                        }
                    }}
                >
                    <RemoveIcon sx={{ width: '3rem', height: '3rem' }} />
                </IconButton>
                <input className={cx(styles.input_quality)} type="number" readOnly value={count[index]}></input>
                <IconButton
                    onClick={() => {
                        console.log(count[index]);
                        setCount(count[index] + 1);
                    }}
                >
                    <AddIcon sx={{ width: '3rem', height: '3rem' }} />
                </IconButton>
            </TableCell>
            <TableCell sx={{ fontSize: 16 }} align="right">
                {price[index]}
            </TableCell>
        </TableRow>
    ));
    return { rows };
}

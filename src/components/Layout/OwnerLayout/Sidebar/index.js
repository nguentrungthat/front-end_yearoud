import cx from 'clsx';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import images from '../../../../assets/images';
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faFileContract, faHouse } from '@fortawesome/free-solid-svg-icons';
const KhachHang = require('../../../../Controller/KhachHangController');

function Sidebar() {
    const [owner, setOwner] = useState({});

    const { id } = useParams();

    useEffect(() => {
        async function Get() {
            setOwner((await KhachHang.GET_KH(id))[0]);
        }
        Get();
    }, [id]);

    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
    };
    const ListTextStyle = {
        fontSize: '2.4rem',
        ml: '15%',
    };

    return (
        <div className={cx(styles.page_sidebar)}>
            <div className={cx(styles.sidebar_user)}>
                <Avatar alt="Admin" src={images.adminAvt} sx={{ width: 56, height: 56 }} />
                <div className={cx(styles.user_info)}>
                    <div className={cx(styles.user_name)}>{owner.TEN_KHACHHANG}</div>
                    <small className={cx(styles.user_title)}>
                        <i>Owner</i>
                    </small>
                </div>
            </div>
            <List sx={style} component="nav" aria-label="mailbox folders">
                <Divider />
                <Link className={cx(styles.link)} to={`/admin/${id}`}>
                    <ListItem button>
                        <FontAwesomeIcon className={cx(styles.icon)} icon={faHouse} />
                        <ListItemText primaryTypographyProps={ListTextStyle} primary="Dashboard" />
                    </ListItem>
                </Link>
                <Divider />
                <Link className={cx(styles.link)} to={`/admin/${id}/VatPham`}>
                    <ListItem button divider>
                        <FontAwesomeIcon className={cx(styles.icon)} icon={faCubes} />
                        <ListItemText primaryTypographyProps={ListTextStyle} primary="Vật Phẩm" />
                    </ListItem>
                </Link>
                <Divider />
                <Link className={cx(styles.link)} to={`/admin/${id}/thongke`}>
                    <ListItem button>
                        <FontAwesomeIcon className={cx(styles.icon)} icon={faFileContract} />
                        <ListItemText primaryTypographyProps={ListTextStyle} primary="Thống Kê" />
                    </ListItem>
                </Link>
            </List>
        </div>
    );
}

export default Sidebar;

import cx from 'clsx';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import images from '../../../../assets/images';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

// import images from '../../../../assets/images';
import styles from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faFileContract, faHouse, faShop, faUsers, faTicket } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
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
                    <div className={cx(styles.user_name)}>Nguyen Trung That</div>
                    <small className={cx(styles.user_title)}>
                        <i>Administrator</i>
                    </small>
                </div>
            </div>
            <List sx={style} component="nav" aria-label="mailbox folders">
                <Divider />
                <Link className={cx(styles.link)} to={'/admin'}>
                    <ListItem button>
                        <FontAwesomeIcon className={cx(styles.icon)} icon={faHouse} />
                        <ListItemText primaryTypographyProps={ListTextStyle} primary="Dashboard" />
                    </ListItem>
                </Link>
                <Divider />
                <Link className={cx(styles.link)} to={'/admin/VatPham'}>
                    <ListItem button divider>
                        <FontAwesomeIcon className={cx(styles.icon)} icon={faCubes} />
                        <ListItemText primaryTypographyProps={ListTextStyle} primary="V???t Ph???m" />
                    </ListItem>
                </Link>
                <Link className={cx(styles.link)} to={'/admin/KhachHang'}>
                    <ListItem button>
                        <FontAwesomeIcon className={cx(styles.icon)} icon={faUsers} />
                        <ListItemText primaryTypographyProps={ListTextStyle} primary="Kh??ch H??ng" />
                    </ListItem>
                </Link>
                <Divider light />
                <Link className={cx(styles.link)} to={'/admin/CuaHang'}>
                    <ListItem button>
                        <FontAwesomeIcon className={cx(styles.icon)} icon={faShop} />
                        <ListItemText primaryTypographyProps={ListTextStyle} primary="C???a H??ng" />
                    </ListItem>
                </Link>
                <Divider light />
                <Link className={cx(styles.link)} to={'/admin/magiamgia'}>
                    <ListItem button>
                        <FontAwesomeIcon className={cx(styles.icon)} icon={faTicket} />
                        <ListItemText primaryTypographyProps={ListTextStyle} primary="M?? Gi???m gi??" />
                    </ListItem>
                </Link>
                <Divider light />
                <Link className={cx(styles.link)} to={'/admin/thongke'}>
                    <ListItem button>
                        <FontAwesomeIcon className={cx(styles.icon)} icon={faFileContract} />
                        <ListItemText primaryTypographyProps={ListTextStyle} primary="Th???ng K??" />
                    </ListItem>
                </Link>
            </List>
        </div>
    );
}

export default Sidebar;

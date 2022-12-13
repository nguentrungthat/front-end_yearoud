import cx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import images from '../../../../assets/images';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const KhachHang = require('../../../../Controller/KhachHangController');

function Header() {
    const [open, setOpen] = useState(false);
    const [owner, setOwner] = useState({});

    const { id } = useParams();

    useEffect(() => {
        async function Get() {
            setOwner((await KhachHang.GET_KH(id))[0]);
        }
        Get();
    }, [id]);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <header className={cx(styles.header)}>
            <div className={cx(styles.inner)}>
                <div className={cx(styles.page_logo)}>
                    <Link className={cx(styles.link)} to={'/'}>
                        <img className={cx(styles.brand_logo)} src={images.logo} alt="Yearoud"></img>
                        <span className={cx(styles.brand_mini)}>YR</span>
                    </Link>
                </div>
                <div className={cx(styles.inner_content)}>
                    <button className={cx(styles.sidebar_toggler)}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>

                    <div className={cx(styles.options)}>
                        <List
                            sx={{
                                width: '100%',
                            }}
                            component="nav"
                        >
                            <div className={cx(styles.user)}>
                                <ListItemButton
                                    sx={{
                                        height: '5rem',
                                    }}
                                    onClick={handleClick}
                                >
                                    <ListItemText sx={{ '& .MuiListItemText-root': { fontSize: '30px' } }}>
                                        {owner.TEN_KHACHHANG}
                                    </ListItemText>
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemButton
                                            onClick={() => window.location.replace('http://localhost:3000/')}
                                            sx={{ pl: 4 }}
                                        >
                                            <ListItemText primary="Đăng xuất" />
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                            </div>
                        </List>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

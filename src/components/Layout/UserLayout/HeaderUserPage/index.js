import { useState, useEffect } from 'react';
import cx from 'clsx';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import images from '../../../../assets/images';
import styles from './HeaderUserPage.module.scss';
import { Button } from '@mui/material';
const Items = require('../../../../Controller/ItemsController');
const Cart = require('../../../../Controller/CartController');

function Header() {
    const [user, setUser] = useState([]);
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState(0);
    const [search, setSearch] = useState('');

    const id = localStorage.getItem('id');

    useEffect(() => {
        if (id) {
            async function Get() {
                return setUser(await Items.USER(id));
            }
            async function GetCount() {
                return setCart(await Cart.COUNT_CART(id));
            }
            Get();
            GetCount();
        }
    }, [id]);

    const handleClick = () => {
        setOpen(!open);
        setTimeout(() => setOpen(false), 6000);
    };

    var userLogin = null;
    var link = '/';
    if (id) {
        userLogin = (
            <div className={cx(styles.options)}>
                <div className={cx(styles.options_btn)}>
                    <IconButton sx={{ mr: 1 }}>
                        <Badge badgeContent={0} color="primary">
                            <FavoriteIcon sx={{ fontSize: 24 }} />
                        </Badge>
                    </IconButton>
                    <Link className={cx(styles.link)} to={`/cart`}>
                        <IconButton onClick={() => window.scrollTo(0, 0)} sx={{ mr: 2 }}>
                            <Badge badgeContent={cart[0]?.QUANTITY} color="primary">
                                <ShoppingCartIcon sx={{ fontSize: 24 }} />
                            </Badge>
                        </IconButton>
                    </Link>
                </div>
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
                                {user[0]?.TEN_KHACHHANG}
                            </ListItemText>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        window.location.replace('http://localhost:3000/user');
                                    }}
                                    sx={{ pl: 4 }}
                                >
                                    <ListItemText primary="Th??ng tin" />
                                </ListItemButton>
                                <ListItemButton
                                    onClick={() => {
                                        window.location.replace('http://localhost:3000/user/purchase');
                                    }}
                                    sx={{ pl: 4 }}
                                >
                                    <ListItemText primary="????n mua" />
                                </ListItemButton>
                                <ListItemButton
                                    onClick={() => {
                                        localStorage.removeItem('id');
                                        window.location.replace('http://localhost:3000/');
                                    }}
                                    sx={{ pl: 4 }}
                                >
                                    <ListItemText primary="????ng xu???t" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </div>
                </List>
            </div>
        );
    } else {
        userLogin = (
            <div className={cx(styles.options)}>
                <Link className={cx(styles.link)} to="/login">
                    <div className={cx(styles.btn_login)}>
                        <Button variant="contained" sx={{ fontSize: '16px' }}>
                            ????ng nh???p
                        </Button>
                    </div>
                </Link>
            </div>
        );
    }

    return (
        <header className={cx(styles.header)}>
            <div className={cx(styles.inner)}>
                <div className={cx(styles.page_logo)}>
                    <Link className={cx(styles.link)} to={link}>
                        <img
                            onClick={() => window.scrollTo(0, 0)}
                            className={cx(styles.brand_logo)}
                            src={images.logo}
                            alt="Yearoud"
                        ></img>
                        <span className={cx(styles.brand_mini)}>YR</span>
                    </Link>
                </div>
                <div className={cx(styles.inner_content)}>
                    <button className={cx(styles.sidebar_toggler)}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <div className={cx(styles.search_box)}>
                        <input
                            value={search}
                            className={cx(styles.search_input)}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search here..."
                            spellCheck={false}
                        />
                        <button className={cx(styles.search_btn_clear)} onClick={() => setSearch('')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <Link className={cx(styles.link)} to={`/${search}`}>
                            <button className={cx(styles.search_btn)}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </Link>
                    </div>
                    {userLogin}
                </div>
            </div>
            <div className={cx(styles.scrollTop)}>
                <IconButton onClick={() => window.scrollTo(0, 0)}>
                    <ArrowCircleUpIcon sx={{ fontSize: '5rem' }} />
                </IconButton>
            </div>
        </header>
    );
}

export default Header;

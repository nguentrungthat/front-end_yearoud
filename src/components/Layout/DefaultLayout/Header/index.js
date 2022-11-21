import cx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import images from '../../../../assets/images';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header() {
    const [open, setOpen] = useState(false);
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
                    <div className={cx(styles.search_box)}>
                        <input className={cx(styles.search_input)} placeholder="Search here..." spellCheck={false} />
                        <button className={cx(styles.search_btn_clear)}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <button className={cx(styles.search_btn)}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
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
                                        Administrator
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

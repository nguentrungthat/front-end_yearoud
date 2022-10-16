import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Button from '@mui/material/Button';
import cx from 'clsx';
import styles from './FooterUserPage.module.scss';

function Footer() {
    return (
        <footer className={cx(styles.footer)}>
            <div className={cx(styles.footer_container)}>
                <div className={cx(styles.helps)}>
                    <h4 className={cx(styles.title)}>Chăm sóc khách hàng</h4>
                    <ul className={cx(styles.ul)}>
                        <li className={cx(styles.li)}>
                            <span>Trung tâm trợ giúp</span>
                        </li>
                        <li className={cx(styles.li)}>
                            <span>Hướng dẫn mua hàng</span>
                        </li>
                        <li className={cx(styles.li)}>
                            <span>Hướng dẫn thanh toán</span>
                        </li>
                        <li className={cx(styles.li)}>
                            <span>Chăm sóc khách hàng</span>
                        </li>
                    </ul>
                </div>
                <div className={cx(styles.info)}>
                    <h4 className={cx(styles.title)}>Thông tin về chúng tôi</h4>
                    <ul className={cx(styles.ul)}>
                        <li className={cx(styles.li)}>
                            <span>Giới thiệu</span>
                        </li>
                        <li className={cx(styles.li)}>
                            <span>Điểu khoản</span>
                        </li>
                        <li className={cx(styles.li)}>
                            <span>Chính sách bảo mật</span>
                        </li>
                        <li className={cx(styles.li)}>
                            <span>Tuyển dụng</span>
                        </li>
                    </ul>
                </div>
                <div className={cx(styles.contact)}>
                    <h4 className={cx(styles.title)}>Thông tin liên hệ</h4>
                    <ul className={cx(styles.ul)}>
                        <li className={cx(styles.li)}>
                            <span className={cx(styles.span_contacts)}>
                                <FacebookIcon sx={{ fontSize: 16, mr: 1 }} />
                                Facebook
                            </span>
                        </li>
                        <li className={cx(styles.li)}>
                            <span className={cx(styles.span_contacts)}>
                                <InstagramIcon sx={{ fontSize: 16, mr: 1 }} />
                                Instagram
                            </span>
                        </li>
                        <li className={cx(styles.li)}>
                            <span className={cx(styles.span_contacts)}>
                                <TwitterIcon sx={{ fontSize: 16, mr: 1 }} />
                                Twitter
                            </span>
                        </li>
                        <li className={cx(styles.li)}>
                            <span className={cx(styles.span_contacts)}>
                                <LinkedInIcon sx={{ fontSize: 16, mr: 1 }} />
                                LinkedIn
                            </span>
                        </li>
                    </ul>
                </div>
                <div className={cx(styles.feedback)}>
                    <h4 className={cx(styles.title)}>Phản hồi</h4>
                    <div className={cx(styles.input_border)}>
                        <textarea className={cx(styles.input_area)} placeholder="Ý kiến phản hồi" />
                    </div>
                    <Button sx={{ fontSize: 16, borderRadius: 23, width: 120, height: 36, mt: 1 }} variant="contained">
                        Gửi
                    </Button>
                </div>
            </div>
            <span className={cx(styles.copyright)}>Copyright ©2022 by Nguyễn Trung Thật</span>
        </footer>
    );
}

export default Footer;

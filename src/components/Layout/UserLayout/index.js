import cx from 'clsx';
import Header from './HeaderUserPage/index';
import Footer from './FooterUserPage/index';
import styles from './HeaderUserPage/HeaderUserPage.module.scss';

function UserLayout({ children }) {
    return (
        <div>
            <Header />
            <div className={cx(styles.container)}>
                <div className={cx(styles.content)}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default UserLayout;

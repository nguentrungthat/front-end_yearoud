import cx from 'clsx';
import Header from './Header';
import styles from './DefaultLayout.module.scss';
import Sidebar from './Sidebar';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className={cx(styles.container)}>
                <Sidebar />
                <div className={cx(styles.content)}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;

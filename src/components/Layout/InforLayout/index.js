import clsx from 'clsx';
import Nav from '../../MiniPart/InforNav';
import Header from '../UserLayout/HeaderUserPage/index';
import Footer from '../UserLayout/FooterUserPage/index';
import styles from '../../../UserPage/Information/Information.module.scss';

function InforLayout({ children }) {
    return (
        <>
            <Header />
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.container_infor)}>
                    <Nav />
                    {children}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default InforLayout;

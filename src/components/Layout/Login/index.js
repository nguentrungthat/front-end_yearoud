import cx from 'clsx';
import styles from './Login.module.scss';

function Login({ children }) {
    return <div className={cx(styles.container)}>{children}</div>;
}

export default Login;

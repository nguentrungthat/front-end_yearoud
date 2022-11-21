import Api from './api';

async function Login(account, password) {
    const res = await Api.Post('login', { ACCOUNT: account, PASSWORD: password });
    if (res.ID_ACCOUNT === 1) {
        return window.location.replace('http://localhost:3000/admin');
    } else {
        window.localStorage.setItem('id', res.ID_KHACHHANG);
        return window.location.replace(`http://localhost:3000`);
    }
}

export { Login };

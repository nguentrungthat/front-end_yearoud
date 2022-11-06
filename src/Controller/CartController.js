import Api from './api';

async function GET_CART(id) {
    const body = await Api.Post('cart', { ID_KHACHHANG: id });
    for (const value of body) {
        const img = await Api.Post('items/images/', { ID_VATPHAM: value.ID_VATPHAM });
        value.IMG = img[0]?.TEN_HINHANH ? img[0]?.TEN_HINHANH : 'logo2.png';
    }
    return body;
}

async function COUNT_CART(id) {
    const body = await Api.Post('cart/count', { ID_KHACHHANG: id });
    return body;
}

export { GET_CART, COUNT_CART };

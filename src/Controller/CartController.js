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

async function ADD_TO_CART(body) {
    return await Api.Post('cart/add', {
        ID_VATPHAM: body.ID_VATPHAM,
        SOLUONG: body.SOLUONG,
        ID_KHACHHANG: body.ID_KHACHHANG,
    });
}

async function DELETE_CART(id) {
    const body = await Api.Post('cart/delete', { ID_CART: id });
    return body;
}

async function UPDATE_CART(body) {
    for (const value of body) {
        await Api.Post('cart/update', { ID_CART: value.ID_CART, SOLUONG: value.SOLUONG });
    }

    return;
}

async function PRE_PURCHASE(KH, STORE, ITEMS, ADDRESS) {
    return await Api.GHN_Preview(KH, STORE, ITEMS, ADDRESS);
}

async function PURCHASE(KH, STORE, ITEMS, ADDRESS) {
    return await Api.GHN_Create(KH, STORE, ITEMS, ADDRESS);
}

export { GET_CART, COUNT_CART, ADD_TO_CART, DELETE_CART, UPDATE_CART, PURCHASE, PRE_PURCHASE };

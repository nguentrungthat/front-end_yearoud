import Api from './api';

async function GET() {
    var body = null;
    body = await Api.Get('items');
    return body;
}

async function POST_ITEM(arr) {
    var body = [];
    for (const id of arr) {
        body = body.concat(await Api.Post('items/id', { ID_VATPHAM: id }));
    }
    return body;
}

async function OnLoad() {
    var body = null;
    body = await Api.Get('items');
    for (const elm of body) {
        var itemImg = await Api.Post('items/images/', { ID_VATPHAM: elm?.ID_VATPHAM });
        elm.HINHANH = itemImg[0].TEN_HINHANH;
    }
    return body;
}

async function USER(id) {
    var body = await Api.Post('khachhangs/id', { ID_KHACHHANG: id });
    return body;
}

async function RATING() {
    var body = await Api.Get('rating');
    return body;
}

export { GET, OnLoad, POST_ITEM, USER, RATING };

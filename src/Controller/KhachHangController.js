import Api from './api';

async function GET() {
    var body = null;
    body = await Api.Get('khachhangs');
    return body;
}

async function GET_KH(id) {
    return await Api.Post('khachhangs/id', { ID_KHACHHANG: id });
}

async function GET_ACCOUNT(id) {
    return await Api.Post('khachhangs/account', { ID_KHACHHANG: id });
}

async function CHANGE_PASS(body) {
    return await Api.Post('khachhangs/changepass', { ID_KHACHHANG: body.ID_KHACHHANG, PASS: body.PASS });
}

async function PASS(body) {
    return await Api.Post('khachhangs/pass', { ID_KHACHHANG: body.ID_KHACHHANG, PASS: body.PASS });
}

export { GET, GET_KH, GET_ACCOUNT, CHANGE_PASS, PASS };

import Api from './api';

async function GET(body) {
    return await Api.Post('thongke', body);
}

async function GET_VP(body) {
    return await Api.Post('thongke/vatpham', body);
}

async function GET_LOAIVP() {
    return await Api.Get('items/getloai');
}

export { GET, GET_LOAIVP, GET_VP };

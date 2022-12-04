import Api from './api';

async function GET() {
    var body = null;
    body = await Api.Get('thongke');
    return body;
}

async function GET_LOAIVP() {
    var body = null;
    body = await Api.Get('items/getloai');
    return body;
}

export { GET, GET_LOAIVP };

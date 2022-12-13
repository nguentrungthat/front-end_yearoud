import Api from './api';

async function GET() {
    var body = null;
    body = await Api.Get('dashboards');
    return body;
}

async function GET_TOP_VATPHAM(id) {
    var body = null;
    if (id) body = await Api.Post('dashboards/topsanpham', { ID_KHACHHANG: id });
    else body = await Api.Get('dashboards/topsanpham');
    return body;
}

async function GET_TOP_DONMUA(id) {
    var body = null;
    if (id) body = await Api.Post('dashboards/topdonmua', { ID_KHACHHANG: id });
    else body = await Api.Get('dashboards/topdonmua');
    return body;
}

async function GET_DOANHTHU(id) {
    var body = null;
    if (id) body = await Api.Post('dashboards/doanhthu', { ID_KHACHHANG: id });
    else body = await Api.Get('dashboards/doanhthu');
    return body;
}

async function GET_KHACHHANG() {
    var body = null;
    body = await Api.Get('dashboards/khachhang');
    return body;
}

async function GET_DONMUA(id) {
    var body = null;
    if (id) body = await Api.Post('dashboards/donmua', { ID_KHACHHANG: id });
    else body = await Api.Get('dashboards/donmua');
    return body;
}

export { GET, GET_TOP_VATPHAM, GET_TOP_DONMUA, GET_DOANHTHU, GET_KHACHHANG, GET_DONMUA };

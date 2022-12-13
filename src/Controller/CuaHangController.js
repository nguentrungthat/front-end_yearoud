import Api from './api';

async function GET() {
    let body = await Api.Get('stores');
    let rows = [];
    for (const cuahang of body) {
        let trangthai = 'Chờ xét duyệt';
        if (cuahang.STATUS === 1) trangthai = 'Đã xét duyệt';
        let row = {
            id: cuahang.ID_STORE,
            col1: cuahang.TEN_STORE,
            col2: cuahang.SDT,
            col3: cuahang.ADDRESS,
            col4: cuahang.WARD,
            col5: cuahang.DISTRICT,
            col6: cuahang.PROVINCE,
            col7: trangthai,
        };
        rows.push(row);
    }
    return rows;
}

async function GET_IDKH(id) {
    var body = null;
    body = await Api.Post('stores/khachhang', { ID_KHACHHANG: id });
    return body;
}

async function CREATE(body) {
    return await Api.Post('stores/create', body);
}

async function UPDATE(body) {
    return await Api.Post('stores/update', body);
}

async function DELETE(body) {
    return await Api.Post('stores/delete', body);
}

async function XET_DUYET(body) {
    return await Api.Post('stores/xetduyet', body);
}

export { GET, GET_IDKH, CREATE, UPDATE, DELETE, XET_DUYET };

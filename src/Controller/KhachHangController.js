import Api from './api';

async function GET() {
    var body = null;
    body = await Api.Get('khachhangs');
    return body;
}

async function GET_ROWS() {
    let body = await Api.Get('khachhangs');
    let arrRows = [];
    for (let khachhang of body) {
        var gioitinh = '';
        if (khachhang.GIOITINH === 1) {
            gioitinh = 'Nam';
        } else if (khachhang.GIOITINH === 2) {
            gioitinh = 'Nữ';
        } else {
            gioitinh = 'Không rõ';
        }
        var row = {
            id: khachhang.ID_KHACHHANG,
            col1: khachhang.TEN_KHACHHANG,
            col2: new Date(khachhang.NGAYSINH).toLocaleString('en-GB', { timeZone: 'UTC' }).slice(0, 10),
            col3: gioitinh,
            col4: khachhang.SDT,
            col5: khachhang.DIACHI,
            col6: khachhang.EMAIL,
        };
        arrRows.push(row);
    }
    return arrRows;
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

async function CREATE(body) {
    return await Api.Post('khachhangs/create', body);
}

async function UPDATE(body) {
    return await Api.Post('khachhangs/update', body);
}

async function DELETE(body) {
    return await Api.Post('khachhangs/delete', body);
}

export { GET, GET_KH, GET_ACCOUNT, CHANGE_PASS, PASS, CREATE, UPDATE, DELETE, GET_ROWS };

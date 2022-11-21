import Api from './api';

async function GET() {
    var body = null;
    body = await Api.Get('donmuas');
    return body;
}

async function GET_BYID(id) {
    var body = null;
    let returnBody = [];
    body = await Api.Post('donmuas/id', { ID_KHACHHANG: id });
    for (const value of body) {
        const img = await Api.Post('items/images/', { ID_VATPHAM: value.VATPHAM });
        value.IMG = img[0]?.TEN_HINHANH ? img[0]?.TEN_HINHANH : 'logo2.png';
    }
    let donmua = [];
    let flag = true;
    for (let i = 0; i < body.length - 1; i++) {
        let arr = [];
        for (let dm of donmua) {
            if (dm === body[i].DONMUA) flag = false;
        }

        if (flag) {
            arr.push(body[i]);
            donmua.push(body[i].DONMUA);
            for (let j = i + 1; j < body.length; j++) {
                if (body[j].DONMUA === body[i].DONMUA && body[j].ID_DONMUACT !== body[i].ID_DONMUACT) {
                    arr.push(body[j]);
                }
            }
            returnBody.push(arr);
        }
        flag = true;
    }
    return returnBody;
}

export { GET, GET_BYID };

import Api from './api';

async function POST_ITEM(arr) {
    var body = [];
    for (const id of arr) {
        body = body.concat(await Api.Post('items/id', { ID_VATPHAM: id }));
    }
    return body;
}

async function Images(arr) {
    var body = [];
    for (const id of arr) {
        const img = await Api.Post('items/images/', { ID_VATPHAM: id });
        body = body.concat(img[0]);
    }
    return body;
}

export { Images, POST_ITEM };

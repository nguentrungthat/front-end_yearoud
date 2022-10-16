import Api from './api';

async function Load(idItem) {
    var body = await Api.Post('items/id', { ID_VATPHAM: idItem });
    return body;
}

async function Images(id) {
    var body = await Api.Post('items/images/', { ID_VATPHAM: id });
    return body;
}

async function RATING(id) {
    var body;
    if (id) {
        body = await Api.Post('rating/id', { ID_VATPHAM: id });
        return body;
    } else {
        body = await Api.Get('rating');
        return body;
    }
}

function Random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export { Load, Images, Random, RATING };

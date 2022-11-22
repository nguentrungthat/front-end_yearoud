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

async function LIST_RATING(id) {
    const body = await Api.Post('rating/rating', { ID_VATPHAM: id });
    return body;
}

function Random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

async function ITEM_BYLOAI(id) {
    let body = await Api.Post('items/loai', { ID_VATPHAM: id });
    for (const elm of body) {
        let itemImg = await Api.Post('items/images/', { ID_VATPHAM: elm?.ID_VATPHAM });
        elm.HINHANH = itemImg[0].TEN_HINHANH;
    }
    const ratings = await RATING();
    for (const item of body) {
        let value = 0;
        let quantityRating = 0;
        for (const rating of ratings) {
            if (rating.ID_VATPHAM === item.ID_VATPHAM) {
                value = rating.RATING;
                quantityRating = rating.QUANTITY;
            }
        }
        item.RATING = value;
        item.QUANTITYRATING = quantityRating;
    }
    body = SORT_RATING(body);
    return body;
}

function SORT_RATING(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = arr.length - 1; j > i; j--) {
            if (arr[i].RATING <= arr[j].RATING) {
                if (arr[i].RATING < arr[j].RATING || arr[i].QUALITYRATING < arr[j].QUALITYRATING) {
                    const rating = arr[i];
                    arr[i] = arr[j];
                    arr[j] = rating;
                }
            }
        }
    }
    return arr;
}

export { Load, Images, Random, RATING, LIST_RATING, ITEM_BYLOAI };

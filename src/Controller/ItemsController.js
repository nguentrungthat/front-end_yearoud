import Api from './api';

async function GET() {
    var body = null;
    body = await Api.Get('items');
    return body;
}

async function GET_LOAI() {
    var body = null;
    body = await Api.Get('items/getloai');
    return body;
}

async function GET_ROWS_ITEM(id) {
    let body = null;
    let arrRows = [];
    if (id) {
        body = await Api.Post('items', { ID_KHACHHANG: id });
        for (const item of body) {
            let trangthai = 'Đang xét duyệt';
            if (item.STATUS === 1) trangthai = 'Đã xét duyệt';
            let row = {
                id: item.ID_VATPHAM,
                col1: item.TEN_VATPHAM,
                col2: item.GIABAN.toLocaleString('en-US'),
                col3: item.SOLUONG_TONKHO,
                col4: item.SOLUONG_DABAN,
                col5: item.LOAI,
                col6: item.SIZE,
                col7: item.COLOR,
                col8: item.XUATXU,
                col9: item.MOTA_VATPHAM,
                col10: trangthai,
            };
            arrRows.push(row);
        }
    } else {
        body = await Api.Get('items');
        for (const item of body) {
            let trangthai = 'Chờ xét duyệt';
            if (item.STATUS === 1) trangthai = 'Đã xét duyệt';
            let row = {
                id: item.ID_VATPHAM,
                col1: item.TEN_VATPHAM,
                col2: item.GIABAN.toLocaleString('en-US'),
                col3: item.SOLUONG_TONKHO,
                col4: item.SOLUONG_DABAN,
                col5: item.TEN_STORE,
                col6: item.LOAI,
                col7: item.SIZE,
                col8: item.COLOR,
                col9: item.XUATXU,
                col10: item.MOTA_VATPHAM,
                col11: trangthai,
            };
            arrRows.push(row);
        }
    }
    return arrRows;
}

async function POST_ITEM(arr) {
    var body = [];
    for (const id of arr) {
        body = body.concat(await Api.Post('items/id', { ID_VATPHAM: id }));
    }
    return body;
}

async function OnLoad(id) {
    var body = null;
    if (id) {
        body = await Api.Get('items');
        const rec = await recommend(id);
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
        //rating recommend
        for (const item of rec) {
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
        body = arrayUnique(rec.concat(body));
        for (const elm of body) {
            let itemImg = await Api.Post('items/images/', { ID_VATPHAM: elm?.ID_VATPHAM });
            elm.HINHANH = itemImg[0].TEN_HINHANH;
        }
    } else {
        body = await Api.Get('items');
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
    }
    return body;
}

async function USER(id) {
    var body = await Api.Post('khachhangs/id', { ID_KHACHHANG: id });
    return body;
}

async function RATING() {
    var body = await Api.Get('rating');
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

async function recommend(id) {
    const recommend = await Api.Post('items/recommend', { ID_KHACHHANG: id });
    var data = [];
    for (const id of recommend) {
        data = data.concat(await Api.Post('items/id', { ID_VATPHAM: id }));
    }
    return data;
}

// arr = arrayUnique(arr1.concat(arr2));
function arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i].ID_VATPHAM === a[j].ID_VATPHAM) a.splice(j--, 1);
        }
    }

    return a;
}

async function CREATE_ITEM(data) {
    return await Api.Post('items/create', data);
}

async function DELETE_ITEM(data) {
    return await Api.Post('items/delete', data);
}

async function UPDATE_ITEM(data) {
    return await Api.Post('items/update', data);
}

async function SEARCH(str) {
    let body = await Api.Post('items/search', { SEARCH: str });
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

async function ADD_FILE(formData) {
    return await Api.Post_file('items/add_file', formData);
}

async function ADD_IMG(body) {
    return await Api.Post('items/add_img', body);
}

async function RATED(id) {
    return await Api.Post('rating/rated', { ID_KHACHHANG: id });
}

async function XET_DUYET(data) {
    return await Api.Post('items/xetduyet', data);
}

export {
    GET,
    OnLoad,
    POST_ITEM,
    USER,
    RATING,
    GET_LOAI,
    GET_ROWS_ITEM,
    SEARCH,
    CREATE_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    ADD_IMG,
    ADD_FILE,
    RATED,
    XET_DUYET,
};
